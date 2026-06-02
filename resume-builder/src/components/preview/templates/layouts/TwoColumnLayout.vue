<template>
  <div class="bg-white min-h-full flex" :style="{ fontFamily: config.fontFamily?.body || 'Noto Sans SC, sans-serif' }">
    <!-- Left Column - 带背景色 -->
    <div class="w-1/3 p-6" :style="{ backgroundColor: config.primaryColor + '08' }">
      <!-- 头像占位 -->
      <div class="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-white"
           :style="{ backgroundColor: config.primaryColor }">
        {{ (content.personal?.name || '姓')[0] }}
      </div>

      <h1 class="text-xl font-bold text-center" :style="{ color: config.primaryColor, fontFamily: config.fontFamily?.heading }">
        {{ content.personal?.name || '您的姓名' }}
      </h1>
      <p class="text-sm text-gray-600 text-center mt-1">{{ content.personal?.title || '求职意向' }}</p>

      <!-- Contact -->
      <div class="mt-6">
        <h3 class="text-xs font-bold uppercase tracking-wider mb-3 pb-1" :style="{ color: config.primaryColor, borderBottom: `1px solid ${config.primaryColor}30` }">联系方式</h3>
        <div class="space-y-2 text-sm text-gray-600">
          <p v-if="content.personal?.phone">📱 {{ content.personal.phone }}</p>
          <p v-if="content.personal?.email">✉️ {{ content.personal.email }}</p>
          <p v-if="content.personal?.location">📍 {{ content.personal.location }}</p>
        </div>
      </div>

      <!-- Skills -->
      <div v-if="content.skills?.length" class="mt-6">
        <h3 class="text-xs font-bold uppercase tracking-wider mb-3 pb-1" :style="{ color: config.primaryColor, borderBottom: `1px solid ${config.primaryColor}30` }">专业技能</h3>
        <div class="space-y-2">
          <div v-for="skill in content.skills" :key="skill.id" class="text-sm text-gray-600">
            <span class="font-medium" :style="{ color: config.primaryColor }">•</span> {{ skill.name }}
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div v-if="content.summary" class="mt-6">
        <h3 class="text-xs font-bold uppercase tracking-wider mb-3 pb-1" :style="{ color: config.primaryColor, borderBottom: `1px solid ${config.primaryColor}30` }">自我评价</h3>
        <p class="text-sm text-gray-600 leading-relaxed">{{ content.summary }}</p>
      </div>
    </div>

    <!-- Right Column -->
    <div class="w-2/3 p-6">
      <!-- Education -->
      <div v-if="content.education?.length" class="mb-6">
        <h2 class="text-lg font-bold mb-3 pb-2" :style="{ color: config.primaryColor, borderBottom: `2px solid ${config.primaryColor}30`, fontFamily: config.fontFamily?.heading }">教育背景</h2>
        <div v-for="edu in content.education" :key="edu.id" class="mb-3 last:mb-0">
          <div class="flex justify-between items-baseline">
            <span class="font-semibold">{{ edu.school }}</span>
            <span class="text-sm text-gray-500">{{ edu.period?.start }} - {{ edu.period?.end }}</span>
          </div>
          <p class="text-gray-600 text-sm">{{ edu.major }} · {{ edu.degree }}</p>
        </div>
      </div>

      <!-- Experience -->
      <div v-if="content.experience?.length" class="mb-6">
        <h2 class="text-lg font-bold mb-3 pb-2" :style="{ color: config.primaryColor, borderBottom: `2px solid ${config.primaryColor}30`, fontFamily: config.fontFamily?.heading }">工作经历</h2>
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
      <div v-if="content.projects?.length">
        <h2 class="text-lg font-bold mb-3 pb-2" :style="{ color: config.primaryColor, borderBottom: `2px solid ${config.primaryColor}30`, fontFamily: config.fontFamily?.heading }">项目经历</h2>
        <div v-for="proj in content.projects" :key="proj.id" class="mb-4 last:mb-0">
          <div class="flex justify-between items-baseline">
            <span class="font-semibold">{{ proj.name }}</span>
            <span class="text-sm text-gray-500">{{ proj.period?.start }} - {{ proj.period?.end }}</span>
          </div>
          <p class="text-sm" :style="{ color: config.primaryColor }">{{ proj.role }}</p>
          <p v-if="proj.description" class="text-sm text-gray-600 mt-1">{{ proj.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  content: any
  config: any
}>()
</script>
