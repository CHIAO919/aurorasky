export function displayName(profile = {}) {
    const {lastName = '', gender = 'M'} = profile;
    const honor = gender === 'F' ? '女士' : '先生';
    if (lastName) return `${String(lastName).toUpperCase()}${honor}`;
    return '貴賓';
}

export function formatGender(gender) {
    switch (gender?.toUpperCase()) {
        case 'F': return '女性';
        case 'M': return '男性';
        default:  return '';
    }
}

export function formatCountryCode(code) {
    switch (code?.toUpperCase()) {
        case 'TW': return '台灣';
        case 'JP': return '日本';
        case 'KR': return '韓國';
        default: return code || '';
    }
}