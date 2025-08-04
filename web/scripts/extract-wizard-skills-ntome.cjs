const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

// 從 ro.ntome.com 網站獲取的精確技能座標
const skillPositions = {
  // 法師技能 (mg.png)
  '禪心': { x: 78, y: 52, skillId: 'MG_SRECOVERY' },
  '火狩': { x: 26, y: 52, skillId: 'MG_SIGHT' },
  '火箭術': { x: 78, y: 0, skillId: 'MG_FIREBOLT' },
  '火球術': { x: 52, y: 0, skillId: 'MG_FIREBALL' },
  '火焰之壁': { x: 0, y: 26, skillId: 'MG_FIREWALL' },
  '雷擊術': { x: 52, y: 26, skillId: 'MG_LIGHTNINGBOLT' },
  '雷爆術': { x: 26, y: 78, skillId: 'MG_THUNDERSTORM' },
  '冰箭術': { x: 0, y: 0, skillId: 'MG_COLDBOLT' },
  '冰凍術': { x: 26, y: 26, skillId: 'MG_FROSTDIVER' },
  '石化術': { x: 0, y: 78, skillId: 'MG_STONECURSE' },
  '心靈爆破': { x: 78, y: 26, skillId: 'MG_SOULSTRIKE' },
  '聖靈召喚': { x: 52, y: 52, skillId: 'MG_NAPALMBEAT' },
  '暗之障壁': { x: 0, y: 52, skillId: 'MG_SAFETYWALL' },
  '能量外套': { x: 26, y: 0, skillId: 'MG_ENERGYCOAT' },
  
  // 巫師技能 (wz.png)
  '怪物情報': { x: 26, y: 0, skillId: 'WZ_ESTIMATION' },
  '火之獵殺': { x: 78, y: 52, skillId: 'WZ_SIGHTRASHER' },
  '火柱攻擊': { x: 78, y: 0, skillId: 'WZ_FIREPILLAR' },
  '隕石術': { x: 0, y: 52, skillId: 'WZ_METEOR' },
  '雷鳴術': { x: 78, y: 26, skillId: 'WZ_JUPITEL' },
  '怒雷強擊': { x: 26, y: 78, skillId: 'WZ_VERMILION' },
  '水球術': { x: 52, y: 78, skillId: 'WZ_WATERBALL' },
  '冰刃之牆': { x: 52, y: 26, skillId: 'WZ_ICEWALL' },
  '霜凍之術': { x: 0, y: 26, skillId: 'WZ_FROSTNOVA' },
  '暴風雪': { x: 0, y: 78, skillId: 'WZ_STORMGUST' },
  '地震術': { x: 0, y: 0, skillId: 'WZ_EARTHSPIKE' },
  '崩裂術': { x: 26, y: 26, skillId: 'WZ_HEAVENDRIVE' },
  '泥沼地': { x: 26, y: 52, skillId: 'WZ_QUAGMIRE' },
  '火狩芽': { x: 52, y: 52, skillId: 'WZ_SIGHTBLASTER' },
  '火焰藤蔓': { x: 52, y: 0, skillId: 'WZ_FIREPILLAR2' } // 新發現的技能
};

async function extractWizardSprites() {
  try {
    console.log('開始處理巫師 sprite 圖片截取...');
    
    // 技能圖示大小
    const iconSize = 26;
    let successCount = 0;
    let errorCount = 0;
    
    // 確保輸出目錄存在
    const outputDir = '/Users/alvin.chiu56/Documents/mine/projects/ro/web/public/assets/skill-icons';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // 處理法師技能 (mg.png)
    console.log('下載法師 sprite 圖片...');
    const mgSpriteUrl = 'https://iro.ntome.com/skill/mg.png';
    const mgResponse = await fetch(mgSpriteUrl);
    if (!mgResponse.ok) {
      throw new Error(`下載 mg.png 失敗: ${mgResponse.status}`);
    }
    const mgBuffer = await mgResponse.arrayBuffer();
    const mgSpriteImage = await loadImage(Buffer.from(mgBuffer));
    console.log(`法師 Sprite 圖片尺寸: ${mgSpriteImage.width}x${mgSpriteImage.height}`);
    
    // 處理巫師技能 (wz.png)
    console.log('下載巫師 sprite 圖片...');
    const wzSpriteUrl = 'https://iro.ntome.com/skill/wz.png';
    const wzResponse = await fetch(wzSpriteUrl);
    if (!wzResponse.ok) {
      throw new Error(`下載 wz.png 失敗: ${wzResponse.status}`);
    }
    const wzBuffer = await wzResponse.arrayBuffer();
    const wzSpriteImage = await loadImage(Buffer.from(wzBuffer));
    console.log(`巫師 Sprite 圖片尺寸: ${wzSpriteImage.width}x${wzSpriteImage.height}`);
    
    for (const [chineseName, skillData] of Object.entries(skillPositions)) {
      const { x, y, skillId } = skillData;
      
      try {
        console.log(`處理技能: ${skillId} (${chineseName}) at (${x}, ${y})`);
        
        // 選擇正確的 sprite 圖片
        const spriteImage = skillId.startsWith('MG_') ? mgSpriteImage : wzSpriteImage;
        
        // 創建畫布
        const canvas = createCanvas(iconSize, iconSize);
        const ctx = canvas.getContext('2d');
        
        // 截取 sprite 中的特定區域
        ctx.drawImage(
          spriteImage,
          x, y, iconSize, iconSize,  // 源位置和大小
          0, 0, iconSize, iconSize   // 目標位置和大小
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
    console.log(`總計: ${Object.keys(skillPositions).length} 個技能`);
    
  } catch (error) {
    console.error('處理過程中發生錯誤:', error);
    process.exit(1);
  }
}

extractWizardSprites();