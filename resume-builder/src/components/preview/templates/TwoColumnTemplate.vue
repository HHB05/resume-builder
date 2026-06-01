<template>
  <div class="bg-white min-h-full flex">
    <!-- Left Column -->
    <div class="w-2/5 p-6" :style="{ backgroundColor: config.primaryColor + '08' }">
      <!-- Name -->
      <h1 class="text-2xl font-bold mb-1" :style="{ color: config.primaryColor }">
        {{ content.personal.name || '您的姓名' }}
      </h1>
      <p class="text-gray-600 text-sm mb-6">{{ content.personal.title || '求职意向' }}</p>

      <!-- Contact -->
      <div class="mb-6">
        <h3 class="text-xs font-bold uppercase tracking-wider mb-3" :style="{ color: config.primaryColor }">联系方式</h3>
        <div class="space-y-2 text-sm text-gray-600">
          <p v-if="content.personal.phone" class="flex items-center gap-2">
            <span class="w-4 text-center">📱</span> {{ content.personal.phone }}
          </p>
          <p v-if="content.personal.email" class="flex items-center gap-2">
            <span class="w-4 text-center">✉️</span> {{ content.personal.email }}
          </p>
          <p v-if="content.personal.location" class="flex items-center gap-2">
            <span class="w-4 text-center">📍</span> {{ content.personal.location }}
          </p>
          <p v-if="content.personal.website" class="flex items-center gap-2">
            <span class="w-4 text-center">🌐</span> {{ content.personal.website }}
          </p>
          <p v-if="content.personal.github" class="flex items-center gap-2">
            <span class="w-4 text-center">💻</span> {{ content.personal.github }}
          </p>
        </div>
      </div>

      <!-- Skills -->
      <div v-if="content.skills?.length" class="mb-6">
        <h3 class="text-xs font-bold uppercase tracking-wider mb-3" :style="{ color: config.primaryColor }">专业技能</h3>
        <div class="space-y-3">
          <div v-for="skill in content.skills" :key="skill.id">
            <div class="flex justify-between text-sm mb-1">
              <span class="text-gray-700">{{ skill.name }}</span>
            </div>
            <div class="flex gap-1">
              <div v-for="i in 5" :key="i" class="w-4 h-1.5 rounded-sm"
                   :style="{ backgroundColor: i <= skill.level ? config.primaryColor : config.primaryColor + '20' }"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div v-if="content.summary">
        <h3 class="text-xs font-bold uppercase tracking-wider mb-3" :style="{ color: config.primaryColor }">自我评价</h3>
        <p class="text-sm text-gray-600 leading-relaxed">{{ content.summary }}</p>
      </div>
    </div>

    <!-- Right Column -->
    <div class="w-3/5 p-6">
      <!-- Education -->
      <div v-if="content.education?.length" class="mb-6">
        <h2 class="text-sm font-bold uppercase tracking-wider mb-4 pb-2 border-b" :style="{ borderColor: config.primaryColor + '30', color: config.primaryColor }">
          教育背景
        </h2>
        <div v-for="edu in content.education" :key="edu.id" class="mb-3 last:mb-0">
          <div class="flex justify-between items-baseline">
            <span class="font-semibold text-gray-900">{{ edu.school }}</span>
            <span class="text-xs text-gray-500">{{ edu.period.start }} - {{ edu.period.end }}</span>
          </div>
          <p class="text-gray-600 text-sm">{{ edu.major }} · {{ edu.degree }}</p>
        </div>
      </div>

      <!-- Experience -->
      <div v-if="content.experience?.length" class="mb-6">
        <h2 class="text-sm font-bold uppercase tracking-wider mb-4 pb-2 border-b" :style="{ borderColor: config.primaryColor + '30', color: config.primaryColor }">
          工作经历
        </h2>
        <div v-for="exp in content.experience" :key="exp.id" class="mb-4 last:mb-0">
          <div class="flex justify-between items-baseline">
            <span class="font-semibold text-gray-900">{{ exp.company }}</span>
            <span class="text-xs text-gray-500">{{ exp.period.start }} - {{ exp.period.end }}</span>
          </div>
          <p class="text-sm" :style="{ color: config.primaryColor }">{{ exp.position }}</p>
          <p v-if="exp.description" class="text-sm text-gray-600 mt-1">{{ exp.description }}</p>
          <ul v-if="exp.highlights?.length" class="mt-2 space-y-1">
            <li v-for="(h, i) in exp.highlights" :key="i" class="text-sm text-gray-600 flex items-start">
              <span class="text-xs mr-1.5 mt-0.5" :style="{ color: config.primaryColor }">●</span>
              <span>{{ h }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Projects -->
      <div v-if="content.projects?.length">
        <h2 class="text-sm font-bold uppercase tracking-wider mb-4 pb-2 border-b" :style="{ borderColor: config.primaryColor + '30', color: config.primaryColor }">
          项目经历
        </h2>
        <div v-for="proj in content.projects" :key="proj.id" class="mb-4 last:mb-0">
          <div class="flex justify-between items-baseline">
            <span class="font-semibold text-gray-900">{{ proj.name }}</span>
            <span class="text-xs text-gray-500">{{ proj.period.start }} - {{ proj.period.end }}</span>
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
