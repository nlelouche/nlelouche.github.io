import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const LanguageSwitch = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLanguage}
            className="fixed top-4 right-4 z-50 bg-surface/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-primary font-mono text-sm hover:bg-white/5 transition-colors cursor-pointer"
        >
            {i18n.language === 'en' ? 'ES' : 'EN'}
        </motion.button>
    );
};

export default LanguageSwitch;
