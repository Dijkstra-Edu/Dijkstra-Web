import { authPgPool } from "@/lib/db/postgres";

export type SqlParam = string | number | boolean | Date | null;

export async function queryNextJsDb<T = unknown>(
  sql: string,
  params: SqlParam[] = []
): Promise<T[]> {
  const { rows } = await authPgPool.query(sql, params);
  return rows as T[];
}

export async function queryOneNextJsDb<T = unknown>(
  sql: string,
  params: SqlParam[] = []
): Promise<T | null> {
  const rows = await queryNextJsDb<T>(sql, params);
  return rows[0] ?? null;
}