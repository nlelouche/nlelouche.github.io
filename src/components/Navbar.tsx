
import React, { useState, useEffect } from 'react';
import { Moon, Sun, Languages, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
    lang: 'en' | 'es';
    dict: any;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, dict }) => {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Check local storage or system preference
        if (localStorage.getItem('theme') === 'light') {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        } else {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newDark = !isDark;
        setIsDark(newDark);
        if (newDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const switchLang = () => {
        const newLang = lang === 'en' ? 'es' : 'en';
        localStorage.setItem('site_lang', newLang);
        const target = lang === 'en' ? '/es/' : '/';
        window.location.href = target;
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800"
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#" className="text-xl font-bold font-mono flex items-center gap-2 text-primary">
                    <Terminal size={24} />
                    <span>LELOUCHE.DEV</span>
                </a>

                <div className="flex gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                        aria-label="Toggle Theme"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <button
                        onClick={switchLang}
                        className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 font-mono text-sm"
                        aria-label="Toggle Language"
                    >
                        <Languages size={20} />
                        {lang.toUpperCase()}
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};
