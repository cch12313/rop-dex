const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

// 中文名稱到技能ID的對應表
const chineseNameToSkillId = {
  // 魔法師一轉技能
  '禪心': 'MG_SRECOVERY',
  '火狩': 'MG_SIGHT', 
  '火箭術': 'MG_FIREBOLT',
  '火球術': 'MG_FIREBALL',
  '火焰之壁': 'MG_FIREWALL',
  '雷擊術': 'MG_LIGHTNINGBOLT',
  '雷爆術': 'MG_THUNDERSTORM',
  '冰箭術': 'MG_COLDBOLT',
  '冰凍術': 'MG_FROSTDIVER',
  '石化術': 'MG_STONECURSE',
  '心靈爆破': 'MG_SOULSTRIKE',
  '聖靈召喚': 'MG_NAPALMBEAT',
  '暗之障壁': 'MG_SAFETYWALL',
  '能量外套': 'MG_ENERGYCOAT',
  
  // 巫師二轉技能
  '怪物情報': 'WZ_ESTIMATION',
  '火之獵殺': 'WZ_SIGHTRASHER',
  '火柱攻擊': 'WZ_FIREPILLAR',
  '隕石術': 'WZ_METEOR',
  '雷鳴術': 'WZ_JUPITEL',
  '怒雷強擊': 'WZ_VERMILION',
  '水球術': 'WZ_WATERBALL',
  '冰刃之牆': 'WZ_ICEWALL',
  '霜凍之術': 'WZ_FROSTNOVA',
  '暴風雪': 'WZ_STORMGUST',
  '地震術': 'WZ_HEAVENDRIVE',
  '崩裂術': 'WZ_EARTHSPIKE',
  '泥沼地': 'WZ_QUAGMIRE',
  '火狩芽': 'WZ_SIGHTBLASTER'
};

// 從瀏覽器獲取的實際座標 (部分)
const skillPositions = {
  "禪心": { x: 78, y: 52 },
  "火狩": { x: 26, y: 52 },
  "火箭術": { x: 78, y: 0 },
  "火球術": { x: 52, y: 0 },
  "火焰之壁": { x: 0, y: 26 },
  "雷擊術": { x: 52, y: 26 },
  "雷爆術": { x: 26, y: 78 },
  "冰箭術": { x: 0, y: 0 },
  "冰凍術": { x: 26, y: 26 },
  "石化術": { x: 0, y: 78 },
  "心靈爆破": { x: 78, y: 26 },
  "聖靈召喚": { x: 52, y: 52 },
  "暗之障壁": { x: 0, y: 52 },
  "能量外套": { x: 26, y: 0 },
  "怪物情報": { x: 26, y: 0 },
  "火之獵殺": { x: 78, y: 52 },
  "火柱攻擊": { x: 78, y: 0 },
  "隕石術": { x: 0, y: 52 },
  "雷鳴術": { x: 78, y: 26 },
  "怒雷強擊": { x: 26, y: 78 },
  "水球術": { x: 52, y: 78 },
  "冰刃之牆": { x: 52, y: 26 },
  "霜凍之術": { x: 0, y: 26 },
  "暴風雪": { x: 0, y: 78 },
  "地震術": { x: 0, y: 0 },
  "崩裂術": { x: 26, y: 26 },
  "泥沼地": { x: 26, y: 52 },
  "火狩芽": { x: 52, y: 52 }
};

async function extractWizardSprites() {
  try {
    console.log('開始處理巫師 sprite 圖片截取...');
    
    // 下載 sprite 圖片
    const spriteUrl = 'https://iro.ntome.com/skill/mg.png';
    console.log('下載 sprite 圖片...');
    
    const response = await fetch(spriteUrl);
    if (!response.ok) {
      throw new Error(`下載失敗: ${response.status}`);
    }
    
    const buffer = await response.arrayBuffer();
    const spriteImage = await loadImage(Buffer.from(buffer));
    
    console.log(`Sprite 圖片尺寸: ${spriteImage.width}x${spriteImage.height}`);
    
    // 技能圖示大小
    const iconSize = 26;
    let successCount = 0;
    let errorCount = 0;
    
    // 確保輸出目錄存在
    const outputDir = '/Users/alvin.chiu56/Documents/mine/projects/ro/web/public/assets/skill-icons';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    for (const [chineseName, position] of Object.entries(skillPositions)) {
      const skillId = chineseNameToSkillId[chineseName];
      
      // 只處理我們需要的技能
      if (!skillId) {
        console.log(`跳過技能: ${chineseName} (不在需要列表中)`);
        continue;
      }
      
      try {
        console.log(`處理技能: ${skillId} (${chineseName}) at (${position.x}, ${position.y})`);
        
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
        console.log(`❌ 處理 ${skillId} (${chineseName}) 時發生錯誤:`, error.message);
        errorCount++;
      }
    }
    
    console.log(`\n=== 截取完成 ===`);
    console.log(`成功: ${successCount} 個`);
    console.log(`失敗: ${errorCount} 個`);
    console.log(`總計: ${Object.keys(chineseNameToSkillId).length} 個需要的技能`);
    
  } catch (error) {
    console.error('處理過程中發生錯誤:', error);
    process.exit(1);
  }
}

extractWizardSprites();