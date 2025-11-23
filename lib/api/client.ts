import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { API_CONFIG, HTTP_STATUS } from "./config";

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Create axios instance with base configuration
 */
const createApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_CONFIG.baseURL,
    timeout: API_CONFIG.timeout,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": API_CONFIG.apiVersion,
    },
  });

  return instance;
};

/**
 * Request Interceptor
 * Adds authentication token and other headers to all requests
 */
const requestInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  // Add authentication token if available
  // IMPORTANT: Token should only be added on server-side requests
  const token = process.env.GITHUB_API_TOKEN;

  // Debug logging
  if (process.env.NODE_ENV === "development") {
    console.log(`[API Debug] Token exists: ${!!token}`);
    if (token) {
      console.log(
        `[API Debug] Token starts with: ${token.substring(0, 10)}...`
      );
    } else {
      console.log(
        `[API Debug] Available env vars:`,
        Object.keys(process.env).filter((k) => k.includes("GITHUB"))
      );
    }
  }

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Log request in development mode
  if (process.env.NODE_ENV === "development") {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
  }

  return config;
};

/**
 * Request Error Interceptor
 */
const requestErrorInterceptor = (error: AxiosError): Promise<AxiosError> => {
  console.error("[API Request Error]", error.message);
  return Promise.reject(error);
};

/**
 * Response Interceptor
 * Handles successful responses
 */
const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
  // Log response in development mode
  if (process.env.NODE_ENV === "development") {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
  }

  return response;
};

/**
 * Response Error Interceptor
 * Handles errors and implements retry logic
 */
const responseErrorInterceptor = async (error: AxiosError): Promise<any> => {
  const originalRequest = error.config as InternalAxiosRequestConfig & {
    _retry?: boolean;
    _retryCount?: number;
  };

  // Handle different error scenarios
  if (error.response) {
    const { status, data } = error.response;

    switch (status) {
      case HTTP_STATUS.UNAUTHORIZED:
        console.error("[API Error] Unauthorized - Invalid or missing token");
        throw new ApiError(
          "Authentication failed. Please check your API token.",
          status,
          data
        );

      case HTTP_STATUS.FORBIDDEN:
        console.error("[API Error] Forbidden - Insufficient permissions");
        throw new ApiError(
          "Access forbidden. You may not have permission to access this resource.",
          status,
          data
        );

      case HTTP_STATUS.NOT_FOUND:
        console.error("[API Error] Resource not found");
        throw new ApiError(
          "The requested resource was not found.",
          status,
          data
        );

      case HTTP_STATUS.RATE_LIMIT_EXCEEDED: {
        console.error("[API Error] Rate limit exceeded");
        const resetTime = error.response.headers["x-ratelimit-reset"];
        const resetDate = resetTime
          ? new Date(Number.parseInt(resetTime) * 1000)
          : null;
        throw new ApiError(
          `GitHub API rate limit exceeded. ${
            resetDate ? `Resets at ${resetDate.toLocaleTimeString()}` : ""
          }`,
          status,
          data
        );
      }

      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        // Implement retry logic for server errors
        if (
          !originalRequest._retry &&
          originalRequest._retryCount !== undefined
        ) {
          originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

          if (originalRequest._retryCount < API_CONFIG.retryAttempts) {
            originalRequest._retry = true;

            // Wait before retrying
            await new Promise((resolve) =>
              setTimeout(
                resolve,
                API_CONFIG.retryDelay * originalRequest._retryCount!
              )
            );

            console.log(
              `[API Retry] Attempt ${originalRequest._retryCount} of ${API_CONFIG.retryAttempts}`
            );
            return apiClient(originalRequest);
          }
        }
        throw new ApiError(
          "Server error occurred. Please try again later.",
          status,
          data
        );

      default:
        throw new ApiError(
          `API request failed with status ${status}`,
          status,
          data
        );
    }
  } else if (error.request) {
    // Request was made but no response received
    console.error("[API Error] No response received", error.message);
    throw new ApiError(
      "No response from server. Please check your internet connection."
    );
  } else {
    // Something else happened
    console.error("[API Error] Request setup failed", error.message);
    throw new ApiError("Failed to make request. Please try again.");
  }
};

/**
 * Initialize API client with interceptors
 */
export const apiClient: AxiosInstance = createApiClient();

// Add request interceptors
apiClient.interceptors.request.use(requestInterceptor, requestErrorInterceptor);

// Add response interceptors
apiClient.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor
);

/**
 * Helper function to make GET requests
 */
export const getAPI = async <T = any>(
  url: string,
  config?: any
): Promise<T> => {
  const response = await apiClient.get<T>(url, config);
  return response.data;
};

/**
 * Helper function to make POST requests
 */
export const postAPI = async <T = any>(
  url: string,
  data?: any,
  config?: any
): Promise<T> => {
  const response = await apiClient.post<T>(url, data, config);
  return response.data;
};

/**
 * Helper function to make PUT requests
 */
export const putAPI = async <T = any>(
  url: string,
  data?: any,
  config?: any
): Promise<T> => {
  const response = await apiClient.put<T>(url, data, config);
  return response.data;
};

/**
 * Helper function to make DELETE requests
 */
export const deleteAPI = async <T = any>(
  url: string,
  config?: any
): Promise<T> => {
  const response = await apiClient.delete<T>(url, config);
  return response.data;
};

/**
 * Helper function to make PATCH requests
 */
/**
 * Helper function to make GraphQL requests
 */
export const graphqlAPI = async <T = any>(
  query: string,
  variables?: Record<string, any>,
  config?: any
): Promise<T> => {
  const response = await apiClient.post<T>(
    "https://api.github.com/graphql",
    { query, variables },
    config
  );
  return response.data;
};
