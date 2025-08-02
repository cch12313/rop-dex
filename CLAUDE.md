# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案概述
這是一個RO樂園攻略/資訊網站（rop-dex.com），採MVP方式開發，結合學習技術目的。

## 技術架構
- Web前端: Nuxt 3 + Tailwind CSS
- 後端: Go (未來規劃)
- 部署: Cloudflare Pages
- 域名: rop-dex.com (Cloudflare管理)

## 專案結構
```
rop-dex/
├── web/          # Nuxt 3 + Tailwind CSS
├── docs/         # 內部開發文件 (不上傳GitHub)
├── README.md     # 專案說明
├── LICENSE       # MIT授權
└── .gitignore    # Git忽略設定
```

## 開發狀態
### 已完成
- [x] 基本專案架構設定 (Nuxt 3 + Tailwind CSS)
- [x] 首頁與品牌設計 (Rop-dex)
- [x] 響應式設計與SEO優化
- [x] GitHub Repository 建立
- [x] 適當的 .gitignore 設定
- [x] 首頁品牌與版面優化 (英文標題 "Welcome to Ropdex")
- [x] 靜態生成設定 (SSG) - 使用 ssr: true + nitro: static preset
- [x] GKE 部署設定優化 - 使用 nuxt preview 而非 nuxt start
- [x] Docker 容器部署設定 (port 3000, host 0.0.0.0)

- [x] 技能模擬器開發 - 完整整合 RO Zero 資料
- [x] 從 ragzero.kr 抓取完整技能資料 (294個技能)
- [x] 支援所有職業的技能樹 (6個一轉 + 13個二轉職業)

- [x] 職業選擇器優化 - 只顯示二轉職業，技能樹包含完整技能繼承

### 進行中
- [ ] 技能先決條件邏輯完善

## 功能開發順序
1. 技能模擬器（Skill Simulator）- 參考 http://ragzero.kr/skilltree/index_sakray.html
2. 素質模擬器（Stat Simulator）
3. 裝備資訊（Item DB）- 參考 https://db.irowiki.org/db/item-info/
4. 怪物資訊（Monster DB）- 參考 https://db.irowiki.org/db/monster-search
5. 傷害模擬器（搭配素質與裝備）

## 開發指令
```bash
# 進入專案目錄
cd web

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建置專案 (靜態生成)
npm run build
npm run generate  # 等同於 build，使用 nuxt generate

# 本地預覽靜態網站
npm run preview

# 容器部署啟動 (GKE)
npm run start  # 實際執行: nuxt preview --port 3000 --host 0.0.0.0

# 準備 Nuxt 環境
npm run postinstall  # 執行 nuxt prepare
```

**注意事項**：
- 目前專案無 linting 或測試配置
- 使用 Nuxt 3 的靜態生成模式 (ssr: false, nitro preset: static)
- 開發伺服器預設在 http://localhost:3000 啟動

## 程式碼架構

### 核心資料結構
- `web/types/skill.ts` - 技能系統的 TypeScript 介面定義
  - `Skill`: 技能基本資料 (id, name, icon, description, maxLevel, requirements, effects, position)
  - `Job`: 職業資料 (id, name, icon, description, skills, baseSkillPoints)
  - `JobClass`: 職業分類 (id, name, jobs)
  - `SkillRequirement`: 技能前置需求
  - `SkillEffect`: 技能效果等級描述

### 資料來源整合
- `web/data/ro_skills_final.ts` - RO Zero 原始技能資料庫
  - `SkillDetail`: 技能詳細資料
  - `JobData`: 職業資料
  - `ROSkillDatabase`: 完整資料庫結構
- `web/data/all-jobs-integrated.ts` - 整合後的職業技能資料
  - 包含完整的 294 個技能中文翻譝對照表 (skillNameMapping)
  - 職業 ID 對應：劍士系(7,14)、服事系(8,15)、商人系(10,18)、盜賊系(12,17)、法師系(9,16)、弓箭手系(11,19,20)

### 組件架構
- `web/pages/skill-simulator.vue` - 技能模擬器主頁面
- `web/components/JobSelector.vue` - 職業選擇器 (只顯示二轉職業)
- `web/components/SkillTree.vue` - 技能樹視覺化組件
- `web/components/SkillNode.vue` - 單一技能節點組件
- `web/components/SkillDetails.vue` - 技能詳細資訊面板
- `web/components/SkillPointWarning.vue` - 技能點數警告組件

### 技能系統邏輯
- 技能樹採用座標系統定位 (x, y position)
- 支援技能前置需求檢查
- 包含完整的技能繼承 (一轉→二轉職業)
- 智慧型技能點數分配與升級系統

## 重要檔案說明
- `web/pages/index.vue` - 首頁 (英文標題 "Welcome to Ropdex")
- `web/nuxt.config.ts` - Nuxt 配置 (ssr: false + nitro: static preset)
- `web/package.json` - 包含 GKE 部署優化的 start script
- `web/app.vue` - 根組件
- `docs/` - 內部開發文件 (包含原始規劃文件)
- `CLAUDE.md` - 本檔案 (不上傳GitHub)

## 開發注意事項

### 技能資料整合
- 技能資料來自 ragzero.kr，包含 294 個技能
- 職業 ID 對應必須準確，參考已記錄的職業 ID 對照表
- 所有技能都有完整的中文翻譯對照表
- 修改技能相關功能時需要驗證完整性

### 前置需求系統
- 技能樹具有複雜的前置需求邏輯
- 目前正在完善智慧型前置需求升級系統
- 新增技能邏輯時需考慮前置技能的自動升級

### UI/UX 設計原則
- 使用 Tailwind CSS 進行樣式設計
- 響應式設計支援各種裝置
- 組件採用 Vue 3 Composition API

## Git 管理
- Repository: https://github.com/cch12313/rop-dex
- 分支策略: main branch 直接開發
- 重要檔案已加入 .gitignore: docs/, CLAUDE.md, .idea/, node_modules/ 等

## 部署目標
- 使用 Cloudflare Pages 部署
- 網域: rop-dex.com
- 靜態生成 (npm run generate)

## RO Zero 職業資料整合記錄

### 錯誤記錄與解決方案

#### 問題：職業分類 ID 對應錯誤 (2025-07-20)
**錯誤原因**：
- 在整合 ragzero.kr 技能資料時，職業分類的 ID 對應關係不正確
- 原本錯誤的分類：劍士系(8,14)、服事系(10,15)、商人系(12,18)、盜賊系(13,17)
- 正確的分類應為：劍士系(7,14)、服事系(8,15)、商人系(10,18)、盜賊系(12,17)

**錯誤分析**：
1. 未仔細核對 ragzero.kr 原始資料中的 jobId 對應關係
2. 依賴推測而非實際查證職業 ID
3. 缺乏驗證步驟確認職業分類正確性

**正確的職業 ID 對應表**：
```
劍士系職業：
- 騎士 (jobId: 7)
- 十字軍 (jobId: 14)

法師系職業：
- 巫師 (jobId: 9)  
- 賢者 (jobId: 16)

弓箭手系職業：
- 獵人 (jobId: 11)
- 詩人 (jobId: 19)
- 舞孃 (jobId: 20)

服事系職業：
- 牧師 (jobId: 8)
- 武僧 (jobId: 15)

商人系職業：
- 鐵匠 (jobId: 10)
- 鍊金術師 (jobId: 18)

盜賊系職業：
- 刺客 (jobId: 12)
- 流氓 (jobId: 17)
```

**避免方法**：
1. **必須驗證**：整合外部資料時，務必逐一核對 ID 對應關係
2. **建立對照表**：先建立完整的職業 ID 對照表後再進行分類
3. **測試驗證**：每次修改職業分類後都要測試確認正確性
4. **文件記錄**：將職業 ID 對應表記錄在註釋中，方便未來查證

**修正檔案**：
- `/web/data/all-jobs-integrated.ts` - 修正 jobClassesData 中的職業 ID 過濾條件

#### 問題：技能名稱缺失中文翻譯 (2025-07-20)
**錯誤原因**：
- skillNameMapping 對照表不完整，只包含了劍士系、法師部分、弓箭手、服事部分、商人部分、盜賊技能
- 缺少 115 個技能的中文翻譯，包含所有二轉職業的專屬技能

**錯誤分析**：
1. 在建立 skillNameMapping 時只添加了部分技能，沒有涵蓋所有 294 個技能
2. 轉換邏輯中的 fallback 機制 `detail.chineseName || detail.skillName` 讓錯誤不易發現
3. 缺乏完整性檢查，未驗證所有技能都有對應的中文翻譯

**解決方案**：
- 添加了所有 115 個缺失技能的中文翻譯
- 涵蓋所有二轉職業：牧師、武僧、巫師、賢者、鐵匠、獵人、刺客、流氓、鍊金術師、詩人、舞孃

**避免方法**：
1. **完整性檢查**：建立技能對照表時，必須與原始資料進行完整性比對
2. **自動化驗證**：可考慮建立腳本檢查是否所有技能都有中文翻譯
3. **分階段驗證**：每個職業完成後都要檢查該職業的所有技能是否都有翻譯
4. **文件記錄**：在註釋中記錄每個職業系統包含的技能前綴（如 PR_、MO_、WZ_ 等）

**修正檔案**：
- `/web/data/all-jobs-integrated.ts` - 補完 skillNameMapping 中所有 294 個技能的中文翻譯

## 技能名稱對應更新流程

### 標準作業程序 (SOP)
針對新職業或需要更新技能名稱的職業，請按照以下流程進行：

#### 1. 準備工作
- 確認目標職業的韓文代碼 (如: kn=騎士, cr=十字軍, wz=巫師等)
- 準備 playwright 瀏覽器工具

#### 2. 獲取參考資料
- 使用 playwright 導航到 `https://ro.ntome.com/skill/{職業代碼}`
- 例如：`https://ro.ntome.com/skill/kn` (騎士)
- 提取完整的技能名稱列表，包含一轉基礎職業和二轉專業技能

#### 3. 分析現有設定
```bash
# 查找現有的技能設定
grep -r "職業名稱\|技能ID" /web/data/all-jobs-integrated.ts
```

#### 4. 建立對應關係
- 將網頁技能名稱與現有 skillNameMapping 中的技能ID進行配對
- 注意技能繼承關係：二轉職業包含一轉職業的所有技能
- 記錄需要更新的技能名稱清單

#### 5. 更新技能名稱對照表
```typescript
// 位置：/web/data/all-jobs-integrated.ts
const skillNameMapping: { [key: string]: string } = {
  // 更新對應的技能名稱
  'SKILL_ID': '新的中文技能名稱',
  // ...
}
```

#### 6. 測試驗證
- 啟動開發伺服器：`cd web && npm run dev`
- 使用 playwright 導航到 `http://localhost:3000/skill-simulator`
- 選擇對應職業，驗證技能名稱顯示正確

#### 7. 記錄更新
在此檔案中記錄更新的職業和主要變更，方便未來查證。

### 已完成職業更新記錄

#### 劍士系 (2025-08-02)
**騎士 (KN) - 已完成**
- 基礎職業：劍士 (SM) - 同步完成
- 更新數量：劍士 8個技能 + 騎士 6個技能
- 參考網站：https://ro.ntome.com/skill/kn
- 狀態：✅ 完成並測試通過

**十字軍 (CR) - 待處理**
- 基礎職業：劍士 (SM) - 已完成
- 參考網站：https://ro.ntome.com/skill/cr

#### 其他職業系 - 待處理
- 法師系：巫師 (WZ)、賢者 (SA)
- 弓箭手系：獵人 (HT)、詩人 (BA)、舞孃 (DC)  
- 服事系：牧師 (PR)、武僧 (MO)
- 商人系：鐵匠 (BS)、鍊金術師 (AM)
- 盜賊系：刺客 (AS)、流氓 (RG)

### 注意事項
1. **技能繼承**：二轉職業會繼承一轉職業的所有技能，更新時需一併考慮
2. **ID對應**：嚴格按照 ragzero.kr 的 jobId 對應關係
3. **完整性檢查**：每次更新後都要驗證技能模擬器的顯示效果
4. **備份重要**：更新前建議先提交當前進度，避免資料遺失