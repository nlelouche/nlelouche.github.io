import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';

// Detect browser language: use 'es' if the browser is set to Spanish, otherwise 'en'
const browserLang = navigator.language || 'en';
const detectedLang = browserLang.toLowerCase().startsWith('es') ? 'es' : 'en';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            es: { translation: es }
        },
        lng: detectedLang,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
