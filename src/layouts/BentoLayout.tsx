import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LanguageSwitch from '../components/LanguageSwitch';
import { Briefcase, Code, FolderGit2, Mail, Linkedin } from 'lucide-react';

// Reusing logic but with new UI
const BentoLayout = () => {
    const { t } = useTranslation();
    const skills = t('skills.list', { returnObjects: true }) as string[];
    const projects = t('projects', { returnObjects: true }) as any[];
    const experience = t('experience', { returnObjects: true }) as any[];

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 selection:text-white pb-20 overflow-x-hidden">
            {/* Abstract Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-900/10 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

            {/* Nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center backdrop-blur-md bg-black/10">
                <Link to="/" className="text-sm font-semibold tracking-tight text-white/50 hover:text-white transition-colors">
                    ← TERMINAL_MODE
                </Link>
                <LanguageSwitch />
            </nav>

            <main className="max-w-7xl mx-auto px-6 pt-32 relative z-10">

                {/* Hero */}
                <header className="mb-24 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40"
                    >
                        {t('header.name').split(' ')[0]} {t('header.name').split(' ')[1]}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl text-white/60 font-light max-w-2xl mx-auto"
                    >
                        {t('header.role')}
                    </motion.p>
                </header>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-4 gap-4 h-full">

                    {/* 1. Profile / Summary (Large Square) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 md:row-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-between hover:bg-white/10 transition-colors group"
                    >
                        <div>
                            <span className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400">
                                <Code size={20} />
                            </span>
                            <h3 className="text-2xl font-bold mb-4">{t('sections.profile')}</h3>
                            <p className="text-white/70 leading-relaxed text-lg">
                                {t('profile.summary')}
                            </p>
                        </div>
                        <div className="flex gap-4 mt-8">
                            <a href={`mailto:${t('header.contact.email')}`} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><Mail size={18} /></a>
                            <a href={`https://${t('header.contact.linkedin')}`} target="_blank" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><Linkedin size={18} /></a>
                        </div>
                    </motion.div>

                    {/* 2. Skills (Tall Rectangle) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-1 md:row-span-4 bg-white/5 border border-white/10 rounded-3xl p-6 overflow-hidden relative"
                    >
                        <h3 className="text-xl font-bold mb-6 text-white/90">{t('sections.skills')}</h3>
                        <div className="flex flex-col gap-3">
                            {skills.map((skill, i) => (
                                <div key={i} className="flex items-center gap-3 group">
                                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${Math.random() * 40 + 60}%` }}
                                            className="h-full bg-purple-500/50 group-hover:bg-purple-400 transition-colors"
                                        />
                                    </div>
                                    <span className="text-sm font-mono text-white/60 whitespace-nowrap">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* 3. Latest Project (Wide Rectangle) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-1 md:row-span-2 bg-gradient-to-br from-purple-900/40 to-black border border-white/10 rounded-3xl p-6 flex flex-col justify-end group hover:border-purple-500/30 transition-all cursor-pointer"
                        onClick={() => window.open(projects[0].link, '_blank')}
                    >
                        <div className="mb-auto p-2 bg-black/40 w-fit rounded-lg backdrop-blur-md">
                            <FolderGit2 size={24} className="text-purple-400" />
                        </div>
                        <h3 className="text-3xl font-bold mt-4 mb-2 group-hover:text-purple-300 transition-colors">{projects[0].title}</h3>
                        <p className="text-xs text-white/50">{projects[0].company}</p>
                    </motion.div>

                    {/* 4. Experience Highlights (Wide) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-3 md:row-span-2 bg-white/5 border border-white/10 rounded-3xl p-8"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <Briefcase className="text-blue-400" />
                            <h3 className="text-2xl font-bold">{t('sections.experience')}</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {experience.slice(0, 3).map((job: any, i: number) => (
                                <div key={i} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                    <span className="text-xs font-mono text-blue-300 mb-2 block">{job.period}</span>
                                    <h4 className="font-bold text-lg mb-1">{job.role}</h4>
                                    <p className="text-sm text-white/50 mb-3">{job.company}</p>
                                    <p className="text-xs text-white/60 line-clamp-3">{job.description}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>

                {/* Footer */}
                <footer className="mt-32 text-center text-white/20 text-sm font-light">
                    <p>Designed via Bento Grid System</p>
                </footer>

            </main>
        </div>
    );
};

export default BentoLayout;
