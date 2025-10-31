'use client';
import Link from "next/link";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SignupCompletePage() {
    const [profile, setProfile] = useState(null);
    const [submittedAt, setSubmittedAt] = useState('');

    useEffect(() => {
        try {
            const p = sessionStorage.getItem('aurora_signup_profile');
            if (p) setProfile(JSON.parse(p));

            const ts = sessionStorage.getItem('aurora_signup_submittedAt');
            if (ts) {
                // 依台灣時區與格式轉字串
                const s = new Intl.DateTimeFormat('zh-TW', {
                    timeZone: 'Asia/Taipei',
                    year: 'numeric', month: '2-digit', day: '2-digit',
                }).format(new Date(ts));
                setSubmittedAt(s);
            }
        } catch {}
    }, []);

    return (
        <div className='bg-bg-blue'>
            <div className="max-w-4xl mx-auto p-6 text-text-blue">
                <div className='bg-white p-6 rounded-xl'>
                    <div className='flex flex-col justify-center items-center gap-2 border-b border-gray-300 pb-[15px]'>
                        <FontAwesomeIcon icon={["fas", "circle-check"]} className='text-main-gold' size="3x"/>
                        <h2 className="text-2xl font-bold">恭喜您成功加入SkyTier</h2>
                        <p className='text-xl'>歡迎成為Aurora Sky奧若拉天航的會員</p>
                        <p className='text-xl'>立即開始您的尊榮旅程</p>
                    </div>

                    <div className='border-b border-gray-300 py-[15px] px-6 grid grid-rows-1 gap-1.5'>
                        <h3 className='text-xl font-semibold'>會員資料</h3>
                        <div className='uppercase flex'>
                            <p className="font-semibold w-[200px]">會員姓名</p>
                            <p className='flex-1'>{profile?.lastName} {profile?.firstName}</p>
                        </div>
                        <div className='uppercase flex'>
                            <p className="font-semibold w-[200px]">會員編號</p>
                            <p className='flex-1'>0123456789</p>
                        </div>
                        <div className='uppercase flex'>
                            <p className="font-semibold w-[200px]">入會日期</p>
                            <p className='flex-1'>{submittedAt || '--/--/--'}</p>
                        </div>
                    </div>

                    <div className='border-b border-gray-300 py-[15px] px-6 grid grid-rows-1 gap-1.5'>
                        <h3 className='text-xl font-semibold'>接下來您可以</h3>
                        <Link 
                            className='flex items-center gap-1 cursor-pointer hover:underline'
                            href="/booking"
                        >
                            <FontAwesomeIcon icon={["fas", "plane-departure"]} className='text-main-gold'/>
                            <p>預訂您的下一趟航班</p>
                        </Link>
                        <Link 
                            className='flex items-center gap-1 cursor-pointer hover:underline'
                            href="/skytier"
                        >
                            <FontAwesomeIcon icon={["fas", "gift"]} className='text-main-gold'/>
                            <p>查看會員專屬優惠</p>
                        </Link>
                    </div>
                    <div className='py-[15px] px-6 grid grid-rows-1 gap-1.5'>
                        <div className='text-important-red text-lg font-semibold flex items-center gap-1'>
                            <FontAwesomeIcon icon={["fas", "circle-exclamation"]}/>
                            <p>安全提醒</p>
                        </div>
                        <p>請妥善保管您的帳號資訊，並定期更新密碼以保障您的會員安全。</p>
                    </div>

                    <div className="py-[15px] px-6 grid grid-cols-1 md:grid-cols-2 gap-[20px] md:gap-[100px]">
                        <Link 
                            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-white font-bold bg-main-blue hover:bg-blue-700"
                            href="/"
                        >
                            回首頁
                        </Link>
                        <Link 
                            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-white font-bold bg-main-blue hover:bg-blue-700"
                            href="/skytier"
                        >
                            SkyTier 會員
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}