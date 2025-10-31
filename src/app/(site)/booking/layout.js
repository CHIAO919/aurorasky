'use client';
import { useSelectedLayoutSegments } from 'next/navigation';
import FooterGeneral from '@/components/footer/FooterGeneral';

export default function BookingLayout({ children }) {
    const segments = useSelectedLayoutSegments();
    const isBookingRoot = segments.length === 0;

    return (
        <>
            {children}
            {isBookingRoot && <FooterGeneral />}
        </>
    );
}
