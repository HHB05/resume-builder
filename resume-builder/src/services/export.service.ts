import { post, get } from './api'
import type { ExportTask } from '@/types'

export const exportService = {
  // 导出PDF
  async exportPdf(
    resumeId: string,
    options?: { paperSize?: 'A4' | 'Letter'; dpi?: 150 | 300 }
  ): Promise<ExportTask> {
    return post<ExportTask>('/export/pdf', { resumeId, options })
  },

  // 导出Word
  async exportDocx(resumeId: string): Promise<ExportTask> {
    return post<ExportTask>('/export/docx', { resumeId })
  },

  // 导出图片
  async exportImage(
    resumeId: string,
    format: 'png' | 'jpg'
  ): Promise<ExportTask> {
    return post<ExportTask>('/export/image', { resumeId, format })
  },

  // 导出纯文本
  async exportText(resumeId: string): Promise<string> {
    return post<string>('/export/text', { resumeId })
  },

  // 获取导出任务状态
  async getTaskStatus(taskId: string): Promise<ExportTask> {
    return get<ExportTask>(`/export/${taskId}`)
  },

  // 轮询任务状态
  async pollTaskStatus(
    taskId: string,
    onStatusChange?: (task: ExportTask) => void,
    maxAttempts = 60
  ): Promise<ExportTask> {
    let attempts = 0

    while (attempts < maxAttempts) {
      const task = await this.getTaskStatus(taskId)
      onStatusChange?.(task)

      if (task.status === 'completed' || task.status === 'failed') {
        return task
      }

      await new Promise((resolve) => setTimeout(resolve, 1000))
      attempts++
    }

    throw new Error('Export timeout')
  },

  // 通过邮件发送简历
  async sendByEmail(
    resumeId: string,
    email: string,
    format: 'pdf' | 'docx' = 'pdf'
  ): Promise<void> {
    return post('/export/send-email', { resumeId, email, format })
  },
}
