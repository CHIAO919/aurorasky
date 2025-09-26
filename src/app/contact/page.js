import Hero from "@/components/Hero";
import Breadcrumb from "@/components/Breadcrumb";
import SectionTitle from "@/components/SectionTitle";
import ContactCard from "@/components/ContactCard";

function Contact() {
    const twContacts = [
        {
            region: "台北",
            phone: "+886-3-306-5086",
            serviceHours: "週一至週日（含國定假日）08:30-18:00",
            address: "桃園市大園區航站南路9號",
            mapUrl: "https://www.google.com/maps?q=桃園市大園區航站南路9號&output=embed",
        },
        {
            region: "高雄",
            phone: "+886-7-805-7631",
            serviceHours: "週一至週日（含國定假日）08:30-18:00",
            address: "高雄市小港區中山四路2號",
            mapUrl: "https://www.google.com/maps?q=高雄市小港區中山四路2號&output=embed",
        },
    ];

    const jpContacts = [
        {
            region: "東京",
            phone: "+81-4-7634-8000",
            serviceHours: "週一至週日（國定假日除外）08:30-18:00",
            address: "1-1 Furugome, Narita, Chiba 282-0004 Japan",
        },
        {
            region: "大阪",
            phone: "+81-7-2455-2500",
            serviceHours: "週一至週日（國定假日除外）08:30-18:00",
            address: "1-1 Senshukukokita, Izumisano, Osaka 549-0001 Japan",
        },
    ];

    const krContacts = [
        {
            region: "首爾",
            phone: "+82-2-1577-2600",
            serviceHours: "週一至週日（國定假日除外）08:30-18:00",
            address: "272 Gonghang-ro, Jung-gu, Incheon, Republic of Korea",
        },
        {
            region: "釜山",
            phone: "+82-1661-2626",
            serviceHours: "週一至週日（國定假日除外）08:30-18:00",
            address: "108 Gonghangjinip-ro, Gangseo-gu, Busan, Republic of Korea",
        },
    ];

    return (
        <div className="bg-bg-blue">
            <Hero
                title="各地服務資訊"
                background="/banner/contact_banner.png"
            />

            <section className="max-w-7xl mx-auto px-6 py-8">
                <Breadcrumb
                    items={[
                        {label: "首頁", href: "/"},
                        {label: "聯絡我們", highlight: true, showDropdown: true}
                    ]}
                />

                <SectionTitle>台灣</SectionTitle>

                <div className="space-y-6">
                    {twContacts.map((c) => (
                        <ContactCard key={c.address} {...c}/>
                    ))}
                </div>
                
                <SectionTitle>日本</SectionTitle>

                <div className="space-y-6">
                    {jpContacts.map((c) => (
                        <ContactCard key={c.address} {...c}/>
                    ))}
                </div>

                <SectionTitle>韓國</SectionTitle>

                <div className="space-y-6">
                    {krContacts.map((c) => (
                        <ContactCard key={c.address} {...c}/>
                    ))}
                </div>

            </section>
        </div>
    );
}

export default Contact