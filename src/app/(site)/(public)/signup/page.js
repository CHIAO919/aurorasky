'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FormCardSwitcher from '@/components/booking/FormCardSwitcher';

const ALLOWED_SPECIAL = "!#$^*";
const PW_ALLOWED_RE = new RegExp(`^[A-Za-z0-9${ALLOWED_SPECIAL.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}]{8,30}$`);
const PW_STRONG_RE = new RegExp(
    `^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[${ALLOWED_SPECIAL.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}]).{8,30}$`
);

const submittedAt = new Date().toISOString();

const sections = [
    {
        key:'account',
        label:'會員帳號',
        fields: [
            {key:'email', label:'電子信箱', type:'email', required:true,},
            {key:'setPassword', label:'設定密碼', help:'密碼請輸入8-30字元，最少1個大寫字母、最少1個小寫字母、最少1個數字、最少1個特殊符號（常見特殊符號字元如：!、#、$、^、*……等），其他字元不接受。',pattern: PW_ALLOWED_RE.source,
                validate: (v) => {
                    if (!v) return '請輸入密碼';
                    if (!PW_ALLOWED_RE.test(v)) return `僅允許英數字與 ${ALLOWED_SPECIAL.split('').join(' ')}，長度 8–30`;
                    if (!PW_STRONG_RE.test(v)) return '需含至少 1 個大寫、1 個小寫、1 個數字與 1 個特殊符號';
                    return null;
                }, type:'password', required:true,
            },
            {key:'checkPassword', label:'確認密碼', type:'password', required:true,
                validate: (v, data) => {
                    if (!v) return '請再次輸入密碼';
                    if (v !== data.setPassword) return '與「設定密碼」不一致';
                    return null;
                },
            },
        ],
    },
    {
        key:'personalData',
        label:'個人資料',
        fields: [
            {key:'lastName', label:'英文姓（與護照一致）', help:'範例）WANG', required:true, pattern: '^[A-Za-z]+$', patternMessage: '僅限英文', inputMode: 'text'},
            {key:'firstName', label:'英文名+中間名（與護照一致）', help:'範例）XIAOMINGJOSEPH', required:true, pattern: '^[A-Za-z]+$', patternMessage: '僅限英文', inputMode: 'text'},
            {key:'gender', label:'性別', type:'radio', required:true, inline: true, 
                options:[
                    { value: 'male', label: '男' },
                    { value: 'female', label: '女' },
                    { value: 'na', label: '不透露', disabled: false },
                ],
            },
            { key: 'birthday',  label: '出生',  type: 'date', required: true, dateLimit: 'past' },
            { key: 'nation', label: '國家/地區代碼', type: 'select', required: true,
                options: [
                    { value: '', label: '請選擇' },
                    { value: 'TW', label: '+886（台灣）' },
                    { value: 'JP', label: '+81（日本）' },
                    { value: 'KR', label: '+82（韓國）' },
                ] 
            },
            { key: 'mobile', label: '手機號碼', type: 'text', required: true, maxLength: 10, pattern: '^\\d{10}$', patternMessage: '請輸入 10 位手機號碼', inputMode: 'tel' },
        ],
    },
    {
        key:'otherData',
        label:'其他資料',
        fields: [
            {key:'information', label:'您願意收到奧若拉天航各項資訊（例如:奧若拉天航電子專刊）', type:'radio', required:true, inline: true, 
                options:[
                    { value: 'yes', label: '我願意' },
                    { value: 'no', label: '我不願意' },
                ],
            },
            {key:'survey', label:'您願意收到奧若拉天航問卷調查', type:'radio', required:true, inline: true, 
                options:[
                    { value: 'yes', label: '我願意' },
                    { value: 'no', label: '我不願意' },
                ],
            },
        ],
    },
];

export default function SignupPage() {
    const [allValid, setAllValid] = useState(false);
    const [formData, setFormData] = useState({});
    const router = useRouter();

    const handleSubmit = () => {
        if (!allValid) return;
        try {
            sessionStorage.setItem('aurora_signup_profile', JSON.stringify(formData));
            sessionStorage.setItem('aurora_signup_submittedAt', submittedAt);
        } catch (err) {
            console.error('儲存失敗', err);
        }
        router.push('/signup/complete');
    };

    return (
        <div className='bg-bg-blue'>
            <div className="max-w-5xl mx-auto p-6 space-y-8">
                <h3 className='text-xl md:text-2xl font-bold text-text-blue mb-[25px]'>註冊成為SkyTier Gold</h3>

                <div>
                    <FormCardSwitcher 
                        sections={sections}
                        sessionKey="aurora_signup_profile"
                        onChange={setFormData}
                        onAllValidChange={setAllValid}
                    />

                    <div className='text-center mt-[30px]'>
                        <button
                            type="button"
                            disabled={!allValid}
                            className={[
                                'w-[200px] inline-flex items-center justify-center px-6 py-2.5 rounded-full text-white font-bold transition',
                                'bg-main-blue hover:bg-blue-700',
                                'disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400 disabled:opacity-60'
                            ].join(' ')}
                            onClick={handleSubmit}
                        >
                            註冊
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}