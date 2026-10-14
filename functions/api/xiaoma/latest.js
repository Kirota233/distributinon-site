/**
 * Cloudflare Pages Function: /api/xiaoma/latest
 */
const DEFAULT_XIAOMA_META = {
  version: "v1.2.0",
  updatedAt: "2026-10-14T03:30:00Z",
  fileName: "XiaoMa-Batch-Renamer-v1.2.0.zip",
  fileSize: "6.8 MB",
  downloadUrl: "/download/xiaoma/XiaoMa-Batch-Renamer-v1.2.0.zip",
  notes: "初始构建版本"
};

export async function onRequestGet(context) {
  const { env } = context;

  // If R2 is not yet bound in Pages dashboard, return default fallback
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

    const data = JSON.parse(await metaObj.text());
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=60"
      }
    });
  } catch (e) {
    return new Response(JSON.stringify(DEFAULT_XIAOMA_META), {
      headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" }
    });
  }
}
