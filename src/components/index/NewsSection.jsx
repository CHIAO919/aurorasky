const NEWS_CARDS = [
    {
        id:"ngoairroute",
        src:"/news/new_airroute.jpg",
        lines:['台北－名古屋', '新航線啟航！'],
    },
    {
        id:"seoul",
        src:"/news/discount.jpg",
        lines:['飛往首爾', '早鳥票價85折！'],
    },
    {
        id:"skytier",
        src:"/news/creditcard.jpg",
        lines:['SkyTier精選禮遇上線'],
    },
];

export default function NewsSection() {
    return (
        <section className="mb-7 max-w-5xl mx-auto leading-6 tracking-widest">
            <h2 className="text-text-blue text-2xl font-bold text-center">最新消息</h2>

            <div className="px-3 py-6 grid grid-cols-3 gap-5">
                {NEWS_CARDS.map((c) => (
                    <div
                        key={c.id}
                        className="relative bg-cover bg-center w-full aspect-[16/11] rounded-xl overflow-hidden text-white text-xl font-bold px-6 py-3"
                        style={{ backgroundImage: `url('${c.src}')` }}
                    >
                        {c.lines.map((t, i) => (
                            <h3 key={i}>{t}</h3>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}