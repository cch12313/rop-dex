<template>
  <div class="skill-details">
    <div class="skill-header">
      <div class="skill-icon-large">{{ skill.icon }}</div>
      <div class="skill-info">
        <h3 class="skill-name">{{ skill.name }}</h3>
        <div class="skill-level">等級 {{ level }} / {{ skill.maxLevel }}</div>
      </div>
    </div>
    
    <div class="skill-description">
      <p>{{ skill.description }}</p>
    </div>
    
    <!-- Skill Requirements -->
    <div v-if="skill.requirements.length > 0" class="skill-requirements">
      <h4 class="section-title">前置條件</h4>
      <div class="requirements-list">
        <div
          v-for="req in skill.requirements"
          :key="req.skillId"
          class="requirement-item"
        >
          <span class="requirement-skill">{{ getSkillName(req.skillId) }}</span>
          <span class="requirement-level">等級 {{ req.level }}</span>
        </div>
      </div>
    </div>
    
    <!-- Skill Effects -->
    <div v-if="skill.effects.length > 0" class="skill-effects">
      <h4 class="section-title">技能效果</h4>
      <div class="effects-list">
        <div
          v-for="effect in relevantEffects"
          :key="effect.level"
          class="effect-item"
          :class="{ 'current-level': effect.level === level }"
        >
          <span class="effect-level">Lv.{{ effect.level }}</span>
          <span class="effect-description">{{ effect.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Skill } from '~/types/skill'

interface Props {
  skill: Skill
  level: number
}

const props = defineProps<Props>()

const relevantEffects = computed(() => {
  if (props.level === 0) {
    return props.skill.effects.filter(effect => effect.level === 1)
  }
  
  return props.skill.effects.filter(effect => 
    effect.level <= props.level
  ).sort((a, b) => b.level - a.level).slice(0, 3)
})

const getSkillName = (skillId: string): string => {
  // 這裡應該從技能資料中查找技能名稱
  // 暫時返回技能ID
  return skillId.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
}
</script>

<style scoped>
.skill-details {
  padding: 20px;
}

.skill-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.skill-icon-large {
  font-size: 48px;
  margin-right: 16px;
}

.skill-info {
  flex: 1;
}

.skill-name {
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 4px 0;
  color: #1f2937;
}

.skill-level {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

.skill-description {
  margin-bottom: 20px;
  padding: 12px;
  background-color: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
}

.skill-description p {
  margin: 0;
  color: #374151;
  line-height: 1.5;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #1f2937;
}

.skill-requirements {
  margin-bottom: 20px;
}

.requirements-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.requirement-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background-color: #e5e7eb;
  border-radius: 16px;
  font-size: 14px;
}

.requirement-skill {
  font-weight: 500;
  color: #374151;
}

.requirement-level {
  color: #6b7280;
}

.skill-effects {
  margin-bottom: 20px;
}

.effects-list {
  space-y: 8px;
}

.effect-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
}

.effect-item.current-level {
  background-color: #dbeafe;
  border-color: #3b82f6;
}

.effect-level {
  font-weight: 600;
  color: #3b82f6;
  min-width: 40px;
  font-size: 14px;
}

.effect-description {
  color: #374151;
  line-height: 1.4;
  font-size: 14px;
}
</style>