'use client';
import { useEffect, useMemo, useState } from 'react';

function todayStr() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

function addDays(base, days) {
    const d = new Date(base);
    d.setDate(d.getDate() + days);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

function computeDateLimits(field) {
    const t = todayStr();
    let min = field.minDate ?? undefined;
    let max = field.maxDate ?? undefined;

    if (field.dateLimit === 'past') {
        max = max ?? t;
    } else if (field.dateLimit === 'future') {
        min = min ?? t;
    }

    if (typeof field.minOffset === 'number') {
        min = addDays(t, field.minOffset);
    }
    if (typeof field.maxOffset === 'number') {
        max = addDays(t, field.maxOffset);
    }

    return {min, max};
}

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
                                required={field.required && idx === 0}
                                disabled={opt.disabled}
                            />
                            <span className="text-sm text-text-blue">{opt.label}</span>
                        </label>
                    );
                })}
                </div>
            ) : field.type === 'date' ? (
                (() => {
                    const { min, max } = computeDateLimits(field);
                    return (
                        <input
                            type="date"
                            className={`w-full border rounded-lg px-2 py-1.5 ${error ? 'border-red-500' : ''}`}
                            value={value ?? ''}
                            onChange={(e) => onChange(e.target.value)}
                            required={field.required}
                            min={min}
                            max={max}
                        />
                    );
                })()
            ) : (
                <input
                    type={field.type || 'text'}
                    className={`w-full border rounded-lg px-2 py-1.5 ${error ? 'border-red-500' : ''}`}
                    placeholder={field.placeholder}
                    value={value ?? ''}
                    onChange={(e) => onChange(e.target.value)}
                    required={field.required}
                    maxLength={field.maxLength}
                    minLength={field.minLength}
                    pattern={field.pattern}
                    inputMode={field.inputMode}
                />
            )}
            {field.showCounter && typeof field.maxLength === 'number' && (
                <div className="mt-1 text-xs text-gray-500 text-right">
                    {(value?.length ?? 0)}/{field.maxLength}
                </div>
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
        
        if (f.type === 'date' && v) {
            const { min, max } = computeDateLimits(f);
            if (min && v < min) return `日期不可早於 ${min}`;
            if (max && v > max) return `日期不可晚於 ${max}`;
        }

        if ((f.type === 'text' || !f.type) && typeof v === 'string') {
            const len = v.length;

            if (typeof f.minLength === 'number' && len < f.minLength) {
                return `至少需 ${f.minLength} 個字`;
            }
            if (typeof f.maxLength === 'number' && len > f.maxLength) {
                return `不可超過 ${f.maxLength} 個字`;
            }
            if (f.pattern) {
                try {
                    const re = new RegExp(f.pattern);
                    if (!re.test(v)) return f.patternMessage || '格式不符合要求';
                } catch (error) {
                    console.log(error);
                }
            }
        }

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