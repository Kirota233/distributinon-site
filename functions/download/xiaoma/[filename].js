/**
 * Cloudflare Pages Function: GET /download/xiaoma/:filename
 */
export async function onRequestGet(context) {
  const { env, params } = context;

  if (!env.RELEASES_BUCKET) {
    return new Response("Cloudflare R2 存储桶未绑定，暂时无法下载文件。", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }

  const fileName = decodeURIComponent(params.filename);
  const r2Key = `xiaoma/releases/${fileName}`;
  const object = await env.RELEASES_BUCKET.get(r2Key);

  if (!object) {
    // 尝试读取最新文件做跳转重定向
    try {
      const metaObj = await env.RELEASES_BUCKET.get("xiaoma/latest-meta.json");
      if (metaObj) {
        const meta = JSON.parse(await metaObj.text());
        if (meta.fileName && meta.fileName !== fileName) {
          return Response.redirect(`/download/xiaoma/${encodeURIComponent(meta.fileName)}`, 302);
        }
      }
    } catch (e) {}

    return new Response(`404: 找不到分发文件 "${fileName}"。\n请开发者先通过网页上的「上传新版本程序包」按钮将打包好的文件上传。`, {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("Content-Disposition", `attachment; filename="${fileName}"`);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");

  return new Response(object.body, { headers });
}
