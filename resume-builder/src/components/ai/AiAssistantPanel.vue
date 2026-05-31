<template>
  <div class="fixed inset-y-0 right-0 w-96 bg-white shadow-xl z-40 flex flex-col">
    <!-- Header -->
    <div class="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
      <div class="flex items-center">
        <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
          <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900">AI 助手</h3>
          <p class="text-xs text-gray-500">智能优化您的简历</p>
        </div>
      </div>
      <button
        @click="editorStore.closeAiPanel"
        class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Quick Actions -->
    <div class="px-4 py-3 border-b border-gray-200">
      <div class="grid grid-cols-2 gap-2">
        <button
          v-for="action in quickActions"
          :key="action.id"
          @click="executeAction(action)"
          class="flex items-center p-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <component :is="action.icon" class="w-4 h-4 mr-2 text-gray-500" />
          {{ action.label }}
        </button>
      </div>
    </div>

    <!-- Chat messages -->
    <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
      <!-- Welcome message -->
      <div v-if="aiStore.messages.length === 0" class="text-center py-8">
        <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h4 class="text-lg font-medium text-gray-900 mb-2">AI 简历助手</h4>
        <p class="text-sm text-gray-500 max-w-xs mx-auto">
          我可以帮助您润色内容、优化表达、分析简历质量。试试上面的快捷功能，或者直接输入问题。
        </p>
      </div>

      <!-- Messages -->
      <div
        v-for="message in aiStore.messages"
        :key="message.id"
        :class="[
          'flex',
          message.role === 'user' ? 'justify-end' : 'justify-start'
        ]"
      >
        <div
          :class="[
            'max-w-[80%] rounded-lg px-4 py-2',
            message.role === 'user'
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 text-gray-900'
          ]"
        >
          <p class="text-sm whitespace-pre-line">{{ message.content }}</p>
        </div>
      </div>

      <!-- Streaming message -->
      <div v-if="aiStore.isStreaming" class="flex justify-start">
        <div class="bg-gray-100 rounded-lg px-4 py-2">
          <p class="text-sm text-gray-900 whitespace-pre-line">
            {{ aiStore.streamingContent }}
            <span class="inline-block w-1 h-4 bg-gray-400 animate-pulse"></span>
          </p>
        </div>
      </div>
    </div>

    <!-- Input area -->
    <div class="p-4 border-t border-gray-200">
      <div class="flex items-center gap-2">
        <input
          v-model="inputText"
          @keydown.enter="sendMessage"
          type="text"
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          placeholder="输入问题或需求..."
          :disabled="aiStore.isStreaming"
        />
        <button
          @click="sendMessage"
          :disabled="!inputText.trim() || aiStore.isStreaming"
          class="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
      <div class="mt-2 flex items-center justify-between text-xs text-gray-500">
        <span>今日剩余使用次数: {{ aiStore.remainingUsage }}</span>
        <button @click="resetChat" class="hover:text-gray-700">清空对话</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { useAiStore } from '@/stores/ai'
import { useResumeStore } from '@/stores/resume'
import { h } from 'vue'

const editorStore = useEditorStore()
const aiStore = useAiStore()
const resumeStore = useResumeStore()

const inputText = ref('')
const chatContainer = ref<HTMLElement | null>(null)

// 快捷操作
const quickActions = [
  {
    id: 'polish',
    label: '内容润色',
    icon: {
      render() {
        return h('svg', { class: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' })
        ])
      }
    },
  },
  {
    id: 'score',
    label: '简历评分',
    icon: {
      render() {
        return h('svg', { class: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' })
        ])
      }
    },
  },
  {
    id: 'match',
    label: '职位匹配',
    icon: {
      render() {
        return h('svg', { class: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' })
        ])
      }
    },
  },
  {
    id: 'generate',
    label: '生成内容',
    icon: {
      render() {
        return h('svg', { class: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 10V3L4 14h7v7l9-11h-7z' })
        ])
      }
    },
  },
]

// 发送消息
async function sendMessage() {
  const text = inputText.value.trim()
  if (!text || aiStore.isStreaming) return

  aiStore.sendMessage(text, 'user')
  inputText.value = ''

  // 模拟AI响应
  aiStore.isStreaming = true
  aiStore.streamingContent = ''

  await new Promise(resolve => setTimeout(resolve, 1000))

  aiStore.sendMessage('感谢您的提问！这是一个演示响应。在实际应用中，这里会调用AI服务来提供智能建议。', 'assistant')
  aiStore.isStreaming = false
  aiStore.streamingContent = ''

  await nextTick()
  scrollToBottom()
}

// 执行快捷操作
async function executeAction(action: typeof quickActions[0]) {
  if (!resumeStore.resumeId) return

  switch (action.id) {
    case 'polish':
      aiStore.sendMessage('请帮我润色工作经历中的描述', 'user')
      break
    case 'score':
      await aiStore.scoreResume(resumeStore.resumeId)
      break
    case 'match':
      aiStore.sendMessage('请帮我分析简历与职位的匹配度', 'user')
      break
    case 'generate':
      aiStore.sendMessage('请帮我生成自我评价', 'user')
      break
  }

  await nextTick()
  scrollToBottom()
}

// 重置对话
function resetChat() {
  aiStore.resetChat()
}

// 滚动到底部
function scrollToBottom() {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

// 监听消息变化
watch(() => aiStore.messages.length, () => {
  nextTick(() => scrollToBottom())
})
</script>
