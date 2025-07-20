<template>
  <div class="skill-tree-container">
    <div class="skill-tree-grid" :style="gridStyle">
      <div
        v-for="skill in job.skills"
        :key="skill.id"
        class="skill-node"
        :style="getSkillPosition(skill)"
      >
        <SkillNode
          :skill="skill"
          :level="skillPoints[skill.id] || 0"
          :is-available="isSkillAvailable(skill)"
          @click="handleSkillClick"
          @level-change="handleLevelChange"
        />
      </div>
      
      <!-- Skill connections -->
      <svg class="skill-connections" :style="gridStyle">
        <line
          v-for="connection in connections"
          :key="connection.id"
          :x1="connection.x1"
          :y1="connection.y1"
          :x2="connection.x2"
          :y2="connection.y2"
          stroke="#cbd5e1"
          stroke-width="2"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Job, Skill } from '~/types/skill'

interface Props {
  job: Job
  skillPoints: Record<string, number>
}

interface Emits {
  updateSkill: [skillId: string, level: number]
  skillSelected: [skill: Skill]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const GRID_SIZE = 80
const GRID_GAP = 20

const gridStyle = computed(() => {
  const maxX = Math.max(...props.job.skills.map(s => s.position.x))
  const maxY = Math.max(...props.job.skills.map(s => s.position.y))
  
  return {
    width: `${(maxX + 1) * GRID_SIZE + maxX * GRID_GAP}px`,
    height: `${(maxY + 1) * GRID_SIZE + maxY * GRID_GAP}px`,
    position: 'relative'
  }
})

const getSkillPosition = (skill: Skill) => {
  return {
    position: 'absolute',
    left: `${skill.position.x * (GRID_SIZE + GRID_GAP)}px`,
    top: `${skill.position.y * (GRID_SIZE + GRID_GAP)}px`,
    width: `${GRID_SIZE}px`,
    height: `${GRID_SIZE}px`
  }
}

const connections = computed(() => {
  const connections: Array<{
    id: string
    x1: number
    y1: number
    x2: number
    y2: number
  }> = []
  
  props.job.skills.forEach(skill => {
    skill.requirements.forEach(req => {
      const requiredSkill = props.job.skills.find(s => s.id === req.skillId)
      if (requiredSkill) {
        const fromX = requiredSkill.position.x * (GRID_SIZE + GRID_GAP) + GRID_SIZE / 2
        const fromY = requiredSkill.position.y * (GRID_SIZE + GRID_GAP) + GRID_SIZE / 2
        const toX = skill.position.x * (GRID_SIZE + GRID_GAP) + GRID_SIZE / 2
        const toY = skill.position.y * (GRID_SIZE + GRID_GAP) + GRID_SIZE / 2
        
        connections.push({
          id: `${requiredSkill.id}-${skill.id}`,
          x1: fromX,
          y1: fromY,
          x2: toX,
          y2: toY
        })
      }
    })
  })
  
  return connections
})

const isSkillAvailable = (skill: Skill): boolean => {
  // 現在總是允許點擊技能，因為我們有智能前置技能升級系統
  // 實際的前置技能檢查和自動升級會在父組件中處理
  return true
}

const handleSkillClick = (skill: Skill) => {
  emit('skillSelected', skill)
}

const handleLevelChange = (skillId: string, level: number) => {
  emit('updateSkill', skillId, level)
}
</script>

<style scoped>
.skill-tree-container {
  overflow: auto;
  max-width: 100%;
  max-height: 600px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  background-color: #f9fafb;
}

.skill-tree-grid {
  position: relative;
  margin: 0 auto;
}

.skill-connections {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
}

.skill-node {
  z-index: 2;
}
</style>