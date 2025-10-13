'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FlightCard({ item, onSelect }) {
    const {
        flightNo, originName, destinationName,
        departureTime,
    } = item;

    const DURATION_MIN = 190;

    function addMinutes(timeStr, minutesToAdd) {
        const safe = timeStr.replace('：', ':');
        const [hStr, mStr] = safe.split(':');
        const h = Number(hStr);
        const m = Number(mStr);

        if (Number.isNaN(h) || Number.isNaN(m)) return { time: timeStr, dayShift: 0 };

        const total = h * 60 + m + minutesToAdd;
        const dayShift = Math.floor(total / 1440);
        const minutesInDay = ((total % 1440) + 1440) % 1440; // 保證正值
        const hh = String(Math.floor(minutesInDay / 60)).padStart(2, '0');
        const mm = String(minutesInDay % 60).padStart(2, '0');
        return { time: `${hh}:${mm}`, dayShift };
    }

    const {time:arrivalTime, dayShift} = addMinutes(departureTime, DURATION_MIN);
    const dayShiftLabel = dayShift > 0 ? ` +${dayShift}` : '';

    return (
        <article className='flex justify-between px-7 shadow-sm bg-white rounded-2xl'>
            <div className='flex items-center justify-between flex-1 text-text-blue px-6 py-4 border-r border-gray-400'>
                <div className='text-center text-lg font-bold'>
                    <p>{originName}</p>
                    <p>{departureTime}</p>
                </div>

                <div className='text-center text-sm font-light text-text-blue'>
                    <p>{flightNo}</p>
                    <FontAwesomeIcon icon={["fas", "arrow-right"]} />
                    <p>3小時10分鐘</p>
                </div>

                <div className='text-center text-lg font-bold text-text-blue'>
                    <p>{destinationName}</p>
                    <p>
                        {arrivalTime}
                        <span className="text-sm font-medium text-gray-500">{dayShiftLabel}</span>
                    </p>
                </div>
            </div>

            <button
                className='w-[30%] border-r border-gray-400 flex justify-center items-center'
                onClick={() => onSelect?.({ item, fare: 'basic' })}
            >
                <p className='text-xl font-bold text-text-blue hover:text-important-red'>35000</p>
                <p className='text-sm'>（TWD）</p>
            </button>

            <button 
                className='w-[30%] flex justify-center items-center'
                onClick={() => onSelect?.({ item, fare: 'plus' })}
            >
                <p className='text-xl font-bold text-text-blue hover:text-important-red'>45000</p>
                <p className='text-sm'>（TWD）</p>
            </button>
        </article>
    );
}       