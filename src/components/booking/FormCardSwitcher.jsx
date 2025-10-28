'use client';
import { useEffect, useMemo, useState } from 'react';

function LabeledField({ field, value, onChange }) {
    return (
        <label className="block">
            <span className="block text-sm text-text-blue mb-1">
                {field.label}{field.required && <span className="text-red-600 ml-0.5">*</span>}
            </span>

            {field.type === 'select' ? (
                <select
                    className="w-full border rounded-lg px-2 py-1.5"
                    value={value ?? ''}
                    onChange={(e) => onChange(e.target.value)}
                    required={field.required}
                >
                    {(field.options || []).map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            ) : (
                <input
                    type={field.type || 'text'}
                    className="w-full border rounded-lg px-2 py-1.5"
                    placeholder={field.placeholder}
                    value={value ?? ''}
                    onChange={(e) => onChange(e.target.value)}
                    required={field.required}
                />
            )}
        </label>
    );
}

export default function FormCardSwitcher({
        sections,
        defaultActiveKey,
        defaultValue,
        value,
        onChange,               // (data) => void
        onAllValidChange,       // (boolean) => void
        validate,               // (data, activeKey?) => boolean（可選）
        sessionKey = 'aurora_booking_profile',
        className,
        showSectionTitle = true,
    }) {
    const firstKey = sections?.[0]?.key;
    const [activeKey, setActiveKey] = useState(defaultActiveKey ?? firstKey);
    const [inner, setInner] = useState(defaultValue || {});
    const data = value ?? inner;

    // 讀取 sessionStorage（初始化）
    useEffect(() => {
        if (!sessionKey) return;
        try {
            const raw = sessionStorage.getItem(sessionKey);
        if (raw) {
            const parsed = JSON.parse(raw);
            setInner(prev => ({ ...prev, ...parsed }));
            onChange?.({ ...data, ...parsed });
        }
        } catch {}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sessionKey]);

    // 寫入 sessionStorage + 對外同步資料
    useEffect(() => {
        if (sessionKey) {
            try { sessionStorage.setItem(sessionKey, JSON.stringify(data)); } catch {}
        }
        onChange?.(data);
    }, [data, sessionKey, onChange]);

    const current = useMemo(
        () => sections.find(s => s.key === activeKey) || sections[0],
        [sections, activeKey]
    );

    const setField = (k, v) => {
        const next = { ...data, [k]: v };
        if (value) onChange?.(next);   // 受控
        else setInner(next);           // 非受控
    };

    // 驗證
    const defaultValidate = () =>
        (current?.fields || []).every(f => !f.required || (data[f.key]?.trim()?.length || 0) > 0);
    const currentValid = validate ? validate(data, activeKey) : defaultValidate();
    const allValid = validate
        ? validate(data)
        : sections.flatMap(s => s.fields)
        .every(f => !f.required || (data[f.key]?.trim()?.length || 0) > 0);

    // 把整體驗證狀態回拋到上層（讓頁面控制右側按鈕 disable）
    useEffect(() => { onAllValidChange?.(allValid); }, [allValid, onAllValidChange]);

    return (
        <div className={`space-y-6 ${className || ''}`}>
        {sections.map((section) => (
            <div key={section.key} className="bg-white rounded-2xl shadow-sm">
                {showSectionTitle && (
                    <div className="px-6 pt-5 pb-3 border-b border-gray-300">
                        <h3 className="text-base md:text-lg font-bold text-text-blue">
                            {section.label}
                        </h3>
                    </div>
                )}

                <div className="p-6 space-y-4">
                    {(section.fields || []).map((f) => (
                    <LabeledField
                        key={f.key}
                        field={f}
                        value={data[f.key]}
                        onChange={(v) => setField(f.key, v)}
                    />
                    ))}
                </div>
            </div>
        ))}
        </div>
    );
}