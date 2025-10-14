import FooterBooking from "@/components/footer/FooterBooking";

export default function SiteLayout({ children }) {
    return (
        <>
            {children}
            <FooterBooking />
        </>
    );
}
