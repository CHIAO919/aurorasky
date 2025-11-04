import { NextResponse } from 'next/server';

export function middleware(req) {
    // 讀 cookie
    const authCookie = req.cookies.get('aurora_auth');
    const hasAuth = authCookie && authCookie.value === '1';

    // 如果已登入又試圖進 /signup，就導回首頁
    if (hasAuth && req.nextUrl.pathname.startsWith('/signup')) {
        const url = new URL('/', req.url);
        return NextResponse.redirect(url);
    }

    // 其他頁照常放行
    return NextResponse.next();
}

// 設定攔截的路徑
export const config = {
    matcher: ['/signup'],
};
