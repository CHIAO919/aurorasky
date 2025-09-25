import "@/fontawesome";
import Image from "next/image";

function Footer() {
    return(
        <footer className="bg-white border-t">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <Image
                    src="/footerLogo.png"
                    alt="Aurora Sky Logo"
                    width={160}
                    height={36}
                    priority
                    />
                </div>

                {/* 關於 Aurora Sky */}
                <div>
                    <h3 className="text-gray-800 font-bold mb-2">關於 Aurora Sky</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li>關於我們</li>
                        <li>人才招募專區</li>
                        <li>綠旅行碳抵銷計畫</li>
                        <li>資訊安全政策</li>
                        <li>廣告宣傳政策</li>
                    </ul>
                </div>

                {/* 顧客服務 */}
                <div>
                    <h3 className="text-gray-800 font-bold mb-2">顧客服務</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li>顧客滿意度問卷調查</li>
                        <li>聯絡我們</li>
                        <li>常見問題</li>
                        <li>航班異動改退票</li>
                        <li>下載中心</li>
                    </ul>
                </div>

                {/* 網站聲明與規範 */}
                <div>
                    <h3 className="text-gray-800 font-bold mb-2">網站聲明與規範</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li>隱私保護政策</li>
                        <li>Cookie 政策</li>
                        <li>顧客承諾</li>
                        <li>智慧財產權</li>
                        <li>運送條款</li>
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

export default Footer