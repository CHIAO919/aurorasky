'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const TABS = [
    {
        key:"booking",
        label:"預約管理",
        iconOff:["fas", "file-circle-plus"],
        iconOn:["fas", "file-circle-check"],
        actions:[
            {
                title:"管理我的行程",
                desc:"確認，變更/取消行程等",
            },
            {
                title:"確認里程",
                desc:"哩程數記錄等",
            },
            {
                title:"網路收據",
                desc:"傳送簡化收據",
            },
        ],
    },
    {
        key:"checkin",
        label:"報到",
        iconOff:["fas", "plane-up"],
        iconOn:["fas", "plane-circle-check"],
        actions:[
            {
                title:"線上報到",
                desc:"起飛前 24 小時開放",
            },
            {
                title:"座位/行李",
                desc:"選位與行李規定",
            },
            {
                title:"登機證",
                desc:"下載或加入行動錢包",
            },
        ],
    },
    {
        key:"status",
        label:"航班動態",
        iconOff:["fas", "plane-departure"],
        iconOn:["fas", "plane-arrival"],
        actions:[
            {
                title:"查詢航班",
                desc:"即時出發/到達時間",
            },
            {
                title:"通知訂閱",
                desc:"延誤/變更即時提醒",
            },
            {
                title:"機場資訊",
                desc:"航站/值機櫃檯/閘口",
            },
        ],
    },
];

export default function QuickTabs() {
    const [active, setActive] = useState("booking");
    const current = TABS.find(t => t.key === active) ?? TABS[0];

    return (
        <section className="leading-6 tracking-wide">
            <div className="bg-main-blue px-3 py-6 grid grid-cols-3 content-center justify-items-center mb-1.5">
                {TABS.map(({key, label, iconOff, iconOn}) => {
                    const isActive = key === active;

                    return (
                        <button
                            key={key}
                            id={`tab-${key}`}
                            tabIndex={isActive ? 0 : -1}
                            onClick={() => setActive(key)}
                            className={`text-center cursor-pointer flex flex-col gap-2 ${isActive ? "text-main-gold" : "text-white"}`}
                        >
                            <FontAwesomeIcon 
                                icon={ isActive ? iconOn : iconOff }
                                className="text-5xl"
                            />

                            <p>{label}</p>
                        </button>
                    );
                })}
            </div>

            <div className="bg-white px-3 py-6">
                <ul
                    className="grid grid-cols-1 gap-4 md:grid-cols-3"
                    id={`panel-${current.key}`}
                >
                    {current.actions.map((a) => (
                        <li
                            key={a.title}
                            className="text-center text-text-blue"
                        >
                            <button
                                className="border border-text-blue rounded-full w-full max-w-[300px] px-4 py-1 text-base mb-2 hover:bg-light-blue font-bold hover:border-transparent"
                            >{a.title}</button>

                            <p className="text-sm">{a.desc}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}