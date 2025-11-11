'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ open, onClose, children, labelledById }) {
    const [mounted, setMounted] = useState(false);
    const [container, setContainer] = useState(null);
    const triggerRef = useRef(null);        // 開啟前的焦點
    const panelRef = useRef(null);          // 內層面板

    // 建立專屬的 portal root
    useEffect(() => {
        setMounted(true);
        if (typeof window === 'undefined') return;

        let root = document.getElementById('aurora-modal-root');
        if (!root) {
            root = document.createElement('div');
            root.id = 'aurora-modal-root';
            document.body.appendChild(root);
        }
        setContainer(root);
    }, []);

    // 鎖捲動 + ESC 關閉 + iOS touchmove
    useEffect(() => {
        if (!mounted || !open) return;

        const onKey = (e) => (e.key === 'Escape') && onClose?.();
        document.addEventListener('keydown', onKey, { passive: true });

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const stopTouch = (e) => {
        // 只允許在面板內滾
        if (panelRef.current && !panelRef.current.contains(e.target)) {
            e.preventDefault();
        }
    };
    document.addEventListener('touchmove', stopTouch, { passive: false });

    return () => {
        document.removeEventListener('keydown', onKey);
        document.removeEventListener('touchmove', stopTouch);
        document.body.style.overflow = prevOverflow;
    };
    }, [mounted, open, onClose]);

  // 焦點：打開時把焦點放到面板內，關閉時還原
    useEffect(() => {
        if (!mounted) return;
            if (open) {
            triggerRef.current = document.activeElement;
            // 下一個 tick 再聚焦，確保節點存在
            setTimeout(() => {
                const el = panelRef.current;
                if (!el) return;
                const focusables = el.querySelectorAll(
                'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])'
                );
                (focusables[0] || el).focus();
        }, 0);
        } else {
            // 關閉時還原焦點
            const t = triggerRef.current;
            if (t && typeof t.focus === 'function') t.focus();
        }
    }, [mounted, open]);

    // Tab 鎖定在面板內
    useEffect(() => {
        if (!mounted || !open) return;
        const onKeyDown = (e) => {
            if (e.key !== 'Tab') return;
            const root = panelRef.current;
            if (!root) return;

            const f = root.querySelectorAll(
                'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])'
            );
            if (f.length === 0) return;

            const first = f[0];
            const last = f[f.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [mounted, open]);

        if (!mounted || !open || !container) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[1000] flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledById}
            onMouseDown={(e) => {
                if (e.currentTarget === e.target) onClose?.();
            }}
        >
            <div className="absolute inset-0 bg-black/40" />
            <div
                ref={panelRef}
                className="relative z-[1001] w-[92vw] max-w-xl rounded-2xl bg-white shadow-xl outline-none"
                tabIndex={-1}
            >
                {children}
            </div>
        </div>,
        container
    );
}
