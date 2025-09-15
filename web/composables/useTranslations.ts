/**
 * 素質計算機翻譯文字統一管理
 */
export const useTranslations = () => {
  const translations = {
    stat: {
      costLabel: '消耗點數',
      totalLabel: '總點數',
      statPoints: '素質點數',
      remainingPoints: '剩餘點數',
      totalPoints: '總共點數',
      usedPoints: '已用點數',
      characterStats: '角色狀態',
      baseStats: '基本素質',
      resetStats: '重置素質',
      saveConfig: '儲存配置',
      names: {
        str: '力量',
        agi: '敏捷', 
        vit: '體力',
        int: '智力',
        dex: '靈巧',
        luk: '幸運'
      }
    },
    character: {
      hp: 'HP',
      sp: 'SP', 
      attackPower: '攻擊力',
      hitRate: '命中率',
      dodgeRate: '迴避率'
    },
    levels: {
      baseLevel: 'Base Level',
      jobLevel: 'Job Level',
      jobSelection: '職業選擇'
    }
  }

  // 提供簡單的取值函數
  const t = (key: string) => {
    const keys = key.split('.')
    let value: any = translations
    
    for (const k of keys) {
      value = value[k]
      if (value === undefined) return key // 如果找不到就返回原鍵值
    }
    
    return value
  }

  return {
    translations,
    t
  }
}