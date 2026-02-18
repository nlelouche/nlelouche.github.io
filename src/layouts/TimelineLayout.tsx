import { useTranslation } from 'react-i18next';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import LanguageSwitch from '../components/LanguageSwitch';
import { ArrowDown, ExternalLink, Calendar, Briefcase, Code } from 'lucide-react';

const TimelineLayout = () => {
    const { t } = useTranslation();
    const projects = t('projects', { returnObjects: true }) as any[];
    const experience = t('experience', { returnObjects: true }) as any[];
    const skills = t('skills.list', { returnObjects: true }) as string[];

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div ref={containerRef} className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-teal-500/30">

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-teal-500 origin-left z-50"
                style={{ scaleX }}
            />

            {/* Nav */}
            <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-40 bg-slate-950/80 backdrop-blur-md">
                <a href="/" className="text-sm font-bold tracking-widest text-teal-500 hover:text-teal-400">
                    // SYSTEM_HOME
                </a>
                <LanguageSwitch />
            </nav>

            {/* Hero Section */}
            <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden px-6">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/20 via-slate-950 to-slate-950 pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="z-10 text-center max-w-4xl"
                >
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-teal-500">
                        {t('header.name')}
                    </h1>
                    <p className="text-xl md:text-3xl text-slate-400 font-light mb-12">
                        {t('header.role')} <span className="text-teal-500 mx-2">•</span> {t('header.pitch').split('.')[0]}
                    </p>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="opacity-50"
                    >
                        <ArrowDown size={32} />
                    </motion.div>
                </motion.div>
            </section>

            {/* Main Content Container */}
            <div className="max-w-7xl mx-auto px-6 py-24 relative">

                {/* Central Line */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-slate-800 transform md:-translate-x-1/2 hidden md:block" />

                {/* Profile Summary */}
                <section className="mb-48 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="bg-slate-900/50 border border-slate-800 p-12 rounded-3xl backdrop-blur-sm max-w-4xl mx-auto text-center relative z-10"
                    >
                        <h2 className="text-3xl font-bold mb-6 text-teal-400">{t('sections.profile')}</h2>
                        <p className="text-lg md:text-xl leading-relaxed text-slate-300">
                            {t('profile.summary')}
                        </p>
                    </motion.div>
                </section>

                {/* Experience Timeline */}
                <section className="mb-48">
                    <div className="text-center mb-24">
                        <span className="inline-block p-4 rounded-full bg-slate-900 border border-slate-800 text-teal-500 mb-4 relative z-10">
                            <Briefcase size={32} />
                        </span>
                        <h2 className="text-4xl font-bold">{t('sections.experience')}</h2>
                    </div>

                    <div className="space-y-24">
                        {experience.map((job, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className={`flex flex-col md:flex-row gap-8 md:gap-0 items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                                    <h3 className="text-2xl font-bold text-white mb-2">{job.role}</h3>
                                    <p className="text-xl text-teal-500 mb-4">{job.company}</p>
                                    <p className="text-slate-400 leading-relaxed">{job.description}</p>
                                </div>

                                <div className="relative z-10 hidden md:flex items-center justify-center w-12 h-12 bg-slate-950 border-4 border-slate-800 rounded-full shrink-0">
                                    <div className="w-3 h-3 bg-teal-500 rounded-full" />
                                </div>

                                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-16 md:text-left' : 'md:pr-16 md:text-right'}`}>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-sm font-mono text-slate-400">
                                        <Calendar size={14} />
                                        {job.period}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Projects Grid */}
                <section className="mb-48">
                    <div className="text-center mb-24">
                        <span className="inline-block p-4 rounded-full bg-slate-900 border border-slate-800 text-teal-500 mb-4 relative z-10">
                            <Code size={32} />
                        </span>
                        <h2 className="text-4xl font-bold">{t('sections.projects')}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {projects.map((project, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-teal-500/50 transition-colors"
                            >
                                {/* Placeholder Image Area */}
                                <div className="aspect-video bg-slate-800/50 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-teal-400 transition-colors">{project.title}</h3>
                                        <p className="text-sm text-slate-400 font-mono">{project.company}</p>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <p className="text-slate-300 mb-6 leading-relaxed">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        <span className="text-xs font-mono text-teal-500 bg-teal-500/10 px-2 py-1 rounded">
                                            {project.tech}
                                        </span>
                                    </div>
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-white font-medium hover:text-teal-400 transition-colors group-hover:translate-x-2 duration-300"
                                    >
                                        View Project <ExternalLink size={16} />
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Skills Cloud */}
                <section className="mb-24 text-center">
                    <h2 className="text-3xl font-bold mb-16 text-slate-200">Technical Arsenal</h2>
                    <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                        {skills.map((skill, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="px-6 py-3 bg-slate-900 border border-slate-700 rounded-full text-slate-300 hover:border-teal-500 hover:text-teal-400 hover:bg-slate-800 transition-all cursor-default"
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </section>

                <footer className="text-center pt-24 border-t border-slate-900">
                    <div className="flex justify-center gap-8 mb-8">
                        <a href={`mailto:${t('header.contact.email')}`} className="text-slate-400 hover:text-white transition-colors">Email</a>
                        <a href={`https://${t('header.contact.linkedin')}`} target="_blank" className="text-slate-400 hover:text-white transition-colors">LinkedIn</a>
                    </div>
                    <p className="text-slate-600 text-sm">© {new Date().getFullYear()} {t('header.name')}</p>
                </footer>
            </div>
        </div>
    );
};

export default TimelineLayout;
