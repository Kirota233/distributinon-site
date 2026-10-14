/**
 * Cloudflare Pages Function: POST /api/upload
 */
export async function onRequestPost(context) {
  const { request, env } = context;

  // 1. 验证管理员密钥
  const authHeader = request.headers.get("x-admin-token") || request.headers.get("authorization");
  const token = authHeader ? authHeader.replace(/^Bearer\s+/i, "").trim() : "";
  const validToken = env.ADMIN_TOKEN || env.DEFAULT_ADMIN_TOKEN || "xiaoma123456";

  if (!token || token !== validToken) {
    return new Response(JSON.stringify({
      error: "未授权：开发者鉴权密钥错误。请检查 ADMIN_TOKEN 是否正确。"
    }), {
      status: 401,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  }

  // 2. 检查 R2 存储桶是否已绑定
  if (!env.RELEASES_BUCKET) {
    return new Response(JSON.stringify({
      error: "Cloudflare R2 存储桶未绑定！请在 Cloudflare Pages 设置中的 Functions -> R2 bucket bindings 绑定 RELEASES_BUCKET。"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  }

  // 3. 解析上传的安装包文件
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const version = formData.get("version") || `v${Date.now()}`;
    const notes = formData.get("notes") || "";

    if (!file || typeof file === "string") {
      return new Response(JSON.stringify({ error: "缺少有效的安装包文件。" }), {
        status: 400,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      });
    }

    const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const r2Key = `xiaoma/releases/${safeFileName}`;

    // 4. 流式存入 Cloudflare R2
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

    // 5. 更新 R2 中的最新发布元数据
    const metaRecord = {
      version: version,
      fileName: safeFileName,
      fileSize: sizeInMb,
      updatedAt: new Date().toISOString(),
      downloadUrl: downloadUrl,
      notes: notes
    };

    await env.RELEASES_BUCKET.put("xiaoma/latest-meta.json", JSON.stringify(metaRecord, null, 2), {
      httpMetadata: { contentType: "application/json" }
    });

    return new Response(JSON.stringify({
      success: true,
      message: "发布成功！文件已存入 Cloudflare R2 并更新最新版本记录。",
      ...metaRecord
    }), {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: `上传处理异常: ${err.message}` }), {
      status: 500,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  }
}
