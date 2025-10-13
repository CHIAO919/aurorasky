'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import DateStrip from '@/components/booking/DateStrip';
import FlightList from '@/components/booking/FlightList';

const STORAGE_KEY = 'aurora_last_search';

export default function FlightResultsPage() {
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
        <div className="max-w-5xl mx-auto p-6 space-y-6">
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
    );
}
