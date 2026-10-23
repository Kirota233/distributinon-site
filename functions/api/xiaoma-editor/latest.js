/**
 * Cloudflare Pages Function: /api/xiaoma-editor/latest
 */
const DEFAULT_XIAOMA_EDITOR_META = {
  version: "v1.1.2",
  updatedAt: "2026-10-23T08:49:00Z",
  fileName: "小马剪辑台-1.1.2-Windows-x64-安装包.exe",
  fileSize: "115.9 MB",
  downloadUrl: "/download/xiaoma-editor/%E5%B0%8F%E9%A9%AC%E5%89%AA%E8%BE%91%E5%8F%B0-1.1.2-Windows-x64-%E5%AE%89%E8%A3%85%E5%8C%85.exe",
  notes: "小马剪辑台 v1.1.2 Windows x64 安装包"
};

export async function onRequestGet(context) {
  const { env } = context;

  // If R2 is not yet bound in Pages dashboard, return default fallback
  if (!env.RELEASES_BUCKET) {
    return new Response(JSON.stringify(DEFAULT_XIAOMA_EDITOR_META), {
      headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" }
    });
  }

  try {
    const metaObj = await env.RELEASES_BUCKET.get("xiaoma-editor/latest-meta.json");
    if (!metaObj) {
      return new Response(JSON.stringify(DEFAULT_XIAOMA_EDITOR_META), {
        headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" }
      });
    }

    const data = JSON.parse(await metaObj.text());
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=60"
      }
    });
  } catch (e) {
    return new Response(JSON.stringify(DEFAULT_XIAOMA_EDITOR_META), {
      headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" }
    });
  }
}
