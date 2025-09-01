import { ApiResponse, PaginatedResponse } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean>
}

class ApiClient {
  private baseURL: string

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const { params, headers, ...restConfig } = config

    let url = `${this.baseURL}${endpoint}`

    // Add query parameters
    if (params) {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
      const queryString = searchParams.toString()
      if (queryString) {
        url += `?${queryString}`
      }
    }

    // Get auth token from localStorage (client-side only)
    const token = typeof window !== 'undefined'
      ? localStorage.getItem('auth_token')
      : null

    const response = await fetch(url, {
      ...restConfig,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
    })

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`
      let errorCode: string | undefined

      try {
        const errorData = await response.json()
        if (errorData.error) {
          errorMessage = errorData.error
        }
        if (errorData.code) {
          errorCode = errorData.code
        }
      } catch {
        // If we can't parse the error response, use the default message
      }

      throw new ApiError(response.status, errorMessage, errorCode)
    }

    // Handle empty responses
    if (response.status === 204) {
      return {} as T
    }

    try {
      return await response.json()
    } catch {
      throw new ApiError(500, 'Invalid JSON response from server')
    }
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', params })
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

// Create default instance
export const api = new ApiClient()

// Helper functions for common API patterns
export async function handleApiCall<T>(
  apiCall: () => Promise<T>
): Promise<{ data?: T; error?: string }> {
  try {
    const data = await apiCall()
    return { data }
  } catch (error) {
    if (error instanceof ApiError) {
      return { error: error.message }
    }
    return { error: 'An unexpected error occurred' }
  }
}

export function createApiResponse<T>(
  data?: T,
  error?: string,
  message?: string
): ApiResponse<T> {
  return {
    success: !error,
    ...(data && { data }),
    ...(error && { error }),
    ...(message && { message }),
  }
}

export function createPaginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number
): PaginatedResponse<T> {
  const totalPages = Math.ceil(total / limit)

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  }
}

// Response helpers for API routes
export function successResponse<T>(data: T, message?: string) {
  return Response.json(createApiResponse(data, undefined, message))
}

export function errorResponse(error: string, status: number = 400) {
  return Response.json(createApiResponse(undefined, error), { status })
}

export function notFoundResponse(resource: string = 'Resource') {
  return Response.json(
    createApiResponse(undefined, `${resource} not found`),
    { status: 404 }
  )
}

export function unauthorizedResponse(message: string = 'Unauthorized') {
  return Response.json(
    createApiResponse(undefined, message),
    { status: 401 }
  )
}

export function validationErrorResponse(message: string = 'Validation failed') {
  return Response.json(
    createApiResponse(undefined, message),
    { status: 422 }
  )
}
