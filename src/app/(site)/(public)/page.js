'use client';
import FlightBookingForm from "@/components/index/FlightBookingForm";
import QuickTabs from "@/components/index/QuickTabs";
import NewsCard from "@/components/index/NewsSection";
import HotelCarousel from "@/components/index/HotelCarousel";
import FlightCard from "@/components/booking/FlightCard";

export default function Home() {
  const handleSearch = (payload) => {
    console.log('搜尋條件：', payload);
  };

  return (
    <div className="bg-bg-blue">
      <section
        className="bg-[url(/banner/index_banner.jpg)] bg-cover bg-center bg-no-repeat h-[600px] flex flex-col items-center md:items-end justify-center gap-2 px-20 leading-6 tracking-wide"
      >
        <div className="text-3xl md:text-5xl font-extrabold text-main-gold text-shadow-lg text-shadow-gray-500 flex flex-col items-center md:items-start">
          <h1>Redefining</h1>
          <h1>Business Airspace</h1>
        </div>
        <p className="text-2xl md:text-3xl font-extrabold text-text-blue text-shadow-lg text-shadow-gray-500">重新定義商務空中旅程</p>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-[60px]">

        <FlightBookingForm onSubmit={handleSearch} />

        <QuickTabs />

        <NewsCard />

        <HotelCarousel />
      </div>
    </div>
  );
}
