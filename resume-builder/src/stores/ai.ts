import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  AiChatMessage,
  AiScoreResult,
  AiMatchResult,
  AiUsageInfo,
  AiSuggestion,
} from '@/types'
import { aiService } from '@/services/ai.service'

export const useAiStore = defineStore('ai', () => {
  // 状态
  const messages = ref<AiChatMessage[]>([])
  const currentSuggestion = ref<AiSuggestion | null>(null)
  const scoreResult = ref<AiScoreResult | null>(null)
  const matchResult = ref<AiMatchResult | null>(null)
  const isStreaming = ref(false)
  const streamingContent = ref('')
  const usageInfo = ref<AiUsageInfo | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 计算属性
  const chatHistory = computed(() => messages.value)
  const canUseAi = computed(() => {
    if (!usageInfo.value) return true
    return usageInfo.value.used < usageInfo.value.limit
  })
  const remainingUsage = computed(() => {
    if (!usageInfo.value) return Infinity
    return Math.max(0, usageInfo.value.limit - usageInfo.value.used)
  })
  const isAnalyzing = computed(() => loading.value)
  const hasScoreResult = computed(() => scoreResult.value !== null)
  const hasMatchResult = computed(() => matchResult.value !== null)

  // 发送消息
  function sendMessage(content: string, role: 'user' | 'assistant' = 'user') {
    const message: AiChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      role,
      content,
      timestamp: new Date().toISOString(),
    }
    messages.value.push(message)
    return message
  }

  // 文本润色
  async function polishText(
    resumeId: string,
    section: string,
    text: string,
    targetRole: string,
    options: { style: 'professional' | 'concise' | 'detailed'; language: 'zh' | 'en' }
  ): Promise<string | null> {
    if (!canUseAi.value) {
      error.value = '今日AI使用次数已用完，请明天再试'
      return null
    }

    isStreaming.value = true
    streamingContent.value = ''
    error.value = null

    try {
      const result = await aiService.polishText(
        resumeId,
        section,
        text,
        targetRole,
        options,
        (chunk) => {
          streamingContent.value += chunk
        }
      )

      // 更新使用次数
      if (usageInfo.value) {
        usageInfo.value.used += 1
      }

      // 添加到聊天记录
      sendMessage(text, 'user')
      sendMessage(result.polishedText, 'assistant')

      return result.polishedText
    } catch (e: any) {
      error.value = e.message || '润色失败'
      return null
    } finally {
      isStreaming.value = false
      streamingContent.value = ''
    }
  }

  // 简历评分
  async function scoreResume(resumeId: string): Promise<AiScoreResult | null> {
    loading.value = true
    error.value = null

    try {
      const result = await aiService.scoreResume(resumeId)
      scoreResult.value = result

      // 添加到聊天记录
      sendMessage('请帮我分析一下这份简历', 'user')
      sendMessage(`您的简历综合评分为 ${result.overallScore} 分`, 'assistant')

      return result
    } catch (e: any) {
      error.value = e.message || '评分失败'
      return null
    } finally {
      loading.value = false
    }
  }

  // 职位匹配
  async function matchJob(
    resumeId: string,
    jobDescription: string
  ): Promise<AiMatchResult | null> {
    loading.value = true
    error.value = null

    try {
      const result = await aiService.matchJob(resumeId, jobDescription)
      matchResult.value = result

      // 添加到聊天记录
      sendMessage(`请帮我分析与这个职位的匹配度：\n${jobDescription.slice(0, 200)}...`, 'user')
      sendMessage(`您的简历与该职位的匹配度为 ${result.matchScore}%`, 'assistant')

      return result
    } catch (e: any) {
      error.value = e.message || '匹配分析失败'
      return null
    } finally {
      loading.value = false
    }
  }

  // 生成内容
  async function generateContent(
    type: 'summary' | 'experience' | 'project' | 'skills' | 'highlight',
    context: string,
    prompt?: string
  ): Promise<string | null> {
    if (!canUseAi.value) {
      error.value = '今日AI使用次数已用完，请明天再试'
      return null
    }

    isStreaming.value = true
    streamingContent.value = ''
    error.value = null

    try {
      const result = await aiService.generateContent(type, context, prompt, (chunk) => {
        streamingContent.value += chunk
      })

      // 更新使用次数
      if (usageInfo.value) {
        usageInfo.value.used += 1
      }

      // 添加到聊天记录
      sendMessage(`请帮我生成${getTypeName(type)}`, 'user')
      sendMessage(result.content, 'assistant')

      return result.content
    } catch (e: any) {
      error.value = e.message || '生成失败'
      return null
    } finally {
      isStreaming.value = false
      streamingContent.value = ''
    }
  }

  // 翻译文本
  async function translateText(
    text: string,
    targetLang: 'zh' | 'en' | 'ja'
  ): Promise<string | null> {
    if (!canUseAi.value) {
      error.value = '今日AI使用次数已用完，请明天再试'
      return null
    }

    isStreaming.value = true
    streamingContent.value = ''
    error.value = null

    try {
      const result = await aiService.translateText(text, targetLang, (chunk) => {
        streamingContent.value += chunk
      })

      // 更新使用次数
      if (usageInfo.value) {
        usageInfo.value.used += 1
      }

      // 添加到聊天记录
      sendMessage(`请帮我翻译以下内容：\n${text.slice(0, 100)}...`, 'user')
      sendMessage(result.translatedText, 'assistant')

      return result.translatedText
    } catch (e: any) {
      error.value = e.message || '翻译失败'
      return null
    } finally {
      isStreaming.value = false
      streamingContent.value = ''
    }
  }

  // 获取关键词
  async function getKeywords(
    resumeId: string,
    jobDescription?: string
  ): Promise<{ keyword: string; importance: 'high' | 'medium' | 'low'; found: boolean }[]> {
    loading.value = true
    error.value = null

    try {
      const keywords = await aiService.getKeywords(resumeId, jobDescription)

      // 添加到聊天记录
      if (jobDescription) {
        sendMessage('请帮我分析职位关键词', 'user')
      } else {
        sendMessage('请帮我分析简历关键词', 'user')
      }
      sendMessage(`找到 ${keywords.length} 个关键词`, 'assistant')

      return keywords
    } catch (e: any) {
      error.value = e.message || '获取关键词失败'
      return []
    } finally {
      loading.value = false
    }
  }

  // 设置当前建议
  function setCurrentSuggestion(suggestion: AiSuggestion | null) {
    currentSuggestion.value = suggestion
  }

  // 清除评分结果
  function clearScoreResult() {
    scoreResult.value = null
  }

  // 清除匹配结果
  function clearMatchResult() {
    matchResult.value = null
  }

  // 重置聊天记录
  function resetChat() {
    messages.value = []
    currentSuggestion.value = null
  }

  // 重置AI状态
  function resetAi() {
    messages.value = []
    currentSuggestion.value = null
    scoreResult.value = null
    matchResult.value = null
    isStreaming.value = false
    streamingContent.value = ''
    error.value = null
  }

  // 获取类型名称
  function getTypeName(type: string): string {
    const typeMap: Record<string, string> = {
      summary: '自我评价',
      experience: '工作经历描述',
      project: '项目描述',
      skills: '技能列表',
      highlight: '工作亮点',
    }
    return typeMap[type] || type
  }

  return {
    // 状态
    messages,
    currentSuggestion,
    scoreResult,
    matchResult,
    isStreaming,
    streamingContent,
    usageInfo,
    loading,
    error,

    // 计算属性
    chatHistory,
    canUseAi,
    remainingUsage,
    isAnalyzing,
    hasScoreResult,
    hasMatchResult,

    // 方法
    sendMessage,
    polishText,
    scoreResume,
    matchJob,
    generateContent,
    translateText,
    getKeywords,
    setCurrentSuggestion,
    clearScoreResult,
    clearMatchResult,
    resetChat,
    resetAi,
  }
})
