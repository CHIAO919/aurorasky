import Hero from "@/components/Hero";
import Breadcrumb from "@/components/Breadcrumb";
import SkyTierCard from "@/components/SkyTierCard";
import SectionTitle from "@/components/SectionTitle";

function SkytierPage() {
    const tiers = [
        {
            tierKey: "blue",
            title: "SkyTier Blue",
            summary: "加入會員即可享以下權益：",
            perks: [{label: "終生會員", icon: ["fas", "id-card"]}],
            badgeSrc: "/skytier/SkyTierBlue.png",
        },
        {
            tierKey: "silver",
            title: "SkyTier Silver",
            summary: "12個月內累積哩程達20,000或25個有效航段數，即可晉升為SkyTier Silver，並享有以下優惠禮遇：",
            perks: [
                {label: "專屬報到櫃台", note:"限本人" ,icon: ["fas", "users"]},
                {label: "生日月升等體驗", note:"限本人生日當月" ,icon: ["fas", "plane"]},
            ],
            badgeSrc: "/skytier/SkyTierSilver.png",
        },
        {
            tierKey: "gold",
            title: "SkyTier Gold",
            summary: "12個月內累積哩程達50,000或50個有效航段數，即可晉升為SkyTier Gold，並享有以下優惠禮遇：",
            perks: [
                {label: "專屬報到櫃台", note:"本人及同行1人", icon: ["fas", "users"]},
                {label: "優先裝卸託運行李", note:"本人及同行1人", icon: ["fas", "suitcase"]},
                {label: "優先登機", note:"本人及同行1人", icon: ["fas", "person-walking-luggage"]},
                {label: "加贈哩程", icon: ["fas", "gauge-simple-high"]},
                {label: "貴賓室使用券", icon: ["fas", "door-open"]},
            ],
            badgeSrc: "/skytier/SkyTierGold.png",
        },
        {
            tierKey: "aurora",
            title: "SkyTier Aurora",
            summary: "12個月內累積哩程達100,000或100個有效航段數，即可晉升為SkyTier Aurora，並享有以下優惠禮遇：",
            perks: [
                {label: "專屬報到櫃台", note:"本人及同行2人", icon: ["fas", "users"]},
                {label: "優先裝卸託運行李", note:"本人及同行2人", icon: ["fas", "suitcase"]},
                {label: "優先登機", note:"本人及同行2人", icon: ["fas", "person-walking-luggage"]},
                {label: "尊榮服務專線", icon: ["fas", "phone"]},
                {label: "不限次貴賓室", icon: ["fas", "door-open"]},
                {label: "全航線優先候補", icon: ["fas", "plane-departure"]},
            ],
            badgeSrc: "/skytier/SkyTierAurora.png",
        },
    ];

    return (
        <div className="bg-bg-blue">
            <Hero
                title="SkyTier，點亮專屬會員的無限星途"
                background="/banner/skytier_banner.png"
            />

            <section className="max-w-7xl mx-auto px-6 py-8">
                <Breadcrumb
                    items={[
                        {label: "首頁", href: "/"},
                        {label: "SkyTier會員", highlight: true, showDropdown: true}
                    ]}
                />

                <SectionTitle>會員優惠禮遇</SectionTitle>

                <div className="space-y-6">
                    {tiers.map((t) => (
                        <SkyTierCard key={t.title} {...t} />
                    ))}
                </div>
            </section>
        </div>

        
    );
}

export default SkytierPage