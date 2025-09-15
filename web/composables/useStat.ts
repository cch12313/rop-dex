import type {ComputedRef, Ref} from 'vue'

/**
 * 素質類型定義
 */
export interface Stats {
    str: number
    agi: number
    vit: number
    int: number
    dex: number
    luk: number
}

/**
 * 職業類型定義（簡化版，只包含需要的屬性）
 */
export interface Job {
    statBonuses: Partial<Stats>
    hpCoefficient: number
    spCoefficient: number
}

/**
 * useStat composable 參數
 */
export interface UseStatParams {
    baseLevel: Ref<number>
    jobLevel: Ref<number>
    selectedJob: Ref<Job>
}

/**
 * useStat composable 返回值類型
 */
export interface UseStatReturn {
    state: {
        stats: Ref<Stats>
        remainingPoints: ComputedRef<number>
        usedPoints: ComputedRef<number>
        totalPoints: ComputedRef<number>
    }

    // 操作函數
    actions: {
        adjustStat: (statName: keyof Stats, delta: number) => void
        resetStats: () => void
        canIncreaseStat: (statName: keyof Stats) => boolean
        canDecreaseStat: (statName: keyof Stats) => boolean
    }

    // 成本計算
    costs: {
        getStatCost: (statName: keyof Stats) => number
        statCosts: ComputedRef<Record<keyof Stats, number>>
    }

    // 角色數值計算
    calculations: {
        hp: ComputedRef<number>
        sp: ComputedRef<number>
        attackPower: ComputedRef<number>
        hitRate: ComputedRef<number>
        dodgeRate: ComputedRef<number>
        totalStats: ComputedRef<Stats>
    }
}

/**
 * 計算單次升級消耗：基於當前素質值計算下次升級需要的點數
 * @param currentValue 當前素質值
 * @returns 下次升級需要的點數
 */
export const getStatUpgradeCost = (currentValue: number): number => {
    return Math.floor((currentValue - 1) / 10) + 2
}

/**
 * 計算累計消耗：從素質值 1 升級到目標素質值的總消耗
 * @param statValue 目標素質值
 * @returns 從 1 升級到目標值的總點數消耗
 */
export const calculateStatPointsUsed = (statValue: number): number => {
    let points = 0
    for (let i = 2; i <= statValue; i++) {
        const cost = Math.floor((i - 2) / 10) + 1
        points += cost
    }
    return points
}

/**
 * RO 樂園素質計算相關邏輯
 * 將業務邏輯從 UI 分離，方便測試和復用
 */
export const useStat = ({baseLevel, jobLevel, selectedJob}: UseStatParams): UseStatReturn => {
    const stats = ref<Stats>({
        str: 1,
        agi: 1,
        vit: 1,
        int: 1,
        dex: 1,
        luk: 1
    })

    // ===== 計算屬性 =====
    const totalPoints = computed(() => {
        const basePoints = baseLevel.value - 1
        const jobPoints = jobLevel.value - 1
        return basePoints + jobPoints
    })

    const usedPoints = computed(() => {
        let used = 0
        for (const [, value] of Object.entries(stats.value)) {
            used += calculateStatPointsUsed(value)
        }
        return used
    })

    const remainingPoints = computed(() => {
        return totalPoints.value - usedPoints.value
    })

    const totalStats = computed(() => {
        const bonuses = selectedJob.value.statBonuses
        return {
            str: stats.value.str + (bonuses.str || 0),
            agi: stats.value.agi + (bonuses.agi || 0),
            vit: stats.value.vit + (bonuses.vit || 0),
            int: stats.value.int + (bonuses.int || 0),
            dex: stats.value.dex + (bonuses.dex || 0),
            luk: stats.value.luk + (bonuses.luk || 0)
        }
    })

    const statCosts = computed(() => ({
        str: getStatUpgradeCost(stats.value.str),
        agi: getStatUpgradeCost(stats.value.agi),
        vit: getStatUpgradeCost(stats.value.vit),
        int: getStatUpgradeCost(stats.value.int),
        dex: getStatUpgradeCost(stats.value.dex),
        luk: getStatUpgradeCost(stats.value.luk)
    }))

    // ===== 角色狀態計算 =====
    const hp = computed(() => {
        const baseHP = (baseLevel.value * 8 + totalStats.value.vit * 5) * selectedJob.value.hpCoefficient
        return Math.floor(Math.max(baseHP, 40))
    })

    const sp = computed(() => {
        const baseSP = (baseLevel.value * 4 + totalStats.value.int * 3) * selectedJob.value.spCoefficient
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

    // ===== 操作函數 =====
    const getStatCostForStat = (statName: keyof Stats): number => {
        return getStatUpgradeCost(stats.value[statName])
    }

    const canIncreaseStat = (statName: keyof Stats): boolean => {
        const cost = getStatCostForStat(statName)
        return remainingPoints.value >= cost && stats.value[statName] < 99
    }

    const canDecreaseStat = (statName: keyof Stats): boolean => {
        return stats.value[statName] > 1
    }

    const adjustStat = (statName: keyof Stats, delta: number): void => {
        if (delta > 0 && canIncreaseStat(statName)) {
            stats.value[statName]++
        } else if (delta < 0 && canDecreaseStat(statName)) {
            stats.value[statName]--
        }
    }

    const resetStats = (): void => {
        stats.value = {
            str: 1,
            agi: 1,
            vit: 1,
            int: 1,
            dex: 1,
            luk: 1
        }
    }

    // ===== 返回分組 API =====
    return {
        state: {
            stats,
            remainingPoints,
            usedPoints: usedPoints,
            totalPoints
        },

        actions: {
            adjustStat,
            resetStats,
            canIncreaseStat,
            canDecreaseStat
        },

        costs: {
            getStatCost: getStatCostForStat,
            statCosts
        },

        calculations: {
            hp,
            sp,
            attackPower,
            hitRate,
            dodgeRate,
            totalStats
        }
    }
}