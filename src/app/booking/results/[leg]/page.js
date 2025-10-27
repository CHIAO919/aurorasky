'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DateStrip from '@/components/booking/DateStrip';
import FlightList from '@/components/booking/FlightList';
import ProgressSteps from '@/components/booking/ProgressSteps';

const STORAGE_KEY = 'aurora_last_search';
const SELECT_KEY  = 'aurora_selected_flights';
const STEPS = ['航班', '詳情', '個人資料', '付款', '完成'];

export default function FlightResultsPage() {
    const BAR_H = 80;
    
    const NAMES = {
        tpe: '台北（桃園）', tsa: '台北（松山）', khh: '高雄',
        nrt: '東京（成田）', kix: '大阪', kmj: '熊本', ngo: '名古屋',
        icn: '首爾（仁川）', pus: '釜山',
    };

    const nameOf = (code) => NAMES[code] ?? code?.toUpperCase() ?? '';

    const router = useRouter();
    const { leg } = useParams(); // 'outbound' | 'return'
    const isReturn = leg === 'return';

    const [search, setSearch] = useState(null); // { departure, arrival, departDate, returnDate }
    const [selectedDate, setSelectedDate] = useState('');
    const [picked, setPicked] = useState({ outbound: null, return: null });

    // 讀 localStorage
    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
            if (saved) setSearch(saved);
        } catch {}

        try {
            const sel = JSON.parse(localStorage.getItem(SELECT_KEY) || 'null');
            if (sel && (typeof sel === 'object')) {
                setPicked({
                outbound: sel.outbound ?? null,
                return: sel.return ?? null,
                });
            }
        } catch {}
    }, []);

    // 頁面標題（所選行程）
    const routeLabel = useMemo(() => {
        if (!search) return '';
        const from = isReturn ? search.arrival : search.departure;
        const to   = isReturn ? search.departure : search.arrival;
        const dir  = isReturn ? '回程' : '去程';
        return (
            <>
                <p className='text-base'>
                    <FontAwesomeIcon icon={["fas", "plane"]}/>
                    {dir}
                </p>
                <p className='text-xl font-bold'>{nameOf(from)}前往{nameOf(to)}</p>
            </>
        );
    }, [search, isReturn]);

    // 根據目前頁籤（去/回）決定初始日期
    useEffect(() => {
        if (!search) return;
        setSelectedDate(isReturn ? search.returnDate : search.departDate);
    }, [search, isReturn]);

    // 固定只呼叫一次 useMemo；沒資料時回傳 null
    const filter = useMemo(() => {
        if (!search) return null;
        return isReturn
        ? { origin: search.arrival, destination: search.departure }   // 回程
        : { origin: search.departure, destination: search.arrival };  // 去程
    }, [search, isReturn]);

    // 金額加總
    const totalPrice = useMemo(() => {
        const o = picked.outbound?.price ?? 0;
        const r = picked.return?.price ?? 0;
        return o + r;
    }, [picked]);

    // 小工具：存回 localStorage
    function persistPicked(next) {
        localStorage.setItem(SELECT_KEY, JSON.stringify(next));
    }

    // 點選某航班後（從 FlightCard 傳上來）
    const handleSelect = ({ item, fare, price }) => {
        const next = {
        outbound: isReturn ? picked.outbound : { item, fare, price },
        return:   isReturn ? { item, fare, price } : picked.return,
        };
        setPicked(next);
        persistPicked(next);
    };

    // 按下固定列「下一步/下一頁」
    const handleNext = () => {
        if (!isReturn) {
            if (!picked.outbound) {
                alert('請先選擇去程票價');
                return;
            }
            router.push('/booking/results/return');
        } else {
            if (!picked.return) {
                alert('請先選擇回程票價');
                return;
            }
            router.push('/booking/summary'); // 依你的流程調整下一頁
        }
    };

    const fmt = (n) => new Intl.NumberFormat('zh-TW').format(n);

    if (!search || !filter || !selectedDate) return null;

    return (
        <div className='relative bg-bg-blue'>
            <div className="max-w-5xl mx-auto p-6 space-y-8">
                <ProgressSteps steps={STEPS} current={1}/>

                <h2 className='text-text-blue'>{routeLabel}</h2>

                <DateStrip 
                    selectedDate={selectedDate}
                    onChange={setSelectedDate} 
                />
                <FlightList
                    filter={filter}
                    selectedDate={selectedDate}
                    onSelect={handleSelect}
                    selected={isReturn ? picked.return : picked.outbound}
                />
            </div>
            
            <div 
                className='fixed inset-x-0 bottom-0 z-50 bg-white border-t border-gray-300 shadow-sm'
                style={{
                // 高度 = 你的視覺高度（BAR_H）+ iPhone 等安全區
                paddingBottom: "env(safe-area-inset-bottom)",
                }}
            >
                <div 
                    className='max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 gap-4'
                    style={{ height: `${BAR_H}px` }}
                >
                    <div className='text-text-blue'>
                        <div className='flex items-baseline-last gap-2 font-bold'>
                            <p className='text-xl'>{fmt(totalPrice)}</p>
                            <p className='text-sm'>元（TWD）</p>
                        </div>
                        <p className='text-sm'>*含稅金及燃油附加費</p>
                    </div>

                    <button
                        className='text-xl border rounded-full px-8 py-2 cursor-pointer hover:bg-main-blue hover:text-white'
                        onClick={handleNext}
                        disabled={(!isReturn && !picked.outbound) || (isReturn && !picked.return)}
                    >
                        {isReturn ? '下一頁' : '下一步'}
                    </button>
                </div>
            </div>
        </div>
    );
}
