// 用户相关类型定义

export interface User {
  id: string
  email: string
  phone: string | null
  nickname: string
  avatarUrl: string | null
  oauthProvider: 'wechat' | 'github' | 'google' | null
  oauthId: string | null
  planType: PlanType
  planExpireAt: string | null
  status: UserStatus
  createdAt: string
  updatedAt: string
}

export type PlanType = 'free' | 'pro' | 'enterprise'

export type UserStatus = 0 | 1 // 0=disabled, 1=active

export interface UserLoginParams {
  email: string
  password: string
}

export interface UserRegisterParams {
  email: string
  password: string
  nickname: string
}

export interface UserLoginResponse {
  user: User
  accessToken: string
  refreshToken: string
}

export interface UserUpdateParams {
  nickname?: string
  avatarUrl?: string
  phone?: string
}

export interface ChangePasswordParams {
  oldPassword: string
  newPassword: string
}

export interface OAuthParams {
  code: string
  state: string
}
