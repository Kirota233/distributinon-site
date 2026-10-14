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
      const filenameMatch = buffer.toString("binary").match(/filename="([^"]+)"/);
      const filename = filenameMatch ? filenameMatch[1] : `release-${Date.now()}.zip`;
      
      const versionMatch = buffer.toString("utf8").match(/name="version"\r\n\r\n([^\r\n]+)/);
      const version = versionMatch ? versionMatch[1].trim() : "v1.0.0";

      // Save file to local simulated R2
      const destPath = path.join(UPLOAD_DIR, filename);
      fs.writeFileSync(destPath, "SIMULATED_BINARY_CONTENT_" + filename);

      const sizeMb = (buffer.length / (1024 * 1024)).toFixed(1) + " MB";
      localXiaoMaMeta = {
        version: version,
        fileName: filename,
        fileSize: sizeMb === "0.0 MB" ? "1.5 MB" : sizeMb,
        updatedAt: new Date().toISOString(),
        downloadUrl: `/download/xiaoma/${encodeURIComponent(filename)}`
      };

      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({
        success: true,
        message: "【本地测试】文件已成功保存至本地模拟 R2 目录！",
        ...localXiaoMaMeta
      }));
    });
    return;
  }

  // 4. Download simulated binary
  if (pathname.startsWith("/download/xiaoma/")) {
    const filename = decodeURIComponent(pathname.replace("/download/xiaoma/", ""));
    const filePath = path.join(UPLOAD_DIR, filename);
    if (fs.existsSync(filePath)) {
      res.writeHead(200, {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${filename}"`
      });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(200, {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${filename}"`
      });
      res.end("XiaoMa Renamer Simulated Binary Content. Ready for Cloudflare R2 distribution.");
    }
    return;
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
