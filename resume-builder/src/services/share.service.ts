import { post, get, put, del } from './api'
import type { ShareCreateParams, ShareCreateResponse, ShareRecord } from '@/types'

export const shareService = {
  // 创建分享链接
  async createShare(params: ShareCreateParams): Promise<ShareCreateResponse> {
    return post<ShareCreateResponse>('/share/create', params)
  },

  // 获取分享记录
  async getShareRecords(resumeId: string): Promise<ShareRecord[]> {
    return get<ShareRecord[]>(`/share/resume/${resumeId}`)
  },

  // 获取分享信息
  async getShareInfo(token: string, password?: string): Promise<any> {
    const params = password ? { password } : {}
    return get(`/share/${token}`, params)
  },

  // 更新分享设置
  async updateShare(
    token: string,
    params: { password?: string; expireAt?: string; isActive?: boolean }
  ): Promise<void> {
    return put(`/share/${token}`, params)
  },

  // 删除分享
  async deleteShare(token: string): Promise<void> {
    return del(`/share/${token}`)
  },

  // 获取分享统计
  async getShareStats(token: string): Promise<{
    viewCount: number
    uniqueVisitors: number
    avgDuration: number
  }> {
    return get(`/share/${token}/stats`)
  },

  // 生成二维码
  async generateQrCode(resumeId: string): Promise<string> {
    return post<string>('/share/qrcode', { resumeId })
  },
}
