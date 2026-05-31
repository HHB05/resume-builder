import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Resume, ResumeContent, PersonalInfo, EducationEntry, ExperienceEntry, ProjectEntry, SkillEntry } from '@/types'
import { resumeService } from '@/services/resume.service'

// 默认简历内容
const defaultResumeContent: ResumeContent = {
  personal: {
    name: '',
    phone: '',
    email: '',
    location: '',
    title: '',
    website: '',
    github: '',
    linkedin: '',
  },
  education: [],
  experience: [],
  projects: [],
  skills: [],
  summary: '',
}

export const useResumeStore = defineStore('resume', () => {
  // 状态
  const currentResume = ref<Resume | null>(null)
  const isDirty = ref(false)
  const lastSavedAt = ref<number | null>(null)
  const isSaving = ref(false)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 计算属性
  const resumeId = computed(() => currentResume.value?.id || null)
  const resumeTitle = computed(() => currentResume.value?.title || '未命名简历')
  const templateId = computed(() => currentResume.value?.templateId || 'minimal')
  const resumeContent = computed(() => currentResume.value?.content || defaultResumeContent)
  const language = computed(() => currentResume.value?.language || 'zh')
  const version = computed(() => currentResume.value?.version || 1)
  const score = computed(() => currentResume.value?.score || null)
  const isFavorite = computed(() => currentResume.value?.isFavorite || false)
  const status = computed(() => currentResume.value?.status || 'draft')

  // 字数统计
  const wordCount = computed(() => {
    const content = resumeContent.value
    let count = 0

    // 个人信息
    if (content.personal.name) count += content.personal.name.length
    if (content.personal.title) count += content.personal.title.length

    // 教育经历
    content.education.forEach((edu) => {
      count += edu.school.length
      count += edu.degree.length
      count += edu.major.length
      if (edu.description) count += edu.description.length
    })

    // 工作经验
    content.experience.forEach((exp) => {
      count += exp.company.length
      count += exp.position.length
      count += exp.description.length
      exp.highlights.forEach((h) => (count += h.length))
    })

    // 项目经历
    content.projects.forEach((proj) => {
      count += proj.name.length
      count += proj.role.length
      count += proj.description.length
      proj.highlights.forEach((h) => (count += h.length))
    })

    // 技能
    content.skills.forEach((skill) => {
      count += skill.name.length
    })

    // 自我评价
    count += content.summary.length

    return count
  })

  // 是否有未保存的更改
  const hasUnsavedChanges = computed(() => isDirty.value)

  // 加载简历
  async function loadResume(id: string): Promise<boolean> {
    loading.value = true
    error.value = null

    try {
      const resume = await resumeService.getResume(id)
      currentResume.value = resume
      isDirty.value = false
      return true
    } catch (e: any) {
      error.value = e.message || '加载简历失败'
      return false
    } finally {
      loading.value = false
    }
  }

  // 创建新简历
  async function createResume(title: string, templateId: string): Promise<Resume | null> {
    loading.value = true
    error.value = null

    try {
      const resume = await resumeService.createResume({
        title,
        templateId,
        content: defaultResumeContent,
      })
      currentResume.value = resume
      isDirty.value = false
      return resume
    } catch (e: any) {
      error.value = e.message || '创建简历失败'
      return null
    } finally {
      loading.value = false
    }
  }

  // 保存简历
  async function saveResume(): Promise<boolean> {
    if (!currentResume.value || !isDirty.value) return true

    isSaving.value = true
    error.value = null

    try {
      const updated = await resumeService.updateResume(currentResume.value.id, {
        title: currentResume.value.title,
        templateId: currentResume.value.templateId,
        content: currentResume.value.content,
        status: currentResume.value.status,
      })
      currentResume.value = updated
      isDirty.value = false
      lastSavedAt.value = Date.now()
      return true
    } catch (e: any) {
      error.value = e.message || '保存失败'
      return false
    } finally {
      isSaving.value = false
    }
  }

  // 更新简历内容
  function updateContent(section: keyof ResumeContent, data: any) {
    if (!currentResume.value) return

    const content = { ...currentResume.value.content }
    ;(content as any)[section] = data
    currentResume.value.content = content
    isDirty.value = true
  }

  // 更新个人信息
  function updatePersonalInfo(data: Partial<PersonalInfo>) {
    if (!currentResume.value) return

    const content = { ...currentResume.value.content }
    content.personal = { ...content.personal, ...data }
    currentResume.value.content = content
    isDirty.value = true
  }

  // 添加教育经历
  function addEducation(edu: Omit<EducationEntry, 'id'>) {
    if (!currentResume.value) return

    const newEdu: EducationEntry = {
      ...edu,
      id: `edu-${Date.now()}`,
    }
    const content = { ...currentResume.value.content }
    content.education = [...content.education, newEdu]
    currentResume.value.content = content
    isDirty.value = true
  }

  // 更新教育经历
  function updateEducation(id: string, data: Partial<EducationEntry>) {
    if (!currentResume.value) return

    const content = { ...currentResume.value.content }
    content.education = content.education.map((edu) =>
      edu.id === id ? { ...edu, ...data } : edu
    )
    currentResume.value.content = content
    isDirty.value = true
  }

  // 删除教育经历
  function removeEducation(id: string) {
    if (!currentResume.value) return

    const content = { ...currentResume.value.content }
    content.education = content.education.filter((edu) => edu.id !== id)
    currentResume.value.content = content
    isDirty.value = true
  }

  // 添加工作经验
  function addExperience(exp: Omit<ExperienceEntry, 'id'>) {
    if (!currentResume.value) return

    const newExp: ExperienceEntry = {
      ...exp,
      id: `exp-${Date.now()}`,
    }
    const content = { ...currentResume.value.content }
    content.experience = [...content.experience, newExp]
    currentResume.value.content = content
    isDirty.value = true
  }

  // 更新工作经验
  function updateExperience(id: string, data: Partial<ExperienceEntry>) {
    if (!currentResume.value) return

    const content = { ...currentResume.value.content }
    content.experience = content.experience.map((exp) =>
      exp.id === id ? { ...exp, ...data } : exp
    )
    currentResume.value.content = content
    isDirty.value = true
  }

  // 删除工作经验
  function removeExperience(id: string) {
    if (!currentResume.value) return

    const content = { ...currentResume.value.content }
    content.experience = content.experience.filter((exp) => exp.id !== id)
    currentResume.value.content = content
    isDirty.value = true
  }

  // 添加项目经历
  function addProject(proj: Omit<ProjectEntry, 'id'>) {
    if (!currentResume.value) return

    const newProj: ProjectEntry = {
      ...proj,
      id: `proj-${Date.now()}`,
    }
    const content = { ...currentResume.value.content }
    content.projects = [...content.projects, newProj]
    currentResume.value.content = content
    isDirty.value = true
  }

  // 更新项目经历
  function updateProject(id: string, data: Partial<ProjectEntry>) {
    if (!currentResume.value) return

    const content = { ...currentResume.value.content }
    content.projects = content.projects.map((proj) =>
      proj.id === id ? { ...proj, ...data } : proj
    )
    currentResume.value.content = content
    isDirty.value = true
  }

  // 删除项目经历
  function removeProject(id: string) {
    if (!currentResume.value) return

    const content = { ...currentResume.value.content }
    content.projects = content.projects.filter((proj) => proj.id !== id)
    currentResume.value.content = content
    isDirty.value = true
  }

  // 添加技能
  function addSkill(skill: Omit<SkillEntry, 'id'>) {
    if (!currentResume.value) return

    const newSkill: SkillEntry = {
      ...skill,
      id: `skill-${Date.now()}`,
    }
    const content = { ...currentResume.value.content }
    content.skills = [...content.skills, newSkill]
    currentResume.value.content = content
    isDirty.value = true
  }

  // 更新技能
  function updateSkill(id: string, data: Partial<SkillEntry>) {
    if (!currentResume.value) return

    const content = { ...currentResume.value.content }
    content.skills = content.skills.map((skill) =>
      skill.id === id ? { ...skill, ...data } : skill
    )
    currentResume.value.content = content
    isDirty.value = true
  }

  // 删除技能
  function removeSkill(id: string) {
    if (!currentResume.value) return

    const content = { ...currentResume.value.content }
    content.skills = content.skills.filter((skill) => skill.id !== id)
    currentResume.value.content = content
    isDirty.value = true
  }

  // 更新自我评价
  function updateSummary(summary: string) {
    if (!currentResume.value) return

    const content = { ...currentResume.value.content }
    content.summary = summary
    currentResume.value.content = content
    isDirty.value = true
  }

  // 更新模板
  function updateTemplate(newTemplateId: string) {
    if (!currentResume.value) return

    currentResume.value.templateId = newTemplateId
    isDirty.value = true
  }

  // 更新标题
  function updateTitle(title: string) {
    if (!currentResume.value) return

    currentResume.value.title = title
    isDirty.value = true
  }

  // 设置语言
  function setLanguage(lang: 'zh' | 'en' | 'ja') {
    if (!currentResume.value) return

    currentResume.value.language = lang
    isDirty.value = true
  }

  // 切换收藏状态
  async function toggleFavorite(): Promise<void> {
    if (!currentResume.value) return

    try {
      await resumeService.toggleFavorite(currentResume.value.id)
      currentResume.value.isFavorite = !currentResume.value.isFavorite
    } catch (e: any) {
      error.value = e.message || '切换收藏状态失败'
    }
  }

  // 复制简历
  async function duplicateResume(): Promise<Resume | null> {
    if (!currentResume.value) return null

    try {
      const newResume = await resumeService.duplicateResume(currentResume.value.id)
      return newResume
    } catch (e: any) {
      error.value = e.message || '复制简历失败'
      return null
    }
  }

  // 删除简历
  async function deleteResume(): Promise<boolean> {
    if (!currentResume.value) return false

    try {
      await resumeService.deleteResume(currentResume.value.id)
      currentResume.value = null
      isDirty.value = false
      return true
    } catch (e: any) {
      error.value = e.message || '删除简历失败'
      return false
    }
  }

  // 重置简历
  function resetResume() {
    currentResume.value = null
    isDirty.value = false
    lastSavedAt.value = null
    error.value = null
  }

  return {
    // 状态
    currentResume,
    isDirty,
    lastSavedAt,
    isSaving,
    loading,
    error,

    // 计算属性
    resumeId,
    resumeTitle,
    templateId,
    resumeContent,
    language,
    version,
    score,
    isFavorite,
    status,
    wordCount,
    hasUnsavedChanges,

    // 方法
    loadResume,
    createResume,
    saveResume,
    updateContent,
    updatePersonalInfo,
    addEducation,
    updateEducation,
    removeEducation,
    addExperience,
    updateExperience,
    removeExperience,
    addProject,
    updateProject,
    removeProject,
    addSkill,
    updateSkill,
    removeSkill,
    updateSummary,
    updateTemplate,
    updateTitle,
    setLanguage,
    toggleFavorite,
    duplicateResume,
    deleteResume,
    resetResume,
  }
})
