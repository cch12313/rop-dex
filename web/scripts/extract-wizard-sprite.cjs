const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

// 巫師技能的背景位置對應表 (從網頁分析得出)
const wizardSkillPositions = {
  // 魔法師技能 - 基於網頁實際的 background-position
  'MG_SRECOVERY': { x: 78, y: 52 },    // 禪心 -78px -52px
  'MG_SIGHT': { x: 104, y: 52 },       // 火狩 -104px -52px  
  'MG_FIREBOLT': { x: 130, y: 52 },    // 火箭術 -130px -52px
  'MG_FIREBALL': { x: 156, y: 52 },    // 火球術 -156px -52px
  'MG_FIREWALL': { x: 182, y: 52 },    // 火焰之壁 -182px -52px
  'MG_LIGHTNINGBOLT': { x: 208, y: 52 }, // 雷擊術 -208px -52px
  'MG_THUNDERSTORM': { x: 234, y: 52 }, // 雷爆術 -234px -52px
  'MG_COLDBOLT': { x: 260, y: 52 },    // 冰箭術 -260px -52px
  'MG_FROSTDIVER': { x: 286, y: 52 },  // 冰凍術 -286px -52px
  'MG_STONECURSE': { x: 312, y: 52 },  // 石化術 -312px -52px
  'MG_SOULSTRIKE': { x: 338, y: 52 },  // 心靈爆破 -338px -52px
  'MG_NAPALMBEAT': { x: 364, y: 52 },  // 聖靈召喚 -364px -52px
  'MG_SAFETYWALL': { x: 390, y: 52 },  // 暗之障壁 -390px -52px
  'MG_ENERGYCOAT': { x: 416, y: 52 },  // 能量外套 -416px -52px

  // 巫師技能 - 推測位置 (需要調整)
  'WZ_ESTIMATION': { x: 78, y: 78 },    // 怪物情報
  'WZ_SIGHTRASHER': { x: 104, y: 78 },  // 火之獵殺
  'WZ_FIREPILLAR': { x: 130, y: 78 },   // 火柱攻擊
  'WZ_METEOR': { x: 156, y: 78 },       // 隕石術
  'WZ_JUPITEL': { x: 182, y: 78 },      // 雷鳴術
  'WZ_VERMILION': { x: 208, y: 78 },    // 怒雷強擊
  'WZ_WATERBALL': { x: 234, y: 78 },    // 水球術
  'WZ_ICEWALL': { x: 260, y: 78 },      // 冰刃之牆
  'WZ_FROSTNOVA': { x: 286, y: 78 },    // 霜凍之術
  'WZ_STORMGUST': { x: 312, y: 78 },    // 暴風雪
  'WZ_HEAVENDRIVE': { x: 338, y: 78 },  // 地震術
  'WZ_EARTHSPIKE': { x: 364, y: 78 },   // 崩裂術
  'WZ_QUAGMIRE': { x: 390, y: 78 },     // 泥沼地
  'WZ_SIGHTBLASTER': { x: 416, y: 78 }  // 火狩芽
};

async function extractWizardSprites() {
  try {
    console.log('開始處理巫師 sprite 圖片截取...');
    
    // 下載 sprite 圖片
    const spriteUrl = 'https://iro.ntome.com/skill/mg.png';
    const response = await fetch(spriteUrl);
    if (!response.ok) {
      throw new Error(`下載失敗: ${response.status}`);
    }
    
    const buffer = await response.arrayBuffer();
    const spriteImage = await loadImage(Buffer.from(buffer));
    
    console.log(`Sprite 圖片尺寸: ${spriteImage.width}x${spriteImage.height}`);
    
    // 技能圖示大小 (通常是 26x26)
    const iconSize = 26;
    let successCount = 0;
    let errorCount = 0;
    
    // 確保輸出目錄存在
    const outputDir = '/Users/alvin.chiu56/Documents/mine/projects/ro/web/public/assets/skill-icons';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    for (const [skillId, position] of Object.entries(wizardSkillPositions)) {
      try {
        console.log(`處理技能: ${skillId} at (${position.x}, ${position.y})`);
        
        // 創建畫布
        const canvas = createCanvas(iconSize, iconSize);
        const ctx = canvas.getContext('2d');
        
        // 截取 sprite 中的特定區域
        ctx.drawImage(
          spriteImage,
          position.x, position.y, iconSize, iconSize,  // 源位置和大小
          0, 0, iconSize, iconSize                      // 目標位置和大小
        );
        
        // 保存為 PNG 檔案
        const outputPath = path.join(outputDir, `${skillId}.png`);
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync(outputPath, buffer);
        
        console.log(`✅ 成功截取: ${skillId}.png`);
        successCount++;
        
      } catch (error) {
        console.log(`❌ 處理 ${skillId} 時發生錯誤:`, error.message);
        errorCount++;
      }
    }
    
    console.log(`\n=== 截取完成 ===`);
    console.log(`成功: ${successCount} 個`);
    console.log(`失敗: ${errorCount} 個`);
    console.log(`總計: ${Object.keys(wizardSkillPositions).length} 個技能`);
    
  } catch (error) {
    console.error('處理過程中發生錯誤:', error);
    process.exit(1);
  }
}

// 檢查是否有 canvas 模組
try {
  require('canvas');
  extractWizardSprites();
} catch (error) {
  console.error('需要安裝 canvas 模組: npm install canvas');
  console.error('或者使用替代方案處理 sprite 圖片');
  process.exit(1);
}