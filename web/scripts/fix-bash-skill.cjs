const fs = require('fs');
const https = require('https');
const { createCanvas, loadImage } = require('canvas');
const path = require('path');

async function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      const data = [];
      response.on('data', (chunk) => data.push(chunk));
      response.on('end', () => resolve(Buffer.concat(data)));
      response.on('error', reject);
    });
  });
}

async function fixBashSkillImage() {
  try {
    console.log('正在修正狂擊技能圖片...');
    
    // 從網站分析得到的正確資訊
    const spriteUrl = 'https://iro.ntome.com/skill/sm.png';
    const correctPosition = {
      x: 26,  // -26px 表示向左偏移26px，所以圖片位於x=26的位置
      y: 0,   // -0px 表示y=0的位置
      width: 26,
      height: 26
    };
    
    // 下載 sprite 圖片
    console.log('下載 sprite 圖片:', spriteUrl);
    const spriteBuffer = await downloadImage(spriteUrl);
    const spriteImage = await loadImage(spriteBuffer);
    
    // 建立 canvas 來切割圖片
    const canvas = createCanvas(correctPosition.width, correctPosition.height);
    const ctx = canvas.getContext('2d');
    
    // 從 sprite 中切割出狂擊技能圖片
    ctx.drawImage(
      spriteImage,
      correctPosition.x, correctPosition.y, correctPosition.width, correctPosition.height,  // source
      0, 0, correctPosition.width, correctPosition.height  // destination
    );
    
    // 儲存圖片
    const outputPath = '/Users/alvin.chiu56/Documents/mine/projects/ro/web/public/assets/skill-icons/SM_BASH.png';
    const buffer = canvas.toBuffer('image/png');
    
    // 確保目錄存在
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, buffer);
    
    console.log(`✅ 狂擊技能圖片已修正並儲存: ${outputPath}`);
    console.log(`   - 圖片大小: ${buffer.length} bytes`);
    console.log(`   - 座標: x=${correctPosition.x}, y=${correctPosition.y}`);
    console.log(`   - 尺寸: ${correctPosition.width}x${correctPosition.height}px`);
    
    // 更新 mapping 檔案
    const mappingPath = '/Users/alvin.chiu56/Documents/mine/projects/ro/web/public/assets/skill-image-mapping.json';
    if (fs.existsSync(mappingPath)) {
      const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
      
      // 找到並更新 SM_BASH 的資料
      const bashSkill = mapping.skills.find(skill => skill.skillId === 'SM_BASH');
      if (bashSkill) {
        bashSkill.spriteSource.gridPosition = {
          row: 0,
          col: 1,
          x: 26,
          y: 0
        };
        
        // 更新 metadata
        mapping.metadata.createdAt = new Date().toISOString();
        mapping.metadata.note = "Fixed SM_BASH coordinates based on ro.ntome.com analysis";
        
        fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));
        console.log('✅ skill-image-mapping.json 已更新');
      }
    }
    
  } catch (error) {
    console.error('❌ 修正狂擊技能圖片時發生錯誤:', error);
  }
}

// 執行修正
fixBashSkillImage();