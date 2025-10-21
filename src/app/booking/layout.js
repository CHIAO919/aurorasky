'use client';
import { usePathname } from 'next/navigation';
import FooterBooking from "@/components/footer/FooterBooking";

export default function SiteLayout({ children }) {
    const pathname = usePathname();
    const isResults = pathname.startsWith('/booking/results');

    return (
        <>
            {children}
            <FooterBooking padBottom={isResults}/>
        </>
    );
}
