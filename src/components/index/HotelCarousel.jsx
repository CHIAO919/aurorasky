"use client";

import useEmblaCarousel from "embla-carousel-react";
import HotelCard from "./HotelCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useCallback } from "react";

const HOTELS = [
    {
        id:"1",
        img:"/hotels/Keio_Prelia.jpg",
        title:"Keio Prelia Hotel",
        subtitle:"Sapporo",
    },
    {
        id:"2",
        img:"/hotels/REF_Kumamoto.jpg",
        title:"REF Kumamoto",
        subtitle:"Kumamoto",
    },
    {
        id:"3",
        img:"/hotels/Shiomi_Prince.jpg",
        title:"Shiomi Prince Hotel",
        subtitle:"Tokyo",
    },
    {
        id:"4",
        img:"/hotels/Mitsui_Garden_Hotel.jpg",
        title:"Mitsui Garden Hotel",
        subtitle:"Nagoya",
    },
    {
        id:"5",
        img:"/hotels/Roynet_Hotel.jpg",
        title:"Roynet Hotel",
        subtitle:"Seoul",
    },
    {
        id:"6",
        img:"/hotels/Shilla_Stay.jpg",
        title:"Shilla Stay",
        subtitle:"Busan",
    },
];

export default function HotelCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false });
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCanPrev(emblaApi.canScrollPrev());
        setCanNext(emblaApi.canScrollNext());
    },[emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    },[emblaApi, onSelect]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    return (
        <section>
            <h2 className="text-text-blue text-2xl font-bold text-center tracking-widest mb-6">推薦的飯店</h2>

            <div className="relative bg-slate-50 rounded-3xl py-8 px-4 md:px-8">
                <button
                    onClick={scrollPrev}
                    disabled={!canPrev}
                    className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white shadow items-center justify-center
                    disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                    <FontAwesomeIcon icon={["fas", "chevron-left"]} />
                </button>

                <button
                    onClick={scrollNext}
                    disabled={!canNext}
                    className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white shadow items-center justify-center
                    disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                    <FontAwesomeIcon icon={["fas", "chevron-right"]} />
                </button>

                <div className="overflow-hidden py-1" ref={emblaRef}>
                    <div className="-mx-3 flex">
                        {HOTELS.map((h) => (
                            <div
                                key={h.id}
                                className="px-3 flex-none
                                    basis-full
                                    md:basis-1/2
                                    lg:basis-1/3
                                    xl:basis-1/4"
                            >
                                <HotelCard {...h} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}