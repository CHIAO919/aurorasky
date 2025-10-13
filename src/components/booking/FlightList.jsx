'use client';
import { useState, useMemo, useEffect } from "react";
import FlightCard from "./FlightCard";
import { getWeekdayName } from '@/utils/date';

export default function FlightList({ filter = {}, selectedDate, onSelect }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('/data/schedules.json')
        .then(r => r.json())
        .then(setItems)
        .catch(console.error);
    }, []);

    const weekday = useMemo(() => getWeekdayName(selectedDate), [selectedDate]);

    const visible = useMemo(() => (
        items.filter(s =>
            (!filter.origin || s.origin === filter.origin) &&
            (!filter.destination || s.destination === filter.destination) &&
            (!weekday || s.weekday === weekday)
        )
    ), [items, filter, weekday]);

    return (
        <div className="grid gap-4">
            {visible.map((item) => (
                <FlightCard
                key={`${item.flightNo}-${item.weekday}-${item.departureTime}`}
                item={item}
                onSelect={onSelect}
                />
            ))}
            {visible.length === 0 && (
                <p className="text-center text-gray-500 py-6">此日期沒有符合的班次</p>
            )}
        </div>
    );
}
