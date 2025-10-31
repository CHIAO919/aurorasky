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
        key: 'traveler',
        label: '成人',
        fields: [
            { key: 'title', label: '稱謂', type: 'select', required: true,
                options: [
                    { value: '', label: '請選擇' },
                    { value: 'mr', label: '先生' },
                    { value: 'ms', label: '小姐' },
                    { value: 'mx', label: '不指定' },
                ] },
            { key: 'lastName',  label: '姓氏',  placeholder: '範例) WANG', required: true },
            { key: 'firstName', label: '名字',  placeholder: '範例) XIAOMING', required: true },
            { key: 'birthday',  label: '出生',  type: 'date', required: true },
            { key: 'passport',  label: '護照號碼', required: true },
            { key: 'passportExpiry', label: '護照效期', type: 'date', required: true },
        ],
    },
    {
        key: 'contact',
        label: '聯絡資料',
        fields: [
            { key: 'email',  label: '電子信箱', type: 'email', required: true },
            { key: 'mobile', label: '手機號碼', type: 'tel',   required: true },
        ],
    },
];

export default function PassengerPage() {
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
                <ProgressSteps steps={STEPS} current={3}/>

                <h3 className='text-xl md:text-2xl font-bold text-text-blue mb-[25px]'>旅客詳細資料</h3>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="order-1 lg:order-1 lg:col-span-8">
                        <FormCardSwitcher
                            sections={sections}
                            sessionKey="aurora_booking_profile"
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
                                    // 全部通過才會觸發；此處可把 formData 存到 session/local 或直接帶到下一頁
                                    sessionStorage.setItem('aurora_booking_profile_final', JSON.stringify(formData));
                                    router.push('/booking/payment');
                                }}
                            />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}