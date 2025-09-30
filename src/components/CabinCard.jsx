import Image from "next/image";

export default function CabinCard({zh, en, highlights = [], desc, img}) {
    return(
        <article className=" overflow-hidden leading-6 tracking-wide">
            <div className="relative w-full aspect-[16/9]">
                <Image
                src={img}
                alt={`${zh} ${en}`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                />
            </div>

            <div className="mt-2">
                <h3 className="text-xl md:text-2xl font-extrabold text-text-blue">
                    <span className="mr-2">{zh}</span>
                    <span>{en}</span>
                </h3>

                {highlights.length > 0 && (
                    <p className="mt-2 font-semibold space-x-3">
                        {highlights.map((h, i) => (
                            <span key={i} className="text-main-gold">
                                {h}
                                {i < highlights.length -1 ? "、" : ""}
                            </span>
                        ))}
                    </p>
                )}

                <p className="mt-2 leading-relaxed text-text-blue">{desc}</p>
            </div>
        </article>
    );
}