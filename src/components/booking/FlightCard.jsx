'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addMinutes, formatDurationZh } from '@/utils/time';

export default function FlightCard({ item, onSelect, selected }) {
    const {
        flightNo, originName, destinationName,
        departureTime, weekday
    } = item;

    const DURATION_MIN = 190;
    const PRICE_BASIC = 35000;
    const PRICE_PLUS  = 45000;

    const {time:arrivalTime, dayShift} = addMinutes(departureTime, DURATION_MIN);
    const dayShiftLabel = dayShift > 0 ? ` +${dayShift}` : '';

    const isSameFlight =
        selected &&
        selected.item &&
        selected.item.flightNo === flightNo &&
        selected.item.departureTime === departureTime &&
        selected.item.weekday === weekday;

    const isBasicSelected = isSameFlight && selected.fare === 'basic';
    const isPlusSelected  = isSameFlight && selected.fare === 'plus';

    const priceBase = 'text-xl font-bold';
    const priceBasicCls = `${priceBase} ${isBasicSelected ? 'text-important-red' : 'text-text-blue hover:text-important-red'}`;
    const pricePlusCls  = `${priceBase} ${isPlusSelected  ? 'text-important-red' : 'text-text-blue hover:text-important-red'}`;

    return (
        <article className='flex flex-col md:flex-row justify-between md:px-7 divide-y divide-gray-400 md:divide-y-0 md:divide-x shadow-sm bg-white rounded-2xl'>
            <div className='flex items-center justify-between flex-1 text-text-blue px-6 py-8'>
                <div className='flex flex-col items-center gap-1.5 text-center text-lg font-bold'>
                    <p>{originName}</p>
                    <p>{departureTime}</p>
                </div>

                <div className='flex flex-col items-center gap-1.5 text-center text-sm font-light text-text-blue'>
                    <p>{flightNo}</p>
                    <FontAwesomeIcon icon={["fas", "arrow-right"]} />
                    <p>{formatDurationZh(DURATION_MIN)}</p>
                </div>

                <div className='flex flex-col items-center gap-1.5 text-center text-lg font-bold text-text-blue'>
                    <p>{destinationName}</p>
                    <p>
                        {arrivalTime}
                        <span className="text-sm font-medium text-gray-500">{dayShiftLabel}</span>
                    </p>
                </div>
            </div>

            <button
                className='md:w-[30%] flex justify-between md:justify-center p-6 items-center cursor-pointer'
                onClick={() => onSelect?.({ item, fare: 'basic', price: PRICE_BASIC })}
            >
                <p className='md:hidden flex text-text-blue'>經濟艙</p>
                <div className='flex justify-center items-center'>
                    <p className={priceBasicCls}>{PRICE_BASIC}</p>
                    <p className='text-sm'>（TWD）</p>
                </div>
            </button>

            <button 
                className='md:w-[30%] flex justify-between md:justify-center p-6 items-center cursor-pointer'
                onClick={() => onSelect?.({ item, fare: 'plus', price: PRICE_PLUS })}
            >
                <p className='md:hidden flex text-text-blue'>商務艙</p>
                <div className='flex justify-center items-center'>
                    <p className={pricePlusCls}>{PRICE_PLUS}</p>
                    <p className='text-sm'>（TWD）</p>
                </div>
            </button>
        </article>
    );
}       