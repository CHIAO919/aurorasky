// 生成 n 位數字（含前導 0）
export function generateNumeric(n = 10) {
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        const arr = new Uint8Array(n);
        crypto.getRandomValues(arr);
        return Array.from(arr, x => (x % 10)).join('');
    }
    let s = '';
    for (let i = 0; i < n; i++) s += Math.floor(Math.random() * 10);
    return s;
}

/** 只在瀏覽器端：若已有就回傳，不存在才生成並寫入 */
export function getOrCreateTicketNo(
    key = 'aurora_ticket_no',
    { prefix = '123-', length = 10, storage = 'session' } = {}
    ) {
    if (typeof window === 'undefined') return null;
    const store = storage === 'local' ? localStorage : sessionStorage;

    const existing = store.getItem(key);
    if (existing) return existing;

    const ticketNo = `${prefix}${generateNumeric(length)}`; // e.g. 123-0123456789
    try { store.setItem(key, ticketNo); } catch {}
    return ticketNo;
}

// 驗證工具（可選）
export const isValidTicketNo = (s, prefix = '123-') =>
    new RegExp(`^${prefix.replace('-', '\\-')}\\d{10}$`).test(s);
