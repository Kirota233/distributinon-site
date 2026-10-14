/**
 * Cloudflare Pages Function: /api/releases/github
 */
const MIRROR_CONFIGS = [
  { id: "ghfast", prefix: "https://ghfast.top/" },
  { id: "ghproxy", prefix: "https://ghproxy.net/" },
  { id: "moeyy", prefix: "https://github.moeyy.xyz/" }
];

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const repo = url.searchParams.get("repo") || "JianYing-AI-Pro";

  const safeRepos = {
    "JianYing-AI-Pro": "Kirota233/JianYing-AI-Pro",
    "JianYing-Period-Keeper": "Kirota233/JianYing-Period-Keeper"
  };

  const targetRepo = safeRepos[repo] || `Kirota233/${repo}`;

  try {
    const headers = {
      "User-Agent": "Swiss-Matrix-CF-Pages/1.0",
      "Accept": "application/vnd.github.v3+json"
    };

    if (env.GITHUB_TOKEN) {
      headers["Authorization"] = `token ${env.GITHUB_TOKEN}`;
    }

    const ghRes = await fetch(`https://api.github.com/repos/${targetRepo}/releases/latest`, { headers });
    if (!ghRes.ok) {
      return new Response(JSON.stringify({ error: `GitHub API: ${ghRes.status}` }), {
        status: ghRes.status,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    const data = await ghRes.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=600"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
}
