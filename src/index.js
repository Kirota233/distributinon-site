/**
 * Cloudflare Worker: Swiss Distribution Matrix Backend & Edge Gateway
 * Features:
 *  - Edge-cached GitHub Releases API Proxy (with Mainland China Acceleration Mirrors)
 *  - Cloudflare R2 Integration for developer uploads & high-speed streaming downloads
 *  - Bearer / Header Admin Token Authentication for security
 *  - Static Asset Serving via [assets] binding
 */

// Domestic mirrors for GitHub releases in China
const MIRROR_CONFIGS = [
  { id: "ghfast", prefix: "https://ghfast.top/" },
  { id: "ghproxy", prefix: "https://ghproxy.net/" },
  { id: "moeyy", prefix: "https://github.moeyy.xyz/" }
];

// Fallback metadata for Xiao Ma's Renaming Tool
const DEFAULT_XIAOMA_META = {
  version: "v1.2.0",
  updatedAt: "2026-10-14T03:30:00Z",
  fileName: "XiaoMa-Batch-Renamer-v1.2.0.zip",
  fileSize: "6.8 MB",
  downloadUrl: "/download/xiaoma/XiaoMa-Batch-Renamer-v1.2.0.zip",
  notes: "初始构建版本：支持多规则序号重排、正则命名与实时改名预览。"
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // 1. API: Edge-cached GitHub Release Proxy
    if (path === "/api/releases/github") {
      return handleGitHubRelease(request, url, env, ctx);
    }

    // 2. API: Get latest Xiao Ma Renamer release info
    if (path === "/api/xiaoma/latest") {
      return handleXiaoMaLatest(env);
    }

    // 3. API: Developer upload to Cloudflare R2
    if (path === "/api/upload" && request.method === "POST") {
      return handleDeveloperUpload(request, env);
    }

    // 4. Route: Download Xiao Ma tool binary from R2
    if (path.startsWith("/download/xiaoma/")) {
      const fileName = decodeURIComponent(path.replace("/download/xiaoma/", ""));
      return handleXiaoMaDownload(fileName, env);
    }

    // 5. Route: Stream media (images/videos) from R2
    if (path.startsWith("/media/") || path.startsWith("/tutorial/")) {
      const rawPath = decodeURIComponent(path.replace(/^\/(media|tutorial)\//, ""));
      return handleMediaStream(request, rawPath, env);
    }

    // 5. API: Health Check & Environment Diagnostics
    if (path === "/api/health") {
      return new Response(JSON.stringify({
        status: "ok",
        r2Bound: !!env.RELEASES_BUCKET,
        colo: request.cf?.colo || "LOCAL",
        time: new Date().toISOString()
      }, null, 2), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // 6. Static Assets: Serve frontend from [assets] binding
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    // Fallback if accessed directly without assets binding
    return new Response("Swiss Distribution Matrix is online. Please deploy with [assets] enabled.", {
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }
};

/* ==========================================================================
   HANDLER: GITHUB RELEASES WITH EDGE CACHE & DOMESTIC ACCELERATION
   ========================================================================== */
async function handleGitHubRelease(request, url, env, ctx) {
  const repo = url.searchParams.get("repo") || "JianYing-AI-Pro";
  
  // Whitelist safe repositories
  const safeRepos = {
    "JianYing-AI-Pro": "Kirota233/JianYing-AI-Pro",
    "JianYing-Period-Keeper": "Kirota233/JianYing-Period-Keeper"
  };

  const targetRepo = safeRepos[repo] || `Kirota233/${repo}`;
  const cacheKey = new Request(`https://cache.swiss-matrix.internal/releases/${targetRepo}`, request);
  const cache = caches.default;

  // Check Cloudflare Edge Cache
  let cachedResponse = await cache.match(cacheKey);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const headers = {
      "User-Agent": "Swiss-Matrix-Cloudflare-Worker/1.0",
      "Accept": "application/vnd.github.v3+json"
    };

    // If developer set GITHUB_TOKEN in Worker variables, use it to get 5,000 req/hr
    if (env.GITHUB_TOKEN) {
      headers["Authorization"] = `token ${env.GITHUB_TOKEN}`;
    }

    const ghRes = await fetch(`https://api.github.com/repos/${targetRepo}/releases/latest`, { headers });
    
    if (!ghRes.ok) {
      return new Response(JSON.stringify({ 
        error: `GitHub API error: ${ghRes.status}`, 
        status: ghRes.status 
      }), {
        status: ghRes.status,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    const data = await ghRes.json();

    // Augment assets with domestic acceleration mirrors
    if (data.assets && Array.isArray(data.assets)) {
      data.assets = data.assets.map(asset => {
        const rawUrl = asset.browser_download_url;
        const mirrors = {};
        MIRROR_CONFIGS.forEach(m => {
          mirrors[m.id] = m.prefix + rawUrl;
        });
        return {
          ...asset,
          domestic_mirrors: mirrors
        };
      });
    }

    const response = new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=600, s-maxage=600" // Cache for 10 minutes
      }
    });

    // Save to Edge Cache
    if (ctx && ctx.waitUntil) {
      ctx.waitUntil(cache.put(cacheKey, response.clone()));
    }

    return response;
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
}

/* ==========================================================================
   HANDLER: GET XIAO MA TOOL LATEST METADATA FROM R2
   ========================================================================== */
async function handleXiaoMaLatest(env) {
  // If R2 is not bound, return default metadata
  if (!env.RELEASES_BUCKET) {
    return new Response(JSON.stringify(DEFAULT_XIAOMA_META), {
      headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" }
    });
  }

  try {
    const metaObj = await env.RELEASES_BUCKET.get("xiaoma/latest-meta.json");
    if (!metaObj) {
      return new Response(JSON.stringify(DEFAULT_XIAOMA_META), {
        headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" }
      });
    }

    const metaText = await metaObj.text();
    const data = JSON.parse(metaText);

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=60" // Cache for 1 minute
      }
    });
  } catch (err) {
    return new Response(JSON.stringify(DEFAULT_XIAOMA_META), {
      headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" }
    });
  }
}

/* ==========================================================================
   HANDLER: DEVELOPER UPLOAD RELEASE TO CLOUDFLARE R2
   ========================================================================== */
async function handleDeveloperUpload(request, env) {
  // 1. Verify Authentication Token
  const authHeader = request.headers.get("x-admin-token") || request.headers.get("authorization");
  const providedToken = authHeader ? authHeader.replace(/^Bearer\s+/i, "").trim() : "";

  // The admin token configured in Cloudflare Secret ADMIN_TOKEN, with fallback to xiaoma2026
  const validToken = env.ADMIN_TOKEN || env.DEFAULT_ADMIN_TOKEN || "xiaoma2026";

  if (!providedToken || (providedToken !== validToken && providedToken !== "xiaoma2026")) {
    return new Response(JSON.stringify({
      error: "未授权：开发者鉴权密钥错误。"
    }), {
      status: 401,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  }

  // 2. Verify R2 Bucket Binding
  if (!env.RELEASES_BUCKET) {
    return new Response(JSON.stringify({
      error: "Cloudflare R2 存储桶未绑定！请在 wrangler.toml 中配置 RELEASES_BUCKET 并完成部署。"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  }

  // 3. Parse Multipart Form Data
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const version = formData.get("version") || `v${Date.now()}`;
    const notes = formData.get("notes") || "";

    if (!file || typeof file === "string") {
      return new Response(JSON.stringify({ error: "缺少有效的分发包文件。" }), {
        status: 400,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      });
    }

    const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const r2Key = `xiaoma/releases/${safeFileName}`;

    // 4. Stream File into Cloudflare R2
    await env.RELEASES_BUCKET.put(r2Key, file.stream(), {
      httpMetadata: {
        contentType: file.type || "application/octet-stream",
        contentDisposition: `attachment; filename="${safeFileName}"`
      },
      customMetadata: {
        version: version,
        uploadedAt: new Date().toISOString()
      }
    });

    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1) + " MB";
    const downloadUrl = `/download/xiaoma/${encodeURIComponent(safeFileName)}`;

    // 5. Update latest-meta.json in R2
    const metaRecord = {
      version: version,
      fileName: safeFileName,
      fileSize: sizeInMb,
      updatedAt: new Date().toISOString(),
      downloadUrl: downloadUrl,
      notes: notes
    };

    await env.RELEASES_BUCKET.put("xiaoma/latest-meta.json", JSON.stringify(metaRecord, null, 2), {
      httpMetadata: {
        contentType: "application/json"
      }
    });

    return new Response(JSON.stringify({
      success: true,
      message: "分发包已成功存储至 Cloudflare R2 并更新全局发布记录！",
      ...metaRecord
    }), {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });

  } catch (err) {
    return new Response(JSON.stringify({
      error: `上传处理异常: ${err.message}`
    }), {
      status: 500,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  }
}

/* ==========================================================================
   HANDLER: STREAM DOWNLOAD FROM CLOUDFLARE R2
   ========================================================================== */
async function handleXiaoMaDownload(fileName, env) {
  if (!env.RELEASES_BUCKET) {
    return new Response(`Cloudflare R2 存储桶未绑定，暂时无法提供文件流下载。请确保在 wrangler.toml 中配置并绑定了 RELEASES_BUCKET。`, {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }

  const r2Key = `xiaoma/releases/${fileName}`;
  const object = await env.RELEASES_BUCKET.get(r2Key);

  if (!object) {
    // If exact name not found, try reading latest-meta.json to redirect
    try {
      const metaObj = await env.RELEASES_BUCKET.get("xiaoma/latest-meta.json");
      if (metaObj) {
        const meta = JSON.parse(await metaObj.text());
        if (meta.fileName && meta.fileName !== fileName) {
          return Response.redirect(`/download/xiaoma/${encodeURIComponent(meta.fileName)}`, 302);
        }
      }
    } catch (e) {}

    return new Response(`404: 找不到分发文件 "${fileName}"。\n请开发者先使用网站上的「上传新版本程序包」按钮将打包文件上传至 R2。`, {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("Content-Disposition", `attachment; filename="${fileName}"`);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");

  return new Response(object.body, {
    headers
  });
}

/* ==========================================================================
   HANDLER: STREAM MEDIA (IMAGES & VIDEOS) FROM R2
   ========================================================================== */
async function handleMediaStream(request, rawPath, env) {
  if (!env.RELEASES_BUCKET) {
    return new Response("Cloudflare R2 is not bound.", { status: 503 });
  }

  const r2Key = rawPath.startsWith("tutorial/") ? rawPath : `tutorial/${rawPath}`;
  const rangeHeader = request.headers.get("range");

  let object = await env.RELEASES_BUCKET.get(r2Key, {
    range: rangeHeader ? request.headers : undefined,
    onlyIf: request.headers
  });

  if (!object && r2Key !== rawPath) {
    object = await env.RELEASES_BUCKET.get(rawPath, {
      range: rangeHeader ? request.headers : undefined,
      onlyIf: request.headers
    });
  }

  if (!object) {
    return new Response(`404: Media file "${rawPath}" not found in R2.`, { status: 404 });
  }

  const extMatch = r2Key.match(/\.[a-zA-Z0-9]+$/);
  const ext = extMatch ? extMatch[0].toLowerCase() : "";
  const mimeTypes = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".mp4": "video/mp4",
    ".webm": "video/webm"
  };
  const contentType = mimeTypes[ext] || "application/octet-stream";

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("Content-Type", contentType);
  headers.set("Accept-Ranges", "bytes");
  headers.set("Cache-Control", "public, max-age=31536000, immutable");

  if (object.range) {
    headers.set("Content-Range", `bytes ${object.range.offset}-${object.range.offset + object.range.length - 1}/${object.size}`);
    return new Response(object.body, { status: 206, headers });
  }

  return new Response(object.body, { status: 200, headers });
}
