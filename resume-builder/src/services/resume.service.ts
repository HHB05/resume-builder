import { get, post, put, del } from './api'
import type {
  Resume,
  ResumeCreateParams,
  ResumeUpdateParams,
  ResumeListParams,
  ResumeVersion,
} from '@/types'

export const resumeService = {
  // 获取简历列表
  async getResumes(params: ResumeListParams): Promise<{ resumes: Resume[]; total: number }> {
    const response = await get<{ resumes: Resume[]; total: number }>('/resumes', params)
    return response
  },

  // 获取单个简历
  async getResume(id: string): Promise<Resume> {
    return get<Resume>(`/resumes/${id}`)
  },

  // 创建简历
  async createResume(params: ResumeCreateParams): Promise<Resume> {
    return post<Resume>('/resumes', params)
  },

  // 更新简历
  async updateResume(id: string, params: ResumeUpdateParams): Promise<Resume> {
    return put<Resume>(`/resumes/${id}`, params)
  },

  // 删除简历
  async deleteResume(id: string): Promise<void> {
    return del(`/resumes/${id}`)
  },

  // 复制简历
  async duplicateResume(id: string): Promise<Resume> {
    return post<Resume>(`/resumes/${id}/duplicate`)
  },

  // 切换收藏状态
  async toggleFavorite(id: string): Promise<void> {
    return post(`/resumes/${id}/favorite`)
  },

  // 获取版本历史
  async getVersions(id: string): Promise<ResumeVersion[]> {
    return get<ResumeVersion[]>(`/resumes/${id}/versions`)
  },

  // 创建版本
  async createVersion(id: string, content: any): Promise<ResumeVersion> {
    return post<ResumeVersion>(`/resumes/${id}/versions`, { content })
  },

  // 恢复版本
  async restoreVersion(resumeId: string, versionId: string): Promise<Resume> {
    return post<Resume>(`/resumes/${resumeId}/versions/${versionId}/restore`)
  },

  // 导入简历
  async importResume(file: File): Promise<Resume> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await post<Resume>('/resumes/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response
  },
}
