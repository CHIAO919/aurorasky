'use client';
import { useEffect, useMemo, useState } from 'react';
import ProgressSteps from "@/components/booking/ProgressSteps";
import LegSummary from '@/components/booking/LegSummary';
import BaggageCard from '@/components/booking/BaggageCard';
import OrderSummaryCard from '@/components/booking/OrderSummaryCard';

const STORAGE_KEY = 'aurora_last_search';
const SELECT_KEY  = 'aurora_selected_flights';
const STEPS = ['航班', '詳情', '個人資料', '付款', '完成'];

export default function SummaryPage() {
    const [search, setSearch] = useState(null);
    const [picked, setPicked] = useState({ outbound: null, return: null });
    const [fare, setFare] = useState(null);

    useEffect(() => {
        try { setSearch(JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')); } catch {}
        try { setPicked(JSON.parse(localStorage.getItem(SELECT_KEY) || '{}'));   } catch {}
    }, []);

    const totalPrice = useMemo(() => {
    if (fare) {
        const { base=0, taxes=0, fees=0, extras=0 } = fare || {};
        return Math.max(base + taxes + fees + extras, 0);
    }
        const o = picked?.outbound?.price ?? 0;
        const r = picked?.return?.price   ?? 0;
        return o + r;
    }, [fare, picked]);

    const fmt = n => new Intl.NumberFormat('zh-TW').format(n ?? 0);

    if (!search || (!picked.outbound && !picked.return)) return null;

    return (
        <div className='bg-bg-blue'>
            <div className="max-w-5xl mx-auto p-6 space-y-8">
                <ProgressSteps steps={STEPS} current={2}/>
                
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
                    <aside className="lg:col-span-4 order-1 lg:order-2">
                        <div className="lg:sticky lg:top-[88px] lg:z-40 self-start">
                            <OrderSummaryCard totalAmount={fmt(totalPrice)}/>
                        </div>
                    </aside>
                    
                    <div className="lg:col-span-8 order-2 lg:order-1">
                        <section className='mb-[60px]'>
                            <h2 className='text-2xl font-bold text-text-blue mb-[25px]'>行程詳細資料</h2>
                            <div>
                                <div className='flex flex-col gap-[20px]'>
                                    <LegSummary title="去程" leg={picked?.outbound} travelDate={search?.departDate}/>
                                    <LegSummary title="回程" leg={picked?.return} travelDate={search?.returnDate}/>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className='text-2xl font-bold text-text-blue mb-[25px]'>行李資訊</h2>
                            <div>
                                <div className='flex flex-col gap-[20px]'>
                                    <BaggageCard title="托運行李" leg={picked?.outbound} desc="2 件免費託運行李"/>
                                    <BaggageCard title="手提行李" leg={picked?.outbound} desc="1 件免費手提行李"/>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}