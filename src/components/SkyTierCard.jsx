import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SkyTierCard({ tierKey = "blue", title, summary, perks = [], badgeSrc }) {
    return (
        <article className="flex flex-col md:flex-row items-start gap-8 border-b last:border-b-0 border-gray-300 pb-[20px]">
            <div className="shrink-0 rounded-tl-4xl rounded-br-4xl overflow-hidden mx-auto md:mx-0">
                <Image
                    src={badgeSrc}
                    alt={title}
                    width={300}
                    height={110}
                    className="object-cover"
                />
            </div>

            <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-extrabold text-main-gold">{title}</h3>
                {summary && <p className="mt-1 text-sm md:text-base text-text-blue">{summary}</p>}

                {perks?.length > 0 && (
                    <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {perks.map((p, i) => (
                            <li key={i} className="flex items-start gap-2 text-base md:text-lg">
                                {p.icon && (
                                    <FontAwesomeIcon
                                        icon={p.icon}
                                        className="mt-1 text-main-blue w-4 h-4"
                                    /> 
                                )}
                                <div className="flex flex-col">
                                    <span className="text-text-blue font-bold">{p.label}</span>
                                    {p.note && <span className="text-gray-500 text-sm">{p.note}</span>}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </article>
    );
}