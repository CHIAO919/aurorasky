import "@/fontawesome";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Breadcrumb({items}) {
    return (
        <nav className="mb-4">
            <ol className="flex items-center text-gray-700">
                {items.map((item, index)=>(
                    <li key={index} className="flex items-center">
                        {item.href ? (
                            <Link
                            href={item.href}
                            className={`text-sm md:text-base font-bold hover:underline ${item.highlight ? "text-main-blue" : ""}`}>
                                {item.label}
                            </Link>
                        ) : (
                            <span
                            className={`text-sm md:text-base font-bold ${item.highlight ? "text-main-blue" : ""}`}
                            >
                                {item.label}
                            </span>
                        )}

                        {/* 中間項目 → chevron-right */}
                        {index < items.length - 1 && (
                            <FontAwesomeIcon icon={["fas", "chevron-right"]} className="mx-2 text-gray-400 text-xs md:text-base"/>
                        )}

                        {/* 最後一個項目 → chevron-down */}
                        {index === items.length - 1 && item.showDropdown && (
                            <FontAwesomeIcon icon={["fas", "chevron-down"]} className="mx-2 text-gray-400 text-xs md:text-base"/>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}