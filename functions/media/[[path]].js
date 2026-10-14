/**
 * Cloudflare Pages Function: /media/[[path]]
 * Streams images and videos directly from Cloudflare R2 bucket (distribute-web)
 * Supports HTTP Range requests for video playback and seek.
 */

const MIME_TYPES = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".zip": "application/zip",
  ".exe": "application/octet-stream"
};

export async function onRequestGet(context) {
  const { request, env, params } = context;

  if (!env.RELEASES_BUCKET) {
    return new Response("R2 bucket is not bound.", { status: 503 });
  }

  const pathParts = params.path;
  if (!pathParts || pathParts.length === 0) {
    return new Response("File path is missing.", { status: 400 });
  }

  const rawPath = pathParts.map(p => decodeURIComponent(p)).join("/");
  const r2Key = rawPath.startsWith("tutorial/") ? rawPath : `tutorial/${rawPath}`;
  const rangeHeader = request.headers.get("range");

  try {
    let object = await env.RELEASES_BUCKET.get(r2Key, {
      range: rangeHeader ? request.headers : undefined,
      onlyIf: request.headers
    });

    // Try space vs underscore
    if (!object) {
      object = await env.RELEASES_BUCKET.get(r2Key.replace(/_/g, " "), {
        range: rangeHeader ? request.headers : undefined,
        onlyIf: request.headers
      });
    }

    if (!object) {
      object = await env.RELEASES_BUCKET.get(r2Key.replace(/ /g, "_"), {
        range: rangeHeader ? request.headers : undefined,
        onlyIf: request.headers
      });
    }

    // If not found with tutorial/ prefix, try exact rawPath
    if (!object && r2Key !== rawPath) {
      object = await env.RELEASES_BUCKET.get(rawPath, {
        range: rangeHeader ? request.headers : undefined,
        onlyIf: request.headers
      });
    }

    if (!object) {
      return new Response(`404: Media file "${rawPath}" not found in R2 bucket.`, { status: 404 });
    }

    const extMatch = r2Key.match(/\.[a-zA-Z0-9]+$/);
    const ext = extMatch ? extMatch[0].toLowerCase() : "";
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

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
  } catch (err) {
    return new Response(`Error retrieving media from R2: ${err.message}`, { status: 500 });
  }
}
