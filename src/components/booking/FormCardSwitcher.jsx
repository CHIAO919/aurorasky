'use client';
import { useEffect, useMemo, useState } from 'react';

function LabeledField({ field, value, onChange, error }) {
    return (
        <label className="block">
            <span className="block text-base text-text-blue mb-1">
                {field.label}
                {field.required && <span className="text-red-600 ml-0.5">*</span>}
            </span>

            {field.help && (
                    <p
                    id={`${field.name || field.key}-help`}
                    className="text-sm text-text-blue/80 leading-relaxed mb-2"
                >
                    {field.help}
                </p>
            )}

            {field.type === 'select' ? (
                <select
                    className="w-full border rounded-lg px-2 py-1.5"
                    value={value ?? ''}
                    onChange={(e) => onChange(e.target.value)}
                    required={field.required}
                >
                    {(field.options || []).map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            ) : field.type === 'radio' ? (
                <div
                    role="radiogroup"
                    aria-label={field.label}
                    className={field.inline ? 'flex flex-wrap gap-4' : 'space-y-2'}
                >
                    {(field.options || []).map((opt, idx) => {
                        const id = `${field.name || field.key}-${idx}`;
                        return (
                        <label key={opt.value} htmlFor={id} className="flex-1 inline-flex items-center gap-2 cursor-pointer select-none">
                            <input
                                id={id}
                                type="radio"
                                name={field.name || field.key || 'radio-group'}
                                className="h-4 w-4 border-gray-300 text-main-blue focus:ring-main-blue"
                                value={opt.value}
                                checked={value === opt.value}
                                onChange={(e) => onChange(e.target.value)}
                                // 只需在群組第一顆加 required，HTML 會套用到整個群組
                                required={field.required && idx === 0}
                                disabled={opt.disabled}
                            />
                            <span className="text-sm text-text-blue">{opt.label}</span>
                        </label>
                        );
                    })}
                </div>
            ) : (
                <input
                    type={field.type || 'text'}
                    className={`w-full border rounded-lg px-2 py-1.5 ${error ? 'border-red-500' : ''}`}
                    placeholder={field.placeholder}
                    value={value ?? ''}
                    onChange={(e) => onChange(e.target.value)}
                    required={field.required}
                />
            )}

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
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

    const getFieldError = (f) => {
        const v = data[f.key];
        if (f.required && (v == null || String(v).trim() === '')) return '此欄位必填';
        if (typeof f.validate === 'function') return f.validate(v, data) || null;
        return null;
    };

    // 驗證
    const defaultValidateCurrent = () => (current?.fields || []).every((f) => !getFieldError(f));
    const defaultValidateAll = () => sections.flatMap((s) => s.fields).every((f) => !getFieldError(f));

    const currentValid = validate ? validate(data, activeKey) : defaultValidateCurrent();
    const allValid     = validate ? validate(data)             : defaultValidateAll();

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
                        error={getFieldError(f)}
                    />
                    ))}
                </div>
            </div>
        ))}
        </div>
    );
}