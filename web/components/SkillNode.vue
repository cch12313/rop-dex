<template>
  <div 
    class="skill-node-container"
    :class="{
      'available': isAvailable,
      'unavailable': !isAvailable,
      'learned': level > 0
    }"
    @click="handleClick"
  >
    <div class="skill-icon">{{ skill.icon }}</div>
    <div class="skill-name">{{ skill.name }}</div>
    <div class="skill-level">{{ level }}/{{ skill.maxLevel }}</div>
    
    <!-- Level control buttons -->
    <div v-if="isAvailable" class="level-controls">
      <button
        @click.stop="decreaseLevel"
        :disabled="level <= 0"
        class="level-btn decrease"
      >
        -
      </button>
      <button
        @click.stop="increaseLevel"
        :disabled="level >= skill.maxLevel"
        class="level-btn increase"
      >
        +
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Skill } from '~/types/skill'

interface Props {
  skill: Skill
  level: number
  isAvailable: boolean
}

interface Emits {
  click: [skill: Skill]
  levelChange: [skillId: string, level: number]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleClick = () => {
  emit('click', props.skill)
}

const increaseLevel = () => {
  if (props.level < props.skill.maxLevel) {
    emit('levelChange', props.skill.id, props.level + 1)
  }
}

const decreaseLevel = () => {
  if (props.level > 0) {
    emit('levelChange', props.skill.id, props.level - 1)
  }
}
</script>

<style scoped>
.skill-node-container {
  width: 100%;
  height: 100%;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  padding: 4px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: relative;
  overflow: hidden;
}

.skill-node-container:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.skill-node-container.available {
  border-color: #3b82f6;
}

.skill-node-container.unavailable {
  border-color: #9ca3af;
  opacity: 0.6;
  cursor: not-allowed;
}

.skill-node-container.learned {
  background-color: #dbeafe;
  border-color: #2563eb;
}

.skill-icon {
  font-size: 20px;
  margin-bottom: 2px;
}

.skill-name {
  font-size: 10px;
  font-weight: 500;
  text-align: center;
  line-height: 1.2;
  margin-bottom: 2px;
}

.skill-level {
  font-size: 8px;
  color: #6b7280;
  font-weight: 600;
}

.level-controls {
  position: absolute;
  bottom: 2px;
  left: 2px;
  right: 2px;
  display: flex;
  gap: 1px;
  opacity: 0;
  transition: opacity 0.2s;
}

.skill-node-container:hover .level-controls {
  opacity: 1;
}

.level-btn {
  flex: 1;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 2px;
  font-size: 10px;
  font-weight: bold;
  padding: 1px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.level-btn:hover:not(:disabled) {
  background-color: #2563eb;
}

.level-btn:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.level-btn.decrease {
  background-color: #ef4444;
}

.level-btn.decrease:hover:not(:disabled) {
  background-color: #dc2626;
}
</style>