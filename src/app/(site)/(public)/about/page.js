import Hero from "@/components/Hero";
import Breadcrumb from "@/components/Breadcrumb";
import CabinCard from "@/components/CabinCard";
import SectionTitle from "@/components/SectionTitle";

function About() {
    return (
        <div className="bg-bg-blue">
            <Hero
                title="從登機到降落，打造一段專屬於專業人士的高效空中旅程"
                background="/banner/class_banner.jpg"
            />

            <section className="max-w-7xl mx-auto px-6 py-8">
                <Breadcrumb
                    items={[
                        {label: "首頁", href: "/"},
                        {label: "體驗AURORA", highlight: true, showDropdown: true}
                    ]}
                />

                <SectionTitle>A321neo</SectionTitle>

                <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CabinCard
                        zh="經濟艙"
                        en="Economy Class"
                        img="/cabin/economy.jpg"
                        highlights={["舒適", "實惠", "貼心"]}
                        desc="以寬敞座椅與貼心機上服務，打造物超所值的飛行體驗。無論是商務短程或旅遊出行，皆可享受安穩旅程。"
                    />

                    <CabinCard
                        zh="商務艙"
                        en="Business Class"
                        img="/cabin/bussiness.jpg"
                        highlights={["尊榮", "高效", "靜謐"]}
                        desc="專為商務旅客打造的全平躺座椅與獨立空間，搭配高級備品與精緻餐點，讓您在空中也能掌握節奏。"
                    />
                </div>
            </section>
        </div>
    );
}

export default About