'use client';

export default function OrderSummaryCard({totalAmount, onNext, nextLabel = '下一步'}) {
    const fmt = (n) => new Intl.NumberFormat('zh-TW').format(n ?? 0);

    return (
        <div className="text-text-blue bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold">累積里程</h3>
            <hr className="border-gray-300 my-3" />
            <div className="flex items-center justify-between">
                <span className="text-base">一人</span>
                <span className="text-xl font-extrabold tracking-wide">0里</span>
            </div>

            <h3 className="text-lg font-bold mt-6">付款</h3>
            <hr className="border-gray-300 my-3" />
            <div className="flex items-center justify-between">
                <span className="text-base">一人</span>
                <span className="text-xl font-extrabold tracking-wide">{totalAmount}</span>
            </div>
        </div>
    );
}