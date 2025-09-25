"use client";
import "@/fontawesome";
import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SECTIONS = [
    {
        key:"about",
        title:"關於 Aurora Sky",
        links:["關於我們", "人才招募專區", "綠旅行碳抵銷計畫", "資訊安全政策", "廣告宣傳政策"],
    },
    {
        key:"service",
        title:"顧客服務",
        links:["顧客滿意度問卷調查", "聯絡我們", "常見問題", "航班異動改退票", "下載中心"],
    },
    {
        key:"policy",
        title:"網站聲明與規範",
        links:["隱私保護政策", "Cookie 政策", "顧客承諾", "智慧財產權", "運送條款"],
    },
];

function Footer() {
    const[openKey, setOpenKey]=useState(null);
    const toggle = (k)=> {
        setOpenKey(openKey === k ? null : k);
    };

    return(
        <footer className="bg-white border-t border-gray-400">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 items-center md:grid-cols-4 gap-8">
                <div className="flex justify-center md:block">
                    <Image
                    src="/footerLogo.png"
                    alt="Aurora Sky Logo"
                    width={160}
                    height={36}
                    priority
                    />
                </div>

                {/* 關於 Aurora Sky */}
                <div className="md:hidden space-y-2">
                    {SECTIONS.map((sec) => {
                        const expanded = openKey === sec.key;
                        const panelId = `panel-${sec.key}`;
                        const btnId = `btn-${sec.key}`;

                        return (
                            <div key={sec.key} className="border-b border-gray-400">
                                <button
                                id={btnId}
                                onClick={() => {toggle(sec.key)}}
                                className="w-full flex items-center justify-center gap-1.5 py-3 text-left font-bold text-gray-800"
                                aria-expanded={expanded}
                                aria-controls={panelId}
                                >
                                    <span>{sec.title}</span>
                                    <FontAwesomeIcon icon={["fa-solid", "fa-chevron-down"]} 
                                    className={`transition-transform ${expanded ? "rotate-180" : ""}`}/>
                                </button>

                                <div 
                                id={panelId}
                                role="region"
                                aria-labelledby={btnId}
                                className={`overflow-hidden transition-[max-height] duration-300 ${expanded ? "max-h-80" : "max-h-0"}`}
                                >
                                    <ul className="pb-3 pl-4 space-y-2 text-sm text-gray-600">
                                        {sec.links.map((item) => (
                                            <li key={item} className="hover:text-main-blue cursor-pointer text-center">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="hidden md:grid md:col-span-3 md:grid-cols-3 gap-8">
                    {SECTIONS.map((sec) => (
                        <div key={sec.key} className="text-left">
                            <h3 className="text-gray-800 font-bold mb-2">{sec.title}</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                {sec.links.map((item) => (
                                    <li key={item} className="hover:text-main-blue cursor-pointer">{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-main-blue text-center py-2">
                <p className="text-white text-sm">
                    &copy; Copyright 2025. Aurora Sky Co. Ltd. All rights reserved
                </p>
            </div>
        </footer>
    );
}

export default Footer