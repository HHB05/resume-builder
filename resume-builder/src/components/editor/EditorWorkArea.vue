<template>
  <div class="flex-1 overflow-y-auto bg-gray-50">
    <div class="max-w-3xl mx-auto py-6 px-4">
      <!-- Personal Info Form -->
      <PersonalInfoForm
        v-if="editorStore.activeModule === 'personal'"
      />

      <!-- Education Form -->
      <EducationForm
        v-else-if="editorStore.activeModule === 'education'"
      />

      <!-- Experience Form -->
      <ExperienceForm
        v-else-if="editorStore.activeModule === 'experience'"
      />

      <!-- Projects Form -->
      <ProjectForm
        v-else-if="editorStore.activeModule === 'projects'"
      />

      <!-- Skills Form -->
      <SkillsForm
        v-else-if="editorStore.activeModule === 'skills'"
      />

      <!-- Summary Form -->
      <SummaryForm
        v-else-if="editorStore.activeModule === 'summary'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '@/stores/editor'
import PersonalInfoForm from './PersonalInfoForm.vue'
import EducationForm from './EducationForm.vue'
import ExperienceForm from './ExperienceForm.vue'
import ProjectForm from './ProjectForm.vue'
import SkillsForm from './SkillsForm.vue'
import SummaryForm from './SummaryForm.vue'

const editorStore = useEditorStore()
</script>
