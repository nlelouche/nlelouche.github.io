import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import LanguageSwitch from '../components/LanguageSwitch';
import { useRef } from 'react';

const ElegantLayout = () => {
    const { t } = useTranslation();
    const projects = t('projects', { returnObjects: true }) as any[];
    const experience = t('experience', { returnObjects: true }) as any[];

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

    return (
        <div ref={containerRef} className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-slate-900 selection:text-white">

            {/* Subtle Grain Texture */}
            <div className="fixed inset-0 pointer-events-none opacity-40 z-0"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center mix-blend-difference text-white">
                <Link to="/" className="text-sm font-medium tracking-widest hover:opacity-70 transition-opacity">
                    ← SYSTEM_VIEW
                </Link>
                <LanguageSwitch />
            </nav>

            {/* Hero Section */}
            <motion.section
                style={{ opacity, scale }}
                className="h-screen flex flex-col justify-center items-center px-6 relative z-10"
            >
                <div className="max-w-5xl mx-auto text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-slate-500 font-medium tracking-[0.2em] mb-8 uppercase text-sm"
                    >
                        {t('header.role')}
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl md:text-9xl font-bold tracking-tighter text-slate-900 mb-8 leading-[0.9]"
                    >
                        {t('header.name').split(' ').map((word, i) => (
                            <span key={i} className="block">{word}</span>
                        ))}
                    </motion.h1>
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 100 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="w-[1px] bg-slate-300 mx-auto mt-12"
                    />
                </div>
            </motion.section>

            {/* Narrative Section - Experience */}
            <section className="py-32 px-6 relative z-10 bg-white">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mb-24"
                    >
                        <h2 className="text-sm font-bold tracking-widest uppercase mb-12 text-slate-400">The Journey</h2>
                        <div className="pl-8 border-l border-slate-200 space-y-20">
                            {experience.map((job, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative"
                                >
                                    <span className="absolute -left-[41px] top-0 w-3 h-3 bg-slate-900 rounded-full ring-4 ring-white" />
                                    <span className="text-xs font-mono text-slate-400 mb-2 block">{job.period}</span>
                                    <h3 className="text-2xl font-bold text-slate-900">{job.role}</h3>
                                    <p className="text-slate-600 font-medium mb-4">{job.company}</p>
                                    <p className="text-slate-500 leading-relaxed text-lg font-light">{job.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Projects - Horizontal Scroll feel */}
            <section className="py-32 bg-slate-900 text-white relative z-10 overflow-hidden">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="mb-16 flex items-end justify-between">
                        <h2 className="text-6xl font-bold tracking-tighter">Selected Works</h2>
                        <span className="hidden md:block text-slate-500 text-sm tracking-widest uppercase">Engineering Impact</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                        {projects.map((project, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className={`group cursor-pointer ${idx % 2 === 1 ? 'md:mt-32' : ''}`}
                                onClick={() => window.open(project.link, '_blank')}
                            >
                                <div className="aspect-[4/3] bg-slate-800 rounded-sm mb-6 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-slate-700 group-hover:scale-105 transition-transform duration-700 ease-out" />
                                    {/* Abstract Project Placeholder if no image */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-30 text-9xl font-bold text-slate-900">
                                        {idx + 1}
                                    </div>
                                </div>
                                <div className="flex justify-between items-baseline border-b border-white/20 pb-4 mb-4 group-hover:border-white transition-colors">
                                    <h3 className="text-2xl font-medium">{project.title}</h3>
                                    <span className="text-xs font-mono opacity-60">{project.tech}</span>
                                </div>
                                <p className="text-slate-400 font-light">{project.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer / Contact */}
            <footer className="h-[50vh] flex flex-col justify-center items-center bg-slate-50 relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tighter mb-12 text-center">
                    Let's build the extraordinary.
                </h2>
                <div className="flex gap-8 text-sm font-medium tracking-widest uppercase text-slate-500">
                    <a href={`mailto:${t('header.contact.email')}`} className="hover:text-slate-900 transition-colors">Email</a>
                    <a href={`https://${t('header.contact.linkedin')}`} target="_blank" className="hover:text-slate-900 transition-colors">LinkedIn</a>
                </div>
            </footer>

        </div>
    );
};

export default ElegantLayout;
