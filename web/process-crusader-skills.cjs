const { createCanvas, loadImage } = require('canvas');
const fs = require('fs').promises;
const path = require('path');

// 十字軍技能座標資料 - 從 ro.ntome.com 提取
const crusaderSkillsData = [
  // Crusader技能 (cr.png)
  { name: "自動防禦", x: 0, y: 26, spriteImage: "cr.png", skillId: "CR_AUTOGUARD" },
  { name: "盾擊", x: 0, y: 78, spriteImage: "cr.png", skillId: "CR_SHIELDCHARGE" },
  { name: "迴旋盾擊", x: 78, y: 52, spriteImage: "cr.png", skillId: "CR_SHIELDBOOMERANG" },
  { name: "光之盾", x: 26, y: 26, spriteImage: "cr.png", skillId: "CR_DEFENDER" },
  { name: "反射盾", x: 52, y: 52, spriteImage: "cr.png", skillId: "CR_REFLECTSHIELD" },
  { name: "信任", x: 78, y: 78, spriteImage: "cr.png", skillId: "CR_TRUST" },
  { name: "聖十字攻擊", x: 0, y: 52, spriteImage: "cr.png", skillId: "CR_HOLYCROSS" },
  { name: "聖十字審判", x: 78, y: 26, spriteImage: "cr.png", skillId: "CR_GRANDCROSS" },
  { name: "犧牲", x: 52, y: 26, spriteImage: "cr.png", skillId: "CR_DEVOTION" },
  { name: "神祐之光", x: 26, y: 52, spriteImage: "cr.png", skillId: "CR_PROVIDENCE" },
  { name: "長矛加速術", x: 52, y: 78, spriteImage: "cr.png", skillId: "CR_SPEARQUICKEN" },
  { name: "退縮", x: 26, y: 78, spriteImage: "cr.png", skillId: "CR_SHRINK" },
  
  // Acolyte技能 (al.png)
  { name: "治療術", x: 78, y: 0, spriteImage: "al.png", skillId: "AL_HEAL" },
  { name: "天使之護", x: 52, y: 26, spriteImage: "al.png", skillId: "AL_DP" },
  { name: "天使之擊", x: 26, y: 26, spriteImage: "al.png", skillId: "AL_DEMONBANE" },
  { name: "治癒術", x: 78, y: 26, spriteImage: "al.png", skillId: "AL_CURE" },
  
  // Swordsman技能 (sm.png)
  { name: "單手劍使用熟練度", x: 0, y: 52, spriteImage: "sm.png", skillId: "SM_SWORD" },
  { name: "雙手劍使用熟練度", x: 26, y: 52, spriteImage: "sm.png", skillId: "SM_TWOHAND" },
  { name: "狂擊", x: 26, y: 0, spriteImage: "sm.png", skillId: "SM_BASH" },
  { name: "怒爆", x: 0, y: 26, spriteImage: "sm.png", skillId: "SM_MAGNUM" },
  { name: "挑釁", x: 52, y: 26, spriteImage: "sm.png", skillId: "SM_PROVOKE" },
  { name: "霸體", x: 52, y: 0, spriteImage: "sm.png", skillId: "SM_ENDURE" },
  { name: "快速恢復", x: 78, y: 26, spriteImage: "sm.png", skillId: "SM_RECOVERY" },
  { name: "移動時恢復HP", x: 26, y: 26, spriteImage: "sm.png", skillId: "SM_MOVINGRECOVERY" },
  { name: "攻擊弱點", x: 78, y: 0, spriteImage: "sm.png", skillId: "SM_FATALBLOW" },
  { name: "狂暴狀態", x: 0, y: 0, spriteImage: "sm.png", skillId: "SM_AUTOBERSERK" },
  
  // Knight技能 (kn.png)
  { name: "長矛使用熟練度", x: 26, y: 52, spriteImage: "kn.png", skillId: "KN_SPEARMASTERY" },
  { name: "騎乘術", x: 78, y: 26, spriteImage: "kn.png", skillId: "KN_RIDING" },
  { name: "騎兵修練", x: 78, y: 0, spriteImage: "kn.png", skillId: "KN_CAVALIERMASTERY" }
];

async function processCrusaderSkills() {
  const spriteImages = {
    'cr.png': null,
    'al.png': null, 
    'sm.png': null,
    'kn.png': null
  };

  try {
    console.log('載入 sprite 圖片...');
    
    // 載入所有需要的 sprite 圖片
    for (const spriteFile of Object.keys(spriteImages)) {
      const spritePath = path.join(__dirname, 'sprites', spriteFile);
      try {
        spriteImages[spriteFile] = await loadImage(spritePath);
        console.log(`✓ 成功載入 ${spriteFile}`);
      } catch (error) {
        console.error(`✗ 無法載入 ${spriteFile}:`, error.message);
        return;
      }
    }

    // 確保輸出目錄存在
    const outputDir = path.join(__dirname, 'public', 'assets', 'skill-icons');
    await fs.mkdir(outputDir, { recursive: true });

    let processedCount = 0;
    let errorCount = 0;

    console.log('\n開始處理十字軍技能圖片...');
    console.log('='.repeat(50));

    for (const skill of crusaderSkillsData) {
      try {
        const spriteImage = spriteImages[skill.spriteImage];
        if (!spriteImage) {
          console.error(`✗ 找不到 sprite 圖片: ${skill.spriteImage}`);
          errorCount++;
          continue;
        }

        // 創建 26x26 畫布
        const canvas = createCanvas(26, 26);
        const ctx = canvas.getContext('2d');

        // 從 sprite 圖片中擷取指定區域 (26x26)
        ctx.drawImage(
          spriteImage,
          skill.x, skill.y, 26, 26,  // 源區域
          0, 0, 26, 26               // 目標區域
        );

        // 儲存為 PNG 檔案
        const outputPath = path.join(outputDir, `${skill.skillId}.png`);
        const buffer = canvas.toBuffer('image/png');
        await fs.writeFile(outputPath, buffer);

        console.log(`✓ ${skill.name} (${skill.skillId}) - ${skill.spriteImage} [${skill.x}, ${skill.y}]`);
        processedCount++;

      } catch (error) {
        console.error(`✗ 處理 ${skill.name} 時發生錯誤:`, error.message);
        errorCount++;
      }
    }

    console.log('='.repeat(50));
    console.log(`\n處理完成！`);
    console.log(`✓ 成功處理: ${processedCount} 個技能`);
    console.log(`✗ 處理失敗: ${errorCount} 個技能`);
    console.log(`📁 輸出目錄: ${outputDir}`);

    if (errorCount === 0) {
      console.log('\n🎉 所有十字軍技能圖片已成功生成！');
    }

  } catch (error) {
    console.error('處理過程中發生錯誤:', error);
  }
}

// 執行腳本
if (require.main === module) {
  processCrusaderSkills();
}

module.exports = { processCrusaderSkills, crusaderSkillsData };