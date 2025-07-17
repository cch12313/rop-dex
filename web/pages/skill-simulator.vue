<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">Rop-dex</NuxtLink>
          </div>
          <nav class="hidden md:flex space-x-8">
            <NuxtLink to="/" class="text-gray-600 hover:text-gray-900 transition-colors">首頁</NuxtLink>
            <NuxtLink to="/skill-simulator" class="text-blue-600 font-medium">技能模擬器</NuxtLink>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">技能模擬器</h1>
        <p class="text-gray-600">規劃你的角色技能配點方案</p>
      </div>

      <!-- Job Selection -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">職業選擇</h2>
        <JobSelector @job-selected="handleJobSelected" />
      </div>

      <!-- Skill Tree -->
      <div v-if="selectedJob" class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold">{{ selectedJob.name }} 技能樹</h2>
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-600">
              已使用技能點: {{ totalSkillPoints }} / {{ maxSkillPoints }}
            </div>
            <button 
              @click="resetSkills"
              class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              重置
            </button>
          </div>
        </div>
        
        <SkillTree 
          :job="selectedJob" 
          :skill-points="skillPoints"
          @update-skill="updateSkillPoint"
          @skill-selected="handleSkillSelected"
        />
      </div>

      <!-- Skill Details -->
      <div v-if="selectedSkill" class="bg-white rounded-lg shadow-md p-6 mt-6">
        <SkillDetails :skill="selectedSkill" :level="skillPoints[selectedSkill.id] || 0" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Job, Skill } from '~/types/skill'

useSeoMeta({
  title: '技能模擬器 - Rop-dex',
  description: '規劃你的RO角色技能配點方案',
  ogTitle: '技能模擬器 - Rop-dex',
  ogDescription: '規劃你的RO角色技能配點方案',
})

const selectedJob = ref<Job | null>(null)
const skillPoints = ref<Record<string, number>>({})
const selectedSkill = ref<Skill | null>(null)
const maxSkillPoints = ref(120) // 假設最大技能點為120

const totalSkillPoints = computed(() => {
  return Object.values(skillPoints.value).reduce((total, points) => total + points, 0)
})

const handleJobSelected = (job: Job) => {
  selectedJob.value = job
  skillPoints.value = {}
  selectedSkill.value = null
}

const updateSkillPoint = (skillId: string, level: number) => {
  if (level === 0) {
    delete skillPoints.value[skillId]
  } else {
    skillPoints.value[skillId] = level
  }
}

const handleSkillSelected = (skill: Skill) => {
  selectedSkill.value = skill
}

const resetSkills = () => {
  skillPoints.value = {}
  selectedSkill.value = null
}
</script>