'use client';
import { addDaysISO, formatMMDD } from '@/utils/date';

const zhWeek = (iso) => ['日','一','二','三','四','五','六'][new Date(iso).getDay()];

// 小工具：今天的 YYYY-MM-DD（也可放到 utils/date.js 內統一輸出）
const todayISO = () => {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mm}-${dd}`;
};

export default function DateStrip({ selectedDate, onChange }) {
  // 如果沒帶 selectedDate，用今天當基準，避免 key 變成空字串
    const base = selectedDate || todayISO();

    // 產生 -3 ~ +3 的 7 天
    const days = Array.from({ length: 7 }, (_, i) => {
        const offset = i - 3;
        const date = addDaysISO(base, offset);
        return { date, offset, label: formatMMDD(date), weekdayZh: zhWeek(date) };
    });

    return (
        <div className="grid grid-cols-7 gap-5 overflow-x-auto py-2">
            {days.map(({ date, offset, label, weekdayZh }) => {
                const isActive = date === base;
                return (
                <button
                    key={`${date}-${offset}`}
                    onClick={() => onChange?.(date)}
                    className={`px-4 py-2 rounded-xl border 
                    ${isActive ? 'bg-main-blue text-white border-main-blue' : 'bg-white text-text-blue border-gray-300'}
                    hover:bg-light-blue hover:text-text-blue cursor-pointer`}
                    aria-pressed={isActive}
                >
                    <div className="text-lg">{label}</div>
                    <div className="text-base opacity-80">（{weekdayZh}）</div>
                    <div className="text-xs opacity-80">
                        {offset === 0 ? '所選' : (offset > 0 ? `+${offset}` : `${offset}`)}
                    </div>
                </button>
                );
            })}
        </div>
    );
}
