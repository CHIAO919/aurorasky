'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BaggageCard({ title, leg, desc }) {
    const { item = {}, fare, price } = leg;
    const {
        originName,
        destinationName,
    } = item;

    return (
        <div className="text-text-blue bg-white py-8 px-4 md:px-8 rounded-2xl">
            <h3 className="text-lg md:text-xl font-bold mb-[15px]">{title}</h3>
            <div className="grid grid-cols-2 px-4 md:px-8 text-center">
                <div className="w-[100%]">
                    <p className="pb-2 border-b border-gray-400">{originName}－{destinationName}</p>
                    <div className="flex items-center justify-center gap-1 pt-2">
                        <FontAwesomeIcon icon={['fas', 'check']} className="text-red-600"/>
                        <p>{desc}</p>
                    </div>
                </div>
                <div className="w-[100%]">
                    <p className="pb-2 border-b border-gray-400">{destinationName}－{originName}</p>
                    <div className="flex items-center justify-center gap-1 pt-2">
                        <FontAwesomeIcon icon={['fas', 'check']} className="text-red-600"/>
                        <p>{desc}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}