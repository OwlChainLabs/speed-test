// returns the average solana slot time in ms, fetched server side
// set HELIUS_RPC_URL (full url or just the helius api key) as a runtime secret
export async function onRequestGet({ env }) {
  const errs = [];
  // accepts a full rpc url or just the helius api key
  const raw = (env.HELIUS_RPC_URL || env.HELIUS_API_KEY || "").trim();
  const helius = raw && !raw.startsWith("http") ? `https://mainnet.helius-rpc.com/?api-key=${raw}` : raw;
  const rpcs = [helius, "https://api.mainnet-beta.solana.com"].filter(Boolean);
  for (const rpc of rpcs) {
    try {
      const r = await fetch(rpc, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "getRecentPerformanceSamples", params: [10] }),
        cf: { cacheTtl: 30 },
      });
      const j = await r.json();
      if (!j.result) errs.push(`${rpc.split("?")[0]}: ${r.status} ${JSON.stringify(j.error || "").slice(0, 120)}`);
      let slots = 0, sec = 0;
      for (const s of j.result || []) { slots += s.numSlots; sec += s.samplePeriodSecs; }
      if (slots > 0) {
        return Response.json({ slotMs: Math.round((sec * 1000) / slots), live: true },
          { headers: { "cache-control": "public, max-age=30" } });
      }
    } catch (e) { errs.push(`${rpc.split("?")[0]}: ${e.message}`); }
  }
  return Response.json({ slotMs: 200, live: false, hasKey: !!raw, errs }, { headers: { "cache-control": "public, max-age=30" } });
}
