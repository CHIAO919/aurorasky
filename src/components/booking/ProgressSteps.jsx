'use client';
import { Fragment } from 'react';

export default function ProgressSteps({
    steps = [],
    current = 1,
}) {
    return (
        <nav 
            className="mx-auto w-full max-w-[420px] md:max-w-3xl px-4 md:px-0 overflow-hidden md:overflow-visible [--stepSize:clamp(22px,5.5vw,32px)] [--fontSize:clamp(11px,2.8vw,14px)]"
            style={{
                paddingLeft: 'max(16px, env(safe-area-inset-left))',
                paddingRight: 'max(16px, env(safe-area-inset-right))',
            }}
        >
            <ol className="flex flex-nowrap items-center">
                {steps.map((label, idx) => {
                    const stepNum = idx + 1;
                    const isActive = stepNum === current;
                    const isDone = stepNum < current;

                    const circleCls = isActive 
                    ? 'bg-main-blue text-white border-main-blue' 
                    : isDone 
                    ? 'bg-white text-main-blue border-main-blue' 
                    : 'bg-white text-text-blue border-text-blue/50';

                    const textCls = isActive 
                    ? 'text-main-blue font-bold' 
                    : isDone 
                    ? 'text-main-blue' 
                    : 'text-text-blue';

                    return (
                        <Fragment key={label}>
                            {/* 每一個步驟 */}
                            <li className="flex flex-col items-center text-center flex-1 min-w-0 px-1">
                                <span
                                    className={`inline-flex items-center justify-center rounded-full border ${circleCls} shrink-0`}
                                    style={{
                                        width: 'var(--stepSize)',
                                        height: 'var(--stepSize)',
                                        fontSize: 'calc(var(--fontSize) * 0.95)',
                                        lineHeight: 1,
                                    }}
                                >
                                    {stepNum}
                                </span>

                                <span
                                    className={`${textCls} leading-snug mt-1`}
                                    style={{ fontSize: 'var(--fontSize)' }}
                                    title={label}
                                >
                                    {label}
                                </span>
                            </li>

                            {/* 兩步驟之間的水平連接線（放在 li 外，避免跑到下方） */}
                            {idx < steps.length - 1 && (
                                <li
                                    className="
                                        hidden md:block 
                                        flex-none self-center 
                                        h-px bg-text-blue/20
                                        w-[clamp(12px,6vw,56px)] mx-2
                                    "
                                />
                            )}
                        </Fragment>
                    );
                })}
            </ol>
        </nav>
    );
}