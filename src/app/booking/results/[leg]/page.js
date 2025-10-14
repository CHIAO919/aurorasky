'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DateStrip from '@/components/booking/DateStrip';
import FlightList from '@/components/booking/FlightList';
import ProgressSteps from '@/components/booking/ProgressSteps';

const STORAGE_KEY = 'aurora_last_search';
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
    const { leg } = useParams();                 // 'outbound' | 'return'
    const isReturn = leg === 'return';

    const [search, setSearch] = useState(null);  // { departure, arrival, departDate, returnDate }
    const [selectedDate, setSelectedDate] = useState('');

    // 讀 localStorage
    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
            if (saved) setSearch(saved);
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

    // 點選某航班後的動作：去程 -> 跳到回程；回程 -> 進下一步
    const handleSelect = (flight) => {
        // 這裡可把選到的班機存到另一個 key（略）
        if (!isReturn) {
            router.push('/booking/results/return');
        } else {
            router.push('/booking/summary'); // 依你的流程調整
        }
    };

    if (!search || !filter || !selectedDate) return null;

    return (
        <div className='relative'>
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
                    className='max-w-5xl mx-auto flex items-center justify-between'
                    style={{ height: `${BAR_H}px` }}
                >
                    <div className='text-text-blue'>
                        <div className='flex items-baseline-last gap-2 font-bold'>
                            <p className='text-xl'>21000</p>
                            <p className='text-sm'>元（TWD）</p>
                        </div>
                        <p className='text-sm'>*含稅金及燃油附加費</p>
                    </div>

                    <button className='text-xl border rounded-full px-8 py-2 cursor-pointer hover:bg-main-blue hover:text-white'>
                        下一步
                    </button>
                </div>
            </div>
        </div>
    );
}
