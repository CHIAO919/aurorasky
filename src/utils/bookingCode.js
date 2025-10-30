export function generateCode(length = 6, prefix = '') {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const arr = new Uint8Array(length);
    crypto.getRandomValues(arr);
    const code = Array.from(arr, (x) => chars[x % chars.length]).join('');
    return prefix ? `${prefix}-${code}` : code;
}

export function getOrCreateBookingNo(key = 'aurora_booking_no', length = 6, prefix = '') {
    const existing = sessionStorage.getItem(key);
    if (existing) return existing;
    const newCode = generateCode(length, prefix);
    sessionStorage.setItem(key, newCode);
    return newCode;
}