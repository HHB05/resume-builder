<template>
  <div class="bg-white min-h-full" style="font-family: 'Inter', sans-serif">
    <!-- Header with gradient accent -->
    <div class="relative overflow-hidden">
      <div class="absolute inset-0" :style="{ background: `linear-gradient(135deg, ${config.primaryColor}08 0%, ${config.primaryColor}15 100%)` }"></div>
      <div class="relative p-8 pb-6">
        <div class="flex justify-between items-start">
          <div>
            <h1 class="text-4xl font-bold tracking-tight" :style="{ color: config.primaryColor }">
              {{ content.personal.name || '您的姓名' }}
            </h1>
            <p class="text-lg text-gray-500 mt-2 font-light tracking-wide">{{ content.personal.title || '求职意向' }}</p>
          </div>
          <div class="text-right text-sm text-gray-500 space-y-1.5">
            <p v-if="content.personal.phone" class="flex items-center justify-end gap-2">
              <span class="text-gray-400">📞</span> {{ content.personal.phone }}
            </p>
            <p v-if="content.personal.email" class="flex items-center justify-end gap-2">
              <span class="text-gray-400">✉️</span> {{ content.personal.email }}
            </p>
            <p v-if="content.personal.location" class="flex items-center justify-end gap-2">
              <span class="text-gray-400">📍</span> {{ content.personal.location }}
            </p>
          </div>
        </div>
      </div>
      <div class="h-1" :style="{ background: `linear-gradient(90deg, ${config.primaryColor}, ${config.secondaryColor})` }"></div>
    </div>

    <div class="p-8 space-y-8">
      <!-- Education -->
      <section v-if="content.education?.length">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg" :style="{ backgroundColor: config.primaryColor + '12' }">
            📚
          </div>
          <h2 class="text-lg font-bold text-gray-900">教育背景</h2>
        </div>
        <div class="space-y-4 ml-1">
          <div v-for="edu in content.education" :key="edu.id" class="relative pl-6">
            <div class="absolute left-0 top-3 w-2 h-2 rounded-full shadow-sm" :style="{ backgroundColor: config.primaryColor }"></div>
            <div class="flex justify-between items-baseline">
              <span class="font-bold text-gray-900">{{ edu.school }}</span>
              <span class="text-xs text-gray-400 font-medium">{{ edu.period.start }} - {{ edu.period.end }}</span>
            </div>
            <p class="text-gray-600 text-sm mt-0.5">{{ edu.major }} · {{ edu.degree }}</p>
            <p v-if="edu.gpa" class="text-xs mt-1 font-medium" :style="{ color: config.primaryColor }">GPA: {{ edu.gpa }}</p>
          </div>
        </div>
      </section>

      <!-- Experience -->
      <section v-if="content.experience?.length">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg" :style="{ backgroundColor: config.primaryColor + '12' }">
            💼
          </div>
          <h2 class="text-lg font-bold text-gray-900">工作经历</h2>
        </div>
        <div class="space-y-5 ml-1">
          <div v-for="exp in content.experience" :key="exp.id" class="group">
            <div class="flex justify-between items-baseline">
              <span class="font-bold text-gray-900">{{ exp.company }}</span>
              <span class="text-xs text-gray-400 font-medium">{{ exp.period.start }} - {{ exp.period.end }}</span>
            </div>
            <p class="text-sm font-medium mt-0.5" :style="{ color: config.primaryColor }">{{ exp.position }}</p>
            <p v-if="exp.description" class="text-sm text-gray-600 mt-2 leading-relaxed">{{ exp.description }}</p>
            <ul v-if="exp.highlights?.length" class="mt-3 space-y-2">
              <li v-for="(h, i) in exp.highlights" :key="i" class="text-sm text-gray-600 flex items-start gap-2">
                <span class="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" :style="{ backgroundColor: config.primaryColor }"></span>
                <span class="leading-relaxed">{{ h }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Projects -->
      <section v-if="content.projects?.length">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg" :style="{ backgroundColor: config.primaryColor + '12' }">
            🚀
          </div>
          <h2 class="text-lg font-bold text-gray-900">项目经历</h2>
        </div>
        <div class="space-y-5 ml-1">
          <div v-for="proj in content.projects" :key="proj.id">
            <div class="flex justify-between items-baseline">
              <span class="font-bold text-gray-900">{{ proj.name }}</span>
              <span class="text-xs text-gray-400 font-medium">{{ proj.period.start }} - {{ proj.period.end }}</span>
            </div>
            <p class="text-sm font-medium mt-0.5" :style="{ color: config.primaryColor }">{{ proj.role }}</p>
            <p v-if="proj.description" class="text-sm text-gray-600 mt-2 leading-relaxed">{{ proj.description }}</p>
          </div>
        </div>
      </section>

      <!-- Skills -->
      <section v-if="content.skills?.length">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg" :style="{ backgroundColor: config.primaryColor + '12' }">
            ⚡
          </div>
          <h2 class="text-lg font-bold text-gray-900">专业技能</h2>
        </div>
        <div class="flex flex-wrap gap-2 ml-1">
          <span v-for="skill in content.skills" :key="skill.id"
                class="px-4 py-1.5 rounded-full text-sm font-medium"
                :style="{ backgroundColor: config.primaryColor + '10', color: config.primaryColor, border: `1px solid ${config.primaryColor}20` }">
            {{ skill.name }}
          </span>
        </div>
      </section>

      <!-- Summary -->
      <section v-if="content.summary">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg" :style="{ backgroundColor: config.primaryColor + '12' }">
            👤
          </div>
          <h2 class="text-lg font-bold text-gray-900">自我评价</h2>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed ml-1">{{ content.summary }}</p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  content: any
  config: any
}>()
</script>
