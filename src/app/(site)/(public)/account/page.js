"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { displayName, formatCountryCode, formatGender } from "@/utils/auth";

const AUTH_KEY = "aurora_auth";

export default function AccountPage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const p = localStorage.getItem(AUTH_KEY);
            if (p) setUser(JSON.parse(p));
        } 
        catch {}
    }, []);

    return (
        <div className='bg-bg-blue'>
            <div className="max-w-5xl mx-auto p-6 space-y-8">
                <h3 className='text-xl md:text-2xl font-bold text-text-blue mb-[25px]'>我的 SkyTier </h3>

                <div className="flex flex-col gap-[20px]">
                    <div className="bg-white grid grid-cols-2 items-center p-4">
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold text-main-blue p-[20px]">您好，{displayName(user?.profile)}</h3>
                            <hr className="text-gray-300"/>
                            <div className="grid grid-cols-3 p-[20px] text-text-blue">
                                <div>
                                    <p>會員卡級</p>
                                    <p className="text-main-blue font-bold text-lg">SkyTier Blue</p>
                                </div>
                                <div>
                                    <p>卡級效期</p>
                                    <p className="text-main-blue font-bold text-lg">永久</p>
                                </div>
                                <div>
                                    <p>SkyTier ID</p>
                                    <p className="text-main-blue font-bold text-lg">{user?.account}</p>
                                </div>
                            </div>
                        </div>
                        <div className="shrink-0 rounded-tl-4xl rounded-br-4xl overflow-hidden ml-auto">
                            <Image
                                src="/skytier/SkyTierBlue.png"
                                alt="grade"
                                width={300}
                                height={110}
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="bg-white p-4 grid grid-cols-2">
                        <div className="text-text-blue p-[20px] border-r border-gray-300">
                            <p className="text-xl font-bold">獎勵哩程</p>
                            <div className="flex items-baseline">
                                <p className="text-2xl font-bold text-main-blue">0</p>
                                <p>哩</p>
                            </div>
                        </div>
                        
                        <div className="text-text-blue p-[20px]">
                            <p className="text-xl font-bold">晉升資格計算</p>
                            <div className="grid grid-cols-2">
                                <div className="flex items-baseline">
                                    <p className="text-2xl font-bold text-main-blue">0</p>
                                    <p>哩</p>
                                </div>
                                <div className="flex items-baseline">
                                    <p className="text-2xl font-bold text-main-blue">0</p>
                                    <p>有效航段數</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 text-text-blue">
                        <h3 className="text-xl md:text-2xl font-bold p-[20px]">個人資料</h3>
                        <hr className="text-gray-300"/>
                        <div className="grid grid-cols-3 gap-4 p-4">
                            <div>
                                <p>姓氏</p>
                                <p className="text-main-blue font-bold text-lg">{user?.profile?.lastName}</p>
                            </div>
                            <div>
                                <p>名字</p>
                                <p className="text-main-blue font-bold text-lg">{user?.profile?.firstName}</p>
                            </div>
                            <div>
                                <p>出生日期</p>
                                <p className="text-main-blue font-bold text-lg">{user?.profile?.dob}</p>
                            </div>
                            <div>
                                <p>性別</p>
                                <p className="text-main-blue font-bold text-lg">{formatGender(user?.profile?.gender)}</p>
                            </div>
                            <div>
                                <p>國家/地區代碼</p>
                                <p className="text-main-blue font-bold text-lg">{formatCountryCode(user?.profile?.countryCode)}</p>
                            </div>
                            <div>
                                <p>手機號碼</p>
                                <p className="text-main-blue font-bold text-lg">{user?.profile?.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}