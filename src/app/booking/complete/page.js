'use client';
import { getOrCreateBookingNo } from '@/utils/bookingCode';
import { getOrCreateTicketNo } from '@/utils/ticketNo';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProgressSteps from '@/components/booking/ProgressSteps';

const STORAGE_KEY = 'aurora_last_search';
const SELECT_KEY  = 'aurora_selected_flights';
const PROFILE_KEY = 'aurora_booking_profile_final';
const PAYMENT_FINAL_KEY = 'aurora_booking_payment_final';
const BOOKING_KEY = 'aurora_booking_no';
const TICKET_KEY = 'aurora_ticket_no';
const STEPS = ['航班', '詳情', '個人資料', '付款', '完成'];

const safeParse = (raw, fallback = null) => {
    try { return raw ? JSON.parse(raw) : fallback; } catch { return fallback; }
};

export default function completePage() {
    const [search, setSearch] = useState(null);
    const [picked, setPicked] = useState({ outbound: null, return: null });
    const [profile, setProfile] = useState(null);
    const [payment, setPayment] = useState(null);
    const [bookingNo, setBookingNo] = useState('');
    const [ticketNo, setTicketNo] = useState('');
    const router = useRouter();

    useEffect(() => {
        try { setSearch(JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')); } catch {}
        try { setPicked(JSON.parse(localStorage.getItem(SELECT_KEY) || '{}'));   } catch {}
        
        const p = safeParse(sessionStorage.getItem(PROFILE_KEY), null);
        const pay = safeParse(sessionStorage.getItem(PAYMENT_FINAL_KEY), null);
        setProfile(p);
        setPayment(pay);

        if (!p) router.push('/booking/passenger');
        else if (!pay) router.push('/booking/payment');
    }, [router]);

    useEffect(() => {
        // 只會在瀏覽器跑；若已存在則不會重生
        const code = getOrCreateBookingNo(BOOKING_KEY, 6); // 可選前綴 'AS'
        setBookingNo(code);

        const no = getOrCreateTicketNo(TICKET_KEY, { prefix: '123-', length: 10, storage: 'session' });
        setTicketNo(no || '');
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
                <ProgressSteps steps={STEPS} current={5}/>
                
                <h3 className='text-xl md:text-2xl font-bold text-text-blue mb-[25px]'>您的預訂已確認</h3>
                
                <div className='text-text-blue bg-white py-8 px-4 md:px-8 rounded-2xl'>
                    <dl className="grid grid-cols-[140px,1fr] md:grid-cols-[180px,1fr] gap-x-8 gap-y-5">
                        <dt className="font-bold">訂位代號</dt>
                        <dd className="font-medium">{bookingNo}</dd>

                        <dt className="font-bold">旅客姓名</dt>
                        <dd className="font-medium uppercase">
                            {profile.lastName} {profile.firstName} {profile.title?.toUpperCase?.()}
                        </dd>

                        <dt className="font-bold">訂位日期</dt>
                        <dd className="font-medium">{new Date().toLocaleDateString('zh-TW')}</dd>

                        <dt className="font-bold">總金額</dt>
                        <dd className="font-medium">{fmt(totalAmount)}</dd>

                        <dt className="font-bold">機票號碼</dt>
                        <dd className="font-medium">{ticketNo}</dd>

                        <div className="col-span-2 flex justify-end pt-2">
                            <button
                                type="button"
                                className="px-6 py-2.5 rounded-full bg-main-blue text-white font-bold hover:bg-blue-700 transition"
                            >
                                行程管理
                            </button>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
}