<template>
  <div class="min-h-screen bg-ro-soft">
    <!-- Header -->
    <header class="bg-white/90 backdrop-blur-sm shadow-ro-soft border-b-2 border-ro-accent-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-3xl font-bold font-ro-title bg-ro-primary bg-clip-text text-transparent hover:scale-105 transition-transform duration-200">
              🌟 Rop-dex
            </NuxtLink>
          </div>
          <nav>
            <NuxtLink to="/" class="text-ro-neutral-600 hover:text-ro-primary-500 font-ro-body transition-colors">
              回到首頁
            </NuxtLink>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold font-ro-display ro-gradient-text mb-4">
          素質計算機
        </h1>
        <p class="text-lg text-ro-neutral-600 mb-4">
          RO 樂園角色素質點數分配計算機
        </p>
      </div>

      <!-- Stat Calculator Panel -->
      <div class="bg-white/80 backdrop-blur-sm rounded-ro-xl shadow-ro-card border-2 border-ro-accent-100 overflow-hidden">
        <!-- Panel Header -->
        <div class="bg-gradient-to-r from-ro-primary-500 to-ro-primary-600 text-white px-6 py-4">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold font-ro-title flex items-center">
              <RoIcon name="diamond" class="mr-2" />
              角色素質
            </h2>
            <div class="flex items-center space-x-4 text-sm">
              <span>Base Lv: {{ baseLevel }}</span>
              <span>Job Lv: {{ jobLevel }}</span>
            </div>
          </div>
        </div>

        <div class="p-6">
          <!-- Level Controls -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <!-- Base Level -->
            <div class="bg-ro-neutral-50 rounded-ro-lg p-4 border border-ro-neutral-200">
              <label class="block text-sm font-semibold text-ro-neutral-700 mb-2">
                Base Level (60)
              </label>
              <div class="flex items-center space-x-3">
                <RoButton 
                  size="sm" 
                  variant="secondary" 
                  @click="adjustLevel('base', -1)"
                  disabled
                >
                  -
                </RoButton>
                <input 
                  v-model.number="baseLevel"
                  type="number"
                  min="1"
                  max="60"
                  readonly
                  class="flex-1 text-center px-3 py-2 border border-ro-neutral-300 rounded-ro-md bg-ro-neutral-100 text-ro-neutral-500 cursor-not-allowed"
                />
                <RoButton 
                  size="sm" 
                  variant="secondary" 
                  @click="adjustLevel('base', 1)"
                  disabled
                >
                  +
                </RoButton>
              </div>
            </div>

            <!-- Job Level -->
            <div class="bg-ro-neutral-50 rounded-ro-lg p-4 border border-ro-neutral-200">
              <label class="block text-sm font-semibold text-ro-neutral-700 mb-2">
                Job Level (50)
              </label>
              <div class="flex items-center space-x-3">
                <RoButton 
                  size="sm" 
                  variant="secondary" 
                  @click="adjustLevel('job', -1)"
                  disabled
                >
                  -
                </RoButton>
                <input 
                  v-model.number="jobLevel"
                  type="number"
                  min="1"
                  max="50"
                  readonly
                  class="flex-1 text-center px-3 py-2 border border-ro-neutral-300 rounded-ro-md bg-ro-neutral-100 text-ro-neutral-500 cursor-not-allowed"
                />
                <RoButton 
                  size="sm" 
                  variant="secondary" 
                  @click="adjustLevel('job', 1)"
                  disabled
                >
                  +
                </RoButton>
              </div>
            </div>

            <!-- Job Class -->
            <div class="bg-ro-accent-50 rounded-ro-lg p-4 border border-ro-accent-200">
              <label class="block text-sm font-semibold text-ro-accent-700 mb-2">
                職業選擇
              </label>
              <select 
                v-model="selectedJobClass"
                class="w-full px-3 py-2 border border-ro-accent-300 rounded-ro-md focus:ring-2 focus:ring-ro-accent-300 focus:border-ro-accent-400 bg-white"
              >
                <option 
                  v-for="jobClass in jobClasses" 
                  :key="jobClass.id" 
                  :value="jobClass"
                >
                  {{ jobClass.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- Stats Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Left Column - Primary Stats -->
            <div class="space-y-4">
              <h3 class="text-lg font-bold text-ro-neutral-800 mb-4 flex items-center">
                <RoIcon name="sword" class="mr-2" />
                基本素質
              </h3>
              
              <!-- STR -->
              <div class="stat-row">
                <div class="stat-label">
                  <span class="stat-name">STR</span>
                  <span class="stat-description">力量</span>
                </div>
                <div class="stat-controls">
                  <RoButton size="sm" variant="secondary" @click="adjustStat('str', -1)" :disabled="!canDecreaseStat('str')">-</RoButton>
                  <span class="stat-value">{{ stats.str }}</span>
                  <RoButton size="sm" variant="secondary" @click="adjustStat('str', 1)" :disabled="!canIncreaseStat('str')">+</RoButton>
                </div>
                <div class="stat-cost">
                  消耗點數: {{ getStatCost('str') }}
                </div>
              </div>

              <!-- AGI -->
              <div class="stat-row">
                <div class="stat-label">
                  <span class="stat-name">AGI</span>
                  <span class="stat-description">敏捷</span>
                </div>
                <div class="stat-controls">
                  <RoButton size="sm" variant="secondary" @click="adjustStat('agi', -1)" :disabled="!canDecreaseStat('agi')">-</RoButton>
                  <span class="stat-value">{{ stats.agi }}</span>
                  <RoButton size="sm" variant="secondary" @click="adjustStat('agi', 1)" :disabled="!canIncreaseStat('agi')">+</RoButton>
                </div>
                <div class="stat-cost">
                  消耗點數: {{ getStatCost('agi') }}
                </div>
              </div>

              <!-- VIT -->
              <div class="stat-row">
                <div class="stat-label">
                  <span class="stat-name">VIT</span>
                  <span class="stat-description">體力</span>
                </div>
                <div class="stat-controls">
                  <RoButton size="sm" variant="secondary" @click="adjustStat('vit', -1)" :disabled="!canDecreaseStat('vit')">-</RoButton>
                  <span class="stat-value">{{ stats.vit }}</span>
                  <RoButton size="sm" variant="secondary" @click="adjustStat('vit', 1)" :disabled="!canIncreaseStat('vit')">+</RoButton>
                </div>
                <div class="stat-cost">
                  消耗點數: {{ getStatCost('vit') }}
                </div>
              </div>

              <!-- INT -->
              <div class="stat-row">
                <div class="stat-label">
                  <span class="stat-name">INT</span>
                  <span class="stat-description">智力</span>
                </div>
                <div class="stat-controls">
                  <RoButton size="sm" variant="secondary" @click="adjustStat('int', -1)" :disabled="!canDecreaseStat('int')">-</RoButton>
                  <span class="stat-value">{{ stats.int }}</span>
                  <RoButton size="sm" variant="secondary" @click="adjustStat('int', 1)" :disabled="!canIncreaseStat('int')">+</RoButton>
                </div>
                <div class="stat-cost">
                  消耗點數: {{ getStatCost('int') }}
                </div>
              </div>

              <!-- DEX -->
              <div class="stat-row">
                <div class="stat-label">
                  <span class="stat-name">DEX</span>
                  <span class="stat-description">靈巧</span>
                </div>
                <div class="stat-controls">
                  <RoButton size="sm" variant="secondary" @click="adjustStat('dex', -1)" :disabled="!canDecreaseStat('dex')">-</RoButton>
                  <span class="stat-value">{{ stats.dex }}</span>
                  <RoButton size="sm" variant="secondary" @click="adjustStat('dex', 1)" :disabled="!canIncreaseStat('dex')">+</RoButton>
                </div>
                <div class="stat-cost">
                  消耗點數: {{ getStatCost('dex') }}
                </div>
              </div>

              <!-- LUK -->
              <div class="stat-row">
                <div class="stat-label">
                  <span class="stat-name">LUK</span>
                  <span class="stat-description">幸運</span>
                </div>
                <div class="stat-controls">
                  <RoButton size="sm" variant="secondary" @click="adjustStat('luk', -1)" :disabled="!canDecreaseStat('luk')">-</RoButton>
                  <span class="stat-value">{{ stats.luk }}</span>
                  <RoButton size="sm" variant="secondary" @click="adjustStat('luk', 1)" :disabled="!canIncreaseStat('luk')">+</RoButton>
                </div>
                <div class="stat-cost">
                  消耗點數: {{ getStatCost('luk') }}
                </div>
              </div>
            </div>

            <!-- Right Column - Status & Info -->
            <div class="space-y-6">
              <!-- Stat Points Info -->
              <div class="bg-ro-accent-50 rounded-ro-lg p-4 border border-ro-accent-200">
                <h3 class="text-lg font-bold text-ro-accent-700 mb-3 flex items-center">
                  <RoIcon name="star" class="mr-2" />
                  素質點數
                </h3>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span>剩餘點數:</span>
                    <span class="font-bold text-ro-primary-600">{{ remainingStatPoints }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>總共點數:</span>
                    <span>{{ totalStatPoints }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>已用點數:</span>
                    <span>{{ usedStatPoints }}</span>
                  </div>
                </div>
              </div>

              <!-- Character Status -->
              <div class="bg-ro-green-50 rounded-ro-lg p-4 border border-ro-green-200">
                <h3 class="text-lg font-bold text-ro-green-700 mb-3 flex items-center">
                  <RoIcon name="heart" class="mr-2" />
                  角色狀態
                </h3>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span>HP:</span>
                    <span class="font-bold text-red-600">{{ calculatedHP }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>SP:</span>
                    <span class="font-bold text-blue-600">{{ calculatedSP }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>攻擊力:</span>
                    <span>{{ attackPower }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>命中率:</span>
                    <span>{{ hitRate }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>迴避率:</span>
                    <span>{{ dodgeRate }}</span>
                  </div>
                </div>
              </div>

              <!-- Control Buttons -->
              <div class="space-y-3">
                <RoButton variant="warning" class="w-full" @click="resetStats">
                  <RoIcon name="refresh" class="mr-2" />
                  重置素質
                </RoButton>
                <RoButton variant="success" class="w-full" @click="saveStats">
                  <RoIcon name="save" class="mr-2" />
                  儲存配置
                </RoButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
interface Stats {
  str: number
  agi: number
  vit: number
  int: number
  dex: number
  luk: number
}

// 基本設定
const baseLevel = ref(60)
const jobLevel = ref(50)

// 職業資料
interface JobClass {
  id: string
  name: string
  hpCoefficient: number
  spCoefficient: number
  statBonuses: {
    str?: number
    agi?: number
    vit?: number
    int?: number
    dex?: number
    luk?: number
  }
}

// 六大職業系統
const jobClasses: JobClass[] = [
  {
    id: 'swordsman',
    name: '劍士系',
    hpCoefficient: 1.2,
    spCoefficient: 0.8,
    statBonuses: { str: 2, vit: 1 }
  },
  {
    id: 'mage',
    name: '法師系',
    hpCoefficient: 0.7,
    spCoefficient: 1.5,
    statBonuses: { int: 3, dex: 1 }
  },
  {
    id: 'archer',
    name: '弓箭手系',
    hpCoefficient: 0.9,
    spCoefficient: 1.0,
    statBonuses: { dex: 2, agi: 2 }
  },
  {
    id: 'acolyte',
    name: '服事系',
    hpCoefficient: 1.0,
    spCoefficient: 1.3,
    statBonuses: { int: 2, vit: 1, dex: 1 }
  },
  {
    id: 'merchant',
    name: '商人系',
    hpCoefficient: 1.1,
    spCoefficient: 0.9,
    statBonuses: { str: 1, vit: 2, dex: 1 }
  },
  {
    id: 'thief',
    name: '盜賊系',
    hpCoefficient: 0.8,
    spCoefficient: 1.0,
    statBonuses: { agi: 3, dex: 1 }
  }
]

// 選擇的職業
const selectedJobClass = ref(jobClasses[0])

// 初始素質
const stats = ref<Stats>({
  str: 1,
  agi: 1,
  vit: 1,
  int: 1,
  dex: 1,
  luk: 1
})

// SEO
useSeoMeta({
  title: '素質計算機 - Rop-dex',
  description: 'RO樂園素質計算機，支援Base Lv 1-60與Job Lv 1-50的素質點數分配計算',
  ogTitle: '素質計算機 - Rop-dex',
  ogDescription: 'RO樂園素質計算機，支援Base Lv 1-60與Job Lv 1-50的素質點數分配計算'
})

// 計算素質點數
const totalStatPoints = computed(() => {
  // Base level 提供的素質點數 (每級1點，但第1級不算)
  const basePoints = baseLevel.value - 1
  // Job level 提供的素質點數 (每級1點，但第1級不算)  
  const jobPoints = jobLevel.value - 1
  return basePoints + jobPoints
})

const usedStatPoints = computed(() => {
  let used = 0
  for (const [statName, value] of Object.entries(stats.value)) {
    used += calculateStatPointsUsed(value)
  }
  return used
})

const remainingStatPoints = computed(() => {
  return totalStatPoints.value - usedStatPoints.value
})

// 計算單一素質使用的點數
function calculateStatPointsUsed(statValue: number): number {
  let points = 0
  for (let i = 2; i <= statValue; i++) {
    points += Math.floor((i - 1) / 10) + 1
  }
  return points
}

// 計算升級某素質需要的點數
function getStatCost(statName: keyof Stats): number {
  const currentValue = stats.value[statName]
  return Math.floor(currentValue / 10) + 1
}

// 檢查是否可以增加素質
function canIncreaseStat(statName: keyof Stats): boolean {
  const cost = getStatCost(statName)
  return remainingStatPoints.value >= cost && stats.value[statName] < 99
}

// 檢查是否可以減少素質
function canDecreaseStat(statName: keyof Stats): boolean {
  return stats.value[statName] > 1
}

// 調整素質
function adjustStat(statName: keyof Stats, delta: number) {
  if (delta > 0 && canIncreaseStat(statName)) {
    stats.value[statName]++
  } else if (delta < 0 && canDecreaseStat(statName)) {
    stats.value[statName]--
  }
}

// 調整等級
function adjustLevel(type: 'base' | 'job', delta: number) {
  if (type === 'base') {
    const newLevel = baseLevel.value + delta
    if (newLevel >= 1 && newLevel <= 60) {
      baseLevel.value = newLevel
    }
  } else {
    const newLevel = jobLevel.value + delta
    if (newLevel >= 1 && newLevel <= 50) {
      jobLevel.value = newLevel
    }
  }
}

// 計算總素質（包含職業加成）
const totalStats = computed(() => {
  const bonuses = selectedJobClass.value.statBonuses
  return {
    str: stats.value.str + (bonuses.str || 0),
    agi: stats.value.agi + (bonuses.agi || 0),
    vit: stats.value.vit + (bonuses.vit || 0),
    int: stats.value.int + (bonuses.int || 0),
    dex: stats.value.dex + (bonuses.dex || 0),
    luk: stats.value.luk + (bonuses.luk || 0)
  }
})

// 計算角色狀態
const calculatedHP = computed(() => {
  // 基礎 HP 計算，包含職業係數
  const baseHP = (baseLevel.value * 8 + totalStats.value.vit * 5) * selectedJobClass.value.hpCoefficient
  return Math.floor(Math.max(baseHP, 40))
})

const calculatedSP = computed(() => {
  // 基礎 SP 計算，包含職業係數
  const baseSP = (baseLevel.value * 4 + totalStats.value.int * 3) * selectedJobClass.value.spCoefficient
  return Math.floor(Math.max(baseSP, 10))
})

const attackPower = computed(() => {
  return Math.floor(totalStats.value.str + totalStats.value.dex / 5 + totalStats.value.luk / 3)
})

const hitRate = computed(() => {
  return Math.floor(baseLevel.value + totalStats.value.dex + totalStats.value.luk / 3)
})

const dodgeRate = computed(() => {
  return Math.floor(baseLevel.value + totalStats.value.agi + totalStats.value.luk / 5)
})

// 重置素質
function resetStats() {
  stats.value = {
    str: 1,
    agi: 1,
    vit: 1,
    int: 1,
    dex: 1,
    luk: 1
  }
}

// 儲存配置 (暫時只是提示)
function saveStats() {
  alert('配置已儲存！(此功能尚在開發中)')
}
</script>

<style scoped>
.stat-row {
  @apply flex items-center justify-between p-3 bg-white rounded-ro-md border border-ro-neutral-200;
}

.stat-label {
  @apply flex flex-col;
}

.stat-name {
  @apply font-bold text-ro-primary-600 text-lg;
}

.stat-description {
  @apply text-sm text-ro-neutral-500;
}

.stat-controls {
  @apply flex items-center space-x-3;
}

.stat-value {
  @apply font-bold text-xl text-ro-neutral-800 min-w-[3rem] text-center;
}

.stat-cost {
  @apply text-sm text-ro-accent-600 min-w-[4rem] text-right;
}
</style>