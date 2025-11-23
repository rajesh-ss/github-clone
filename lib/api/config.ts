/*
  All API endpoints, error codes, and configurations are defined here
*/
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_GITHUB_API_URL || "https://api.github.com",

  timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "10000", 10),

  retryAttempts: parseInt(
    process.env.NEXT_PUBLIC_API_RETRY_ATTEMPTS || "3",
    10
  ),

  retryDelay: 1000,

  apiVersion: "2022-11-28",
} as const;

export const getGitHubToken = (): string | undefined => {
  return process.env.GITHUB_API_TOKEN;
};

export const API_ENDPOINTS = {
  user: (username: string) => `/users/${username}`,
  userSocialMedia: (username: string) => `/users/${username}/social_accounts`,
  userRepos: (username: string, filter: string) =>
    `/users/${username}/repos?${filter}`,
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  RATE_LIMIT_EXCEEDED: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;
