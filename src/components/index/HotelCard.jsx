import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HotelCard({ img, title, subtitle }) {
    return (
        <article className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="relative w-full aspect-[16/9]">
                <Image 
                    src={img}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                />
            </div>

            <div className="p-4">
                <h3 className="text-text-blue font-extrabold leading-tight">{title}</h3>
                <div className="mt-2 flex items-center gap-2 text-slate-600">
                    <FontAwesomeIcon icon={["fas", "location-dot"]} className="w-4 h-4" />
                    <span className="text-sm">{subtitle}</span>
                </div>
            </div>
        </article>
    );
}