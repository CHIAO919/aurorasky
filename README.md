Aurora Sky Airline - Web Architecture Overview

## ⭐ 專案簡介

Aurora Sky 奧若拉天航是一個以 Next.js 14 建構的航空公司網站，包含購票流程、會員系統、資訊頁面、形象頁面等模組。整體 UI 設計採用 Tailwind CSS 與 FontAwesome 圖示，並以 React component 架構高度模組化的前端系統。
網站目前以 client-side rendering (CSR) 為主，並透過 localStorage、component states 及自訂資料流實作完整的機票搜尋與訂位流程。

## 🏠 整體架構

1. Public Site 一般資訊頁面

   - 首頁（Hero Banner、行程搜尋、行程相關、最新消息）
   - 體驗 AURORA（關於我們）/ SkyTier 會員（會員種類介紹） / 聯絡我們
   - 會員專區（登入彈窗 + 簡易資料呈現內頁）

2. Booking Flow 航班訂位流程（網站主要）

   1. 航班搜尋（首頁搜尋區塊 / 航班查詢頁面）
   2. 航班列表 results/[leg]（去程 / 回程）
   3. 所選航班詳情
   4. 乘客資料填寫（表單驗證）
   5. 付款資料填寫（表單驗證）
   6. 完成

   採用 localStorage 保存：

   - 使用者搜尋參數"aurora_last_search"
   - 去、回程選擇航班"aurora_selected_flights"

   Booking 子頁使用獨立的 Footer（FooterBooking）

## 🧩 Components 設計風格

1.  全區共用

    - Header
    - Footer 分成 FooterGeneral、FooterBooking（航班預訂流程使用）
    - Breadcrumb
    - Hero 除首頁外 banner 區塊
    - Modal 可自訂彈窗 / LoginModal 會員登入彈窗
    - FormCardSwitcher 表單驗證

2.  行程預訂（booking）共用

    - ProgressSteps 預訂進度條
    - DateStrip 用於顯示前後七天日期
    - FlightCard 航班卡片（含出發地/目的地之資訊、目的地之時長計算）
    - FlightList 列表（schedules.json）渲染
    - LegSummary 詳細頁航班資訊 / BaggageCard 詳細頁行李資訊
    - OrderSummaryCard 金額確認區塊

## 📂 未來可擴充方向

- 後端 API（Node.js / PHP）
- 會員預約管理（行程管理）/ 預約歷史紀錄
- 更完整的 CMS / community 模組
