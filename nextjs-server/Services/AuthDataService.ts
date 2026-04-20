import { getGithubAccount, updateRefreshedGithubAuthToken } from "../Repository/AuthDataRepository";
import { GITHUB_OAUTH_URL } from "@/constants/constants";

//TODO: Implement locking to prevent race conditions
export async function getAuthTokenForGithubAccount(
  accountId: string
): Promise<string | null> {
  console.log("Fetching GitHub auth token for accoun", accountId);
  const githubAccount = await getGithubAccount(accountId);
  if (!githubAccount?.refreshTokenExpiresAt ||
    githubAccount.refreshTokenExpiresAt < new Date()) {
    // If the refresh token is expired, return error
    throw new Error("Refresh token expired");
  }
  if (!githubAccount?.accessTokenExpiresAt || githubAccount.accessTokenExpiresAt < new Date()) {
      console.log("Refresh token:", githubAccount.refreshToken);
      const res = await fetch(GITHUB_OAUTH_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            client_id: process.env.GITHUB_APP_CLIENT_ID,
            client_secret: process.env.GITHUB_APP_CLIENT_SECRET,
            grant_type: "refresh_token",
            refresh_token: githubAccount.refreshToken,
          }),
      });
      const data = await res.json();
      console.log("Response from GitHub OAuth token refresh:", data);
      console.log("Response status:", res.status);
      if (res.ok && !data.error) {
        // If the request was successful, return the new access token
        await updateRefreshedGithubAuthToken(accountId, data.access_token, data.expires_in, data.refresh_token, data.refresh_token_expires_in);
        return data.access_token;
      } else {
          // If the request failed, throw an error
          throw new Error("Unable to refresh access token");
        }
  }
    return githubAccount ? githubAccount.accessToken : null;
}
   