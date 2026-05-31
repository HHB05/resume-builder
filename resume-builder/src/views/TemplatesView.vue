<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">模板中心</h1>
        <p class="mt-1 text-sm text-gray-600">选择适合您行业的专业模板</p>
      </div>

      <!-- Filters -->
      <div class="mb-6 flex flex-wrap gap-4">
        <select
          v-model="selectedCategory"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">全部行业</option>
          <option value="tech">互联网/IT</option>
          <option value="finance">金融</option>
          <option value="education">教育</option>
          <option value="design">设计</option>
          <option value="medical">医疗</option>
          <option value="general">通用</option>
        </select>

        <select
          v-model="selectedStyle"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">全部风格</option>
          <option value="minimal">简约</option>
          <option value="business">商务</option>
          <option value="creative">创意</option>
          <option value="classic">经典</option>
        </select>

        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索模板..."
          class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      <!-- Templates grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <TemplateCard
          v-for="template in filteredTemplates"
          :key="template.id"
          :template="template"
          @select="selectTemplate"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { AppHeader } from '@/components/layout'
import { TemplateCard } from '@/components/template'
import type { Template } from '@/types'

const router = useRouter()

const selectedCategory = ref('')
const selectedStyle = ref('')
const searchQuery = ref('')

// 模拟模板数据
const templates = ref<Template[]>([
  {
    id: 'minimal',
    name: '简约风格',
    category: 'general',
    style: 'minimal',
    thumbnailUrl: '',
    previewUrls: [],
    config: {
      primaryColor: '#2563eb',
      secondaryColor: '#1e40af',
      fontFamily: { heading: 'Inter', body: 'Inter' },
      fontSize: { title: 24, heading: 18, subheading: 14, body: 12, small: 10 },
      spacing: { sectionGap: 16, itemGap: 8, lineHeight: 1.5, padding: 20 },
      layout: 'single-column',
      headerStyle: 'left',
      sectionTitleStyle: 'underline',
    },
    isPremium: false,
    downloadCount: 1234,
    rating: 4.8,
    ratingCount: 156,
    authorId: null,
    status: 1,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'business',
    name: '商务专业',
    category: 'finance',
    style: 'business',
    thumbnailUrl: '',
    previewUrls: [],
    config: {
      primaryColor: '#1f2937',
      secondaryColor: '#374151',
      fontFamily: { heading: 'Noto Sans SC', body: 'Noto Sans SC' },
      fontSize: { title: 22, heading: 16, subheading: 14, body: 12, small: 10 },
      spacing: { sectionGap: 14, itemGap: 6, lineHeight: 1.5, padding: 20 },
      layout: 'single-column',
      headerStyle: 'center',
      sectionTitleStyle: 'background',
    },
    isPremium: false,
    downloadCount: 987,
    rating: 4.6,
    ratingCount: 98,
    authorId: null,
    status: 1,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'creative',
    name: '创意设计',
    category: 'design',
    style: 'creative',
    thumbnailUrl: '',
    previewUrls: [],
    config: {
      primaryColor: '#9333ea',
      secondaryColor: '#7e22ce',
      fontFamily: { heading: 'Inter', body: 'Inter' },
      fontSize: { title: 24, heading: 18, subheading: 14, body: 12, small: 10 },
      spacing: { sectionGap: 16, itemGap: 8, lineHeight: 1.5, padding: 20 },
      layout: 'two-column',
      headerStyle: 'left',
      sectionTitleStyle: 'border-left',
    },
    isPremium: true,
    downloadCount: 654,
    rating: 4.9,
    ratingCount: 76,
    authorId: null,
    status: 1,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'tech',
    name: '技术岗位',
    category: 'tech',
    style: 'minimal',
    thumbnailUrl: '',
    previewUrls: [],
    config: {
      primaryColor: '#059669',
      secondaryColor: '#047857',
      fontFamily: { heading: 'Inter', body: 'Inter' },
      fontSize: { title: 24, heading: 18, subheading: 14, body: 12, small: 10 },
      spacing: { sectionGap: 16, itemGap: 8, lineHeight: 1.5, padding: 20 },
      layout: 'single-column',
      headerStyle: 'left',
      sectionTitleStyle: 'border-left',
    },
    isPremium: false,
    downloadCount: 1567,
    rating: 4.7,
    ratingCount: 203,
    authorId: null,
    status: 1,
    createdAt: '',
    updatedAt: '',
  },
])

const filteredTemplates = computed(() => {
  let result = templates.value

  if (selectedCategory.value) {
    result = result.filter(t => t.category === selectedCategory.value)
  }

  if (selectedStyle.value) {
    result = result.filter(t => t.style === selectedStyle.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(t => t.name.toLowerCase().includes(query))
  }

  return result
})

function selectTemplate(template: Template) {
  // 跳转到编辑器，使用选中的模板
  router.push({ path: '/editor', query: { template: template.id } })
}
</script>
