import type { JobClass, Job, Skill } from '~/types/skill'
import { roSkillDatabase } from './ro_skills_final'

// 技能名稱對照表 - 將韓文技能ID轉換為中文名稱
const skillNameMapping: { [key: string]: string } = {
  // 劍士技能
  'SM_SWORD': '劍術修練',
  'SM_RECOVERY': '體力恢復術', 
  'SM_BASH': '強力攻擊',
  'SM_PROVOKE': '挑釁',
  'SM_AUTOBERSERK': '自動狂暴',
  'SM_MOVINGRECOVERY': '移動時體力恢復',
  'SM_TWOHAND': '雙手劍修練',
  'SM_MAGNUM': '劍氣擊',
  'SM_ENDURE': '霸體',
  'SM_FATALBLOW': '致命攻擊',
  'KN_SPEARMASTERY': '長槍修練',
  
  // 騎士技能
  'KN_TWOHANDQUICKEN': '雙手劍加速',
  'KN_AUTOCOUNTER': '自動反擊',
  'KN_RIDING': '騎術',
  'KN_PIERCE': '穿刺攻擊',
  'KN_CHARGEATK': '衝鋒攻擊',
  'KN_BOWLINGBASH': '衝擊波',
  'KN_CAVALIERMASTERY': '騎兵修練',
  'KN_SPEARBOOMERANG': '長槍迴旋',
  'KN_SPEARSTAB': '長槍連擊',
  'KN_BRANDISHSPEAR': '長槍揮舞',
  
  // 十字軍技能
  'CR_TRUST': '信賴',
  'CR_AUTOGUARD': '自動格擋',
  'CR_SPEARQUICKEN': '長槍速度增加',
  'CR_SHRINK': '縮身術',
  'AL_DP': '神聖攻擊',
  'AL_HEAL': '治癒術',
  'CR_SHIELDCHARGE': '盾牌衝擊',
  'AL_DEMONBANE': '惡魔剋星',
  'CR_PROVIDENCE': '神之庇護',
  'AL_CURE': '治療',
  'CR_SHIELDBOOMERANG': '盾牌迴旋',
  'CR_HOLYCROSS': '聖十字斬',
  'CR_DEFENDER': '守護者',
  'CR_REFLECTSHIELD': '盾牌反射',
  'CR_GRANDCROSS': '神聖十字',
  'CR_DEVOTION': '犧牲',
  
  // 法師技能
  'MG_STONECURSE': '石化術',
  'MG_COLDBOLT': '冰箭術',
  'MG_LIGHTNINGBOLT': '閃電術',
  'MG_NAPALMBEAT': '靈魂攻擊',
  'MG_FIREBOLT': '火箭術',
  'MG_SIGHT': '魔法感知',
  'WZ_EARTHSPIKE': '地裂術',
  'MG_FROSTDIVER': '冰凍術',
  'MG_THUNDERSTORM': '雷鳴術',
  'MG_SOULSTRIKE': '靈魂攻擊',
  'MG_FIREBALL': '火球術',
  'MG_ENERGYCOAT': '魔法盾',
  'MG_SRECOVERY': '魔力恢復術',
  'MG_SAFETYWALL': '安全壁',
  'MG_FIREWALL': '火牆術',
  
  // 弓箭手技能
  'AC_DOUBLE': '二連射',
  'AC_OWL': '鷹眼',
  'AC_CHARGEARROW': '衝擊箭',
  'AC_SHOWER': '箭雨',
  'AC_VULTURE': '禿鷹眼',
  'AC_MAKINGARROW': '製造箭矢',
  'AC_CONCENTRATION': '專注',
  
  // 服事技能
  'AL_RUWACH': '探知',
  'AL_HOLYWATER': '聖水製造',
  'PR_MACEMASTERY': '鈍器修練',
  'AL_HOLYLIGHT': '聖光術',
  'AL_TELEPORT': '瞬間移動',
  'AL_INCAGI': '敏捷提升',
  'AL_BLESSING': '祝福',
  'AL_ANGELUS': '天使之障壁',
  'AL_WARP': '傳送之陣',
  'AL_DECAGI': '敏捷降低',
  'AL_CRUCIS': '聖十字驅魔',
  'AL_PNEUMA': '聖靈術',
  
  // 商人技能
  'MC_INCCARRY': '負重提升',
  'AM_AXEMASTERY': '斧頭修練',
  'MC_MAMMONITE': '金錢攻擊',
  'MC_LOUD': '大聲叫賣',
  'MC_IDENTIFY': '物品鑑定',
  'MC_DISCOUNT': '折扣',
  'MC_PUSHCART': '手推車',
  'MC_CHANGECART': '換推車',
  'MC_CARTDECORATE': '推車裝飾',
  'MC_OVERCHARGE': '高價出售',
  'MC_VENDING': '開設商店',
  'MC_CARTREVOLUTION': '瘋狂推車',
  'WS_CARTBOOST': '推車加速',
  
  // 盜賊技能
  'TF_DOUBLE': '二刀連擊',
  'TF_STEAL': '偷竊',
  'TF_POISON': '塗毒',
  'TF_SPRINKLESAND': '撒沙',
  'TF_THROWSTONE': '投石攻擊',
  'TF_MISS': '迴避提升',
  'TF_HIDING': '隱匿',
  'TF_DETOXIFY': '解毒',
  'TF_BACKSLIDING': '後滑步',
  'TF_PICKSTONE': '撿石頭',
  
  // 其他二轉職業的技能映射會在這裡繼續添加...
}

// 將 ragzero 資料轉換為我們的格式
function convertJobData(jobData: any, jobType: 'first' | 'second'): Job {
  const skills: Skill[] = []
  
  // 轉換技能資料
  for (const [position, skillDetail] of Object.entries(jobData.skillsDetailed)) {
    const detail = skillDetail as any
    const skillName = skillNameMapping[detail.skillName] || detail.chineseName || detail.skillName
    
    // 計算技能在技能樹中的位置 (簡化版本，基於position)
    const pos = parseInt(position)
    const x = ((pos - 1) % 6) + 1  // 6個技能一行
    const y = Math.floor((pos - 1) / 6) + 1
    
    const skill: Skill = {
      id: detail.skillName.toLowerCase().replace('_', '_'),
      name: skillName,
      icon: getSkillIcon(detail.skillName),
      description: `${detail.skillName} - ${skillName}`,
      maxLevel: 10, // 默認最大等級
      requirements: [], // 先設空，之後可以根據需要添加
      effects: [
        { level: 1, description: '等級 1 效果' },
        { level: 5, description: '等級 5 效果' },
        { level: 10, description: '等級 10 效果' }
      ],
      position: { x, y }
    }
    
    skills.push(skill)
  }
  
  return {
    id: jobData.jobId.toString(),
    name: jobData.jobName.chinese,
    icon: getJobIcon(jobData.jobName.chinese),
    description: `${jobData.jobName.korean} - ${jobData.jobName.chinese}`,
    skills,
    baseSkillPoints: 49
  }
}

// 獲取技能圖標
function getSkillIcon(skillName: string): string {
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
  
  return iconMap[skillName] || '⭐'
}

// 獲取職業圖標
function getJobIcon(jobName: string): string {
  const iconMap: { [key: string]: string } = {
    '劍士': '⚔️',
    '法師': '🧙‍♂️',
    '弓箭手': '🏹',
    '服事': '🙏',
    '商人': '💰',
    '盜賊': '🗡️',
    '騎士': '🏇',
    '十字軍': '✝️',
    '牧師': '👼',
    '巫師': '🧙‍♀️',
    '鐵匠': '🔨',
    '獵人': '🦅',
    '刺客': '🗡️',
    '武僧': '👊',
    '賢者': '📚',
    '流氓': '🎭',
    '鍊金術師': '⚗️',
    '詩人': '🎵',
    '舞孃': '💃'
  }
  
  return iconMap[jobName] || '👤'
}

// 生成所有職業資料
const allFirstJobs: Job[] = Object.values(roSkillDatabase.firstJobs).map(jobData => 
  convertJobData(jobData, 'first')
)

const allSecondJobs: Job[] = Object.values(roSkillDatabase.secondJobs).map(jobData => 
  convertJobData(jobData, 'second')
)

// 按職業系統分類
export const jobClassesData: JobClass[] = [
  {
    id: 'swordsman_class',
    name: '劍士系職業',
    jobs: allSecondJobs.filter(job => ['7', '14'].includes(job.id)) // 騎士(7)、十字軍(14)
  },
  {
    id: 'mage_class', 
    name: '法師系職業',
    jobs: allSecondJobs.filter(job => ['9', '16'].includes(job.id)) // 巫師(9)、賢者(16)
  },
  {
    id: 'archer_class',
    name: '弓箭手系職業', 
    jobs: allSecondJobs.filter(job => ['11', '19', '20'].includes(job.id)) // 獵人(11)、詩人(19)、舞孃(20)
  },
  {
    id: 'acolyte_class',
    name: '服事系職業',
    jobs: allSecondJobs.filter(job => ['8', '15'].includes(job.id)) // 牧師(8)、武僧(15)
  },
  {
    id: 'merchant_class',
    name: '商人系職業',
    jobs: allSecondJobs.filter(job => ['10', '18'].includes(job.id)) // 鐵匠(10)、鍊金術師(18)
  },
  {
    id: 'thief_class',
    name: '盜賊系職業',
    jobs: allSecondJobs.filter(job => ['12', '17'].includes(job.id)) // 刺客(12)、流氓(17)
  }
]

// 匯出所有資料以便其他檔案使用
export { allFirstJobs, allSecondJobs, roSkillDatabase }