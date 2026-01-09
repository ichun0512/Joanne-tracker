# 習慣追蹤器 - Habit Tracker

一個現代化的習慣追蹤 Web 應用程式，幫助你建立並維持良好的習慣。

## 功能特色

### 📝 習慣管理
- 新增習慣（名稱、描述、目標頻率）
- 編輯和刪除習慣
- 設定每日、每週或每月目標
- 自訂習慣顏色標籤

### ✅ 打卡記錄
- 今日習慣清單，可以勾選完成
- 補打卡功能（可以補前幾天的記錄）
- 打卡時可以加備註
- 快速查看完成狀態

### 📊 進度視覺化
- 月曆視圖顯示打卡記錄
- 連續打卡天數統計
- 完成率統計圖表
- 各習慣詳細統計資訊

### 👤 使用者功能
- 註冊和登入系統
- 個人資料設定
- 深色模式切換
- 響應式設計，支援手機和平板

## 技術架構

- **框架**: Next.js 15 (App Router)
- **語言**: TypeScript
- **樣式**: Tailwind CSS
- **圖示**: Lucide React
- **日期處理**: date-fns
- **資料儲存**: LocalStorage

## 開始使用

應用程式已經配置完成並準備好使用。開發伺服器會自動啟動。

### 主要功能導覽

1. **登入/註冊**: 首次使用需要建立帳號
2. **新增習慣**: 點擊「新增習慣」按鈕開始
3. **打卡**: 在今日習慣清單中勾選完成
4. **查看統計**: 切換到統計頁面查看進度
5. **月曆視圖**: 查看歷史打卡記錄
6. **補打卡**: 在月曆中選擇日期進行補打卡

## 專案結構

```
├── app/                    # Next.js App Router 頁面
│   ├── layout.tsx         # 根佈局（包含 Providers）
│   ├── page.tsx           # 主頁面
│   └── globals.css        # 全域樣式
├── components/            # React 元件
│   ├── AuthForm.tsx       # 登入/註冊表單
│   ├── Navbar.tsx         # 導覽列
│   ├── Dashboard.tsx      # 今日習慣儀表板
│   ├── HabitCard.tsx      # 習慣卡片
│   ├── HabitForm.tsx      # 習慣表單
│   ├── CalendarView.tsx   # 月曆視圖
│   ├── StatsView.tsx      # 統計視圖
│   ├── ProfileView.tsx    # 個人資料頁面
│   ├── Modal.tsx          # 模態視窗
│   ├── Button.tsx         # 按鈕元件
│   └── Input.tsx          # 輸入框元件
├── contexts/              # React Context
│   ├── AuthContext.tsx    # 認證狀態管理
│   ├── ThemeContext.tsx   # 主題管理
│   └── HabitContext.tsx   # 習慣資料管理
├── lib/                   # 工具函式
│   ├── storage.ts         # LocalStorage 操作
│   └── utils.ts           # 通用工具函式
└── types/                 # TypeScript 類型定義
    └── index.ts           # 資料模型定義
```

## 資料模型

### Habit（習慣）
- 名稱、描述
- 頻率（每日/每週/每月）
- 目標次數
- 自訂顏色

### CheckIn（打卡記錄）
- 習慣 ID
- 日期
- 完成狀態
- 備註（可選）

### User（使用者）
- 姓名
- 電子郵件
- 建立時間

## 特色功能

- ✨ 現代化 UI 設計
- 🌙 深色模式支援
- 📱 響應式設計
- 💾 本地資料儲存
- 🎨 可自訂習慣顏色
- 📈 詳細統計資訊
- 🔥 連續打卡追蹤
- 📅 月曆視圖
- ✍️ 打卡備註功能

## 未來擴展建議

- 整合後端 API 和資料庫
- 新增習慣提醒通知
- 匯出統計報表
- 習慣分類和標籤
- 社群分享功能
- 成就徽章系統

---

Made with ❤️ using Next.js 15 & TypeScript
