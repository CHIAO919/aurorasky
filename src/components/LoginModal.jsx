'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./ui/Modal";

const STORAGE_KEY = 'aurora_auth';

export default function LoginModal({ open, onClose, onSuccess }) {
    const [memberId, setMemberId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');
    const [members, setMembers] = useState([]);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        fetch('/data/members.json', { cache: 'no-store' }) // 開發時避免快取
            .then((r) => {
            if (!r.ok) throw new Error('載入會員資料失敗');
            return r.json();
            })
            .then(setMembers)
            .catch(console.error);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr('');
        setLoading(true);

        try {
            if (!Array.isArray(members) || members.length === 0) {
                throw new Error('會員資料尚未載入，請稍後再試');
            }

            // 用 JSON 內的多組帳密比對
            const found = members.find(m => m.id === memberId && m.password === password);
            if (!found) throw new Error('帳號或密碼錯誤');

            // 組登入後要存的使用者資料（含姓氏/稱謂所需欄位）
            const user = {
                account: `${found.id}`,
                token: 'fake',            // demo 用，之後可換成後端回傳的 JWT
                ts: Date.now(),
                profile: {
                    lastName: found.lastName,
                    firstName: found.firstName,
                    gender: found.gender,   // 'M' / 'F'
                    dob: found.dob,
                    countryCode: found.countryCode,
                    phone: found.phone,
                },
            };

            localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
            document.cookie = `aurora_auth=1; Max-Age=${60*60*24*7}; Path=/; SameSite=Lax`;
            window.dispatchEvent(new Event('aurora-auth-change'));
            onSuccess?.(user);   // 回傳給 Header
            onClose?.();         // 關閉彈窗

            if (pathname === '/signup') {
                router.replace('/');   // 從註冊頁登入 → 回首頁
            }
        } catch (ex) {
            setErr(ex.message || '登入失敗，請稍後再試');
        } finally {
            setLoading(false);
        }
    };

    return(
        <Modal open={open} onClose={onClose} labelledById="會員登入">
            {/* 右上角關閉 */}
            <button
                onClick={onClose}
                aria-label="關閉視窗"
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-gray-300/80 bg-white hover:bg-gray-50"
            >
                <FontAwesomeIcon icon={['fas', 'xmark']} className="h-4 w-4 text-gray-600" />
            </button>

            {/* 標題區 */}
            <div className="p-6 pb-4">
            <h2 className="text-2xl font-extrabold text-text-blue">SkyTier Gold</h2>
            <p className="mt-1 text-lg font-bold text-text-blue">會員登入</p>
            </div>
            <hr className="border-gray-200" />

            {/* 表單區 */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* 會員號碼 */}
                <label className="block">
                    <span className="text-sm font-bold text-text-blue">會員號碼</span>
                    <span className="ml-2 text-xs text-gray-500">10位數字</span>
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="\d{10}"
                        maxLength={10}
                        placeholder=""
                        className="mt-2 w-full rounded-full border-2 border-main-blue/40 px-5 py-3 outline-none focus:border-main-blue focus:ring-0"
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value.replace(/\D/g, ''))}
                        required
                    />
                </label>

                {/* 密碼 */}
                <label className="block">
                    <span className="text-sm font-bold text-text-blue">密碼</span>
                    <input
                        type="password"
                        className="mt-2 w-full rounded-full border-2 border-main-blue/40 px-5 py-3 outline-none focus:border-main-blue focus:ring-0"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                    />
                </label>

                {/* 說明文字 */}
                <p className="text-[13px] leading-5 text-gray-600">
                    個人資訊使用之目的請務必先詳細閱讀並若出示不勾選且經確認同意其內容後再進行下一步。
                </p>

                {err && <p className="text-sm text-red-600">{err}</p>}

                {/* 按鈕列 */}
                <div className="mt-2 grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        className="rounded-full border-2 border-main-blue/40 px-5 py-3 font-bold text-text-blue hover:bg-gray-50"
                        onClick={onClose}
                    >
                        不登入，直接使用
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-full bg-main-blue hover:bg-blue-700 px-5 py-3 font-bold text-white disabled:opacity-60"
                    >
                        {loading ? '登入中…' : '登入'}
                    </button>
                </div>

                {/* 底部連結 */}
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm font-semibold text-gray-700">
                    <button
                        type="button"
                        className="group inline-flex items-center justify-start gap-1 hover:underline"
                        onClick={() => alert('忘記會員號碼流程')}
                    >
                    忘記會員號碼的旅客
                        <FontAwesomeIcon icon={['fas', 'chevron-right']} className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </button>
                    <button
                        type="button"
                        className="group inline-flex items-center justify-start gap-1 hover:underline"
                        onClick={() => alert('忘記密碼流程')}
                    >
                    忘記密碼
                        <FontAwesomeIcon icon={['fas', 'chevron-right']} className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </button>
                </div>
            </form>
        </Modal>
    );
}