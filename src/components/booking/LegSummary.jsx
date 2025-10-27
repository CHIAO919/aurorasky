'use client';
import { addMinutes, formatDurationZh } from '@/utils/time';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatZhMonthDayWeek } from '@/utils/date';

const FARE_TO_CABIN = {
    basic: { cabin: '經濟艙', brand: 'Basic' },
    plus:  { cabin: '商務艙', brand: 'Plus'  },
};

export default function LegSummary({ title, leg, travelDate }) {
    if (!leg) return <p className="text-gray-500">尚未選擇{title}航班</p>;

    const { item = {}, fare, price } = leg;
    const {
        flightNo,
        originName,
        destinationName,
        departureTime,
        aircraft,
        carrierName,
    } = item;

    const DURATION_MIN = 190;

    const {time:arrivalTime, dayShift} = addMinutes(departureTime, DURATION_MIN);
    const dayShiftLabel = dayShift > 0 ? ` +${dayShift}` : '';

    const fareKey = String(fare || '').toLowerCase();
    const cabinInfo = FARE_TO_CABIN[fareKey] ?? { cabin: '—', brand: fare ?? '' };

    return (
        <div className='bg-white py-8 px-4 md:px-8 rounded-2xl'>
            <div className='text-text-blue pb-[15px]'>
                <div className='flex items-center gap-1'>
                    <FontAwesomeIcon icon={['fas', 'plane']}/>
                    <p>{title}</p>
                </div>
                <p className='text-lg md:text-xl font-bold'>{travelDate && formatZhMonthDayWeek(travelDate)}</p>
            </div>
            
            <div className='flex justify-between items-center px-4 md:px-8'>
                <div className='flex gap-5'>
                    <svg width="12" height="357" viewBox="0 0 12 357" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="12" height="357" rx="6" fill="#0F4C81"/>
                        <circle cx="6" cy="10" r="4" fill="white"/>
                        <circle cx="6" cy="348" r="4" fill="white"/>
                    </svg>
                    <div>
                        <div className="space-y-1 flex flex-col h-[100%] justify-between text-text-blue">
                            <div className='text-lg md:text-xl font-bold'>
                                <p>{originName}</p>
                                <p>{departureTime}</p>
                            </div>
                            <p>{formatDurationZh(DURATION_MIN)}</p>
                            <div className='text-lg md:text-xl font-bold'>
                                <p>{destinationName}</p>
                                <p>{arrivalTime}</p>
                            </div>
                        </div>                    
                    </div>
                </div>

                <div className='text-text-blue w-[50%] md:w-[40%] grid grid-rows-6 gap-3'>
                    <div className='flex justify-between'>
                        <p>航班號碼</p>
                        <p>{flightNo}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p>營運航空</p>
                        <p>Aurora Sky</p>
                    </div>
                    <div className='flex justify-between'>
                        <p>機型</p>
                        <p>A321neo</p>
                    </div>
                    <div className='flex justify-between'>
                        <p>艙等</p>
                        <p>{cabinInfo.cabin}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p>服務資訊</p>
                        <div className='grid grid-cols-4 gap-1.5 items-center'>
                            <FontAwesomeIcon icon={['fas', 'wifi']}/>
                            <FontAwesomeIcon icon={['fas', 'utensils']}/>
                            <FontAwesomeIcon icon={['fas', 'tv']}/>
                            <FontAwesomeIcon icon={['fas', 'ban-smoking']}/>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <p>升艙等</p>
                        <p>無法進行艙位升等</p>
                    </div>
                </div>
            </div>
        </div>
    );
}