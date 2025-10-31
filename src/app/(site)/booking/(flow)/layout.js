'use client';
import { useSelectedLayoutSegments } from 'next/navigation';
import FooterBooking from '@/components/footer/FooterBooking';

export default function BookingFlowLayout({ children }) {
    const segments = useSelectedLayoutSegments(); // e.g. ['results']
    const isResults = segments[0] === 'results';

    return (
        <>
            {children}
            <FooterBooking padBottom={isResults} />
        </>
    );
}
