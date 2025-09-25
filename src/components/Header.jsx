"use client";
import "@/fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Header() {
    const [open, setOpen] = useState(false);
    return(
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                    src="/headerLogo.png"
                    alt="Aurora Sky Logo"
                    width={160}
                    height={36}
                    priority
                    />
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-10 text-gray-700 font-bold">
                    <Link className="hover:text-main-blue" href="#">體驗 AURORA</Link>
                    <Link className="hover:text-main-blue" href="#">SkyTier 會員</Link>
                    <Link className="hover:text-main-blue" href="#">航班查詢</Link>
                    <Link className="hover:text-main-blue" href="#">聯絡我們</Link>
                </nav>

                {/* Desktop actions */}
                <div className="hidden md:flex items-center gap-3">
                    <button className="flex items-center justify-center w-28 py-1 border rounded-full text-gray-700 font-bold cursor-pointer hover:bg-light-blue hover:border-transparent hover:text-main-blue">
                        <FontAwesomeIcon icon={["fas", "user-plus"]} className="w-8 h-8 text-main-blue"/>
                        加入會員
                    </button>
                    <button className="flex items-center justify-center w-28 py-1 border rounded-full text-gray-700 font-bold cursor-pointer hover:bg-light-blue hover:border-transparent hover:text-main-blue">
                        <FontAwesomeIcon icon={["fa-solid", "fa-right-to-bracket"]} className="w-8 h-8 text-main-blue"/>
                        會員登入
                    </button>
                </div>

                {/* Mobile hamburger */}
                <button className="md:hidden inline-flex items-center justify-center p-2 rounded-md border cursor-pointer"
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle menu"
                aria-expanded={open}
                aria-controls="mobile-menu"
                >
                    <FontAwesomeIcon icon={open ? ["fa-solid", "fa-xmark"] : ["fa-solid", "fa-bars"]} className="w-5 h-5"/>
                </button>
            </div>

            {/* Mobile panel */}
            <div id="mobile-menu" 
            className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${open ? "max-h-96" : "max-h-0"}`}
            >
                <nav className="px-4 pb-4 pt-2 space-y-2 text-gray-700 font-bold">
                    <Link className="block px-3 py-2 rounded hover:bg-light-blue" href="#">體驗 AURORA</Link>
                    <Link className="block px-3 py-2 rounded hover:bg-light-blue" href="#">SkyTier 會員</Link>
                    <Link className="block px-3 py-2 rounded hover:bg-light-blue" href="#">航班查詢</Link>
                    <Link className="block px-3 py-2 rounded hover:bg-light-blue" href="#">聯絡我們</Link>

                    <div className="mt-2 grid grid-cols-2 gap-2">
                        <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-full border font-bold hover:bg-light-blue hover:border-transparent">
                            <FontAwesomeIcon icon={["fas", "user-plus"]} className="h-4 w-4" />
                        加入會員
                        </button>
                        <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-full border font-bold hover:bg-light-blue hover:border-transparent">
                            <FontAwesomeIcon icon={["fa-solid", "fa-right-to-bracket"]} className="h-4 w-4" />
                        登入
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header