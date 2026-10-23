/**
 * LOCAL DEVELOPMENT & PREVIEW SERVER
 * Zero-dependency Node.js server simulating Cloudflare Workers & R2 storage locally.
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8787;
const PUBLIC_DIR = path.join(__dirname, "public");
const UPLOAD_DIR = path.join(__dirname, "local_r2_storage");

// Ensure local simulated R2 directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

let localXiaoMaMeta = {
  version: "v1.2.0",
  updatedAt: "2026-10-14T03:30:00Z",
  fileName: "XiaoMa-Batch-Renamer-v1.2.0.zip",
  fileSize: "6.8 MB",
  downloadUrl: "/download/xiaoma/XiaoMa-Batch-Renamer-v1.2.0.zip",
  notes: "本地模拟默认包"
};

let localXiaoMaEditorMeta = {
  version: "v1.1.2",
  updatedAt: "2026-10-23T08:49:00Z",
  fileName: "小马剪辑台-1.1.2-Windows-x64-安装包.exe",
  fileSize: "115.9 MB",
  downloadUrl: "/download/xiaoma-editor/%E5%B0%8F%E9%A9%AC%E5%89%AA%E8%BE%91%E5%8F%B0-1.1.2-Windows-x64-%E5%AE%89%E8%A3%85%E5%8C%85.exe",
  notes: "小马剪辑台 v1.1.2 Windows x64 安装包"
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-admin-token");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // 1. API: GitHub Release Proxy
  if (pathname === "/api/releases/github") {
    const repo = parsedUrl.searchParams.get("repo") || "JianYing-AI-Pro";
    const targetRepo = repo === "JianYing-Period-Keeper" ? "Kirota233/JianYing-Period-Keeper" : "Kirota233/JianYing-AI-Pro";

    const https = require("https");
    const ghReq = https.request(`https://api.github.com/repos/${targetRepo}/releases/latest`, {
      headers: { "User-Agent": "Swiss-Matrix-Dev/1.0" }
    }, (ghRes) => {
      let body = "";
      ghRes.on("data", chunk => body += chunk);
      ghRes.on("end", () => {
        res.writeHead(ghRes.statusCode, { "Content-Type": "application/json; charset=utf-8" });
        res.end(body);
      });
    });
    ghReq.on("error", (err) => {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message }));
    });
    ghReq.end();
    return;
  }

  // 2. API: Xiao Ma latest
  if (pathname === "/api/xiaoma/latest") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(localXiaoMaMeta));
    return;
  }

  // 2.1 API: Xiao Ma Editor latest
  if (pathname === "/api/xiaoma-editor/latest") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(localXiaoMaEditorMeta));
    return;
  }

  // 3. API: Developer upload (simulated local R2 storage)
  if (pathname === "/api/upload" && req.method === "POST") {
    const token = req.headers["x-admin-token"] || "";
    if (token !== "xiaoma2026" && token !== "xiaoma123456") {
      res.writeHead(401, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ error: "开发者鉴权密钥错误！" }));
      return;
    }

    const boundaryMatch = req.headers["content-type"]?.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
    if (!boundaryMatch) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid multipart form data" }));
      return;
    }

    const chunks = [];
    req.on("data", chunk => chunks.push(chunk));
    req.on("end", () => {
      const buffer = Buffer.concat(chunks);
      // Simple parse to extract filename and file body
      const filenameMatch = buffer.toString("utf8").match(/filename="([^"]+)"/);
      const filename = filenameMatch ? filenameMatch[1] : `release-${Date.now()}.zip`;
      
      const textBody = buffer.toString("utf8");
      const versionMatch = textBody.match(/name="version"\s+([^\s]+)/);
      const version = versionMatch ? versionMatch[1].trim() : "v1.0.0";

      const projectMatch = textBody.match(/name="project"\s+([^\s]+)/);
      const project = projectMatch && projectMatch[1].trim() === "xiaoma-editor" ? "xiaoma-editor" : "xiaoma";

      // Save file to local simulated R2
      const destPath = path.join(UPLOAD_DIR, filename);
      fs.writeFileSync(destPath, "SIMULATED_BINARY_CONTENT_" + filename);

      const sizeMb = (buffer.length / (1024 * 1024)).toFixed(1) + " MB";
      const meta = {
        version: version,
        fileName: filename,
        fileSize: sizeMb === "0.0 MB" ? "1.5 MB" : sizeMb,
        updatedAt: new Date().toISOString(),
        downloadUrl: `/download/${project}/${encodeURIComponent(filename)}`
      };

      if (project === "xiaoma-editor") {
        localXiaoMaEditorMeta = meta;
      } else {
        localXiaoMaMeta = meta;
      }

      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({
        success: true,
        message: "【本地测试】文件已成功保存至本地模拟 R2 目录！",
        ...meta
      }));
    });
    return;
  }

  // 4. Download simulated binary
  if (pathname.startsWith("/download/xiaoma/") || pathname.startsWith("/download/xiaoma-editor/")) {
    const filename = decodeURIComponent(pathname.replace(/^\/download\/(xiaoma|xiaoma-editor)\//, ""));
    const filePath = path.join(UPLOAD_DIR, filename);
    const asciiFallback = filename.replace(/[^\x20-\x7E]/g, "_");
    const encodedName = encodeURIComponent(filename);
    const disposition = `attachment; filename="${asciiFallback}"; filename*=UTF-8''${encodedName}`;
    if (fs.existsSync(filePath)) {
      res.writeHead(200, {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": disposition
      });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(200, {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": disposition
      });
      res.end("XiaoMa Tool Simulated Binary Content. Ready for Cloudflare R2 distribution.");
    }
    return;
  }

  // 4.1 Media streaming (images & videos from tutorial)
  if (pathname.startsWith("/media/") || pathname.startsWith("/tutorial/")) {
    const subPath = decodeURIComponent(pathname.replace(/^\/(media|tutorial)\//, ""));
    const possiblePaths = [
      path.join(__dirname, "public", "tutorial", subPath.replace(/^tutorial\//, "")),
      path.join(__dirname, "tutorial", subPath.replace(/^tutorial\//, "")),
      path.join(__dirname, "public", subPath),
      path.join(__dirname, subPath)
    ];
    const mediaFile = possiblePaths.find(p => fs.existsSync(p));
    if (mediaFile) {
      const ext = path.extname(mediaFile).toLowerCase();
      const mimeTypes = {
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".mp4": "video/mp4",
        ".webp": "image/webp"
      };
      res.writeHead(200, {
        "Content-Type": mimeTypes[ext] || "application/octet-stream",
        "Accept-Ranges": "bytes"
      });
      fs.createReadStream(mediaFile).pipe(res);
      return;
    }
  }

  // 5. Static file serving (HTML, CSS, JS)
  let filePath = path.join(PUBLIC_DIR, pathname === "/" ? "index.html" : pathname);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(PUBLIC_DIR, "index.html");
  }

  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".ico": "image/x-icon",
    ".svg": "image/svg+xml"
  };

  const contentType = mimeTypes[ext] || "application/octet-stream";
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`  ✚ SWISS DISTRIBUTION MATRIX // LOCAL PREVIEW SERVER`);
  console.log(`  ✚ URL: http://localhost:${PORT}`);
  console.log(`  ✚ Press Ctrl+C to stop`);
  console.log(`======================================================\n`);
});
