export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'zh-tw',
  fallbackLocale: 'zh-tw',
  messages: {
    'zh-tw': {
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
    },
    en: {
      stat: {
        costLabel: 'Cost',
        totalLabel: 'Total',
        statPoints: 'Stat Points',
        remainingPoints: 'Remaining',
        totalPoints: 'Total Points',
        usedPoints: 'Used Points',
        characterStats: 'Character Status', 
        baseStats: 'Base Stats',
        resetStats: 'Reset Stats',
        saveConfig: 'Save Config',
        names: {
          str: 'Strength',
          agi: 'Agility',
          vit: 'Vitality', 
          int: 'Intelligence',
          dex: 'Dexterity',
          luk: 'Luck'
        }
      },
      character: {
        hp: 'HP',
        sp: 'SP',
        attackPower: 'Attack Power', 
        hitRate: 'Hit Rate',
        dodgeRate: 'Dodge Rate'
      },
      levels: {
        baseLevel: 'Base Level',
        jobLevel: 'Job Level', 
        jobSelection: 'Job Selection'
      }
    }
  }
}))