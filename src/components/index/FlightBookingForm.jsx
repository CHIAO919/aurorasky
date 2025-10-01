'use client';
import { useState, useEffect } from "react";

const STORAGE_KEY = 'aurora_last_search';

function today() {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mm}-${dd}`;
}

const DEPARTURES = [
    { value: "tpe", label: "台北（桃園機場）" },
    { value: "tsa", label: "台北（松山機場）" },
    { value: "khh", label: "高雄" },
];

const ARRIVALS = [
    {
        group: "日本",
        options: [
            { value: "nrt", label: "東京（成田機場）" },
            { value: "kix", label: "大阪" },
            { value: "kmj", label: "熊本" },
            { value: "ngo", label: "名古屋" },
        ],
    },
    {
        group: "韓國",
        options: [
            { value: "icn", label: "首爾（仁川機場）" },
            { value: "pus", label: "釜山" },
        ],
    },
];

export default function FlightBookingForm({ onSubmit }) {
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [departDate, setDepartDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
        if (saved) {
            setDeparture(saved.departure ?? '');
            setArrival(saved.arrival ?? '');
            setDepartDate(saved.departDate ?? '');
            setReturnDate(saved.returnDate ?? '');
        }
        } catch {}
    }, []);

    // 讓回程日期不可早於出發日期
    useEffect(() => {
        if (departDate && returnDate && returnDate < departDate) {
            setReturnDate(departDate);
        }
    }, [departDate, returnDate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { departure, arrival, departDate, returnDate };
        // 寫入 localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        // 給父層（或之後接 API / router.push）
        onSubmit?.(payload);
    };

    const canSearch = departure && arrival && departDate && returnDate;

    return (
        <section>
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 max-w-5xl mx-auto leading-6 tracking-wide">
                <h2 className="text-text-blue text-2xl font-bold border-b border-gray-400 pb-2 mb-6 tracking-widest">
                    預訂航班
                </h2>

                <form onSubmit={handleSubmit}>
                    {/* 欄位列 */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        {/* 出發地 */}
                        <select
                            name="departure"
                            id="departure"
                            value={departure}
                            onChange={(e) => setDeparture(e.target.value)}
                            className="border border-gray-400 rounded-lg px-4 py-2 col-span-1"
                        >
                            <option value="" disabled>出發地</option>
                            {DEPARTURES.map((airport) => (
                                <option key={airport.value} value={airport.value}>
                                    {airport.label}
                                </option>
                            ))}
                        </select>

                        {/* 目的地 */}
                        <select
                            name="arrival"
                            id="arrival"
                            value={arrival}
                            onChange={(e) => setArrival(e.target.value)}
                            className="border border-gray-400 rounded-lg px-4 py-2 col-span-1"
                        >
                            <option value="" disabled>目的地</option>
                            {ARRIVALS.map((group) => (
                                <optgroup key={group.group} label={group.group}>
                                    {group.options.map((airport) => (
                                    <option key={airport.value} value={airport.value}>
                                        {airport.label}
                                    </option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>

                        {/* 出發日期 */}
                        <input
                            type="date"
                            value={departDate}
                            onChange={(e) => setDepartDate(e.target.value)}
                            min={today()}
                            className="border border-gray-400 rounded-lg px-4 py-2 col-span-1"
                        />

                        {/* 回程日期 */}
                        <input
                            type="date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            min={departDate || today()}
                            className="border border-gray-400 rounded-lg px-4 py-2 col-span-1"
                        />
                    </div>

                    {/* 搜尋按鈕（單獨一列，靠右） */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={!canSearch}
                            className={`rounded-full py-2 font-bold transition
                                ${canSearch
                                ? 'bg-main-blue text-white w-[100%] md:w-[25%] hover:bg-blue-700'
                                : 'bg-gray-300 text-gray-500 w-[100%] md:w-[25%] cursor-not-allowed'}
                            `}
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}