<template>
  <div class="bg-white min-h-full">
    <!-- Header -->
    <div class="relative p-8 text-white overflow-hidden" :style="{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor})` }">
      <!-- Decorative elements -->
      <div class="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5"></div>
      <div class="absolute bottom-0 -left-10 w-32 h-32 rounded-full bg-white/5"></div>
      <div class="absolute top-1/4 right-1/3 w-12 h-12 rounded-full bg-white/10"></div>
      <div class="absolute bottom-1/3 left-1/4 w-8 h-8 rounded-full bg-white/15"></div>

      <div class="relative z-10 flex items-center gap-6">
        <div class="w-28 h-28 rounded-3xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-4xl font-bold shadow-xl">
          {{ (content.personal.name || '姓')[0] }}{{ (content.personal.name || '名')[1] || '' }}
        </div>
        <div>
          <h1 class="text-3xl font-bold tracking-tight">{{ content.personal.name || '您的姓名' }}</h1>
          <p class="text-white/75 text-lg mt-1.5">{{ content.personal.title || '求职意向' }}</p>
          <div class="flex gap-5 mt-3 text-sm text-white/65">
            <span v-if="content.personal.phone" class="flex items-center gap-1.5">
              📞 {{ content.personal.phone }}
            </span>
            <span v-if="content.personal.email" class="flex items-center gap-1.5">
              ✉️ {{ content.personal.email }}
            </span>
            <span v-if="content.personal.location" class="flex items-center gap-1.5">
              📍 {{ content.personal.location }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="p-8 space-y-8">
      <!-- Education -->
      <div v-if="content.education?.length">
        <h2 class="text-base font-bold mb-4 flex items-center gap-2.5">
          <span class="w-9 h-9 rounded-xl flex items-center justify-center text-lg" :style="{ backgroundColor: config.primaryColor + '12', color: config.primaryColor }">📚</span>
          教育背景
        </h2>
        <div class="space-y-4 ml-2">
          <div v-for="edu in content.education" :key="edu.id" class="relative pl-6">
            <div class="absolute left-0 top-2.5 w-2 h-2 rounded-full" :style="{ backgroundColor: config.primaryColor }"></div>
            <div class="flex justify-between items-baseline">
              <span class="font-bold text-gray-900">{{ edu.school }}</span>
              <span class="text-xs text-gray-400">{{ edu.period.start }} - {{ edu.period.end }}</span>
            </div>
            <p class="text-gray-600 text-sm mt-0.5">{{ edu.major }} · {{ edu.degree }}</p>
          </div>
        </div>
      </div>

      <!-- Experience -->
      <div v-if="content.experience?.length">
        <h2 class="text-base font-bold mb-4 flex items-center gap-2.5">
          <span class="w-9 h-9 rounded-xl flex items-center justify-center text-lg" :style="{ backgroundColor: config.primaryColor + '12', color: config.primaryColor }">💼</span>
          工作经历
        </h2>
        <div class="space-y-4 ml-2">
          <div v-for="exp in content.experience" :key="exp.id" class="p-4 rounded-xl transition-all hover:shadow-md" :style="{ backgroundColor: config.primaryColor + '05' }">
            <div class="flex justify-between items-baseline">
              <span class="font-bold text-gray-900">{{ exp.company }}</span>
              <span class="text-xs text-gray-400">{{ exp.period.start }} - {{ exp.period.end }}</span>
            </div>
            <p class="text-sm font-medium mt-0.5" :style="{ color: config.primaryColor }">{{ exp.position }}</p>
            <p v-if="exp.description" class="text-sm text-gray-600 mt-2 leading-relaxed">{{ exp.description }}</p>
            <ul v-if="exp.highlights?.length" class="mt-2.5 space-y-1.5">
              <li v-for="(h, i) in exp.highlights" :key="i" class="text-sm text-gray-600">
                ✨ {{ h }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Projects -->
      <div v-if="content.projects?.length">
        <h2 class="text-base font-bold mb-4 flex items-center gap-2.5">
          <span class="w-9 h-9 rounded-xl flex items-center justify-center text-lg" :style="{ backgroundColor: config.primaryColor + '12', color: config.primaryColor }">🚀</span>
          项目经历
        </h2>
        <div class="space-y-4 ml-2">
          <div v-for="proj in content.projects" :key="proj.id" class="p-4 rounded-xl transition-all hover:shadow-md" :style="{ backgroundColor: config.primaryColor + '05' }">
            <div class="flex justify-between items-baseline">
              <span class="font-bold text-gray-900">{{ proj.name }}</span>
              <span class="text-xs text-gray-400">{{ proj.period.start }} - {{ proj.period.end }}</span>
            </div>
            <p class="text-sm font-medium mt-0.5" :style="{ color: config.primaryColor }">{{ proj.role }}</p>
            <p v-if="proj.description" class="text-sm text-gray-600 mt-2 leading-relaxed">{{ proj.description }}</p>
          </div>
        </div>
      </div>

      <!-- Skills -->
      <div v-if="content.skills?.length">
        <h2 class="text-base font-bold mb-4 flex items-center gap-2.5">
          <span class="w-9 h-9 rounded-xl flex items-center justify-center text-lg" :style="{ backgroundColor: config.primaryColor + '12', color: config.primaryColor }">⚡</span>
          专业技能
        </h2>
        <div class="flex flex-wrap gap-2.5 ml-2">
          <span v-for="skill in content.skills" :key="skill.id"
                class="px-4 py-2 rounded-xl text-sm font-medium text-white shadow-sm"
                :style="{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor})` }">
            {{ skill.name }}
          </span>
        </div>
      </div>

      <!-- Summary -->
      <div v-if="content.summary">
        <h2 class="text-base font-bold mb-4 flex items-center gap-2.5">
          <span class="w-9 h-9 rounded-xl flex items-center justify-center text-lg" :style="{ backgroundColor: config.primaryColor + '12', color: config.primaryColor }">👤</span>
          自我评价
        </h2>
        <p class="text-gray-600 text-sm leading-relaxed ml-2">{{ content.summary }}</p>
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
