// cloudflare worker: serves the static page and /api/slot
import { onRequestGet } from "./functions/api/slot.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/slot") return onRequestGet({ env });
    return env.ASSETS.fetch(request);
  },
};
