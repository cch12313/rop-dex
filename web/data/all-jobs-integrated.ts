import type { JobClass, Job, Skill, StatBonuses } from '~/types/skill'
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
  'KN_RIDING': '騎乘術',
  'KN_PIERCE': '長矛刺擊',
  'KN_CHARGEATK': '衝鋒攻擊',
  'KN_BOWLINGBASH': '怪物互擊',
  'KN_CAVALIERMASTERY': '騎兵修練',
  'KN_SPEARBOOMERANG': '騎乘攻擊',
  'KN_SPEARSTAB': '連刺攻擊',
  'KN_BRANDISHSPEAR': '投擲長矛攻擊',
  
  // 十字軍技能
  'CR_AUTOGUARD': '自動防禦',
  'CR_SHIELDCHARGE': '盾擊',
  'CR_SHIELDBOOMERANG': '迴旋盾擊',
  'CR_DEFENDER': '光之盾',
  'CR_REFLECTSHIELD': '反射盾',
  'CR_TRUST': '信任',
  'CR_HOLYCROSS': '聖十字攻擊',
  'CR_GRANDCROSS': '聖十字審判',
  'CR_DEVOTION': '犧牲',
  'CR_PROVIDENCE': '神祐之光',
  'CR_SPEARQUICKEN': '長矛加速術',
  'CR_SHRINK': '退縮',
  
  // 十字軍繼承的服事技能
  'AL_HEAL': '治療術',
  'AL_DP': '天使之護',
  'AL_DEMONBANE': '天使之擊',
  'AL_CURE': '治癒術',
  
  // 十字軍繼承的騎士技能已在騎士技能部分定義，無需重複
  
  // 法師技能
  'MG_STONECURSE': '石化術',
  'MG_COLDBOLT': '冰箭術',
  'MG_LIGHTNINGBOLT': '雷擊術',
  'MG_NAPALMBEAT': '聖靈召喚',
  'MG_FIREBOLT': '火箭術',
  'MG_SIGHT': '火狩',
  'WZ_EARTHSPIKE': '地震術',
  'MG_FROSTDIVER': '冰凍術',
  'MG_THUNDERSTORM': '雷爆術',
  'MG_SOULSTRIKE': '心靈爆破',
  'MG_FIREBALL': '火球術',
  'MG_ENERGYCOAT': '能量外套',
  'MG_SRECOVERY': '禪心',
  'MG_SAFETYWALL': '暗之障壁',
  'MG_FIREWALL': '火焰之壁',
  
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
  'AL_HOLYLIGHT': '天使之擊',
  'AL_TELEPORT': '瞬間移動',
  'AL_INCAGI': '敏捷提升',
  'AL_BLESSING': '天使之護',
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
  'WZ_ESTIMATION': '怪物情報',
  'WZ_ICEWALL': '冰刃之牆',
  'WZ_JUPITEL': '雷鳴術',
  'WZ_HEAVENDRIVE': '崩裂術',
  'WZ_SIGHTRASHER': '火之獵殺',
  'WZ_FIREPILLAR': '火柱攻擊',
  'WZ_SIGHTBLASTER': '火狩芽',
  'WZ_FROSTNOVA': '霜凍之術',
  'WZ_VERMILION': '怒雷強擊',
  'WZ_QUAGMIRE': '泥沼地',
  'WZ_METEOR': '隕石術',
  'WZ_WATERBALL': '水球術',
  'WZ_STORMGUST': '暴風雪',
  'WZ_FIREPILLAR2': '火焰藤蔓',
  
  // 賢者技能
  'SA_ADVANCEDBOOK': '進化之書',
  'SA_DRAGONOLOGY': '龍知識',
  'SA_FLAMELAUNCHER': '火屬性附加',
  'SA_VOLCANO': '火元素領域',
  'SA_LIGHTNINGLOADER': '風屬性附加',
  'SA_VIOLENTGALE': '風元素領域',
  'SA_FROSTWEAPON': '水屬性附加',
  'SA_DELUGE': '水元素領域',
  'SA_LANDPROTECTOR': '地元素領域',
  'SA_SEISMICWEAPON': '地屬性附加',
  'SA_CASTCANCEL': '取消施法',
  'SA_FREECAST': '自由施法',
  'SA_AUTOSPELL': '自動念咒',
  'SA_MAGICROD': '魔法懲罰',
  'SA_SPELLBREAKER': '念咒拆除',
  'SA_DISPELL': '魔法效果解除',
  'SA_ABRACADABRA': '隨機技能',
  'SA_CREATECON': '肯貝特製作',
  'SA_ELEMENTGROUND': '地屬性元素更換',
  'SA_ELEMENTFIRE': '火屬性元素更換',
  'SA_ELEMENTWIND': '風屬性元素更換',
  'SA_ELEMENTWATER': '水屬性元素更換',
  
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

// 職業統計資料映射表 - 從 stat-calculator.vue 合併過來
interface JobStatsData {
  classId: string
  className: string
  hpCoefficient: number
  spCoefficient: number
  statBonuses: StatBonuses
}

const jobStatsMapping: { [jobId: string]: JobStatsData } = {
  // 劍士系
  '7': { // 騎士
    classId: 'swordsman',
    className: '劍士系',
    hpCoefficient: 1.25,
    spCoefficient: 0.75,
      statBonuses: { str: 8, agi: 2, vit: 10, int: 0, dex: 6, luk: 4 }
  },
  '14': { // 十字軍
    classId: 'swordsman',
    className: '劍士系',
    hpCoefficient: 1.3,
    spCoefficient: 0.8,
      statBonuses: { str: 7, agi: 2, vit: 7, int: 6, dex: 3, luk: 5 }
  },
  // 法師系
  '9': { // 巫師
    classId: 'mage',
    className: '法師系',
    hpCoefficient: 0.65,
    spCoefficient: 1.6,
      statBonuses: { str: 1, agi: 8, vit: 1, int: 12, dex: 6, luk: 2 }
  },
  '16': { // 賢者
    classId: 'mage',
    className: '法師系',
    hpCoefficient: 0.75,
    spCoefficient: 1.4,
      statBonuses: { str: 5, agi: 5, vit: 3, int: 9, dex: 5, luk: 3 }
  },
  // 弓箭手系
  '11': { // 獵人
    classId: 'archer',
    className: '弓箭手系',
    hpCoefficient: 0.85,
    spCoefficient: 0.95,
    statBonuses: { str: 4, agi: 6, vit: 2, int: 4, dex: 10, luk: 4 }
  },
  '19': { // 詩人
    classId: 'archer',
    className: '弓箭手系',
    hpCoefficient: 0.8,
    spCoefficient: 1.1,
    statBonuses: { str: 2, agi: 7, vit: 3, int: 5, dex: 9, luk: 4 }
  },
  '20': { // 舞孃
    classId: 'archer',
    className: '弓箭手系',
    hpCoefficient: 0.8,
    spCoefficient: 1.1,
    statBonuses: { str: 2, agi: 7, vit: 3, int: 5, dex: 5, luk: 8 }
  },
  // 服事系
  '8': { // 牧師
    classId: 'acolyte',
    className: '服事系',
    hpCoefficient: 1.0,
    spCoefficient: 1.4,
    statBonuses: { str: 5, agi: 4, vit: 5, int: 5, dex: 4, luk: 7 }
  },
  '15': { // 武僧
    classId: 'acolyte',
    className: '服事系',
    hpCoefficient: 1.1,
    spCoefficient: 1.2,
    statBonuses: { str: 8, agi: 7, vit: 6, int: 2, dex: 4, luk: 3 }
  },
  // 商人系
  '10': { // 鐵匠
    classId: 'merchant',
    className: '商人系',
    hpCoefficient: 1.15,
    spCoefficient: 0.85,
      statBonuses: { str: 6, agi: 2, vit: 6, int: 2, dex: 12, luk: 2 }
  },
  '18': { // 鍊金術師
    classId: 'merchant',
    className: '商人系',
    hpCoefficient: 1.05,
    spCoefficient: 1.0,
      statBonuses: { str: 5, agi: 6, vit: 3, int: 7, dex: 9, luk: 0 }
  },
  // 盜賊系
  '12': { // 刺客
    classId: 'thief',
    className: '盜賊系',
    hpCoefficient: 0.75,
    spCoefficient: 0.9,
      statBonuses: { str: 6, agi: 10, vit: 2, int: 4, dex: 8, luk: 0 }
  },
  '17': { // 流氓
    classId: 'thief',
    className: '盜賊系',
    hpCoefficient: 0.85,
    spCoefficient: 1.0,
      statBonuses: { str: 6, agi: 7, vit: 6, int: 4, dex: 7, luk: 0 }
  }
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
  
  // 獲取職業統計資料
  const jobId = jobData.jobId.toString()
  const statsData = jobStatsMapping[jobId] || {
    classId: 'unknown',
    className: '未知',
    hpCoefficient: 1.0,
    spCoefficient: 1.0,
    statBonuses: {}
  }

  return {
    id: jobId,
    name: jobData.jobName.chinese,
    icon: getJobIcon(jobData.jobName.chinese),
    description: `${jobData.jobName.korean} - ${jobData.jobName.chinese}`,
    skills,
    baseSkillPoints: 49,
    classId: statsData.classId,
    className: statsData.className,
    hpCoefficient: statsData.hpCoefficient,
    spCoefficient: statsData.spCoefficient,
    statBonuses: statsData.statBonuses
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