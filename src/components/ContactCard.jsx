"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ContactCard({ region, phone, serviceHours, address, mapUrl }) {
    const embedUrl = mapUrl ? mapUrl.replace("output=classic", "output=embed") : `https://www.google.com/maps?q=${encodeURIComponent(address || "")}&output=embed` ;

    return (
        <article className="bg-white rounded-md overflow-hidden flex flex-col md:flex-row items-center">
            <div className="py-2 px-3.5 md:flex-1 w-full">
                <h3 className="text-text-blue text-xl font-bold pb-1.5 border-b border-gray-300">{region}</h3>
                
                <div className="mt-1.5 flex flex-col gap-2">

                    { phone && (
                        <div className="flex flex-col md:flex-row md:items-center">
                            <FontAwesomeIcon 
                                icon={["fas", "phone-volume"]}
                                className="text-text-blue w-4 h-4"
                            />

                            <div className="text-text-blue">
                                <span className="font-semibold">電話：</span>
                                <a
                                    href={`tel:${phone.replace(/\s+/g, "")}`}
                                    className="underline-offset-2 hover:underline"
                                    >
                                    {phone}
                                </a>
                            </div>
                        </div>
                    ) }
                    

                    { serviceHours && (
                        <div className="flex flex-col md:flex-row md:items-center">
                            <FontAwesomeIcon 
                                icon={["fas", "suitcase"]}
                                className="text-text-blue w-4 h-4"
                            />

                            <div className="text-text-blue">
                                <span className="font-semibold">服務時間：</span>
                                <span>{serviceHours}</span>
                            </div>
                        </div>
                    ) }
                    
                    { address && (
                        <div className="flex flex-col md:flex-row md:items-center">
                            <FontAwesomeIcon 
                                icon={["fas", "location-dot"]}
                                className="text-text-blue w-4 h-4"
                            />

                            <div className="text-text-blue">
                                <span className="font-semibold">地址：</span>
                                <span>{address}</span>
                            </div>
                        </div>
                    ) }
                    
                </div>
            </div>

            <div className="w-full md:w-[40%]">
                <div className="aspect-[16/9] md:h-full md:aspect-auto">
                    <iframe
                        title={`${region} 地圖`}
                        src={embedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                    />
                </div>
            </div>
        </article>
    );
}