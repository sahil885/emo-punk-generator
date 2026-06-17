import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

// Lazy singleton so a missing DATABASE_URL throws at request time, not at
// module load — otherwise the build's page-data collection step fails and
// takes down the entire deployment.
let client: NeonQueryFunction<false, false> | null = null;

function getSql(): NeonQueryFunction<false, false> {
  if (!client) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");
    client = neon(url);
  }
  return client;
}

// Proxy so existing `sql\`...\`` tagged-template call sites keep working while
// the underlying client is created lazily on first use.
export const sql = new Proxy((() => {}) as unknown as NeonQueryFunction<false, false>, {
  apply(_target, _thisArg, args: Parameters<NeonQueryFunction<false, false>>) {
    return (getSql() as (...a: unknown[]) => unknown)(...args);
  },
});
