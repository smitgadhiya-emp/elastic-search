import { getApiBaseUrl } from "@/lib/config"
import type { ApiResponse } from "@/types/api"

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE"
  body?: unknown
  headers?: HeadersInit
  cache?: RequestCache
}

function buildRequestInit(options: RequestOptions): RequestInit {
  return {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...(options.body !== undefined ? { body: JSON.stringify(options.body) } : {}),
    cache: options.cache ?? "no-store",
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${getApiBaseUrl()}${path}`, buildRequestInit(options))
    const rawText = await response.text()
    const payload = rawText ? (JSON.parse(rawText) as ApiResponse<T>) : null

    if (!response.ok) {
      return {
        success: false,
        message:
          payload && "message" in payload && typeof payload.message === "string"
            ? payload.message
            : "Request failed",
        ...(payload && "errors" in payload ? { errors: payload.errors } : {}),
      }
    }

    if (!payload) {
      return {
        success: true,
      }
    }

    return payload
  } catch (_error) {
    return {
      success: false,
      message: "Unable to connect to API server",
    }
  }
}

