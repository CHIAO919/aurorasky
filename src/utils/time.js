// utils/time.js

/**
 * 將 "HH:mm" 或含全形冒號 "HH：mm" 的時間字串轉成 {h, m}
 */
export function parseHm(timeStr) {
    if (!timeStr) return null;
    const safe = String(timeStr).replace('：', ':').trim();
    const [hStr, mStr] = safe.split(':');
    const h = Number(hStr);
    const m = Number(mStr);
    if (Number.isNaN(h) || Number.isNaN(m)) return null;
    return { h, m };
}

/**
 * 將 {h, m} 轉回 "HH:mm"
 */
export function toHm({ h, m }) {
    const hh = String(h).padStart(2, '0');
    const mm = String(m).padStart(2, '0');
    return `${hh}:${mm}`;
}

/**
 * 由起飛時間字串 + 分鐘數，計算抵達時間與跨日數
 * @returns {{ time: string, dayShift: number }}
 */
export function addMinutes(timeStr, minutesToAdd) {
    const hm = parseHm(timeStr);
    if (!hm) return { time: timeStr, dayShift: 0 };

    const total = hm.h * 60 + hm.m + Number(minutesToAdd || 0);
    const dayShift = Math.floor(total / 1440);
    const minutesInDay = ((total % 1440) + 1440) % 1440;
    const h = Math.floor(minutesInDay / 60);
    const m = minutesInDay % 60;

    return { time: toHm({ h, m }), dayShift };
}

/**
 * 將分鐘數格式化成 "3小時10分鐘" 這種字串
 */
export function formatDurationZh(minutes) {
    const min = Math.max(0, Number(minutes || 0));
    const h = Math.floor(min / 60);
    const m = min % 60;
    if (h && m) return `${h}小時${m}分鐘`;
    if (h) return `${h}小時`;
    return `${m}分鐘`;
}
