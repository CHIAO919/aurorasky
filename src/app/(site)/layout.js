import FooterGeneral from "@/components/footer/FooterGeneral";

export default function SiteLayout({ children }) {
    return (
        <>
            {children}
            <FooterGeneral />
        </>
    );
}