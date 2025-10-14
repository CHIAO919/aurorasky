'use client';

export default function ProgressSteps({
    steps = [],
    current = 1,
}) {
    return (
        <nav>
            <ol className="flex items-center justify-center">
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
                        <li key={label} className="flex items-center gap-1">
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full border ${circleCls}`}>
                                {stepNum}
                            </span>

                            <span className={`text-base tracking-wider ${textCls}`}>
                                {label}
                            </span>

                            {stepNum !== steps.length && (
                                <span className="mx-4 h-px w-10 md:w-16 bg-text-blue/20 block" />
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}