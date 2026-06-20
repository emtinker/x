// emtinker/x — static spec server
// Serves files from /public/ with CORS headers open for Base44 + agent access
// x.emtinker.com/{spec-name}.json

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Serve from static assets (wrangler [assets] handles file lookup)
    const asset = await env.ASSETS.fetch(request);

    // Add CORS headers to every response
    const headers = new Headers(asset.headers);
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    headers.set("Cache-Control", "public, max-age=300");

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    return new Response(asset.body, {
      status: asset.status,
      headers,
    });
  },
};
