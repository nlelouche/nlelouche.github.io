
import React, { useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Timeline } from './components/Timeline';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';
import { WhatsAppBtn } from './components/WhatsAppBtn';

interface AppProps {
    lang: 'en' | 'es';
    data: any; // Full localized data object
}

export const App: React.FC<AppProps> = ({ lang, data }) => {
    const profile = data.basics;
    const progressRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height);

            if (progressRef.current) {
                // @ts-ignore
                progressRef.current.style.transform = `scaleX(${scrolled})`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen font-sans selection:bg-primary/30 text-slate-900 dark:text-slate-50">
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-transparent">
                <div
                    ref={progressRef}
                    className="h-full bg-primary origin-left transform scale-x-0 will-change-transform"
                />
            </div>

            <Navbar lang={lang} dict={{}} />

            <main>
                <Hero data={profile} />
                <Skills data={data} />
                <Timeline data={data} />
                <Projects data={data} />
            </main>

            <Footer data={profile} />
            <WhatsAppBtn />
        </div>
    );
};
