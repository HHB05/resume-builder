import { get, post } from './api'
import type { Template, TemplateFilter, TemplateRateParams } from '@/types'

export const templateService = {
  // 获取模板列表
  async getTemplates(params?: TemplateFilter): Promise<Template[]> {
    return get<Template[]>('/templates', params)
  },

  // 获取单个模板
  async getTemplate(id: string): Promise<Template> {
    return get<Template>(`/templates/${id}`)
  },

  // 评分模板
  async rateTemplate(id: string, score: number, comment?: string): Promise<void> {
    const params: TemplateRateParams = { score, comment }
    return post(`/templates/${id}/rate`, params)
  },

  // 获取模板分类
  async getCategories(): Promise<{ id: string; name: string; count: number }[]> {
    return get('/templates/categories')
  },

  // 获取热门模板
  async getPopularTemplates(limit?: number): Promise<Template[]> {
    return get('/templates/popular', { limit })
  },

  // 获取推荐模板
  async getRecommendedTemplates(templateId: string): Promise<Template[]> {
    return get(`/templates/${templateId}/recommended`)
  },
}
