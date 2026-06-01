<template>
  <div class="bg-white min-h-full flex">
    <!-- Left Sidebar -->
    <div class="w-1/3 p-6 relative overflow-hidden" :style="{ background: `linear-gradient(180deg, ${config.primaryColor} 0%, ${config.secondaryColor} 100%)` }">
      <!-- Decorative elements -->
      <div class="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5"></div>
      <div class="absolute bottom-20 -left-10 w-40 h-40 rounded-full bg-white/5"></div>
      <div class="absolute top-1/3 -right-5 w-20 h-20 rounded-full bg-white/5"></div>

      <!-- Avatar -->
      <div class="relative z-10 w-28 h-28 rounded-2xl bg-white/15 backdrop-blur mx-auto mb-5 flex items-center justify-center shadow-lg">
        <span class="text-4xl font-bold text-white">{{ (content.personal.name || '姓')[0] }}</span>
      </div>

      <!-- Name -->
      <h1 class="relative z-10 text-2xl font-bold text-white text-center tracking-tight">{{ content.personal.name || '您的姓名' }}</h1>
      <p class="relative z-10 text-white/70 text-center mt-1.5 text-sm">{{ content.personal.title || '求职意向' }}</p>

      <!-- Divider -->
      <div class="relative z-10 my-6 h-px bg-white/20"></div>

      <!-- Contact -->
      <div class="relative z-10 space-y-3">
        <h3 class="text-white/50 text-xs uppercase tracking-widest font-medium">联系方式</h3>
        <div class="space-y-2.5 text-sm text-white/90">
          <p v-if="content.personal.phone" class="flex items-center gap-2.5">
            <span class="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-xs">📞</span>
            <span>{{ content.personal.phone }}</span>
          </p>
          <p v-if="content.personal.email" class="flex items-center gap-2.5">
            <span class="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-xs">✉️</span>
            <span class="truncate">{{ content.personal.email }}</span>
          </p>
          <p v-if="content.personal.location" class="flex items-center gap-2.5">
            <span class="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-xs">📍</span>
            <span>{{ content.personal.location }}</span>
          </p>
        </div>
      </div>

      <!-- Skills -->
      <div v-if="content.skills?.length" class="relative z-10 mt-8">
        <h3 class="text-white/50 text-xs uppercase tracking-widest font-medium mb-4">专业技能</h3>
        <div class="space-y-3">
          <div v-for="skill in content.skills" :key="skill.id">
            <div class="flex justify-between text-sm text-white/90 mb-1.5">
              <span class="font-medium">{{ skill.name }}</span>
              <span class="text-white/50 text-xs">{{ skill.level * 20 }}%</span>
            </div>
            <div class="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div class="h-full bg-white rounded-full transition-all duration-500" :style="{ width: skill.level * 20 + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Content -->
    <div class="w-2/3 p-8">
      <!-- Education -->
      <div v-if="content.education?.length" class="mb-8">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center text-lg" :style="{ backgroundColor: config.primaryColor + '10' }">📚</div>
          <h2 class="text-base font-bold text-gray-900 uppercase tracking-wider">教育背景</h2>
        </div>
        <div class="space-y-4 ml-1">
          <div v-for="edu in content.education" :key="edu.id" class="relative pl-5 border-l-2" :style="{ borderColor: config.primaryColor + '30' }">
            <div class="absolute left-0 top-2.5 w-2.5 h-2.5 rounded-full border-2 border-white" :style="{ backgroundColor: config.primaryColor }"></div>
            <div class="flex justify-between items-baseline">
              <span class="font-bold text-gray-900">{{ edu.school }}</span>
              <span class="text-xs text-gray-400">{{ edu.period.start }} - {{ edu.period.end }}</span>
            </div>
            <p class="text-gray-600 text-sm mt-0.5">{{ edu.major }} · {{ edu.degree }}</p>
          </div>
        </div>
      </div>

      <!-- Experience -->
      <div v-if="content.experience?.length" class="mb-8">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center text-lg" :style="{ backgroundColor: config.primaryColor + '10' }">💼</div>
          <h2 class="text-base font-bold text-gray-900 uppercase tracking-wider">工作经历</h2>
        </div>
        <div class="space-y-5 ml-1">
          <div v-for="exp in content.experience" :key="exp.id" class="relative pl-5 border-l-2" :style="{ borderColor: config.primaryColor + '30' }">
            <div class="absolute left-0 top-2.5 w-2.5 h-2.5 rounded-full border-2 border-white" :style="{ backgroundColor: config.primaryColor }"></div>
            <div class="flex justify-between items-baseline">
              <span class="font-bold text-gray-900">{{ exp.company }}</span>
              <span class="text-xs text-gray-400">{{ exp.period.start }} - {{ exp.period.end }}</span>
            </div>
            <p class="text-sm font-medium mt-0.5" :style="{ color: config.primaryColor }">{{ exp.position }}</p>
            <p v-if="exp.description" class="text-sm text-gray-600 mt-2 leading-relaxed">{{ exp.description }}</p>
            <ul v-if="exp.highlights?.length" class="mt-2 space-y-1.5">
              <li v-for="(h, i) in exp.highlights" :key="i" class="text-sm text-gray-600 flex items-start gap-2">
                <span class="mt-1.5" :style="{ color: config.primaryColor }">▸</span>
                <span>{{ h }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Projects -->
      <div v-if="content.projects?.length" class="mb-8">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center text-lg" :style="{ backgroundColor: config.primaryColor + '10' }">🚀</div>
          <h2 class="text-base font-bold text-gray-900 uppercase tracking-wider">项目经历</h2>
        </div>
        <div class="space-y-5 ml-1">
          <div v-for="proj in content.projects" :key="proj.id" class="relative pl-5 border-l-2" :style="{ borderColor: config.primaryColor + '30' }">
            <div class="absolute left-0 top-2.5 w-2.5 h-2.5 rounded-full border-2 border-white" :style="{ backgroundColor: config.primaryColor }"></div>
            <div class="flex justify-between items-baseline">
              <span class="font-bold text-gray-900">{{ proj.name }}</span>
              <span class="text-xs text-gray-400">{{ proj.period.start }} - {{ proj.period.end }}</span>
            </div>
            <p class="text-sm font-medium mt-0.5" :style="{ color: config.primaryColor }">{{ proj.role }}</p>
            <p v-if="proj.description" class="text-sm text-gray-600 mt-2 leading-relaxed">{{ proj.description }}</p>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div v-if="content.summary">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center text-lg" :style="{ backgroundColor: config.primaryColor + '10' }">👤</div>
          <h2 class="text-base font-bold text-gray-900 uppercase tracking-wider">自我评价</h2>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed ml-1">{{ content.summary }}</p>
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
