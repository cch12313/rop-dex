import type { JobClass, Job, Skill } from '~/types/skill'
import { roSkillDatabase } from './ro_skills_final'

// 技能名稱對照表 - 將韓文技能ID轉換為中文名稱
const skillNameMapping: { [key: string]: string } = {
  // 劍士技能
  'SM_SWORD': '單手劍使用熟練度',
  'SM_RECOVERY': '快速恢復', 
  'SM_BASH': '狂擊',
  'SM_PROVOKE': '挑釁',
  'SM_AUTOBERSERK': '狂暴狀態',
  'SM_MOVINGRECOVERY': '移動時恢復HP',
  'SM_TWOHAND': '雙手劍使用熟練度',
  'SM_MAGNUM': '怒爆',
  'SM_ENDURE': '霸體',
  'SM_FATALBLOW': '攻擊弱點',
  'KN_SPEARMASTERY': '長矛使用熟練度',
  
  // 騎士技能
  'KN_TWOHANDQUICKEN': '雙手劍攻擊速度增加',
  'KN_AUTOCOUNTER': '反擊',
  'KN_RIDING': '騎術',
  'KN_PIERCE': '長矛刺擊',
  'KN_CHARGEATK': '衝鋒攻擊',
  'KN_BOWLINGBASH': '怪物互擊',
  'KN_CAVALIERMASTERY': '騎兵修練',
  'KN_SPEARBOOMERANG': '騎乘攻擊',
  'KN_SPEARSTAB': '連刺攻擊',
  'KN_BRANDISHSPEAR': '投擲長矛攻擊',
  
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
  
  // 牧師技能
  'PR_KYRIE': '光壁術',
  'PR_MAGNIFICAT': '聖母頌歌',
  'PR_STRECOVERY': '魔力恢復術改良',
  'PR_LEXDIVINA': '沉默術',
  'PR_IMPOSITIO': '聖體降福',
  'PR_SANCTUARY': '聖域',
  'PR_GLORIA': '光榮頌',
  'ALL_RESURRECTION': '復活術',
  'PR_LEXAETERNA': '雙倍攻擊',
  'PR_SUFFRAGIUM': '詠唱加速',
  'PR_ASPERSIO': '聖水',
  'PR_BENEDICTIO': '聖水製造',
  'PR_TURNUNDEAD': '轉生術',
  'PR_MAGNUS': '神聖之光',
  'PR_REDEMPTIO': '救贖術',
  
  // 武僧技能
  'MO_IRONHAND': '鐵拳功',
  'MO_DODGE': '殘影',
  'MO_KITRANSLATION': '氣功',
  'MO_CALLSPIRITS': '氣彈',
  'MO_INVESTIGATE': '阿修羅霸王拳',
  'MO_TRIPLEATTACK': '三連擊',
  'MO_BLADESTOP': '白刃取',
  'MO_BALKYOUNG': '太極拳',
  'MO_ABSORBSPIRITS': '氣功吸收',
  'MO_FINGEROFFENSIVE': '指彈',
  'MO_CHAINCOMBO': '連環拳',
  'MO_SPIRITSRECOVERY': '氣功恢復',
  'MO_EXPLOSIONSPIRITS': '爆氣',
  'MO_COMBOFINISH': '猛龍拳',
  'MO_STEELBODY': '金剛身',
  'MO_EXTREMITYFIST': '阿修羅霸王拳',
  'MO_BODYRELOCATION': '殘影步',
  
  // 巫師技能
  'WZ_ESTIMATION': '察看怪物',
  'WZ_ICEWALL': '冰牆術',
  'WZ_JUPITEL': '朱比特雷鳴',
  'WZ_HEAVENDRIVE': '天地靈氣',
  'WZ_SIGHTRASHER': '能量衝擊',
  'WZ_FIREPILLAR': '火柱術',
  'WZ_SIGHTBLASTER': '魔法感知爆破',
  'WZ_FROSTNOVA': '霜凍新星',
  'WZ_VERMILION': '落雷術',
  'WZ_QUAGMIRE': '沼澤術',
  'WZ_METEOR': '隕石術',
  'WZ_WATERBALL': '水球術',
  'WZ_STORMGUST': '暴風雪',
  
  // 賢者技能
  'SA_ADVANCEDBOOK': '進階書籍修練',
  'SA_ELEMENTWATER': '水元素製造',
  'SA_ELEMENTWIND': '風元素製造',
  'SA_ELEMENTGROUND': '地元素製造',
  'SA_ELEMENTFIRE': '火元素製造',
  'SA_CREATECON': '元素匯聚',
  'SA_SEISMICWEAPON': '地震術',
  'SA_CASTCANCEL': '詠唱中斷',
  'SA_MAGICROD': '魔法杖',
  'SA_FROSTWEAPON': '寒冰武器',
  'SA_LIGHTNINGLOADER': '雷電武器',
  'SA_FLAMELAUNCHER': '火焰武器',
  'SA_FREECAST': '自由詠唱',
  'SA_SPELLBREAKER': '魔法破除',
  'SA_DELUGE': '大洪水',
  'SA_VIOLENTGALE': '狂風暴雨',
  'SA_VOLCANO': '火山爆發',
  'SA_AUTOSPELL': '自動詠唱',
  'SA_DISPELL': '驅散術',
  'SA_LANDPROTECTOR': '地面保護',
  'SA_ABRACADABRA': '阿布拉卡達布拉',
  
  // 鐵匠技能
  'BS_IRON': '鐵礦石發現',
  'BS_SKINTEMPER': '皮膚強化',
  'BS_HILTBINDING': '武器修練',
  'BS_HAMMERFALL': '錘擊',
  'BS_DAGGER': '匕首製造',
  'BS_STEEL': '鋼鐵發現',
  'BS_ENCHANTEDSTONE': '礦石精煉',
  'BS_WEAPONRESEARCH': '武器研究',
  'BS_ADRENALINE': '腎上腺素激發',
  'BS_SPEAR': '長槍製造',
  'BS_SWORD': '劍製造',
  'BS_KNUCKLE': '拳套製造',
  'BS_FINDINGORE': '礦石發現',
  'BS_REPAIRWEAPON': '武器修理',
  'BS_WEAPONPERFECT': '武器完美化',
  'BS_OVERTHRUST': '武器強化',
  'BS_TWOHANDSWORD': '雙手劍製造',
  'BS_MACE': '鈍器製造',
  'BS_MAXIMIZE': '威力最大化',
  'BS_AXE': '斧頭製造',
  'BS_UNFAIRLYTRICK': '武器破壞',
  'WS_MELTDOWN': '武器溶解',
  
  // 獵人技能
  'HT_BEASTBANE': '野獸剋星',
  'HT_SKIDTRAP': '滑溜陷阱',
  'HT_LANDMINE': '地雷',
  'HT_FALCON': '獵鷹飼養',
  'HT_FLASHER': '閃光陷阱',
  'HT_ANKLESNARE': '捕獸夾',
  'HT_REMOVETRAP': '移除陷阱',
  'HT_PHANTASMIC': '幻象箭',
  'HT_BLITZBEAT': '獵鷹攻擊',
  'HT_SANDMAN': '沙塵陷阱',
  'HT_FREEZINGTRAP': '冰凍陷阱',
  'HT_SHOCKWAVE': '震盪陷阱',
  'HT_SPRINGTRAP': '彈跳陷阱',
  'HT_DETECTING': '偵測',
  'HT_STEELCROW': '鋼鐵獵鷹',
  'HT_BLASTMINE': '爆破地雷',
  'HT_TALKIEBOX': '呼喊陷阱',
  'HT_CLAYMORETRAP': '闊劍地雷',
  
  // 刺客技能
  'AS_RIGHT': '右手修練',
  'AS_KATAR': '拳刃修練',
  'AS_CLOAKING': '隱身術',
  'AS_ENCHANTPOISON': '附毒術',
  'AS_VENOMKNIFE': '毒刃',
  'AS_LEFT': '左手修練',
  'AS_SONICBLOW': '音速投擲',
  'AS_VENOMDUST': '毒粉術',
  'AS_POISONREACT': '毒反應',
  'AS_SONICACCEL': '音速加速',
  'AS_GRIMTOOTH': '鬼影襲擊',
  'AS_SPLASHER': '毒爆術',
  
  // 流氓技能
  'RG_TUNNELDRIVE': '地洞挖掘',
  'RG_SNATCHER': '搶奪',
  'RG_STRIPHELM': '頭盔剝離',
  'RG_CLOSECONFINE': '困獸鬥',
  'RG_BACKSTAP': '背刺',
  'RG_STRIPSHIELD': '盾牌剝離',
  'RG_RAID': '驚嚇攻擊',
  'RG_STRIPARMOR': '盔甲剝離',
  'RG_GANGSTER': '強盜威嚇',
  'RG_INTIMIDATE': '威嚇',
  'RG_STRIPWEAPON': '武器剝離',
  'RG_GRAFFITI': '塗鴉',
  'RG_COMPULSION': '強制威嚇',
  'RG_PLAGIARISM': '抄襲',
  
  // 鍊金術師技能
  'AM_LEARNINGPOTION': '藥劑學習',
  'AM_CP_HELM': '頭盔製造',
  'AM_BIOETHICS': '生物倫理',
  'AM_PHARMACY': '藥劑製造',
  'AM_CP_SHIELD': '盾牌製造',
  'AM_REST': '休息',
  'AM_SPHEREMINE': '球狀地雷',
  'AM_POTIONPITCHER': '藥劑投擲',
  'AM_DEMONSTRATION': '酸性恐怖',
  'AM_ACIDTERROR': '強酸恐怖',
  'AM_CANNIBALIZE': '生化人',
  'AM_CP_ARMOR': '盔甲製造',
  'AM_CALLHOMUN': '召喚生化人',
  'AM_CP_WEAPON': '武器製造',
  'AM_RESURRECTHOMUN': '生化人復活',
  
  // 詩人技能
  'BA_MUSICALLESSON': '音樂修練',
  'BA_DISSONANCE': '不和諧音',
  'BA_PANGVOICE': '刺耳音波',
  'BD_ENCORE': '安可',
  'BA_MUSICALSTRIKE': '樂器攻擊',
  'BA_WHISTLE': '口哨',
  'BA_ASSASSINCROSS': '死亡峽谷',
  'BA_POEMBRAGI': '布拉吉之詩',
  'BA_APPLEIDUN': '蘋果樹之歌',
  'BA_FROSTJOKE': '寒冰玩笑',
  'BD_LULLABY': '搖籃曲',
  'BD_ROKISWEIL': '洛基之嘆息',
  'BD_SIEGFRIED': '齊格菲的傳說',
  'BD_DRUMBATTLEFIELD': '戰鼓響起',
  'BD_INTOABYSS': '深淵湖光',
  'BD_ETERNALCHAOS': '永恆混沌',
  'BD_RICHMANKIM': '尼伯龍根之歌',
  'BD_RINGNIBELUNGEN': '尼伯龍根之指環',
  
  // 舞孃技能
  'BD_ADAPTATION': '演奏適應',
  'DC_DANCINGLESSON': '舞蹈修練',
  'DC_UGLYDANCE': '醜陋舞蹈',
  'DC_WINKCHARM': '媚眼',
  'DC_THROWARROW': '投擲箭矢',
  'DC_HUMMING': '哼歌',
  'DC_DONTFORGETME': '請勿忘記我',
  'DC_FORTUNEKISS': '幸運之吻',
  'DC_SERVICEFORYOU': '為你服務',
  'DC_SCREAM': '戰吼'
}

// 將 ragzero 資料轉換為我們的格式
function convertJobData(jobData: any, jobType: 'first' | 'second'): Job {
  const skills: Skill[] = []
  
  // 如果是二轉職業，先添加其一轉職業的技能
  if (jobType === 'second' && jobData.parentJobId) {
    const parentJob = roSkillDatabase.firstJobs[jobData.parentJobId.toString()]
    if (parentJob) {
      // 添加一轉職業的技能
      for (const [position, skillDetail] of Object.entries(parentJob.skillsDetailed)) {
        const detail = skillDetail as any
        const skillName = skillNameMapping[detail.skillName] || detail.chineseName || detail.skillName
        
        // 計算技能在技能樹中的位置
        const pos = parseInt(position)
        const x = ((pos - 1) % 6) + 1
        const y = Math.floor((pos - 1) / 6) + 1
        
        const skill: Skill = {
          id: detail.skillName.toLowerCase().replace('_', '_'),
          name: skillName,
          icon: getSkillIcon(detail.skillName),
          description: `${detail.skillName} - ${skillName} (基礎技能)`,
          maxLevel: 10,
          requirements: [],
          effects: [
            { level: 1, description: '等級 1 效果' },
            { level: 5, description: '等級 5 效果' },
            { level: 10, description: '等級 10 效果' }
          ],
          position: { x, y }
        }
        
        skills.push(skill)
      }
    }
  }
  
  // 添加當前職業的專屬技能
  for (const [position, skillDetail] of Object.entries(jobData.skillsDetailed)) {
    const detail = skillDetail as any
    const skillName = skillNameMapping[detail.skillName] || detail.chineseName || detail.skillName
    
    // 計算技能在技能樹中的位置 (二轉技能位置需要偏移)
    const pos = parseInt(position)
    let x = ((pos - 1) % 6) + 1
    let y = Math.floor((pos - 1) / 6) + 1
    
    // 如果是二轉職業，y座標需要偏移，避免與一轉技能重疊
    if (jobType === 'second') {
      y += 10 // 將二轉技能往下移動10行
    }
    
    const skill: Skill = {
      id: detail.skillName.toLowerCase().replace('_', '_'),
      name: skillName,
      icon: getSkillIcon(detail.skillName),
      description: `${detail.skillName} - ${skillName}${jobType === 'second' ? ' (進階技能)' : ''}`,
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
  // 使用實際的技能圖片檔案（由 process-skill-images.cjs 生成）
  // 目前已支援所有劍士(SM_*)和騎士(KN_*)技能圖片
  const imagePath = `/assets/skill-icons/${skillName}.png`
  
  // 備用 emoji 圖標對照表
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
  
  // 如果有對應的圖片，返回圖片路徑；否則返回 emoji
  return imagePath
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