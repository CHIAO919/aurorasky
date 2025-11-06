'use client';

export default function OrderSummaryCard({totalAmount, onNext, disabled = false, nextLabel = '下一步'}) {

    return (
        <div className="text-text-blue bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg md:text-xl font-bold">累積里程</h3>
            <hr className="border-gray-300 my-3" />
            <div className="flex items-center justify-between">
                <span className="text-base">一人</span>
                <span className="text-lg md:text-xl font-extrabold tracking-wide">0里</span>
            </div>

            <h3 className="text-lg md:text-xl font-bold mt-6">付款</h3>
            <hr className="border-gray-300 my-3" />
            <div className="flex items-center justify-between">
                <span className="text-base">一人</span>
                <span className="text-lg md:text-xl font-extrabold tracking-wide">{totalAmount}</span>
            </div>

            <div className="mt-5 flex justify-end">
                <button
                    type="button"
                    onClick={onNext}
                    disabled={disabled}
                    className={[
                        'inline-flex items-center justify-center px-6 py-2.5 cursor-pointer',
                        'rounded-full text-white font-bold',
                        disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-main-blue hover:bg-blue-700',
                        'transition'
                    ].join(' ')}
                >
                    {nextLabel}
                </button>
            </div>
        </div>
    );
}