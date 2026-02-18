import { useTranslation } from 'react-i18next';
import LanguageSwitch from '../components/LanguageSwitch';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Projects from '../components/Projects';
import HackerText from '../components/HackerText';
import CyberBackground from '../components/CyberBackground';
import Terminal from '../components/Terminal';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CyberLayout = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-background text-text selection:bg-primary selection:text-black font-sans overflow-x-hidden relative">
            <div className="fixed top-4 right-16 z-50">
                <Link to="/modern" className="text-xs font-mono text-primary/50 hover:text-primary transition-colors border border-primary/30 px-2 py-1 rounded bg-black/50 backdrop-blur-sm">
                    [SWITCH_TO_MODERN_UI]
                </Link>
            </div>
            <LanguageSwitch />

            <CyberBackground />
            <Terminal />

            <main className="max-w-4xl mx-auto px-6 py-20 relative z-10">
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-24"
                >
                    <p className="text-primary font-mono mb-4 text-sm tracking-widest">
                        <HackerText text="System.Init(User.Profile)" speed={50} />
                    </p>
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 neon-text tracking-tight leading-none">
                        <HackerText text={t('header.name')} speed={30} />
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 font-light mb-8 flex items-center gap-3">
                        <span className="inline-block w-8 h-1 bg-primary"></span>
                        {t('header.role')}
                    </p>
                    <p className="text-muted text-lg leading-relaxed max-w-2xl border-l-2 border-primary/20 pl-6">
                        {t('header.pitch')}
                    </p>

                    <div className="flex flex-wrap gap-6 mt-10 text-sm font-mono text-muted">
                        <a href={`mailto:${t('header.contact.email')}`} className="hover:text-primary transition-colors flex items-center gap-2 group">
                            <span className="group-hover:animate-pulse">✉</span> <HackerText text={t('header.contact.email')} speed={80} />
                        </a>
                        <a href={`tel:${t('header.contact.phone')}`} className="hover:text-primary transition-colors">
                            📞 {t('header.contact.phone')}
                        </a>
                        <a href={`https://${t('header.contact.linkedin')}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                            🔗 LinkedIn
                        </a>
                    </div>
                </motion.header>

                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-20"
                >
                    <h2 className="text-2xl font-display font-bold mb-6 text-white border-b border-primary/20 pb-2 inline-block">
                        01. <HackerText text={t('sections.profile')} />
                    </h2>
                    <p className="text-muted leading-relaxed text-lg bg-surface/30 p-6 rounded-lg border border-white/5 backdrop-blur-sm">
                        {t('profile.summary')}
                    </p>
                </motion.section>

                <Experience />
                <Skills />
                <Education />
                <Projects />

                <footer className="mt-32 text-center text-muted text-xs font-mono pb-8">
                    <p>Designed & Built by Lelouche Dietrich</p>
                    <p className="mt-2 opacity-50">v2.1.0 [CV_OS_ONLINE]</p>
                </footer>

            </main>
        </div>
    );
};

export default CyberLayout;
