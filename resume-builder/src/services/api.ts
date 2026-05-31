import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import type { ApiResponse, ApiError } from '@/types'
import { useAuthStore } from '@/stores/auth'

// 创建axios实例
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.accessToken) {
      config.headers.Authorization = `Bearer ${authStore.accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<any>>) => {
    return response.data as any
  },
  async (error) => {
    const originalRequest = error.config

    // 处理401错误（Token过期）
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const authStore = useAuthStore()
        if (authStore.refreshToken) {
          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL || '/api/v1'}/auth/refresh`,
            { refreshToken: authStore.refreshToken }
          )

          const { accessToken, refreshToken } = response.data.data
          authStore.updateTokens(accessToken, refreshToken)

          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        const authStore = useAuthStore()
        authStore.clearAuth()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    // 处理其他错误
    const apiError: ApiError = {
      code: error.response?.data?.code || 50001,
      message: error.response?.data?.message || error.message || '网络错误',
      details: error.response?.data?.details,
    }

    return Promise.reject(apiError)
  }
)

// 封装请求方法
export async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const response = await api(config) as ApiResponse<T>
  return response.data
}

// 封装GET请求
export async function get<T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
  return request<T>({ ...config, method: 'GET', url, params })
}

// 封装POST请求
export async function post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
  return request<T>({ ...config, method: 'POST', url, data })
}

// 封装PUT请求
export async function put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
  return request<T>({ ...config, method: 'PUT', url, data })
}

// 封装DELETE请求
export async function del<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return request<T>({ ...config, method: 'DELETE', url })
}

// 封装文件上传
export async function upload<T>(url: string, file: File, fieldName = 'file', config?: AxiosRequestConfig): Promise<T> {
  const formData = new FormData()
  formData.append(fieldName, file)

  return request<T>({
    ...config,
    method: 'POST',
    url,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// SSE流式请求
export async function streamRequest(
  url: string,
  data: any,
  onChunk: (chunk: string) => void,
  signal?: AbortSignal
): Promise<void> {
  const authStore = useAuthStore()

  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL || '/api/v1'}${url}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.accessToken}`,
      },
      body: JSON.stringify(data),
      signal,
    }
  )

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const reader = response.body?.getReader()
  if (!reader) {
    throw new Error('No reader available')
  }

  const decoder = new TextDecoder()

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    const chunk = decoder.decode(value)
    const lines = chunk.split('\n')

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6)
        if (data === '[DONE]') {
          return
        }
        try {
          const parsed = JSON.parse(data)
          onChunk(parsed.content || parsed.text || data)
        } catch {
          onChunk(data)
        }
      }
    }
  }
}

export default api
