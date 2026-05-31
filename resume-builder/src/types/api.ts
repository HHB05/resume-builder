// API响应相关类型定义

import type { PlanType } from './user'

export interface ApiResponse<T> {
  code: number
  message: string
  data: T
  meta?: ApiMeta
}

export interface ApiMeta {
  page: number
  pageSize: number
  total: number
}

export interface ApiError {
  code: number
  message: string
  details?: ApiErrorDetail[]
}

export interface ApiErrorDetail {
  field: string
  message: string
}

// 常见的API错误码
export const ApiErrorCode = {
  SUCCESS: 200,
  BAD_REQUEST: 40001,
  UNAUTHORIZED: 40101,
  FORBIDDEN: 40301,
  NOT_FOUND: 40401,
  VALIDATION_ERROR: 42201,
  RATE_LIMIT: 42901,
  INTERNAL_ERROR: 50001,
} as const

export type ApiErrorCode = typeof ApiErrorCode[keyof typeof ApiErrorCode]

// 分页参数
export interface PaginationParams {
  page?: number
  pageSize?: number
}

// 排序参数
export interface SortParams {
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// 筛选参数
export interface FilterParams {
  [key: string]: string | number | boolean | undefined
}

// 导出任务状态
export interface ExportTask {
  taskId: string
  status: ExportTaskStatus
  downloadUrl?: string
  createdAt: string
  completedAt?: string
}

export type ExportTaskStatus = 'pending' | 'processing' | 'completed' | 'failed'

// 分享记录
export interface ShareRecord {
  id: string
  resumeId: string
  userId: string
  shareToken: string
  password: string | null
  expireAt: string | null
  viewCount: number
  isActive: boolean
  createdAt: string
}

export interface ShareCreateParams {
  resumeId: string
  password?: string
  expireAt?: string
}

export interface ShareCreateResponse {
  shareToken: string
  shareUrl: string
}

// 支付相关
export interface PaymentOrder {
  id: string
  userId: string
  planType: PlanType
  amount: number
  status: PaymentStatus
  paymentMethod: PaymentMethod
  paidAt: string | null
  createdAt: string
}

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export type PaymentMethod = 'wechat' | 'alipay' | 'stripe'

export interface PaymentCreateParams {
  planType: PlanType
  paymentMethod: PaymentMethod
}

export interface PaymentCreateResponse {
  orderId: string
  paymentUrl: string
}
