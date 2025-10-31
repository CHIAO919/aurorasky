'use client';
import Hero from "@/components/Hero";
import FlightBookingForm from "@/components/index/FlightBookingForm";
import Breadcrumb from "@/components/Breadcrumb";
import SectionTitle from "@/components/SectionTitle";

export default function BookingPage() {
    const handleSearch = (payload) => {
        console.log('搜尋條件：', payload);
        // 之後可換成 router.push(`/booking?from=${payload.departure}&to=${payload.arrival}&d=${payload.departDate}&r=${payload.returnDate}`)
        // 或直接呼叫搜尋 API
    };

    return(
        <div className="bg-bg-blue">
            <Hero
                title="預訂此刻，啟航無限可能"
                background="/banner/booking_banner.png"
            />

            <section className="max-w-7xl mx-auto px-6 py-8">
                <Breadcrumb
                    items={[
                        {label: "首頁", href: "/"},
                        {label: "航班查詢", highlight: true, showDropdown: true}
                    ]}
                />

                <SectionTitle>開啟您的旅程</SectionTitle>

                <FlightBookingForm onSubmit={handleSearch}/>
            </section>
            
        </div>
    );
}