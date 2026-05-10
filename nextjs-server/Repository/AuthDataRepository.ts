import { GithubAccountDto } from "@/types/server/next-js/auth/types";
import { queryOneNextJsDb } from "../NextJsDBIntegration";

export async function getGithubAccount(
  accountId: string
): Promise<GithubAccountDto | null> {
  return queryOneNextJsDb<GithubAccountDto>(
      `SELECT
          "accountId",
          "accessToken",
          "refreshToken",
          "accessTokenExpiresAt",
          "refreshTokenExpiresAt"
      FROM "account" 
      WHERE "accountId" = $1
      LIMIT 1`,
      [accountId]
    );
}

export async function updateRefreshedGithubAuthToken(
  accountId: string,
  accessToken: string,
  accessTokenExpiresIn: number,
  refreshToken: string,
  refreshTokenExpiresIn: number
): Promise<GithubAccountDto | null> {
  const now = new Date();

  const accessTokenExpiresAt = new Date(
    now.getTime() + accessTokenExpiresIn * 1000
  );

  const refreshTokenExpiresAt = new Date(
    now.getTime() + refreshTokenExpiresIn * 1000
  );

  return queryOneNextJsDb<GithubAccountDto>(
    `UPDATE "account"
     SET
         "accessToken" = $2,
         "accessTokenExpiresAt" = $3,
         "refreshToken" = $4,
         "refreshTokenExpiresAt" = $5
     WHERE "accountId" = $1
     RETURNING *`,
    [
      accountId,
      accessToken,
      accessTokenExpiresAt,
      refreshToken,
      refreshTokenExpiresAt,
    ]
  );
}

