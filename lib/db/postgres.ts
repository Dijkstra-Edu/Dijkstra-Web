import { Pool } from "pg";
const connectionString = process.env.DIJKSTRA_WEB_DB_URL;

if (!connectionString) {
  throw new Error("Missing DIJKSTRA_WEB_DB_URL environment variable.");
}

declare global {
  var __dijkstraAuthPgPool: Pool | undefined;
}

export const authPgPool =
  globalThis.__dijkstraAuthPgPool ??
  new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__dijkstraAuthPgPool = authPgPool;
}

