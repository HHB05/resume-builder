<template>
  <div class="bg-white p-8" :style="{ fontFamily: config.fontFamily?.body || 'Noto Sans SC, sans-serif' }">
    <!-- Header - 根据headerStyle显示不同样式 -->
    <div v-if="config.headerStyle === 'center'" class="text-center mb-6 pb-4" :style="{ borderBottom: `3px solid ${config.primaryColor}` }">
      <h1 class="text-3xl font-bold" :style="{ color: config.primaryColor, fontFamily: config.fontFamily?.heading }">
        {{ content.personal?.name || '您的姓名' }}
      </h1>
      <p class="text-lg text-gray-600 mt-1">{{ content.personal?.title || '求职意向' }}</p>
      <div class="flex justify-center gap-4 mt-3 text-sm text-gray-500">
        <span v-if="content.personal?.phone">📱 {{ content.personal.phone }}</span>
        <span v-if="content.personal?.email">✉️ {{ content.personal.email }}</span>
        <span v-if="content.personal?.location">📍 {{ content.personal.location }}</span>
      </div>
    </div>

    <div v-else class="mb-6 pb-4" :style="{ borderBottom: `3px solid ${config.primaryColor}` }">
      <h1 class="text-3xl font-bold" :style="{ color: config.primaryColor, fontFamily: config.fontFamily?.heading }">
        {{ content.personal?.name || '您的姓名' }}
      </h1>
      <p class="text-lg text-gray-600 mt-1">{{ content.personal?.title || '求职意向' }}</p>
      <div class="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
        <span v-if="content.personal?.phone">📱 {{ content.personal.phone }}</span>
        <span v-if="content.personal?.email">✉️ {{ content.personal.email }}</span>
        <span v-if="content.personal?.location">📍 {{ content.personal.location }}</span>
      </div>
    </div>

    <!-- Education -->
    <div v-if="content.education?.length" class="mb-6">
      <h2 class="text-lg font-bold mb-3 pb-2" :style="getTitleStyle('教育背景')">教育背景</h2>
      <div v-for="edu in content.education" :key="edu.id" class="mb-3 last:mb-0">
        <div class="flex justify-between items-baseline">
          <span class="font-semibold">{{ edu.school }}</span>
          <span class="text-sm text-gray-500">{{ edu.period?.start }} - {{ edu.period?.end }}</span>
        </div>
        <p class="text-gray-600 text-sm">{{ edu.major }} · {{ edu.degree }}</p>
        <p v-if="edu.gpa" class="text-sm mt-1" :style="{ color: config.primaryColor }">GPA: {{ edu.gpa }}</p>
      </div>
    </div>

    <!-- Experience -->
    <div v-if="content.experience?.length" class="mb-6">
      <h2 class="text-lg font-bold mb-3 pb-2" :style="getTitleStyle('工作经历')">工作经历</h2>
      <div v-for="exp in content.experience" :key="exp.id" class="mb-4 last:mb-0">
        <div class="flex justify-between items-baseline">
          <span class="font-semibold">{{ exp.company }}</span>
          <span class="text-sm text-gray-500">{{ exp.period?.start }} - {{ exp.period?.end }}</span>
        </div>
        <p class="text-sm" :style="{ color: config.primaryColor }">{{ exp.position }}</p>
        <p v-if="exp.description" class="text-sm text-gray-600 mt-1">{{ exp.description }}</p>
        <ul v-if="exp.highlights?.length" class="mt-2 space-y-1">
          <li v-for="(h, i) in exp.highlights" :key="i" class="text-sm text-gray-600">• {{ h }}</li>
        </ul>
      </div>
    </div>

    <!-- Projects -->
    <div v-if="content.projects?.length" class="mb-6">
      <h2 class="text-lg font-bold mb-3 pb-2" :style="getTitleStyle('项目经历')">项目经历</h2>
      <div v-for="proj in content.projects" :key="proj.id" class="mb-4 last:mb-0">
        <div class="flex justify-between items-baseline">
          <span class="font-semibold">{{ proj.name }}</span>
          <span class="text-sm text-gray-500">{{ proj.period?.start }} - {{ proj.period?.end }}</span>
        </div>
        <p class="text-sm" :style="{ color: config.primaryColor }">{{ proj.role }}</p>
        <p v-if="proj.description" class="text-sm text-gray-600 mt-1">{{ proj.description }}</p>
      </div>
    </div>

    <!-- Skills -->
    <div v-if="content.skills?.length" class="mb-6">
      <h2 class="text-lg font-bold mb-3 pb-2" :style="getTitleStyle('专业技能')">专业技能</h2>
      <div class="flex flex-wrap gap-2">
        <span v-for="skill in content.skills" :key="skill.id"
          class="px-3 py-1 rounded-full text-sm"
          :style="{ backgroundColor: config.primaryColor + '15', color: config.primaryColor }">
          {{ skill.name }}
        </span>
      </div>
    </div>

    <!-- Summary -->
    <div v-if="content.summary">
      <h2 class="text-lg font-bold mb-3 pb-2" :style="getTitleStyle('自我评价')">自我评价</h2>
      <p class="text-sm text-gray-600 leading-relaxed">{{ content.summary }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  content: any
  config: any
}>()

// 根据sectionTitleStyle返回不同的标题样式
function getTitleStyle(title: string) {
  const baseStyle: any = {
    color: props.config.primaryColor,
  }

  switch (props.config.sectionTitleStyle) {
    case 'underline':
      baseStyle.borderBottom = `2px solid ${props.config.primaryColor}`
      break
    case 'border-bottom':
      baseStyle.borderBottom = `1px solid ${props.config.primaryColor}40`
      break
    case 'background':
      baseStyle.backgroundColor = props.config.primaryColor + '10'
      baseStyle.padding = '8px 12px'
      baseStyle.borderRadius = '4px'
      baseStyle.borderBottom = 'none'
      break
    case 'border-left':
      baseStyle.borderLeft = `3px solid ${props.config.primaryColor}`
      baseStyle.paddingLeft = '12px'
      baseStyle.borderBottom = 'none'
      break
    default:
      baseStyle.borderBottom = `2px solid ${props.config.primaryColor}`
  }

  return baseStyle
}
</script>
