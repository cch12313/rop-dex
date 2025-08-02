<template>
  <div class="skill-icon" :class="className">
    <img 
      v-if="hasImage"
      :src="iconPath"
      :alt="skillName"
      class="skill-icon-image"
      @error="onImageError"
    />
    <span v-else class="skill-icon-emoji">{{ fallbackIcon }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  skillName: string
  skillId: string
  className?: string
}

const props = defineProps<Props>()
const imageError = ref(false)

const iconPath = computed(() => `/assets/skill-icons/${props.skillId}.png`)

const hasImage = computed(() => !imageError.value)

const fallbackIcon = computed(() => {
  const iconMap: { [key: string]: string } = {
    'SM_SWORD': '⚔️',
    'SM_BASH': '💥',
    'SM_MAGNUM': '🔥',
    'SM_PROVOKE': '😠',
    'SM_ENDURE': '🛡️',
    'KN_RIDING': '🐎',
    'KN_PIERCE': '🗡️',
    'CR_AUTOGUARD': '🛡️',
    'CR_HOLYCROSS': '✝️',
    'MG_FIREBOLT': '🔥',
    'MG_COLDBOLT': '🧊',
    'MG_LIGHTNINGBOLT': '⚡',
    'AL_HEAL': '💚',
    'AL_BLESSING': '🙏',
    'AC_DOUBLE': '🏹',
    'TF_STEAL': '🗡️',
    'MC_MAMMONITE': '💰'
  }
  
  return iconMap[props.skillId] || '⭐'
})

const onImageError = () => {
  imageError.value = true
}
</script>

<style scoped>
.skill-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
}

.skill-icon-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.skill-icon-emoji {
  font-size: 18px;
  line-height: 1;
}
</style>