// 內部：把 Date 物件轉成 YYYY-MM-DD
function toISODate(d) {
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mm}-${dd}`;
}

// 內部：盡可能把輸入轉成 Date；失敗回 null
function parseToDate(isoLike) {
    if (!isoLike) return null;

     // 先嘗試讓瀏覽器原生解析（也支援 '2025-07-03' 這種）
    const d1 = new Date(isoLike);
    if (!Number.isNaN(d1.getTime())) return d1;

    // 再嚴格走 'YYYY-MM-DD'
    const parts = String(isoLike).split('-');
    if (parts.length !== 3) return null;
    const [y, m, d] = parts.map(Number);
    const d2 = new Date(y, (m || 1) - 1, d || 1);
    if (Number.isNaN(d2.getTime())) return null;
    return d2;
}

// 把function export出去給其他檔案使用

export function addDaysISO(iso, days = 0) {
    const dt = parseToDate(iso);
    if (!dt) return ''; // 無效輸入時回空字串（也可依需求 throw）
    dt.setDate(dt.getDate() + Number(days || 0));
    return toISODate(dt);
}

export function getWeekdayName(iso) {
    const dt = parseToDate(iso);
    if (!dt) return '';
    // schedules.json 用的是英文：Monday...Sunday
    const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return names[dt.getDay()];
}

export function formatMMDD(iso) {
    const dt = parseToDate(iso);
    if (!dt) return '';
    const mm = String(dt.getMonth() + 1).padStart(2, '0');
    const dd = String(dt.getDate()).padStart(2, '0');
    return `${mm}/${dd}`;
}