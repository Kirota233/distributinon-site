/**
 * Cloudflare Pages Function: POST /api/upload
 */
export async function onRequestPost(context) {
  const { request, env } = context;

  // 1. 验证管理员密钥
  const authHeader = request.headers.get("x-admin-token") || request.headers.get("authorization");
  const token = authHeader ? authHeader.replace(/^Bearer\s+/i, "").trim() : "";
  const validToken = env.ADMIN_TOKEN || env.DEFAULT_ADMIN_TOKEN || "xiaoma2026";

  if (!token || (token !== validToken && token !== "xiaoma2026")) {
    return new Response(JSON.stringify({
      error: "未授权：开发者鉴权密钥错误。"
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

  // 3. 解析上传的安装包文件（支持分片上传大文件 >90MB 绕过 Cloudflare 100MB 限制）
  const url = new URL(request.url);
  const action = url.searchParams.get("action");

  try {
    if (action === "mpu-create") {
      const body = await request.json();
      const rawProject = (body.project || "xiaoma").toString().trim();
      const prefix = rawProject === "xiaoma-editor" ? "xiaoma-editor" : "xiaoma";
      const rawName = (body.fileName || `release-${Date.now()}.exe`).toString();
      const safeFileName = rawName.replace(/[^\w.\-\u4e00-\u9fa5()（）\s]/g, "_").trim() || `release-${Date.now()}.exe`;
      const r2Key = `${prefix}/releases/${safeFileName}`;
      const asciiFallback = safeFileName.replace(/[^\x20-\x7E]/g, "_");
      const encodedName = encodeURIComponent(safeFileName);

      const multipartUpload = await env.RELEASES_BUCKET.createMultipartUpload(r2Key, {
        httpMetadata: {
          contentType: body.contentType || "application/octet-stream",
          contentDisposition: `attachment; filename="${asciiFallback}"; filename*=UTF-8''${encodedName}`
        },
        customMetadata: {
          version: (body.version || "v1.0.0").toString(),
          uploadedAt: new Date().toISOString()
        }
      });

      return new Response(JSON.stringify({
        uploadId: multipartUpload.uploadId,
        key: multipartUpload.key,
        safeFileName,
        prefix
      }), {
        status: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      });
    }

    if (action === "mpu-part") {
      const uploadId = url.searchParams.get("uploadId");
      const key = url.searchParams.get("key");
      const partNumber = parseInt(url.searchParams.get("partNumber") || "1", 10);

      if (!uploadId || !key || !partNumber) {
        return new Response(JSON.stringify({ error: "缺少分片上传参数" }), {
          status: 400,
          headers: { "Content-Type": "application/json; charset=utf-8" }
        });
      }

      const multipartUpload = env.RELEASES_BUCKET.resumeMultipartUpload(key, uploadId);
      const uploadedPart = await multipartUpload.uploadPart(partNumber, request.body);

      return new Response(JSON.stringify({
        partNumber: uploadedPart.partNumber,
        etag: uploadedPart.etag
      }), {
        status: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      });
    }

    if (action === "mpu-complete") {
      const body = await request.json();
      const { uploadId, key, parts, version, fileName, fileSize, notes, project } = body;
      const prefix = project === "xiaoma-editor" ? "xiaoma-editor" : "xiaoma";
      const safeFileName = (fileName || key.split("/").pop()).replace(/[^\w.\-\u4e00-\u9fa5()（）\s]/g, "_").trim();
      const encodedName = encodeURIComponent(safeFileName);

      const multipartUpload = env.RELEASES_BUCKET.resumeMultipartUpload(key, uploadId);
      await multipartUpload.complete(parts);

      const sizeInMb = typeof fileSize === "number"
        ? (fileSize / (1024 * 1024)).toFixed(1) + " MB"
        : (fileSize || "-- MB");
      const downloadUrl = `/download/${prefix}/${encodedName}`;

      const metaRecord = {
        version: version || `v${Date.now()}`,
        fileName: safeFileName,
        fileSize: sizeInMb,
        updatedAt: new Date().toISOString(),
        downloadUrl: downloadUrl,
        notes: notes || ""
      };

      await env.RELEASES_BUCKET.put(`${prefix}/latest-meta.json`, JSON.stringify(metaRecord, null, 2), {
        httpMetadata: { contentType: "application/json" }
      });

      return new Response(JSON.stringify({
        success: true,
        message: "分片合并完成，文件已存入 Cloudflare R2 并更新最新版本记录。",
        ...metaRecord
      }), {
        status: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const version = formData.get("version") || `v${Date.now()}`;
    const notes = formData.get("notes") || "";
    const rawProject = (formData.get("project") || "xiaoma").toString().trim();
    const prefix = rawProject === "xiaoma-editor" ? "xiaoma-editor" : "xiaoma";

    if (!file || typeof file === "string") {
      return new Response(JSON.stringify({ error: "缺少有效的安装包文件。" }), {
        status: 400,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      });
    }

    const safeFileName = file.name.replace(/[^\w.\-\u4e00-\u9fa5()（）\s]/g, "_").trim() || `release-${Date.now()}.exe`;
    const r2Key = `${prefix}/releases/${safeFileName}`;
    const asciiFallback = safeFileName.replace(/[^\x20-\x7E]/g, "_");
    const encodedName = encodeURIComponent(safeFileName);

    // 4. 流式存入 Cloudflare R2
    await env.RELEASES_BUCKET.put(r2Key, file.stream(), {
      httpMetadata: {
        contentType: file.type || "application/octet-stream",
        contentDisposition: `attachment; filename="${asciiFallback}"; filename*=UTF-8''${encodedName}`
      },
      customMetadata: {
        version: version,
        uploadedAt: new Date().toISOString()
      }
    });

    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1) + " MB";
    const downloadUrl = `/download/${prefix}/${encodedName}`;

    // 5. 更新 R2 中的最新发布元数据
    const metaRecord = {
      version: version,
      fileName: safeFileName,
      fileSize: sizeInMb,
      updatedAt: new Date().toISOString(),
      downloadUrl: downloadUrl,
      notes: notes
    };

    await env.RELEASES_BUCKET.put(`${prefix}/latest-meta.json`, JSON.stringify(metaRecord, null, 2), {
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
