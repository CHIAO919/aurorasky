import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FooterBooking() {
    const SECTIONS = [
        { label: "關於Aurora Sky", icon: ["far", "file"] },
        { label: "顧客服務", icon: ["far", "file"] },
        { label: "網站聲明與規範", icon: ["far", "file"] },
    ];

    return (
        <footer className="leading-6 tracking-wide border-t border-gray-300 pb-[80px]">
            <div>
                <div className="max-w-5xl mx-auto px-4 py-3">
                    <div className="text-important-red text-base md:text-lg font-bold tracking-wide">
                        <FontAwesomeIcon
                            icon={["fas", "circle-exclamation"]}
                        />
                        <span>重要通知</span>
                    </div>

                    <div className="text-sm md:text-base font-light text-text-blue">
                        <p>付款總金額為透過本網站購票的金額。票價僅適用於購票時，如果購票後，票價有所變動，將不再重新計算差額（徵收或退還差額）。</p>
                        <p>除了上述金額，您可能須於機場另行支付必要的稅金及其他費用。</p>
                        <p>根據各國家/地區或行程不同，依照票價規定支付訂位更改手續費或退票手續費時，可能需負擔額外稅金。</p>
                    </div>
                </div>

                <hr className="border-gray-300"/>

                <div className="max-w-5xl mx-auto px-4 py-3 flex items-baseline gap-1 md:gap-2">
                    <div>
                        <Image
                            src="/footerBookingLogo.png"
                            alt="BookingPageLogo"
                            width={150}
                            height={30}
                            priority
                        />
                    </div>

                    
                    <ul className="flex items-center gap-1 md:gap-2">
                        {SECTIONS.map((sec) => (
                            <li
                                key={sec.label}
                                className="flex items-center gap-0 md:gap-1 hover:text-main-blue cursor-pointer border-r-2 last:border-r-0 tracking-wide"
                            >
                                <span className="text-xs md:text-base">{sec.label}</span>
                                <FontAwesomeIcon icon={sec.icon} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="bg-main-blue text-center py-2">
                <p className="text-white text-sm">
                    &copy; Copyright 2025. Aurora Sky Co. Ltd. All rights reserved
                </p>
            </div>
        </footer>
    );
}

export default FooterBooking