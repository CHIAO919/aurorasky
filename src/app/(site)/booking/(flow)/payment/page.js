'use client';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProgressSteps from '@/components/booking/ProgressSteps';
import FormCardSwitcher from '@/components/booking/FormCardSwitcher';
import OrderSummaryCard from '@/components/booking/OrderSummaryCard';

const STORAGE_KEY = 'aurora_last_search';
const SELECT_KEY  = 'aurora_selected_flights';
const STEPS = ['航班', '詳情', '個人資料', '付款', '完成'];

const sections = [
    {
        key: 'creditCard',
        label: '信用卡',
        fields: [
            { key: 'cardNo', label: '信用卡號', type: 'text', required: true, maxLength: 16, pattern: '^\\d{16}$', patternMessage: '請輸入正確信用卡號', inputMode: 'text' },
            { key: 'validity', label: '有效期限',  type: 'date', required: true, dateLimit:'future' },
            { key: 'name', label: '持卡人姓名', required: true, pattern: '^[A-Za-z]+$', patternMessage: '僅限英文', inputMode: 'text' },
        ],
    },
    {
        key: 'cardholder',
        label: '持卡人資料',
        fields: [
            { key: 'email', label: '電子信箱', type: 'email', required: true },
            { key: 'mobile', label: '行動電話', type: 'text', required: true, maxLength: 10, pattern: '^\\d{10}$', patternMessage: '請輸入 10 位手機號碼', inputMode: 'tel' },
        ],
    },
];

export default function paymentPage() {
    const [search, setSearch] = useState(null);
    const [picked, setPicked] = useState({ outbound: null, return: null });
    const [allValid, setAllValid] = useState(false);
    const [formData, setFormData] = useState({});
    const router = useRouter();

    useEffect(() => {
        try { setSearch(JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')); } catch {}
        try { setPicked(JSON.parse(localStorage.getItem(SELECT_KEY) || '{}'));   } catch {}
    }, []);
    
    const totalAmount = useMemo(() => {
        const o = picked?.outbound?.price ?? 0;
        const r = picked?.return?.price   ?? 0;
        return o + r;
    }, [picked]);
    
    const fmt = n => new Intl.NumberFormat('zh-TW').format(n ?? 0);
    if (!search || (!picked.outbound && !picked.return)) return null;

    return (
        <div className='bg-bg-blue'>
            <div className="max-w-5xl mx-auto p-6 space-y-8">
                <ProgressSteps steps={STEPS} current={4}/>
        
                <h3 className='text-xl md:text-2xl font-bold text-text-blue mb-[25px]'>付款詳細資料</h3>
        
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="order-1 lg:order-1 lg:col-span-8">
                        <FormCardSwitcher
                            sections={sections}
                            sessionKey="aurora_booking_payment"
                            onChange={setFormData}
                            onAllValidChange={setAllValid}
                        />
                    </div>
        
                    <aside className="order-2 lg:order-2 lg:col-span-4">
                        <div className="lg:sticky lg:top-[88px] lg:z-40 self-start">
                            <OrderSummaryCard 
                                totalAmount={fmt(totalAmount)}
                                disabled={!allValid}
                                onNext={() => {
                                    sessionStorage.setItem('aurora_booking_payment_final', JSON.stringify(formData));
                                    router.push('/booking/complete');
                                }}
                            />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}