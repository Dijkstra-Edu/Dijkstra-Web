export type GithubAccountDto = {
  accountId: string
  accessToken: string
  refreshToken: string
  accessTokenExpiresAt: Date
  refreshTokenExpiresAt: Date
}

export type GithubAccessTokenDto = {
  accessToken: string
  expiresAt: Date
}
