import { get, post, put } from './api'
import type {
  User,
  UserLoginParams,
  UserRegisterParams,
  UserLoginResponse,
  UserUpdateParams,
  ChangePasswordParams,
} from '@/types'

export const authService = {
  // 登录
  async login(params: UserLoginParams): Promise<UserLoginResponse> {
    return post<UserLoginResponse>('/auth/login', params)
  },

  // 注册
  async register(params: UserRegisterParams): Promise<UserLoginResponse> {
    return post<UserLoginResponse>('/auth/register', params)
  },

  // 登出
  async logout(): Promise<void> {
    return post('/auth/logout')
  },

  // 刷新Token
  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    return post('/auth/refresh', { refreshToken })
  },

  // 获取用户信息
  async getProfile(): Promise<User> {
    return get<User>('/auth/profile')
  },

  // 更新用户信息
  async updateProfile(params: UserUpdateParams): Promise<User> {
    return put<User>('/auth/profile', params)
  },

  // 修改密码
  async changePassword(params: ChangePasswordParams): Promise<void> {
    return post('/auth/password', params)
  },

  // OAuth登录
  async oauthLogin(provider: string, code: string, state: string): Promise<UserLoginResponse> {
    return post<UserLoginResponse>(`/auth/oauth/${provider}`, { code, state })
  },

  // 发送验证码
  async sendVerificationCode(email: string): Promise<void> {
    return post('/auth/verification-code', { email })
  },

  // 重置密码
  async resetPassword(email: string, code: string, newPassword: string): Promise<void> {
    return post('/auth/reset-password', { email, code, newPassword })
  },
}
