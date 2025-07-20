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

    <!-- 技能點數不足警告模態框 -->
    <SkillPointWarning
      :is-visible="showWarning"
      :target-skill="warningData.targetSkill"
      :prerequisite-upgrades="warningData.prerequisiteUpgrades"
      :required-points="warningData.requiredPoints"
      :available-points="warningData.availablePoints"
      :shortage-points="warningData.shortagePoints"
      @close="closeWarning"
    />
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

interface PrerequisiteUpgrade {
  skillId: string
  skillName: string
  currentLevel: number
  requiredLevel: number
}

interface WarningData {
  targetSkill: Skill | null
  prerequisiteUpgrades: PrerequisiteUpgrade[]
  requiredPoints: number
  availablePoints: number
  shortagePoints: number
}

const selectedJob = ref<Job | null>(null)
const skillPoints = ref<Record<string, number>>({})
const selectedSkill = ref<Skill | null>(null)
const maxSkillPoints = ref(98) // 一轉49點 + 二轉49點 = 98點
const showWarning = ref(false)
const warningData = ref<WarningData>({
  targetSkill: null,
  prerequisiteUpgrades: [],
  requiredPoints: 0,
  availablePoints: 0,
  shortagePoints: 0
})

const totalSkillPoints = computed(() => {
  return Object.values(skillPoints.value).reduce((total, points) => total + points, 0)
})

const availableSkillPoints = computed(() => {
  return maxSkillPoints.value - totalSkillPoints.value
})

// 計算升級技能需要的前置技能升級
const calculatePrerequisiteUpgrades = (skill: Skill, targetLevel: number): PrerequisiteUpgrade[] => {
  const upgrades: PrerequisiteUpgrade[] = []
  
  const processRequirements = (currentSkill: Skill) => {
    currentSkill.requirements.forEach(req => {
      const currentLevel = skillPoints.value[req.skillId] || 0
      if (currentLevel < req.level) {
        const requiredSkill = selectedJob.value?.skills.find(s => s.id === req.skillId)
        if (requiredSkill) {
          // 檢查這個前置技能是否已經在升級列表中
          const existingUpgrade = upgrades.find(u => u.skillId === req.skillId)
          if (existingUpgrade) {
            // 如果已存在，取較高的等級要求
            if (req.level > existingUpgrade.requiredLevel) {
              existingUpgrade.requiredLevel = req.level
            }
          } else {
            upgrades.push({
              skillId: req.skillId,
              skillName: requiredSkill.name,
              currentLevel,
              requiredLevel: req.level
            })
          }
          
          // 遞歸處理前置技能的前置技能
          processRequirements(requiredSkill)
        }
      }
    })
  }
  
  processRequirements(skill)
  return upgrades
}

// 計算升級所需的總技能點數
const calculateRequiredPoints = (skill: Skill, targetLevel: number): number => {
  const currentLevel = skillPoints.value[skill.id] || 0
  const prerequisites = calculatePrerequisiteUpgrades(skill, targetLevel)
  
  // 目標技能所需點數
  const skillPointsNeeded = targetLevel - currentLevel
  
  // 前置技能所需點數
  const prerequisitePointsNeeded = prerequisites.reduce((total, req) => {
    return total + (req.requiredLevel - req.currentLevel)
  }, 0)
  
  return skillPointsNeeded + prerequisitePointsNeeded
}

// 自動升級前置技能
const autoUpgradePrerequisites = (skill: Skill, targetLevel: number) => {
  const prerequisites = calculatePrerequisiteUpgrades(skill, targetLevel)
  
  // 升級所有前置技能
  prerequisites.forEach(req => {
    skillPoints.value[req.skillId] = req.requiredLevel
  })
  
  // 升級目標技能
  skillPoints.value[skill.id] = targetLevel
}

const handleJobSelected = (job: Job) => {
  selectedJob.value = job
  skillPoints.value = {}
  selectedSkill.value = null
}

const updateSkillPoint = (skillId: string, level: number) => {
  if (!selectedJob.value) return
  
  const skill = selectedJob.value.skills.find(s => s.id === skillId)
  if (!skill) return
  
  const currentLevel = skillPoints.value[skillId] || 0
  
  // 如果是降級，直接執行
  if (level < currentLevel) {
    if (level === 0) {
      delete skillPoints.value[skillId]
    } else {
      skillPoints.value[skillId] = level
    }
    return
  }
  
  // 如果是升級，檢查前置技能和技能點數
  if (level > currentLevel) {
    const requiredPoints = calculateRequiredPoints(skill, level)
    const available = availableSkillPoints.value
    
    if (requiredPoints <= available) {
      // 技能點數足夠，自動升級前置技能
      autoUpgradePrerequisites(skill, level)
    } else {
      // 技能點數不足，顯示警告
      const prerequisites = calculatePrerequisiteUpgrades(skill, level)
      warningData.value = {
        targetSkill: skill,
        prerequisiteUpgrades: prerequisites,
        requiredPoints,
        availablePoints: available,
        shortagePoints: requiredPoints - available
      }
      showWarning.value = true
    }
  }
}

const handleSkillSelected = (skill: Skill) => {
  selectedSkill.value = skill
}

const resetSkills = () => {
  skillPoints.value = {}
  selectedSkill.value = null
}

const closeWarning = () => {
  showWarning.value = false
  warningData.value = {
    targetSkill: null,
    prerequisiteUpgrades: [],
    requiredPoints: 0,
    availablePoints: 0,
    shortagePoints: 0
  }
}
</script>