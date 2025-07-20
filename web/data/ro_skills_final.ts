// RO Zero 完整技能資料
// 自動生成於 2025-07-20T11:18:10.162Z

export interface SkillDetail {
  skillName: string;
  chineseName: string;
  position: number;
}

export interface JobData {
  jobId: number;
  jobName: {
    korean: string;
    chinese: string;
  };
  parentJobId?: number;
  skills: { [position: string]: string };
  skillsDetailed: { [position: string]: SkillDetail };
  skillCount: number;
}

export interface JobPath {
  firstJob: {
    id: string;
    name: { korean: string; chinese: string };
  };
  secondJob: {
    id: string;
    name: { korean: string; chinese: string };
  };
  path: string;
}

export interface JobStatistics {
  totalFirstJobs: number;
  totalSecondJobs: number;
  totalSkills: number;
  skillsByJob: {
    [jobId: string]: {
      jobName: { korean: string; chinese: string };
      skillCount: number;
      type: 'first' | 'second';
      parentJobId?: number;
    };
  };
}

export interface ROSkillDatabase {
  firstJobs: { [jobId: string]: JobData };
  secondJobs: { [jobId: string]: JobData };
  jobInheritance: { [secondJobId: string]: number };
  jobIds: { [jobName: string]: number };
  jobPaths: { [secondJobId: string]: JobPath };
  statistics: JobStatistics;
}

export const roSkillDatabase: ROSkillDatabase = {
  "firstJobs": {
    "1": {
      "jobId": 1,
      "jobName": {
        "korean": "검사",
        "chinese": "劍士"
      },
      "skills": {
        "1": "SM_SWORD",
        "2": "SM_RECOVERY",
        "3": "SM_BASH",
        "4": "SM_PROVOKE",
        "5": "SM_AUTOBERSERK",
        "6": "SM_MOVINGRECOVERY",
        "8": "SM_TWOHAND",
        "10": "SM_MAGNUM",
        "11": "SM_ENDURE",
        "12": "SM_FATALBLOW",
        "15": "KN_SPEARMASTERY"
      },
      "skillCount": 11,
      "skillsDetailed": {
        "1": {
          "skillName": "SM_SWORD",
          "chineseName": "劍術修練",
          "position": 1
        },
        "2": {
          "skillName": "SM_RECOVERY",
          "chineseName": "體力恢復術",
          "position": 2
        },
        "3": {
          "skillName": "SM_BASH",
          "chineseName": "強力攻擊",
          "position": 3
        },
        "4": {
          "skillName": "SM_PROVOKE",
          "chineseName": "挑釁",
          "position": 4
        },
        "5": {
          "skillName": "SM_AUTOBERSERK",
          "chineseName": "自動狂暴",
          "position": 5
        },
        "6": {
          "skillName": "SM_MOVINGRECOVERY",
          "chineseName": "移動時體力恢復",
          "position": 6
        },
        "8": {
          "skillName": "SM_TWOHAND",
          "chineseName": "雙手劍修練",
          "position": 8
        },
        "10": {
          "skillName": "SM_MAGNUM",
          "chineseName": "劍氣擊",
          "position": 10
        },
        "11": {
          "skillName": "SM_ENDURE",
          "chineseName": "霸體",
          "position": 11
        },
        "12": {
          "skillName": "SM_FATALBLOW",
          "chineseName": "致命攻擊",
          "position": 12
        },
        "15": {
          "skillName": "KN_SPEARMASTERY",
          "chineseName": "長槍修練",
          "position": 15
        }
      }
    },
    "2": {
      "jobId": 2,
      "jobName": {
        "korean": "마법사",
        "chinese": "法師"
      },
      "skills": {
        "1": "MG_STONECURSE",
        "2": "MG_COLDBOLT",
        "3": "MG_LIGHTNINGBOLT",
        "4": "MG_NAPALMBEAT",
        "5": "MG_FIREBOLT",
        "6": "MG_SIGHT",
        "8": "WZ_EARTHSPIKE",
        "9": "MG_FROSTDIVER",
        "10": "MG_THUNDERSTORM",
        "11": "MG_SOULSTRIKE",
        "12": "MG_FIREBALL",
        "13": "MG_ENERGYCOAT",
        "15": "MG_SRECOVERY",
        "18": "MG_SAFETYWALL",
        "19": "MG_FIREWALL"
      },
      "skillCount": 15,
      "skillsDetailed": {
        "1": {
          "skillName": "MG_STONECURSE",
          "chineseName": "石化術",
          "position": 1
        },
        "2": {
          "skillName": "MG_COLDBOLT",
          "chineseName": "冰箭術",
          "position": 2
        },
        "3": {
          "skillName": "MG_LIGHTNINGBOLT",
          "chineseName": "閃電術",
          "position": 3
        },
        "4": {
          "skillName": "MG_NAPALMBEAT",
          "chineseName": "靈魂攻擊",
          "position": 4
        },
        "5": {
          "skillName": "MG_FIREBOLT",
          "chineseName": "火箭術",
          "position": 5
        },
        "6": {
          "skillName": "MG_SIGHT",
          "chineseName": "魔法感知",
          "position": 6
        },
        "8": {
          "skillName": "WZ_EARTHSPIKE",
          "chineseName": "地裂術",
          "position": 8
        },
        "9": {
          "skillName": "MG_FROSTDIVER",
          "chineseName": "冰凍術",
          "position": 9
        },
        "10": {
          "skillName": "MG_THUNDERSTORM",
          "chineseName": "雷鳴術",
          "position": 10
        },
        "11": {
          "skillName": "MG_SOULSTRIKE",
          "chineseName": "靈魂攻擊",
          "position": 11
        },
        "12": {
          "skillName": "MG_FIREBALL",
          "chineseName": "火球術",
          "position": 12
        },
        "13": {
          "skillName": "MG_ENERGYCOAT",
          "chineseName": "魔法盾",
          "position": 13
        },
        "15": {
          "skillName": "MG_SRECOVERY",
          "chineseName": "魔力恢復術",
          "position": 15
        },
        "18": {
          "skillName": "MG_SAFETYWALL",
          "chineseName": "安全壁",
          "position": 18
        },
        "19": {
          "skillName": "MG_FIREWALL",
          "chineseName": "火牆術",
          "position": 19
        }
      }
    },
    "3": {
      "jobId": 3,
      "jobName": {
        "korean": "궁수",
        "chinese": "弓箭手"
      },
      "skills": {
        "2": "AC_DOUBLE",
        "3": "AC_OWL",
        "5": "AC_CHARGEARROW",
        "9": "AC_SHOWER",
        "10": "AC_VULTURE",
        "12": "AC_MAKINGARROW",
        "17": "AC_CONCENTRATION"
      },
      "skillCount": 7,
      "skillsDetailed": {
        "2": {
          "skillName": "AC_DOUBLE",
          "chineseName": "二連射",
          "position": 2
        },
        "3": {
          "skillName": "AC_OWL",
          "chineseName": "鷹眼",
          "position": 3
        },
        "5": {
          "skillName": "AC_CHARGEARROW",
          "chineseName": "衝擊箭",
          "position": 5
        },
        "9": {
          "skillName": "AC_SHOWER",
          "chineseName": "箭雨",
          "position": 9
        },
        "10": {
          "skillName": "AC_VULTURE",
          "chineseName": "禿鷹眼",
          "position": 10
        },
        "12": {
          "skillName": "AC_MAKINGARROW",
          "chineseName": "製造箭矢",
          "position": 12
        },
        "17": {
          "skillName": "AC_CONCENTRATION",
          "chineseName": "專注",
          "position": 17
        }
      }
    },
    "4": {
      "jobId": 4,
      "jobName": {
        "korean": "복사",
        "chinese": "服事"
      },
      "skills": {
        "1": "AL_RUWACH",
        "2": "AL_HEAL",
        "3": "AL_HOLYWATER",
        "4": "PR_MACEMASTERY",
        "5": "AL_DP",
        "6": "AL_HOLYLIGHT",
        "8": "AL_TELEPORT",
        "9": "AL_CURE",
        "10": "AL_INCAGI",
        "11": "AL_BLESSING",
        "12": "AL_DEMONBANE",
        "13": "AL_ANGELUS",
        "15": "AL_WARP",
        "17": "AL_DECAGI",
        "19": "AL_CRUCIS",
        "22": "AL_PNEUMA"
      },
      "skillCount": 16,
      "skillsDetailed": {
        "1": {
          "skillName": "AL_RUWACH",
          "chineseName": "探知",
          "position": 1
        },
        "2": {
          "skillName": "AL_HEAL",
          "chineseName": "治癒術",
          "position": 2
        },
        "3": {
          "skillName": "AL_HOLYWATER",
          "chineseName": "聖水製造",
          "position": 3
        },
        "4": {
          "skillName": "PR_MACEMASTERY",
          "chineseName": "鈍器修練",
          "position": 4
        },
        "5": {
          "skillName": "AL_DP",
          "chineseName": "神聖攻擊",
          "position": 5
        },
        "6": {
          "skillName": "AL_HOLYLIGHT",
          "chineseName": "聖光術",
          "position": 6
        },
        "8": {
          "skillName": "AL_TELEPORT",
          "chineseName": "瞬間移動",
          "position": 8
        },
        "9": {
          "skillName": "AL_CURE",
          "chineseName": "治療",
          "position": 9
        },
        "10": {
          "skillName": "AL_INCAGI",
          "chineseName": "敏捷提升",
          "position": 10
        },
        "11": {
          "skillName": "AL_BLESSING",
          "chineseName": "祝福",
          "position": 11
        },
        "12": {
          "skillName": "AL_DEMONBANE",
          "chineseName": "惡魔剋星",
          "position": 12
        },
        "13": {
          "skillName": "AL_ANGELUS",
          "chineseName": "天使之障壁",
          "position": 13
        },
        "15": {
          "skillName": "AL_WARP",
          "chineseName": "傳送之陣",
          "position": 15
        },
        "17": {
          "skillName": "AL_DECAGI",
          "chineseName": "敏捷降低",
          "position": 17
        },
        "19": {
          "skillName": "AL_CRUCIS",
          "chineseName": "聖十字驅魔",
          "position": 19
        },
        "22": {
          "skillName": "AL_PNEUMA",
          "chineseName": "聖靈術",
          "position": 22
        }
      }
    },
    "5": {
      "jobId": 5,
      "jobName": {
        "korean": "상인",
        "chinese": "商人"
      },
      "skills": {
        "1": "MC_INCCARRY",
        "2": "AM_AXEMASTERY",
        "3": "MC_MAMMONITE",
        "5": "MC_LOUD",
        "6": "MC_IDENTIFY",
        "8": "MC_DISCOUNT",
        "9": "MC_PUSHCART",
        "12": "MC_CHANGECART",
        "13": "MC_CARTDECORATE",
        "15": "MC_OVERCHARGE",
        "16": "MC_VENDING",
        "19": "MC_CARTREVOLUTION",
        "26": "WS_CARTBOOST"
      },
      "skillCount": 13,
      "skillsDetailed": {
        "1": {
          "skillName": "MC_INCCARRY",
          "chineseName": "負重提升",
          "position": 1
        },
        "2": {
          "skillName": "AM_AXEMASTERY",
          "chineseName": "斧頭修練",
          "position": 2
        },
        "3": {
          "skillName": "MC_MAMMONITE",
          "chineseName": "金錢攻擊",
          "position": 3
        },
        "5": {
          "skillName": "MC_LOUD",
          "chineseName": "大聲叫賣",
          "position": 5
        },
        "6": {
          "skillName": "MC_IDENTIFY",
          "chineseName": "物品鑑定",
          "position": 6
        },
        "8": {
          "skillName": "MC_DISCOUNT",
          "chineseName": "折扣",
          "position": 8
        },
        "9": {
          "skillName": "MC_PUSHCART",
          "chineseName": "手推車",
          "position": 9
        },
        "12": {
          "skillName": "MC_CHANGECART",
          "chineseName": "換推車",
          "position": 12
        },
        "13": {
          "skillName": "MC_CARTDECORATE",
          "chineseName": "推車裝飾",
          "position": 13
        },
        "15": {
          "skillName": "MC_OVERCHARGE",
          "chineseName": "高價出售",
          "position": 15
        },
        "16": {
          "skillName": "MC_VENDING",
          "chineseName": "開設商店",
          "position": 16
        },
        "19": {
          "skillName": "MC_CARTREVOLUTION",
          "chineseName": "瘋狂推車",
          "position": 19
        },
        "26": {
          "skillName": "WS_CARTBOOST",
          "chineseName": "推車加速",
          "position": 26
        }
      }
    },
    "6": {
      "jobId": 6,
      "jobName": {
        "korean": "도둑",
        "chinese": "盜賊"
      },
      "skills": {
        "1": "TF_DOUBLE",
        "2": "TF_STEAL",
        "3": "TF_POISON",
        "4": "TF_SPRINKLESAND",
        "5": "TF_THROWSTONE",
        "8": "TF_MISS",
        "9": "TF_HIDING",
        "10": "TF_DETOXIFY",
        "11": "TF_BACKSLIDING",
        "12": "TF_PICKSTONE",
        "15": "SM_SWORD"
      },
      "skillCount": 11,
      "skillsDetailed": {
        "1": {
          "skillName": "TF_DOUBLE",
          "chineseName": "二刀連擊",
          "position": 1
        },
        "2": {
          "skillName": "TF_STEAL",
          "chineseName": "偷竊",
          "position": 2
        },
        "3": {
          "skillName": "TF_POISON",
          "chineseName": "塗毒",
          "position": 3
        },
        "4": {
          "skillName": "TF_SPRINKLESAND",
          "chineseName": "撒沙",
          "position": 4
        },
        "5": {
          "skillName": "TF_THROWSTONE",
          "chineseName": "投石攻擊",
          "position": 5
        },
        "8": {
          "skillName": "TF_MISS",
          "chineseName": "迴避提升",
          "position": 8
        },
        "9": {
          "skillName": "TF_HIDING",
          "chineseName": "隱匿",
          "position": 9
        },
        "10": {
          "skillName": "TF_DETOXIFY",
          "chineseName": "解毒",
          "position": 10
        },
        "11": {
          "skillName": "TF_BACKSLIDING",
          "chineseName": "後滑步",
          "position": 11
        },
        "12": {
          "skillName": "TF_PICKSTONE",
          "chineseName": "撿石頭",
          "position": 12
        },
        "15": {
          "skillName": "SM_SWORD",
          "chineseName": "劍術修練",
          "position": 15
        }
      }
    }
  },
  "secondJobs": {
    "7": {
      "jobId": 7,
      "jobName": {
        "korean": "나이트",
        "chinese": "騎士"
      },
      "parentJobId": 1,
      "skills": {
        "0": "KN_TWOHANDQUICKEN",
        "1": "KN_AUTOCOUNTER",
        "2": "KN_RIDING",
        "3": "KN_PIERCE",
        "6": "KN_CHARGEATK",
        "8": "KN_BOWLINGBASH",
        "9": "KN_CAVALIERMASTERY",
        "10": "KN_SPEARBOOMERANG",
        "17": "KN_SPEARSTAB",
        "24": "KN_BRANDISHSPEAR"
      },
      "skillCount": 10,
      "skillsDetailed": {
        "0": {
          "skillName": "KN_TWOHANDQUICKEN",
          "chineseName": "雙手劍加速",
          "position": 0
        },
        "1": {
          "skillName": "KN_AUTOCOUNTER",
          "chineseName": "自動反擊",
          "position": 1
        },
        "2": {
          "skillName": "KN_RIDING",
          "chineseName": "騎術",
          "position": 2
        },
        "3": {
          "skillName": "KN_PIERCE",
          "chineseName": "穿刺攻擊",
          "position": 3
        },
        "6": {
          "skillName": "KN_CHARGEATK",
          "chineseName": "衝鋒攻擊",
          "position": 6
        },
        "8": {
          "skillName": "KN_BOWLINGBASH",
          "chineseName": "衝擊波",
          "position": 8
        },
        "9": {
          "skillName": "KN_CAVALIERMASTERY",
          "chineseName": "騎兵修練",
          "position": 9
        },
        "10": {
          "skillName": "KN_SPEARBOOMERANG",
          "chineseName": "長槍迴旋",
          "position": 10
        },
        "17": {
          "skillName": "KN_SPEARSTAB",
          "chineseName": "長槍連擊",
          "position": 17
        },
        "24": {
          "skillName": "KN_BRANDISHSPEAR",
          "chineseName": "長槍揮舞",
          "position": 24
        }
      }
    },
    "8": {
      "jobId": 8,
      "jobName": {
        "korean": "프리스트",
        "chinese": "牧師"
      },
      "parentJobId": 4,
      "skills": {
        "0": "PR_KYRIE",
        "1": "PR_MAGNIFICAT",
        "2": "PR_STRECOVERY",
        "3": "MG_SRECOVERY",
        "4": "PR_LEXDIVINA",
        "5": "PR_IMPOSITIO",
        "6": "PR_SANCTUARY",
        "7": "PR_GLORIA",
        "9": "ALL_RESURRECTION",
        "11": "PR_LEXAETERNA",
        "12": "PR_SUFFRAGIUM",
        "13": "PR_ASPERSIO",
        "14": "PR_BENEDICTIO",
        "16": "PR_TURNUNDEAD",
        "20": "MG_SAFETYWALL",
        "25": "PR_MAGNUS",
        "27": "PR_REDEMPTIO"
      },
      "skillCount": 17,
      "skillsDetailed": {
        "0": {
          "skillName": "PR_KYRIE",
          "chineseName": "光之護盾",
          "position": 0
        },
        "1": {
          "skillName": "PR_MAGNIFICAT",
          "chineseName": "聖母頌歌",
          "position": 1
        },
        "2": {
          "skillName": "PR_STRECOVERY",
          "chineseName": "狀態恢復",
          "position": 2
        },
        "3": {
          "skillName": "MG_SRECOVERY",
          "chineseName": "魔力恢復術",
          "position": 3
        },
        "4": {
          "skillName": "PR_LEXDIVINA",
          "chineseName": "沉默術",
          "position": 4
        },
        "5": {
          "skillName": "PR_IMPOSITIO",
          "chineseName": "武器祝福",
          "position": 5
        },
        "6": {
          "skillName": "PR_SANCTUARY",
          "chineseName": "聖域",
          "position": 6
        },
        "7": {
          "skillName": "PR_GLORIA",
          "chineseName": "讚美詩",
          "position": 7
        },
        "9": {
          "skillName": "ALL_RESURRECTION",
          "chineseName": "復活術",
          "position": 9
        },
        "11": {
          "skillName": "PR_LEXAETERNA",
          "chineseName": "暴擊詛咒",
          "position": 11
        },
        "12": {
          "skillName": "PR_SUFFRAGIUM",
          "chineseName": "詠唱輔助",
          "position": 12
        },
        "13": {
          "skillName": "PR_ASPERSIO",
          "chineseName": "武器聖化",
          "position": 13
        },
        "14": {
          "skillName": "PR_BENEDICTIO",
          "chineseName": "聖水祝福",
          "position": 14
        },
        "16": {
          "skillName": "PR_TURNUNDEAD",
          "chineseName": "轉生術",
          "position": 16
        },
        "20": {
          "skillName": "MG_SAFETYWALL",
          "chineseName": "安全壁",
          "position": 20
        },
        "25": {
          "skillName": "PR_MAGNUS",
          "chineseName": "驅魔術",
          "position": 25
        },
        "27": {
          "skillName": "PR_REDEMPTIO",
          "chineseName": "救贖術",
          "position": 27
        }
      }
    },
    "9": {
      "jobId": 9,
      "jobName": {
        "korean": "위자드",
        "chinese": "巫師"
      },
      "parentJobId": 2,
      "skills": {
        "0": "WZ_ESTIMATION",
        "1": "WZ_ICEWALL",
        "2": "WZ_JUPITEL",
        "3": "WZ_HEAVENDRIVE",
        "4": "WZ_SIGHTRASHER",
        "5": "WZ_FIREPILLAR",
        "6": "WZ_SIGHTBLASTER",
        "8": "WZ_FROSTNOVA",
        "9": "WZ_VERMILION",
        "10": "WZ_QUAGMIRE",
        "11": "WZ_METEOR",
        "15": "WZ_WATERBALL",
        "22": "WZ_STORMGUST"
      },
      "skillCount": 13,
      "skillsDetailed": {
        "0": {
          "skillName": "WZ_ESTIMATION",
          "chineseName": "怪物情報",
          "position": 0
        },
        "1": {
          "skillName": "WZ_ICEWALL",
          "chineseName": "冰牆術",
          "position": 1
        },
        "2": {
          "skillName": "WZ_JUPITEL",
          "chineseName": "雷神之怒",
          "position": 2
        },
        "3": {
          "skillName": "WZ_HEAVENDRIVE",
          "chineseName": "大地之矛",
          "position": 3
        },
        "4": {
          "skillName": "WZ_SIGHTRASHER",
          "chineseName": "念動波",
          "position": 4
        },
        "5": {
          "skillName": "WZ_FIREPILLAR",
          "chineseName": "火柱術",
          "position": 5
        },
        "6": {
          "skillName": "WZ_SIGHTBLASTER",
          "chineseName": "衝擊波",
          "position": 6
        },
        "8": {
          "skillName": "WZ_FROSTNOVA",
          "chineseName": "冰霜新星",
          "position": 8
        },
        "9": {
          "skillName": "WZ_VERMILION",
          "chineseName": "火龍降臨",
          "position": 9
        },
        "10": {
          "skillName": "WZ_QUAGMIRE",
          "chineseName": "沼澤術",
          "position": 10
        },
        "11": {
          "skillName": "WZ_METEOR",
          "chineseName": "隕石術",
          "position": 11
        },
        "15": {
          "skillName": "WZ_WATERBALL",
          "chineseName": "水球術",
          "position": 15
        },
        "22": {
          "skillName": "WZ_STORMGUST",
          "chineseName": "暴風雪",
          "position": 22
        }
      }
    },
    "10": {
      "jobId": 10,
      "jobName": {
        "korean": "블랙스미스",
        "chinese": "鐵匠"
      },
      "parentJobId": 5,
      "skills": {
        "0": "BS_IRON",
        "1": "BS_SKINTEMPER",
        "2": "BS_HILTBINDING",
        "3": "BS_HAMMERFALL",
        "5": "BS_DAGGER",
        "7": "BS_STEEL",
        "8": "BS_ENCHANTEDSTONE",
        "9": "BS_WEAPONRESEARCH",
        "10": "BS_ADRENALINE",
        "11": "BS_SPEAR",
        "12": "BS_SWORD",
        "13": "BS_KNUCKLE",
        "14": "BS_FINDINGORE",
        "16": "BS_REPAIRWEAPON",
        "17": "BS_WEAPONPERFECT",
        "18": "BS_OVERTHRUST",
        "19": "BS_TWOHANDSWORD",
        "20": "BS_MACE",
        "22": "WS_MELTDOWN",
        "24": "BS_MAXIMIZE",
        "26": "BS_AXE",
        "34": "BS_UNFAIRLYTRICK"
      },
      "skillCount": 22,
      "skillsDetailed": {
        "0": {
          "skillName": "BS_IRON",
          "chineseName": "鐵礦精鍊",
          "position": 0
        },
        "1": {
          "skillName": "BS_SKINTEMPER",
          "chineseName": "武器淬火",
          "position": 1
        },
        "2": {
          "skillName": "BS_HILTBINDING",
          "chineseName": "武器強化",
          "position": 2
        },
        "3": {
          "skillName": "BS_HAMMERFALL",
          "chineseName": "巨錘擊",
          "position": 3
        },
        "5": {
          "skillName": "BS_DAGGER",
          "chineseName": "匕首製造",
          "position": 5
        },
        "7": {
          "skillName": "BS_STEEL",
          "chineseName": "鋼鐵精鍊",
          "position": 7
        },
        "8": {
          "skillName": "BS_ENCHANTEDSTONE",
          "chineseName": "神秘石精鍊",
          "position": 8
        },
        "9": {
          "skillName": "BS_WEAPONRESEARCH",
          "chineseName": "武器研究",
          "position": 9
        },
        "10": {
          "skillName": "BS_ADRENALINE",
          "chineseName": "腎上腺素激發",
          "position": 10
        },
        "11": {
          "skillName": "BS_SPEAR",
          "chineseName": "長槍製造",
          "position": 11
        },
        "12": {
          "skillName": "BS_SWORD",
          "chineseName": "劍製造",
          "position": 12
        },
        "13": {
          "skillName": "BS_KNUCKLE",
          "chineseName": "拳套製造",
          "position": 13
        },
        "14": {
          "skillName": "BS_FINDINGORE",
          "chineseName": "礦石探索",
          "position": 14
        },
        "16": {
          "skillName": "BS_REPAIRWEAPON",
          "chineseName": "武器修理",
          "position": 16
        },
        "17": {
          "skillName": "BS_WEAPONPERFECT",
          "chineseName": "武器完美化",
          "position": 17
        },
        "18": {
          "skillName": "BS_OVERTHRUST",
          "chineseName": "武器過度推進",
          "position": 18
        },
        "19": {
          "skillName": "BS_TWOHANDSWORD",
          "chineseName": "雙手劍製造",
          "position": 19
        },
        "20": {
          "skillName": "BS_MACE",
          "chineseName": "鈍器製造",
          "position": 20
        },
        "22": {
          "skillName": "WS_MELTDOWN",
          "chineseName": "酸蝕攻擊",
          "position": 22
        },
        "24": {
          "skillName": "BS_MAXIMIZE",
          "chineseName": "力量最大化",
          "position": 24
        },
        "26": {
          "skillName": "BS_AXE",
          "chineseName": "斧製造",
          "position": 26
        },
        "34": {
          "skillName": "BS_UNFAIRLYTRICK",
          "chineseName": "瞬間折扣",
          "position": 34
        }
      }
    },
    "11": {
      "jobId": 11,
      "jobName": {
        "korean": "헌터",
        "chinese": "獵人"
      },
      "parentJobId": 3,
      "skills": {
        "0": "HT_BEASTBANE",
        "2": "HT_SKIDTRAP",
        "4": "HT_LANDMINE",
        "7": "HT_FALCON",
        "9": "HT_FLASHER",
        "10": "HT_ANKLESNARE",
        "11": "HT_REMOVETRAP",
        "13": "HT_PHANTASMIC",
        "14": "HT_BLITZBEAT",
        "15": "HT_SANDMAN",
        "16": "HT_FREEZINGTRAP",
        "17": "HT_SHOCKWAVE",
        "18": "HT_SPRINGTRAP",
        "19": "HT_DETECTING",
        "21": "HT_STEELCROW",
        "22": "HT_BLASTMINE",
        "24": "HT_TALKIEBOX",
        "29": "HT_CLAYMORETRAP"
      },
      "skillCount": 18,
      "skillsDetailed": {
        "0": {
          "skillName": "HT_BEASTBANE",
          "chineseName": "野獸剋星",
          "position": 0
        },
        "2": {
          "skillName": "HT_SKIDTRAP",
          "chineseName": "地雷",
          "position": 2
        },
        "4": {
          "skillName": "HT_LANDMINE",
          "chineseName": "地雷",
          "position": 4
        },
        "7": {
          "skillName": "HT_FALCON",
          "chineseName": "獵鷹馴養",
          "position": 7
        },
        "9": {
          "skillName": "HT_FLASHER",
          "chineseName": "閃光彈",
          "position": 9
        },
        "10": {
          "skillName": "HT_ANKLESNARE",
          "chineseName": "捕獸夾",
          "position": 10
        },
        "11": {
          "skillName": "HT_REMOVETRAP",
          "chineseName": "移除陷阱",
          "position": 11
        },
        "13": {
          "skillName": "HT_PHANTASMIC",
          "chineseName": "幻影箭",
          "position": 13
        },
        "14": {
          "skillName": "HT_BLITZBEAT",
          "chineseName": "鷹擊",
          "position": 14
        },
        "15": {
          "skillName": "HT_SANDMAN",
          "chineseName": "昏睡陷阱",
          "position": 15
        },
        "16": {
          "skillName": "HT_FREEZINGTRAP",
          "chineseName": "冰凍陷阱",
          "position": 16
        },
        "17": {
          "skillName": "HT_SHOCKWAVE",
          "chineseName": "震動陷阱",
          "position": 17
        },
        "18": {
          "skillName": "HT_SPRINGTRAP",
          "chineseName": "彈跳陷阱",
          "position": 18
        },
        "19": {
          "skillName": "HT_DETECTING",
          "chineseName": "探測",
          "position": 19
        },
        "21": {
          "skillName": "HT_STEELCROW",
          "chineseName": "鋼鐵獵鷹",
          "position": 21
        },
        "22": {
          "skillName": "HT_BLASTMINE",
          "chineseName": "爆破地雷",
          "position": 22
        },
        "24": {
          "skillName": "HT_TALKIEBOX",
          "chineseName": "音響陷阱",
          "position": 24
        },
        "29": {
          "skillName": "HT_CLAYMORETRAP",
          "chineseName": "闊劍地雷",
          "position": 29
        }
      }
    },
    "12": {
      "jobId": 12,
      "jobName": {
        "korean": "어쌔신",
        "chinese": "刺客"
      },
      "parentJobId": 6,
      "skills": {
        "0": "AS_RIGHT",
        "1": "AS_KATAR",
        "2": "AS_CLOAKING",
        "3": "AS_ENCHANTPOISON",
        "6": "AS_VENOMKNIFE",
        "7": "AS_LEFT",
        "8": "AS_SONICBLOW",
        "10": "AS_VENOMDUST",
        "11": "AS_POISONREACT",
        "13": "AS_SONICACCEL",
        "15": "AS_GRIMTOOTH",
        "17": "AS_SPLASHER"
      },
      "skillCount": 12,
      "skillsDetailed": {
        "0": {
          "skillName": "AS_RIGHT",
          "chineseName": "右手修練",
          "position": 0
        },
        "1": {
          "skillName": "AS_KATAR",
          "chineseName": "爪刃修練",
          "position": 1
        },
        "2": {
          "skillName": "AS_CLOAKING",
          "chineseName": "隱形術",
          "position": 2
        },
        "3": {
          "skillName": "AS_ENCHANTPOISON",
          "chineseName": "附毒",
          "position": 3
        },
        "6": {
          "skillName": "AS_VENOMKNIFE",
          "chineseName": "毒刃",
          "position": 6
        },
        "7": {
          "skillName": "AS_LEFT",
          "chineseName": "左手修練",
          "position": 7
        },
        "8": {
          "skillName": "AS_SONICBLOW",
          "chineseName": "音速投擲",
          "position": 8
        },
        "10": {
          "skillName": "AS_VENOMDUST",
          "chineseName": "毒霧",
          "position": 10
        },
        "11": {
          "skillName": "AS_POISONREACT",
          "chineseName": "毒素反應",
          "position": 11
        },
        "13": {
          "skillName": "AS_SONICACCEL",
          "chineseName": "音速加速",
          "position": 13
        },
        "15": {
          "skillName": "AS_GRIMTOOTH",
          "chineseName": "魔刃",
          "position": 15
        },
        "17": {
          "skillName": "AS_SPLASHER",
          "chineseName": "毒瓶投擲",
          "position": 17
        }
      }
    },
    "14": {
      "jobId": 14,
      "jobName": {
        "korean": "크루세이더",
        "chinese": "十字軍"
      },
      "parentJobId": 1,
      "skills": {
        "0": "CR_TRUST",
        "3": "CR_AUTOGUARD",
        "4": "CR_SPEARQUICKEN",
        "5": "KN_RIDING",
        "6": "CR_SHRINK",
        "7": "AL_DP",
        "9": "AL_HEAL",
        "10": "CR_SHIELDCHARGE",
        "12": "KN_CAVALIERMASTERY",
        "14": "AL_DEMONBANE",
        "15": "CR_PROVIDENCE",
        "16": "AL_CURE",
        "17": "CR_SHIELDBOOMERANG",
        "22": "CR_HOLYCROSS",
        "24": "CR_DEFENDER",
        "25": "CR_REFLECTSHIELD",
        "29": "CR_GRANDCROSS",
        "32": "CR_DEVOTION"
      },
      "skillCount": 18,
      "skillsDetailed": {
        "0": {
          "skillName": "CR_TRUST",
          "chineseName": "CR_TRUST",
          "position": 0
        },
        "3": {
          "skillName": "CR_AUTOGUARD",
          "chineseName": "CR_AUTOGUARD",
          "position": 3
        },
        "4": {
          "skillName": "CR_SPEARQUICKEN",
          "chineseName": "CR_SPEARQUICKEN",
          "position": 4
        },
        "5": {
          "skillName": "KN_RIDING",
          "chineseName": "騎術",
          "position": 5
        },
        "6": {
          "skillName": "CR_SHRINK",
          "chineseName": "CR_SHRINK",
          "position": 6
        },
        "7": {
          "skillName": "AL_DP",
          "chineseName": "神聖攻擊",
          "position": 7
        },
        "9": {
          "skillName": "AL_HEAL",
          "chineseName": "治癒術",
          "position": 9
        },
        "10": {
          "skillName": "CR_SHIELDCHARGE",
          "chineseName": "CR_SHIELDCHARGE",
          "position": 10
        },
        "12": {
          "skillName": "KN_CAVALIERMASTERY",
          "chineseName": "騎兵修練",
          "position": 12
        },
        "14": {
          "skillName": "AL_DEMONBANE",
          "chineseName": "惡魔剋星",
          "position": 14
        },
        "15": {
          "skillName": "CR_PROVIDENCE",
          "chineseName": "CR_PROVIDENCE",
          "position": 15
        },
        "16": {
          "skillName": "AL_CURE",
          "chineseName": "治療",
          "position": 16
        },
        "17": {
          "skillName": "CR_SHIELDBOOMERANG",
          "chineseName": "CR_SHIELDBOOMERANG",
          "position": 17
        },
        "22": {
          "skillName": "CR_HOLYCROSS",
          "chineseName": "CR_HOLYCROSS",
          "position": 22
        },
        "24": {
          "skillName": "CR_DEFENDER",
          "chineseName": "CR_DEFENDER",
          "position": 24
        },
        "25": {
          "skillName": "CR_REFLECTSHIELD",
          "chineseName": "CR_REFLECTSHIELD",
          "position": 25
        },
        "29": {
          "skillName": "CR_GRANDCROSS",
          "chineseName": "CR_GRANDCROSS",
          "position": 29
        },
        "32": {
          "skillName": "CR_DEVOTION",
          "chineseName": "CR_DEVOTION",
          "position": 32
        }
      }
    },
    "15": {
      "jobId": 15,
      "jobName": {
        "korean": "몽크",
        "chinese": "武僧"
      },
      "parentJobId": 4,
      "skills": {
        "0": "MO_IRONHAND",
        "3": "MO_DODGE",
        "5": "MO_KITRANSLATION",
        "7": "MO_CALLSPIRITS",
        "8": "MO_INVESTIGATE",
        "9": "MO_TRIPLEATTACK",
        "10": "MO_BLADESTOP",
        "12": "MO_BALKYOUNG",
        "14": "MO_ABSORBSPIRITS",
        "15": "MO_FINGEROFFENSIVE",
        "16": "MO_CHAINCOMBO",
        "17": "MO_SPIRITSRECOVERY",
        "21": "MO_EXPLOSIONSPIRITS",
        "23": "MO_COMBOFINISH",
        "24": "MO_STEELBODY",
        "29": "MO_EXTREMITYFIST",
        "32": "MO_BODYRELOCATION"
      },
      "skillCount": 17,
      "skillsDetailed": {
        "0": {
          "skillName": "MO_IRONHAND",
          "chineseName": "MO_IRONHAND",
          "position": 0
        },
        "3": {
          "skillName": "MO_DODGE",
          "chineseName": "MO_DODGE",
          "position": 3
        },
        "5": {
          "skillName": "MO_KITRANSLATION",
          "chineseName": "MO_KITRANSLATION",
          "position": 5
        },
        "7": {
          "skillName": "MO_CALLSPIRITS",
          "chineseName": "MO_CALLSPIRITS",
          "position": 7
        },
        "8": {
          "skillName": "MO_INVESTIGATE",
          "chineseName": "MO_INVESTIGATE",
          "position": 8
        },
        "9": {
          "skillName": "MO_TRIPLEATTACK",
          "chineseName": "MO_TRIPLEATTACK",
          "position": 9
        },
        "10": {
          "skillName": "MO_BLADESTOP",
          "chineseName": "MO_BLADESTOP",
          "position": 10
        },
        "12": {
          "skillName": "MO_BALKYOUNG",
          "chineseName": "MO_BALKYOUNG",
          "position": 12
        },
        "14": {
          "skillName": "MO_ABSORBSPIRITS",
          "chineseName": "MO_ABSORBSPIRITS",
          "position": 14
        },
        "15": {
          "skillName": "MO_FINGEROFFENSIVE",
          "chineseName": "MO_FINGEROFFENSIVE",
          "position": 15
        },
        "16": {
          "skillName": "MO_CHAINCOMBO",
          "chineseName": "MO_CHAINCOMBO",
          "position": 16
        },
        "17": {
          "skillName": "MO_SPIRITSRECOVERY",
          "chineseName": "MO_SPIRITSRECOVERY",
          "position": 17
        },
        "21": {
          "skillName": "MO_EXPLOSIONSPIRITS",
          "chineseName": "MO_EXPLOSIONSPIRITS",
          "position": 21
        },
        "23": {
          "skillName": "MO_COMBOFINISH",
          "chineseName": "MO_COMBOFINISH",
          "position": 23
        },
        "24": {
          "skillName": "MO_STEELBODY",
          "chineseName": "MO_STEELBODY",
          "position": 24
        },
        "29": {
          "skillName": "MO_EXTREMITYFIST",
          "chineseName": "MO_EXTREMITYFIST",
          "position": 29
        },
        "32": {
          "skillName": "MO_BODYRELOCATION",
          "chineseName": "MO_BODYRELOCATION",
          "position": 32
        }
      }
    },
    "16": {
      "jobId": 16,
      "jobName": {
        "korean": "세이지",
        "chinese": "賢者"
      },
      "parentJobId": 2,
      "skills": {
        "0": "SA_ADVANCEDBOOK",
        "1": "WZ_ESTIMATION",
        "2": "SA_ELEMENTWATER",
        "3": "SA_ELEMENTWIND",
        "4": "SA_ELEMENTGROUND",
        "5": "SA_ELEMENTFIRE",
        "6": "SA_CREATECON",
        "8": "SA_SEISMICWEAPON",
        "9": "SA_CASTCANCEL",
        "10": "SA_MAGICROD",
        "11": "SA_FROSTWEAPON",
        "12": "SA_LIGHTNINGLOADER",
        "13": "SA_FLAMELAUNCHER",
        "15": "WZ_HEAVENDRIVE",
        "16": "SA_FREECAST",
        "17": "SA_SPELLBREAKER",
        "18": "SA_DELUGE",
        "19": "SA_VIOLENTGALE",
        "20": "SA_VOLCANO",
        "23": "SA_AUTOSPELL",
        "24": "SA_DISPELL",
        "27": "SA_LANDPROTECTOR",
        "34": "SA_ABRACADABRA"
      },
      "skillCount": 23,
      "skillsDetailed": {
        "0": {
          "skillName": "SA_ADVANCEDBOOK",
          "chineseName": "SA_ADVANCEDBOOK",
          "position": 0
        },
        "1": {
          "skillName": "WZ_ESTIMATION",
          "chineseName": "怪物情報",
          "position": 1
        },
        "2": {
          "skillName": "SA_ELEMENTWATER",
          "chineseName": "SA_ELEMENTWATER",
          "position": 2
        },
        "3": {
          "skillName": "SA_ELEMENTWIND",
          "chineseName": "SA_ELEMENTWIND",
          "position": 3
        },
        "4": {
          "skillName": "SA_ELEMENTGROUND",
          "chineseName": "SA_ELEMENTGROUND",
          "position": 4
        },
        "5": {
          "skillName": "SA_ELEMENTFIRE",
          "chineseName": "SA_ELEMENTFIRE",
          "position": 5
        },
        "6": {
          "skillName": "SA_CREATECON",
          "chineseName": "SA_CREATECON",
          "position": 6
        },
        "8": {
          "skillName": "SA_SEISMICWEAPON",
          "chineseName": "SA_SEISMICWEAPON",
          "position": 8
        },
        "9": {
          "skillName": "SA_CASTCANCEL",
          "chineseName": "SA_CASTCANCEL",
          "position": 9
        },
        "10": {
          "skillName": "SA_MAGICROD",
          "chineseName": "SA_MAGICROD",
          "position": 10
        },
        "11": {
          "skillName": "SA_FROSTWEAPON",
          "chineseName": "SA_FROSTWEAPON",
          "position": 11
        },
        "12": {
          "skillName": "SA_LIGHTNINGLOADER",
          "chineseName": "SA_LIGHTNINGLOADER",
          "position": 12
        },
        "13": {
          "skillName": "SA_FLAMELAUNCHER",
          "chineseName": "SA_FLAMELAUNCHER",
          "position": 13
        },
        "15": {
          "skillName": "WZ_HEAVENDRIVE",
          "chineseName": "大地之矛",
          "position": 15
        },
        "16": {
          "skillName": "SA_FREECAST",
          "chineseName": "SA_FREECAST",
          "position": 16
        },
        "17": {
          "skillName": "SA_SPELLBREAKER",
          "chineseName": "SA_SPELLBREAKER",
          "position": 17
        },
        "18": {
          "skillName": "SA_DELUGE",
          "chineseName": "SA_DELUGE",
          "position": 18
        },
        "19": {
          "skillName": "SA_VIOLENTGALE",
          "chineseName": "SA_VIOLENTGALE",
          "position": 19
        },
        "20": {
          "skillName": "SA_VOLCANO",
          "chineseName": "SA_VOLCANO",
          "position": 20
        },
        "23": {
          "skillName": "SA_AUTOSPELL",
          "chineseName": "SA_AUTOSPELL",
          "position": 23
        },
        "24": {
          "skillName": "SA_DISPELL",
          "chineseName": "SA_DISPELL",
          "position": 24
        },
        "27": {
          "skillName": "SA_LANDPROTECTOR",
          "chineseName": "SA_LANDPROTECTOR",
          "position": 27
        },
        "34": {
          "skillName": "SA_ABRACADABRA",
          "chineseName": "SA_ABRACADABRA",
          "position": 34
        }
      }
    },
    "17": {
      "jobId": 17,
      "jobName": {
        "korean": "로그",
        "chinese": "盜賊"
      },
      "parentJobId": 6,
      "skills": {
        "0": "AC_VULTURE",
        "1": "RG_TUNNELDRIVE",
        "2": "RG_SNATCHER",
        "3": "RG_STRIPHELM",
        "6": "RG_CLOSECONFINE",
        "7": "AC_DOUBLE",
        "9": "RG_BACKSTAP",
        "10": "RG_STRIPSHIELD",
        "14": "HT_REMOVETRAP",
        "15": "RG_RAID",
        "17": "RG_STRIPARMOR",
        "18": "RG_GANGSTER",
        "22": "RG_INTIMIDATE",
        "24": "RG_STRIPWEAPON",
        "25": "RG_GRAFFITI",
        "26": "RG_COMPULSION",
        "29": "RG_PLAGIARISM"
      },
      "skillCount": 17,
      "skillsDetailed": {
        "0": {
          "skillName": "AC_VULTURE",
          "chineseName": "禿鷹眼",
          "position": 0
        },
        "1": {
          "skillName": "RG_TUNNELDRIVE",
          "chineseName": "RG_TUNNELDRIVE",
          "position": 1
        },
        "2": {
          "skillName": "RG_SNATCHER",
          "chineseName": "RG_SNATCHER",
          "position": 2
        },
        "3": {
          "skillName": "RG_STRIPHELM",
          "chineseName": "RG_STRIPHELM",
          "position": 3
        },
        "6": {
          "skillName": "RG_CLOSECONFINE",
          "chineseName": "RG_CLOSECONFINE",
          "position": 6
        },
        "7": {
          "skillName": "AC_DOUBLE",
          "chineseName": "二連射",
          "position": 7
        },
        "9": {
          "skillName": "RG_BACKSTAP",
          "chineseName": "RG_BACKSTAP",
          "position": 9
        },
        "10": {
          "skillName": "RG_STRIPSHIELD",
          "chineseName": "RG_STRIPSHIELD",
          "position": 10
        },
        "14": {
          "skillName": "HT_REMOVETRAP",
          "chineseName": "移除陷阱",
          "position": 14
        },
        "15": {
          "skillName": "RG_RAID",
          "chineseName": "RG_RAID",
          "position": 15
        },
        "17": {
          "skillName": "RG_STRIPARMOR",
          "chineseName": "RG_STRIPARMOR",
          "position": 17
        },
        "18": {
          "skillName": "RG_GANGSTER",
          "chineseName": "RG_GANGSTER",
          "position": 18
        },
        "22": {
          "skillName": "RG_INTIMIDATE",
          "chineseName": "RG_INTIMIDATE",
          "position": 22
        },
        "24": {
          "skillName": "RG_STRIPWEAPON",
          "chineseName": "RG_STRIPWEAPON",
          "position": 24
        },
        "25": {
          "skillName": "RG_GRAFFITI",
          "chineseName": "RG_GRAFFITI",
          "position": 25
        },
        "26": {
          "skillName": "RG_COMPULSION",
          "chineseName": "RG_COMPULSION",
          "position": 26
        },
        "29": {
          "skillName": "RG_PLAGIARISM",
          "chineseName": "RG_PLAGIARISM",
          "position": 29
        }
      }
    },
    "18": {
      "jobId": 18,
      "jobName": {
        "korean": "알케미스트",
        "chinese": "鍊金術師"
      },
      "parentJobId": 5,
      "skills": {
        "0": "AM_LEARNINGPOTION",
        "2": "PR_MACEMASTERY",
        "5": "AM_CP_HELM",
        "6": "AM_BIOETHICS",
        "7": "AM_PHARMACY",
        "12": "AM_CP_SHIELD",
        "13": "AM_REST",
        "14": "AM_SPHEREMINE",
        "15": "AM_POTIONPITCHER",
        "16": "AM_DEMONSTRATION",
        "17": "AM_ACIDTERROR",
        "18": "AM_CANNIBALIZE",
        "19": "AM_CP_ARMOR",
        "20": "AM_CALLHOMUN",
        "26": "AM_CP_WEAPON",
        "27": "AM_RESURRECTHOMUN"
      },
      "skillCount": 16,
      "skillsDetailed": {
        "0": {
          "skillName": "AM_LEARNINGPOTION",
          "chineseName": "AM_LEARNINGPOTION",
          "position": 0
        },
        "2": {
          "skillName": "PR_MACEMASTERY",
          "chineseName": "鈍器修練",
          "position": 2
        },
        "5": {
          "skillName": "AM_CP_HELM",
          "chineseName": "AM_CP_HELM",
          "position": 5
        },
        "6": {
          "skillName": "AM_BIOETHICS",
          "chineseName": "AM_BIOETHICS",
          "position": 6
        },
        "7": {
          "skillName": "AM_PHARMACY",
          "chineseName": "AM_PHARMACY",
          "position": 7
        },
        "12": {
          "skillName": "AM_CP_SHIELD",
          "chineseName": "AM_CP_SHIELD",
          "position": 12
        },
        "13": {
          "skillName": "AM_REST",
          "chineseName": "AM_REST",
          "position": 13
        },
        "14": {
          "skillName": "AM_SPHEREMINE",
          "chineseName": "AM_SPHEREMINE",
          "position": 14
        },
        "15": {
          "skillName": "AM_POTIONPITCHER",
          "chineseName": "AM_POTIONPITCHER",
          "position": 15
        },
        "16": {
          "skillName": "AM_DEMONSTRATION",
          "chineseName": "AM_DEMONSTRATION",
          "position": 16
        },
        "17": {
          "skillName": "AM_ACIDTERROR",
          "chineseName": "AM_ACIDTERROR",
          "position": 17
        },
        "18": {
          "skillName": "AM_CANNIBALIZE",
          "chineseName": "AM_CANNIBALIZE",
          "position": 18
        },
        "19": {
          "skillName": "AM_CP_ARMOR",
          "chineseName": "AM_CP_ARMOR",
          "position": 19
        },
        "20": {
          "skillName": "AM_CALLHOMUN",
          "chineseName": "AM_CALLHOMUN",
          "position": 20
        },
        "26": {
          "skillName": "AM_CP_WEAPON",
          "chineseName": "AM_CP_WEAPON",
          "position": 26
        },
        "27": {
          "skillName": "AM_RESURRECTHOMUN",
          "chineseName": "AM_RESURRECTHOMUN",
          "position": 27
        }
      }
    },
    "19": {
      "jobId": 19,
      "jobName": {
        "korean": "바드",
        "chinese": "詩人"
      },
      "parentJobId": 3,
      "skills": {
        "0": "BD_ADAPTATION",
        "1": "BA_MUSICALLESSON",
        "3": "BA_DISSONANCE",
        "5": "BA_PANGVOICE",
        "7": "BD_ENCORE",
        "8": "BA_MUSICALSTRIKE",
        "9": "BA_WHISTLE",
        "10": "BA_ASSASSINCROSS",
        "11": "BA_POEMBRAGI",
        "12": "BA_APPLEIDUN",
        "14": "BA_FROSTJOKE",
        "16": "BD_LULLABY",
        "17": "BD_ROKISWEIL",
        "18": "BD_SIEGFRIED",
        "19": "BD_DRUMBATTLEFIELD",
        "23": "BD_INTOABYSS",
        "24": "BD_ETERNALCHAOS",
        "25": "BD_RICHMANKIM",
        "26": "BD_RINGNIBELUNGEN"
      },
      "skillCount": 19,
      "skillsDetailed": {
        "0": {
          "skillName": "BD_ADAPTATION",
          "chineseName": "BD_ADAPTATION",
          "position": 0
        },
        "1": {
          "skillName": "BA_MUSICALLESSON",
          "chineseName": "BA_MUSICALLESSON",
          "position": 1
        },
        "3": {
          "skillName": "BA_DISSONANCE",
          "chineseName": "BA_DISSONANCE",
          "position": 3
        },
        "5": {
          "skillName": "BA_PANGVOICE",
          "chineseName": "BA_PANGVOICE",
          "position": 5
        },
        "7": {
          "skillName": "BD_ENCORE",
          "chineseName": "BD_ENCORE",
          "position": 7
        },
        "8": {
          "skillName": "BA_MUSICALSTRIKE",
          "chineseName": "BA_MUSICALSTRIKE",
          "position": 8
        },
        "9": {
          "skillName": "BA_WHISTLE",
          "chineseName": "BA_WHISTLE",
          "position": 9
        },
        "10": {
          "skillName": "BA_ASSASSINCROSS",
          "chineseName": "BA_ASSASSINCROSS",
          "position": 10
        },
        "11": {
          "skillName": "BA_POEMBRAGI",
          "chineseName": "BA_POEMBRAGI",
          "position": 11
        },
        "12": {
          "skillName": "BA_APPLEIDUN",
          "chineseName": "BA_APPLEIDUN",
          "position": 12
        },
        "14": {
          "skillName": "BA_FROSTJOKE",
          "chineseName": "BA_FROSTJOKE",
          "position": 14
        },
        "16": {
          "skillName": "BD_LULLABY",
          "chineseName": "BD_LULLABY",
          "position": 16
        },
        "17": {
          "skillName": "BD_ROKISWEIL",
          "chineseName": "BD_ROKISWEIL",
          "position": 17
        },
        "18": {
          "skillName": "BD_SIEGFRIED",
          "chineseName": "BD_SIEGFRIED",
          "position": 18
        },
        "19": {
          "skillName": "BD_DRUMBATTLEFIELD",
          "chineseName": "BD_DRUMBATTLEFIELD",
          "position": 19
        },
        "23": {
          "skillName": "BD_INTOABYSS",
          "chineseName": "BD_INTOABYSS",
          "position": 23
        },
        "24": {
          "skillName": "BD_ETERNALCHAOS",
          "chineseName": "BD_ETERNALCHAOS",
          "position": 24
        },
        "25": {
          "skillName": "BD_RICHMANKIM",
          "chineseName": "BD_RICHMANKIM",
          "position": 25
        },
        "26": {
          "skillName": "BD_RINGNIBELUNGEN",
          "chineseName": "BD_RINGNIBELUNGEN",
          "position": 26
        }
      }
    },
    "20": {
      "jobId": 20,
      "jobName": {
        "korean": "댄서",
        "chinese": "舞孃"
      },
      "parentJobId": 3,
      "skills": {
        "0": "BD_ADAPTATION",
        "1": "DC_DANCINGLESSON",
        "3": "DC_UGLYDANCE",
        "5": "DC_WINKCHARM",
        "7": "BD_ENCORE",
        "8": "DC_THROWARROW",
        "9": "DC_HUMMING",
        "10": "DC_DONTFORGETME",
        "11": "DC_FORTUNEKISS",
        "12": "DC_SERVICEFORYOU",
        "14": "DC_SCREAM",
        "16": "BD_LULLABY",
        "17": "BD_ROKISWEIL",
        "18": "BD_SIEGFRIED",
        "19": "BD_DRUMBATTLEFIELD",
        "23": "BD_INTOABYSS",
        "24": "BD_ETERNALCHAOS",
        "25": "BD_RICHMANKIM",
        "26": "BD_RINGNIBELUNGEN"
      },
      "skillCount": 19,
      "skillsDetailed": {
        "0": {
          "skillName": "BD_ADAPTATION",
          "chineseName": "BD_ADAPTATION",
          "position": 0
        },
        "1": {
          "skillName": "DC_DANCINGLESSON",
          "chineseName": "DC_DANCINGLESSON",
          "position": 1
        },
        "3": {
          "skillName": "DC_UGLYDANCE",
          "chineseName": "DC_UGLYDANCE",
          "position": 3
        },
        "5": {
          "skillName": "DC_WINKCHARM",
          "chineseName": "DC_WINKCHARM",
          "position": 5
        },
        "7": {
          "skillName": "BD_ENCORE",
          "chineseName": "BD_ENCORE",
          "position": 7
        },
        "8": {
          "skillName": "DC_THROWARROW",
          "chineseName": "DC_THROWARROW",
          "position": 8
        },
        "9": {
          "skillName": "DC_HUMMING",
          "chineseName": "DC_HUMMING",
          "position": 9
        },
        "10": {
          "skillName": "DC_DONTFORGETME",
          "chineseName": "DC_DONTFORGETME",
          "position": 10
        },
        "11": {
          "skillName": "DC_FORTUNEKISS",
          "chineseName": "DC_FORTUNEKISS",
          "position": 11
        },
        "12": {
          "skillName": "DC_SERVICEFORYOU",
          "chineseName": "DC_SERVICEFORYOU",
          "position": 12
        },
        "14": {
          "skillName": "DC_SCREAM",
          "chineseName": "DC_SCREAM",
          "position": 14
        },
        "16": {
          "skillName": "BD_LULLABY",
          "chineseName": "BD_LULLABY",
          "position": 16
        },
        "17": {
          "skillName": "BD_ROKISWEIL",
          "chineseName": "BD_ROKISWEIL",
          "position": 17
        },
        "18": {
          "skillName": "BD_SIEGFRIED",
          "chineseName": "BD_SIEGFRIED",
          "position": 18
        },
        "19": {
          "skillName": "BD_DRUMBATTLEFIELD",
          "chineseName": "BD_DRUMBATTLEFIELD",
          "position": 19
        },
        "23": {
          "skillName": "BD_INTOABYSS",
          "chineseName": "BD_INTOABYSS",
          "position": 23
        },
        "24": {
          "skillName": "BD_ETERNALCHAOS",
          "chineseName": "BD_ETERNALCHAOS",
          "position": 24
        },
        "25": {
          "skillName": "BD_RICHMANKIM",
          "chineseName": "BD_RICHMANKIM",
          "position": 25
        },
        "26": {
          "skillName": "BD_RINGNIBELUNGEN",
          "chineseName": "BD_RINGNIBELUNGEN",
          "position": 26
        }
      }
    }
  },
  "jobInheritance": {
    "7": 1,
    "8": 4,
    "9": 2,
    "10": 5,
    "11": 3,
    "12": 6,
    "14": 1,
    "15": 4,
    "16": 2,
    "17": 6,
    "18": 5,
    "19": 3,
    "20": 3
  },
  "jobIds": {
    "JT_NOVICE": 0,
    "JT_SWORDMAN": 1,
    "JT_MAGICIAN": 2,
    "JT_ARCHER": 3,
    "JT_ACOLYTE": 4,
    "JT_MERCHANT": 5,
    "JT_THIEF": 6,
    "JT_KNIGHT": 7,
    "JT_PRIEST": 8,
    "JT_WIZARD": 9,
    "JT_BLACKSMITH": 10,
    "JT_HUNTER": 11,
    "JT_ASSASSIN": 12,
    "JT_CHICKEN": 13,
    "JT_CRUSADER": 14,
    "JT_MONK": 15,
    "JT_SAGE": 16,
    "JT_ROGUE": 17,
    "JT_ALCHEMIST": 18,
    "JT_BARD": 19,
    "JT_DANCER": 20,
    "JT_CHICKEN2": 21,
    "JT_MARRIED": 22,
    "JT_SUPERNOVICE": 23,
    "JT_GUNSLINGER": 24,
    "JT_NINJA": 25,
    "JT_SANTA": 26,
    "JT_SUMMER": 27,
    "JT_HANBOK": 28,
    "JT_OKTOBERFEST": 29,
    "JT_SUMMER2": 30,
    "JT_NOVICE_H": 4001,
    "JT_SWORDMAN_H": 4002,
    "JT_MAGICIAN_H": 4003,
    "JT_ARCHER_H": 4004,
    "JT_ACOLYTE_H": 4005,
    "JT_MERCHANT_H": 4006,
    "JT_THIEF_H": 4007,
    "JT_KNIGHT_H": 4008,
    "JT_PRIEST_H": 4009,
    "JT_WIZARD_H": 4010,
    "JT_BLACKSMITH_H": 4011,
    "JT_HUNTER_H": 4012,
    "JT_ASSASSIN_H": 4013,
    "JT_CHICKEN_H": 4014,
    "JT_CRUSADER_H": 4015,
    "JT_MONK_H": 4016,
    "JT_SAGE_H": 4017,
    "JT_ROGUE_H": 4018,
    "JT_ALCHEMIST_H": 4019,
    "JT_BARD_H": 4020,
    "JT_DANCER_H": 4021,
    "JT_CHICKEN2_H": 4022,
    "JT_NOVICE_B": 4023,
    "JT_SWORDMAN_B": 4024,
    "JT_MAGICIAN_B": 4025,
    "JT_ARCHER_B": 4026,
    "JT_ACOLYTE_B": 4027,
    "JT_MERCHANT_B": 4028,
    "JT_THIEF_B": 4029,
    "JT_KNIGHT_B": 4030,
    "JT_PRIEST_B": 4031,
    "JT_WIZARD_B": 4032,
    "JT_BLACKSMITH_B": 4033,
    "JT_HUNTER_B": 4034,
    "JT_ASSASSIN_B": 4035,
    "JT_CHICKEN_B": 4036,
    "JT_CRUSADER_B": 4037,
    "JT_MONK_B": 4038,
    "JT_SAGE_B": 4039,
    "JT_ROGUE_B": 4040,
    "JT_ALCHEMIST_B": 4041,
    "JT_BARD_B": 4042,
    "JT_DANCER_B": 4043,
    "JT_CHICKEN2_B": 4044,
    "JT_SUPERNOVICE_B": 4045,
    "JT_TAEKWON": 4046,
    "JT_STAR": 4047,
    "JT_STAR2": 4048,
    "JT_LINKER": 4049,
    "JT_GANGSI": 4050,
    "JT_DEATHKNIGHT": 4051,
    "JT_COLLECTOR": 4052,
    "JT_THIRDJOB_BEGIN": 4053,
    "JT_RUNE_KNIGHT": 4054,
    "JT_WARLOCK": 4055,
    "JT_RANGER": 4056,
    "JT_ARCHBISHOP": 4057,
    "JT_MECHANIC": 4058,
    "JT_GUILLOTINE_CROSS": 4059,
    "JT_RUNE_KNIGHT_H": 4060,
    "JT_WARLOCK_H": 4061,
    "JT_RANGER_H": 4062,
    "JT_ARCHBISHOP_H": 4063,
    "JT_MECHANIC_H": 4064,
    "JT_GUILLOTINE_CROSS_H": 4065,
    "JT_ROYAL_GUARD": 4066,
    "JT_SORCERER": 4067,
    "JT_MINSTREL": 4068,
    "JT_WANDERER": 4069,
    "JT_SURA": 4070,
    "JT_GENETIC": 4071,
    "JT_SHADOW_CHASER": 4072,
    "JT_ROYAL_GUARD_H": 4073,
    "JT_SORCERER_H": 4074,
    "JT_MINSTREL_H": 4075,
    "JT_WANDERER_H": 4076,
    "JT_SURA_H": 4077,
    "JT_GENETIC_H": 4078,
    "JT_SHADOW_CHASER_H": 4079,
    "JT_RUNE_CHICKEN": 4080,
    "JT_RUNE_CHICKEN_H": 4081,
    "JT_ROYAL_CHICKEN": 4082,
    "JT_ROYAL_CHICKEN_H": 4083,
    "JT_WOLF_RANGER": 4084,
    "JT_WOLF_RANGER_H": 4085,
    "JT_MADOGEAR": 4086,
    "JT_MADOGEAR_H": 4087,
    "JT_RUNE_CHICKEN2": 4088,
    "JT_RUNE_CHICKEN2_H": 4089,
    "JT_RUNE_CHICKEN3": 4090,
    "JT_RUNE_CHICKEN3_H": 4091,
    "JT_RUNE_CHICKEN4": 4092,
    "JT_RUNE_CHICKEN4_H": 4093,
    "JT_RUNE_CHICKEN5": 4094,
    "JT_RUNE_CHICKEN5_H": 4095,
    "JT_RUNE_KNIGHT_B": 4096,
    "JT_WARLOCK_B": 4097,
    "JT_RANGER_B": 4098,
    "JT_ARCHBISHOP_B": 4099,
    "JT_MECHANIC_B": 4100,
    "JT_GUILLOTINE_CROSS_B": 4101,
    "JT_ROYAL_GUARD_B": 4102,
    "JT_SORCERER_B": 4103,
    "JT_MINSTREL_B": 4104,
    "JT_WANDERER_B": 4105,
    "JT_SURA_B": 4106,
    "JT_GENETIC_B": 4107,
    "JT_SHADOW_CHASER_B": 4108,
    "JT_RUNE_CHICKEN_B": 4109,
    "JT_ROYAL_CHICKEN_B": 4110,
    "JT_WOLF_RANGER_B": 4111,
    "JT_MADOGEAR_B": 4112,
    "JT_THIRDJOB_END": 4113,
    "JT_FROG_NINJA": 4114,
    "JT_PECO_GUNNER": 4115,
    "JT_PECO_SWORD": 4116,
    "JT_FROG_LINKER": 4117,
    "JT_PIG_WHITESMITH": 4118,
    "JT_PIG_MERCHANT": 4119,
    "JT_PIG_GENETIC": 4120,
    "JT_PIG_CREATOR": 4121,
    "JT_OSTRICH_ARCHER": 4122,
    "JT_PORING_STAR": 4123,
    "JT_PORING_NOVICE": 4124,
    "JT_SHEEP_MONK": 4125,
    "JT_SHEEP_ACO": 4126,
    "JT_SHEEP_SURA": 4127,
    "JT_PORING_SNOVICE": 4128,
    "JT_SHEEP_ARCB": 4129,
    "JT_FOX_MAGICIAN": 4130,
    "JT_FOX_SAGE": 4131,
    "JT_FOX_SORCERER": 4132,
    "JT_FOX_WARLOCK": 4133,
    "JT_FOX_WIZ": 4134,
    "JT_FOX_PROF": 4135,
    "JT_FOX_HWIZ": 4136,
    "JT_PIG_ALCHE": 4137,
    "JT_PIG_BLACKSMITH": 4138,
    "JT_SHEEP_CHAMP": 4139,
    "JT_DOG_G_CROSS": 4140,
    "JT_DOG_THIEF": 4141,
    "JT_DOG_ROGUE": 4142,
    "JT_DOG_CHASER": 4143,
    "JT_DOG_STALKER": 4144,
    "JT_DOG_ASSASSIN": 4145,
    "JT_DOG_ASSA_X": 4146,
    "JT_OSTRICH_DANCER": 4147,
    "JT_OSTRICH_MINSTREL": 4148,
    "JT_OSTRICH_BARD": 4149,
    "JT_OSTRICH_SNIPER": 4150,
    "JT_OSTRICH_WANDER": 4151,
    "JT_OSTRICH_ZIPSI": 4152,
    "JT_OSTRICH_CROWN": 4153,
    "JT_OSTRICH_HUNTER": 4154,
    "JT_PORING_TAEKWON": 4155,
    "JT_SHEEP_PRIEST": 4156,
    "JT_SHEEP_HPRIEST": 4157,
    "JT_PORING_NOVICE_B": 4158,
    "JT_PECO_SWORD_B": 4159,
    "JT_FOX_MAGICIAN_B": 4160,
    "JT_OSTRICH_ARCHER_B": 4161,
    "JT_SHEEP_ACO_B": 4162,
    "JT_PIG_MERCHANT_B": 4163,
    "JT_OSTRICH_HUNTER_B": 4164,
    "JT_DOG_ASSASSIN_B": 4165,
    "JT_SHEEP_MONK_B": 4166,
    "JT_FOX_SAGE_B": 4167,
    "JT_DOG_ROGUE_B": 4168,
    "JT_PIG_ALCHE_B": 4169,
    "JT_OSTRICH_BARD_B": 4170,
    "JT_OSTRICH_DANCER_B": 4171,
    "JT_PORING_SNOVICE_B": 4172,
    "JT_FOX_WARLOCK_B": 4173,
    "JT_SHEEP_ARCB_B": 4174,
    "JT_DOG_G_CROSS_B": 4175,
    "JT_FOX_SORCERER_B": 7176,
    "JT_OSTRICH_MINSTREL_B": 4177,
    "JT_OSTRICH_WANDER_B": 4178,
    "JT_SHEEP_SURA_B": 4179,
    "JT_PIG_GENETIC_B": 4180,
    "JT_DOG_THIEF_B": 4181,
    "JT_DOG_CHASER_B": 4182,
    "JT_PORING_NOVICE_H": 4183,
    "JT_PECO_SWORD_H": 4184,
    "JT_FOX_MAGICIAN_H": 4185,
    "JT_OSTRICH_ARCHER_H": 4186,
    "JT_SHEEP_ACO_H": 4187,
    "JT_PIG_MERCHANT_H": 4188,
    "JT_DOG_THIEF_H": 4189,
    "JT_SUPERNOVICE2": 4190,
    "JT_SUPERNOVICE2_B": 4191,
    "JT_PORING_SNOVICE2": 4192,
    "JT_PORING_SNOVICE2_B": 4193,
    "JT_SHEEP_PRIEST_B": 4194,
    "JT_FOX_WIZ_B": 4195,
    "JT_PIG_BLACKSMITH_B": 4196,
    "JT_PIG_MECHANIC": 4197,
    "JT_OSTRICH_RANGER": 4198,
    "JT_LION_KNIGHT": 4199,
    "JT_LION_KNIGHT_H": 4200,
    "JT_LION_ROYAL_GUARD": 4201,
    "JT_LION_RUNE_KNIGHT": 4202,
    "JT_LION_CRUSADER": 4203,
    "JT_LION_CRUSADER_H": 4204,
    "JT_PIG_MECHANIC_B": 4205,
    "JT_OSTRICH_RANGER_B": 4206,
    "JT_LION_KNIGHT_B": 4207,
    "JT_LION_ROYAL_GUARD_B": 4208,
    "JT_LION_RUNE_KNIGHT_B": 4209,
    "JT_LION_CRUSADER_B": 4210,
    "JT_KAGEROU": 4211,
    "JT_OBORO": 4212,
    "JT_FROG_KAGEROU": 4213,
    "JT_FROG_OBORO": 4214,
    "JT_REBELLION": 4215,
    "JT_PECO_REBELLION": 4216,
    "JT_2004_JOB_LAST": 4217,
    "JT_DO_SUMMONER": 4218,
    "JT_DO_CART_SUMMONER": 4219,
    "JT_DO_SUMMONER_B": 4220,
    "JT_DO_CART_SUMMONER_B": 4221,
    "JT_NINJA_B": 4222,
    "JT_KAGEROU_B": 4223,
    "JT_OBORO_B": 4224,
    "JT_TAEKWON_B": 4225,
    "JT_STAR_B": 4226,
    "JT_LINKER_B": 4227,
    "JT_GUNSLINGER_B": 4228,
    "JT_REBELLION_B": 4229,
    "JT_FROG_NINJA_B": 4230,
    "JT_FROG_KAGEROU_B": 4231,
    "JT_FROG_OBORO_B": 4232,
    "JT_PORING_TAEKWON_B": 4233,
    "JT_PORING_STAR_B": 4234,
    "JT_FROG_LINKER_B": 4235,
    "JT_PECO_GUNNER_B": 4236,
    "JT_PECO_REBELLION_B": 4237,
    "JT_STAR2_B": 4238,
    "JT_STAR_EMPEROR": 4239,
    "JT_SOUL_REAPER": 4240,
    "JT_STAR_EMPEROR_B": 4241,
    "JT_SOUL_REAPER_B": 4242,
    "JT_STAR2_EMPEROR": 4243,
    "JT_STAR2_EMPEROR_B": 4244,
    "JT_HAETAE_STAR_EMPEROR": 4245,
    "JT_HAETAE_SOUL_REAPER": 4246,
    "JT_HAETAE_STAR_EMPEROR_B": 4247,
    "JT_HAETAE_SOUL_REAPER_B": 4248,
    "JT_DRAGON_KNIGHT": 4252,
    "JT_MEISTER": 4253,
    "JT_SHADOW_CROSS": 4254,
    "JT_ARCH_MAGE": 4255,
    "JT_CARDINAL": 4256,
    "JT_WINDHAWK": 4257,
    "JT_IMPERIAL_GUARD": 4258,
    "JT_BIOLO": 4259,
    "JT_ABYSS_CHASER": 4260,
    "JT_ELEMENTAL_MASTER": 4261,
    "JT_INQUISITOR": 4262,
    "JT_TROUBADOUR": 4263,
    "JT_TROUVERE": 4264,
    "JT_DRAGON_KNIGHT_RIDING": 4265,
    "JT_MEISTER_RIDING": 4266,
    "JT_SHADOW_CROSS_RIDING": 4267,
    "JT_ARCH_MAGE_RIDING": 4268,
    "JT_CARDINAL_RIDING": 4269,
    "JT_WINDHAWK_RIDING": 4270,
    "JT_IMPERIAL_GUARD_RIDING": 4271,
    "JT_BIOLO_RIDING": 4272,
    "JT_ABYSS_CHASER_RIDING": 4273,
    "JT_ELEMENTAL_MASTER_RIDING": 4274,
    "JT_INQUISITOR_RIDING": 4275,
    "JT_TROUBADOUR_RIDING": 4276,
    "JT_TROUVERE_RIDING": 4277,
    "JT_WOLF_WINDHAWK": 4278,
    "JT_MEISTER_MADOGEAR": 4279,
    "JT_DRAGON_KNIGHT_CHICKEN": 4280,
    "JT_IMPERIAL_GUARD_CHICKEN": 4281,
    "JT_UPPER_EXTENDED_JOB2_BEGIN": 4301,
    "JT_SKY_EMPEROR": 4302,
    "JT_SOUL_ASCETIC": 4303,
    "JT_SHINKIRO": 4304,
    "JT_SHIRANUI": 4305,
    "JT_NIGHT_WATCH": 4306,
    "JT_HYPER_NOVICE": 4307,
    "JT_SPIRIT_HANDLER": 4308,
    "JT_SKY_EMPEROR_RIDING": 4309,
    "JT_SOUL_ASCETIC_RIDING": 4310,
    "JT_SHINKIRO_RIDING": 4311,
    "JT_SHIRANUI_RIDING": 4312,
    "JT_NIGHT_WATCH_RIDING": 4313,
    "JT_HYPER_NOVICE_RIDING": 4314,
    "JT_SPIRIT_HANDLER_RIDING": 4315,
    "JT_SKY_EMPEROR2": 4316,
    "JT_UPPER_EXTENDED_JOB2_END": 4330
  },
  "jobPaths": {
    "7": {
      "firstJob": {
        "id": 1,
        "name": {
          "korean": "검사",
          "chinese": "劍士"
        }
      },
      "secondJob": {
        "id": "7",
        "name": {
          "korean": "나이트",
          "chinese": "騎士"
        }
      },
      "path": "劍士 → 騎士"
    },
    "8": {
      "firstJob": {
        "id": 4,
        "name": {
          "korean": "복사",
          "chinese": "服事"
        }
      },
      "secondJob": {
        "id": "8",
        "name": {
          "korean": "프리스트",
          "chinese": "牧師"
        }
      },
      "path": "服事 → 牧師"
    },
    "9": {
      "firstJob": {
        "id": 2,
        "name": {
          "korean": "마법사",
          "chinese": "法師"
        }
      },
      "secondJob": {
        "id": "9",
        "name": {
          "korean": "위자드",
          "chinese": "巫師"
        }
      },
      "path": "法師 → 巫師"
    },
    "10": {
      "firstJob": {
        "id": 5,
        "name": {
          "korean": "상인",
          "chinese": "商人"
        }
      },
      "secondJob": {
        "id": "10",
        "name": {
          "korean": "블랙스미스",
          "chinese": "鐵匠"
        }
      },
      "path": "商人 → 鐵匠"
    },
    "11": {
      "firstJob": {
        "id": 3,
        "name": {
          "korean": "궁수",
          "chinese": "弓箭手"
        }
      },
      "secondJob": {
        "id": "11",
        "name": {
          "korean": "헌터",
          "chinese": "獵人"
        }
      },
      "path": "弓箭手 → 獵人"
    },
    "12": {
      "firstJob": {
        "id": 6,
        "name": {
          "korean": "도둑",
          "chinese": "盜賊"
        }
      },
      "secondJob": {
        "id": "12",
        "name": {
          "korean": "어쌔신",
          "chinese": "刺客"
        }
      },
      "path": "盜賊 → 刺客"
    },
    "14": {
      "firstJob": {
        "id": 1,
        "name": {
          "korean": "검사",
          "chinese": "劍士"
        }
      },
      "secondJob": {
        "id": "14",
        "name": {
          "korean": "크루세이더",
          "chinese": "十字軍"
        }
      },
      "path": "劍士 → 十字軍"
    },
    "15": {
      "firstJob": {
        "id": 4,
        "name": {
          "korean": "복사",
          "chinese": "服事"
        }
      },
      "secondJob": {
        "id": "15",
        "name": {
          "korean": "몽크",
          "chinese": "武僧"
        }
      },
      "path": "服事 → 武僧"
    },
    "16": {
      "firstJob": {
        "id": 2,
        "name": {
          "korean": "마법사",
          "chinese": "法師"
        }
      },
      "secondJob": {
        "id": "16",
        "name": {
          "korean": "세이지",
          "chinese": "賢者"
        }
      },
      "path": "法師 → 賢者"
    },
    "17": {
      "firstJob": {
        "id": 6,
        "name": {
          "korean": "도둑",
          "chinese": "盜賊"
        }
      },
      "secondJob": {
        "id": "17",
        "name": {
          "korean": "로그",
          "chinese": "盜賊"
        }
      },
      "path": "盜賊 → 盜賊"
    },
    "18": {
      "firstJob": {
        "id": 5,
        "name": {
          "korean": "상인",
          "chinese": "商人"
        }
      },
      "secondJob": {
        "id": "18",
        "name": {
          "korean": "알케미스트",
          "chinese": "鍊金術師"
        }
      },
      "path": "商人 → 鍊金術師"
    },
    "19": {
      "firstJob": {
        "id": 3,
        "name": {
          "korean": "궁수",
          "chinese": "弓箭手"
        }
      },
      "secondJob": {
        "id": "19",
        "name": {
          "korean": "바드",
          "chinese": "詩人"
        }
      },
      "path": "弓箭手 → 詩人"
    },
    "20": {
      "firstJob": {
        "id": 3,
        "name": {
          "korean": "궁수",
          "chinese": "弓箭手"
        }
      },
      "secondJob": {
        "id": "20",
        "name": {
          "korean": "댄서",
          "chinese": "舞孃"
        }
      },
      "path": "弓箭手 → 舞孃"
    }
  },
  "statistics": {
    "totalFirstJobs": 6,
    "totalSecondJobs": 13,
    "totalSkills": 294,
    "skillsByJob": {
      "1": {
        "jobName": {
          "korean": "검사",
          "chinese": "劍士"
        },
        "skillCount": 11,
        "type": "first"
      },
      "2": {
        "jobName": {
          "korean": "마법사",
          "chinese": "法師"
        },
        "skillCount": 15,
        "type": "first"
      },
      "3": {
        "jobName": {
          "korean": "궁수",
          "chinese": "弓箭手"
        },
        "skillCount": 7,
        "type": "first"
      },
      "4": {
        "jobName": {
          "korean": "복사",
          "chinese": "服事"
        },
        "skillCount": 16,
        "type": "first"
      },
      "5": {
        "jobName": {
          "korean": "상인",
          "chinese": "商人"
        },
        "skillCount": 13,
        "type": "first"
      },
      "6": {
        "jobName": {
          "korean": "도둑",
          "chinese": "盜賊"
        },
        "skillCount": 11,
        "type": "first"
      },
      "7": {
        "jobName": {
          "korean": "나이트",
          "chinese": "騎士"
        },
        "skillCount": 10,
        "type": "second",
        "parentJobId": 1
      },
      "8": {
        "jobName": {
          "korean": "프리스트",
          "chinese": "牧師"
        },
        "skillCount": 17,
        "type": "second",
        "parentJobId": 4
      },
      "9": {
        "jobName": {
          "korean": "위자드",
          "chinese": "巫師"
        },
        "skillCount": 13,
        "type": "second",
        "parentJobId": 2
      },
      "10": {
        "jobName": {
          "korean": "블랙스미스",
          "chinese": "鐵匠"
        },
        "skillCount": 22,
        "type": "second",
        "parentJobId": 5
      },
      "11": {
        "jobName": {
          "korean": "헌터",
          "chinese": "獵人"
        },
        "skillCount": 18,
        "type": "second",
        "parentJobId": 3
      },
      "12": {
        "jobName": {
          "korean": "어쌔신",
          "chinese": "刺客"
        },
        "skillCount": 12,
        "type": "second",
        "parentJobId": 6
      },
      "14": {
        "jobName": {
          "korean": "크루세이더",
          "chinese": "十字軍"
        },
        "skillCount": 18,
        "type": "second",
        "parentJobId": 1
      },
      "15": {
        "jobName": {
          "korean": "몽크",
          "chinese": "武僧"
        },
        "skillCount": 17,
        "type": "second",
        "parentJobId": 4
      },
      "16": {
        "jobName": {
          "korean": "세이지",
          "chinese": "賢者"
        },
        "skillCount": 23,
        "type": "second",
        "parentJobId": 2
      },
      "17": {
        "jobName": {
          "korean": "로그",
          "chinese": "盜賊"
        },
        "skillCount": 17,
        "type": "second",
        "parentJobId": 6
      },
      "18": {
        "jobName": {
          "korean": "알케미스트",
          "chinese": "鍊金術師"
        },
        "skillCount": 16,
        "type": "second",
        "parentJobId": 5
      },
      "19": {
        "jobName": {
          "korean": "바드",
          "chinese": "詩人"
        },
        "skillCount": 19,
        "type": "second",
        "parentJobId": 3
      },
      "20": {
        "jobName": {
          "korean": "댄서",
          "chinese": "舞孃"
        },
        "skillCount": 19,
        "type": "second",
        "parentJobId": 3
      }
    }
  }
};

// 職業常數
export const FIRST_JOBS = {
  SWORDMAN: 1,
  MAGICIAN: 2,
  ARCHER: 3,
  ACOLYTE: 4,
  MERCHANT: 5,
  THIEF: 6
} as const;

export const SECOND_JOBS = {
  KNIGHT: 7,
  PRIEST: 8,
  WIZARD: 9,
  BLACKSMITH: 10,
  HUNTER: 11,
  ASSASSIN: 12,
  CRUSADER: 14,
  MONK: 15,
  SAGE: 16,
  ROGUE: 17,
  ALCHEMIST: 18,
  BARD: 19,
  DANCER: 20
} as const;

// 職業路徑查詢函數
export function getJobPath(secondJobId: number): JobPath | null {
  return roSkillDatabase.jobPaths[secondJobId.toString()] || null;
}

// 技能查詢函數
export function getJobSkills(jobId: number, detailed: boolean = false): SkillDetail[] | string[] {
  const job = roSkillDatabase.firstJobs[jobId.toString()] || roSkillDatabase.secondJobs[jobId.toString()];
  if (!job) return [];
  
  if (detailed) {
    return Object.values(job.skillsDetailed);
  } else {
    return Object.values(job.skills);
  }
}
