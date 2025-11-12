"use client";
import "@/fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter } from "next/navigation";
import LoginModal from "./LoginModal";
import { displayName } from "@/utils/auth";

const AUTH_KEY = "aurora_auth";

function Header() {
    const [open, setOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [user, setUser] = useState(null);
    const pathname = usePathname() ?? "";
    const router = useRouter();

    useEffect(() => {
        const onStorage = (e) => {
            if (e.key === AUTH_KEY) {
                try { setUser(JSON.parse(localStorage.getItem(AUTH_KEY))); }
                catch { setUser(null); }
            }
        };
        const onAuthChange = () => {
            try { setUser(JSON.parse(localStorage.getItem(AUTH_KEY))); }
            catch { setUser(null); }
        };

        // 初始讀取（關鍵）
        try {
            const raw = localStorage.getItem(AUTH_KEY);
            if (raw) setUser(JSON.parse(raw));
        } catch {}

        window.addEventListener('storage', onStorage);            // 其他分頁同步
        window.addEventListener('aurora-auth-change', onAuthChange); // 同分頁同步
        return () => {
            window.removeEventListener('storage', onStorage);
            window.removeEventListener('aurora-auth-change', onAuthChange);
        };
    }, []);

    useEffect(() => {
        setOpen(false);
        setLoginOpen(false);
    }, [pathname]);

    const handleLogout = () => {
        localStorage.removeItem(AUTH_KEY);
        document.cookie = 'aurora_auth=; Max-Age=0; Path=/; SameSite=Lax';
        window.dispatchEvent(new Event('aurora-auth-change'));
        setUser(null);

        setTimeout(() => {
            const cleanPath = pathname?.replace(/\/+$/, '').toLowerCase();
            if (cleanPath === '/account') {
                router.replace('/');
                router.refresh();
            }
        }, 0);
    };

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
                    <Link className="hover:text-main-blue" href="/about">體驗 AURORA</Link>
                    <Link className="hover:text-main-blue" href="/skytier">SkyTier 會員</Link>
                    <Link className="hover:text-main-blue" href="/booking">航班查詢</Link>
                    <Link className="hover:text-main-blue" href="/contact">聯絡我們</Link>
                </nav>

                {/* Desktop actions */}
                <div className="hidden md:flex items-center gap-3">
                    {!user ? (
                        <>
                            <Link 
                                className="flex items-center justify-center w-28 py-1 border rounded-full text-gray-700 font-bold cursor-pointer hover:bg-light-blue hover:border-transparent hover:text-main-blue"
                                href="/signup"
                            >
                                <FontAwesomeIcon icon={["fas", "user-plus"]} className="w-8 h-8 text-main-blue"/>
                                加入會員
                            </Link>
                            <button 
                                className="flex items-center justify-center w-28 py-1 border rounded-full text-gray-700 font-bold cursor-pointer hover:bg-light-blue hover:border-transparent hover:text-main-blue"
                                onClick={() => setLoginOpen(true)}
                            >
                                <FontAwesomeIcon icon={["fas", "right-to-bracket"]} className="w-8 h-8 text-main-blue"/>
                                會員登入
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                className="flex items-center justify-center w-[135px] py-1 text-gray-700 font-bold cursor-pointer"
                                href="/account"
                            >
                                <FontAwesomeIcon icon={["far", "circle-user"]} className="w-8 h-8 text-main-blue"/>
                                <p className="text-sm">您好，{displayName(user?.profile)}</p>
                            </Link>
                            <button
                                className="flex items-center justify-center w-28 py-1 border rounded-full text-gray-700 font-bold cursor-pointer hover:bg-light-blue hover:border-transparent hover:text-main-blue"
                                onClick={handleLogout}
                            >
                                <FontAwesomeIcon icon={["fas", "right-from-bracket"]} className="w-8 h-8 text-main-blue"/>
                                會員登出
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile hamburger */}
                <button 
                    className="md:hidden inline-flex items-center justify-center p-2 rounded-md border cursor-pointer"
                    onClick={() => setOpen((v) => !v)}
                    aria-label="Toggle menu"
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                >
                    <FontAwesomeIcon icon={open ? ["fas", "xmark"] : ["fas", "bars"]} className="w-5 h-5"/>
                </button>
            </div>

            {/* Mobile panel */}
            <div 
                id="mobile-menu" 
                className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${open ? "max-h-96" : "max-h-0"}`}
                aria-hidden={!open}
            >
                <nav className="px-4 pb-4 pt-2 space-y-2 text-gray-700 font-bold">
                    <Link 
                        className="block px-3 py-2 rounded hover:bg-light-blue" 
                        href="/about"
                        onClick={() => setOpen(false)}
                    >
                        體驗 AURORA
                    </Link>
                    <Link
                        className="block px-3 py-2 rounded hover:bg-light-blue" 
                        href="/skytier"
                        onClick={() => setOpen(false)}
                    >
                        SkyTier 會員
                    </Link>
                    <Link
                        className="block px-3 py-2 rounded hover:bg-light-blue" 
                        href="#"
                        onClick={() => setOpen(false)}
                    >
                        航班查詢
                    </Link>
                    <Link
                        className="block px-3 py-2 rounded hover:bg-light-blue" 
                        href="/contact"
                        onClick={() => setOpen(false)}
                    >
                        聯絡我們
                    </Link>

                    <div className="mt-2 grid grid-cols-2 gap-2">
                        {!user ? (
                            <>
                                <Link 
                                    className="flex items-center justify-center gap-2 px-3 py-2 rounded-full border font-bold hover:bg-light-blue hover:border-transparent"
                                    onClick={() => setOpen(false)}
                                    href="/signup"
                                >
                                    <FontAwesomeIcon icon={["fas", "user-plus"]} className="h-4 w-4" />
                                    加入會員
                                </Link>
                                <button 
                                    className="flex items-center justify-center gap-2 px-3 py-2 rounded-full border font-bold hover:bg-light-blue hover:border-transparent"
                                    onClick={() => { setLoginOpen(true); }}
                                >
                                    <FontAwesomeIcon icon={["fas", "right-to-bracket"]} className="h-4 w-4" />
                                    會員登入
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    className="flex items-center justify-center py-1 text-gray-700 font-bold cursor-pointer"
                                    href="/account"
                                >
                                    <FontAwesomeIcon icon={["far", "circle-user"]} className="w-8 h-8 text-main-blue"/>
                                    <p className="text-sm">您好，{displayName(user?.profile)}</p>
                                </Link>
                                <button 
                                    className="flex items-center justify-center gap-2 px-3 py-2 rounded-full border font-bold hover:bg-light-blue hover:border-transparent"
                                    onClick={handleLogout}
                                >
                                    <FontAwesomeIcon icon={["fas", "right-to-bracket"]} className="h-4 w-4" />
                                    會員登出
                                </button>
                            </>
                        )}
                    </div>
                </nav>
            </div>

            <LoginModal
                open={loginOpen}
                onClose={() => setLoginOpen(false)}
                onSuccess={(u) => setUser(u)}
            />
        </header>
    );
}

export default Header