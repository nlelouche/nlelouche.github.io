import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import LanguageSwitch from '../components/LanguageSwitch';
import { User, Briefcase, Code, FolderGit2, X, Maximize2, Minus, LayoutGrid, Terminal } from 'lucide-react';

// Window Component
const GlassWindow = ({ title, icon: Icon, children, onClose, isOpen, zIndex, onFocus }: any) => {
    if (!isOpen) return null;
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            drag
            dragMomentum={false}
            onMouseDown={onFocus}
            className="absolute top-20 left-10 md:left-1/4 w-[90vw] md:w-[600px] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            style={{ zIndex, maxHeight: '70vh' }}
        >
            {/* Window Bar */}
            <div className="h-12 bg-white/5 border-b border-white/10 flex items-center justify-between px-4 cursor-grab active:cursor-grabbing">
                <div className="flex items-center gap-3">
                    <Icon size={16} className="text-white/70" />
                    <span className="font-medium text-white/90 text-sm">{title}</span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors"><Minus size={12} className="text-white" /></button>
                    <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors"><Maximize2 size={12} className="text-white" /></button>
                    <button onClick={onClose} className="p-1.5 hover:bg-red-500/80 rounded-full transition-colors"><X size={12} className="text-white" /></button>
                </div>
            </div>
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30 text-white">
                {children}
            </div>
        </motion.div>
    );
};

const ImmersiveLayout = () => {
    const { t } = useTranslation();
    const projects = t('projects', { returnObjects: true }) as any[];
    const experience = t('experience', { returnObjects: true }) as any[];
    const skills = t('skills.list', { returnObjects: true }) as string[];

    // Window State Manager
    const [windows, setWindows] = useState({
        profile: true,
        experience: false,
        projects: false,
        skills: false,
    });

    const [zIndexes, setZIndexes] = useState({
        profile: 10,
        experience: 9,
        projects: 8,
        skills: 7
    });

    const toggleWindow = (key: keyof typeof windows) => {
        bringToFront(key);
        setWindows(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const bringToFront = (key: keyof typeof zIndexes) => {
        const maxZ = Math.max(...Object.values(zIndexes));
        setZIndexes(prev => ({ ...prev, [key]: maxZ + 1 }));
    };

    return (
        <div className="h-screen w-screen overflow-hidden bg-black text-white font-sans selection:bg-white/30 relative">

            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black z-0">
                {/* Animated Orbs */}
                <motion.div
                    animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-[80px]"
                />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150 mix-blend-overlay"></div>
            </div>

            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 h-10 flex justify-between items-center px-6 z-50 bg-black/10 backdrop-blur-md border-b border-white/5 text-xs font-medium text-white/70">
                <div className="flex items-center gap-4">
                    <span className="font-bold text-white">LeloucheOS</span>
                    <span>File</span>
                    <span>Edit</span>
                    <span>View</span>
                    <LanguageSwitch />
                </div>
                <div className="flex items-center gap-4">
                    <span>{new Date().toLocaleTimeString()}</span>
                    <Link to="/" className="hover:text-white transition-colors">Exit to Terminal ↗</Link>
                </div>
            </div>

            {/* Main Area (Windows) */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="w-full h-full relative pointer-events-auto">
                    <AnimatePresence>
                        {/* 1. Profile Window */}
                        <GlassWindow
                            isOpen={windows.profile}
                            onClose={() => toggleWindow('profile')}
                            title="User_Profile.usr"
                            icon={User}
                            zIndex={zIndexes.profile}
                            onFocus={() => bringToFront('profile')}
                        >
                            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 flex items-center justify-center text-3xl font-bold shadow-lg">
                                    {t('header.name').charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-1">{t('header.name')}</h2>
                                    <p className="text-white/60 mb-4">{t('header.role')}</p>
                                    <p className="text-sm leading-relaxed opacity-80 bg-white/5 p-4 rounded-xl border border-white/10">
                                        {t('profile.summary')}
                                    </p>
                                    <div className="mt-6 flex gap-3 justify-center md:justify-start">
                                        <a href={`mailto:${t('header.contact.email')}`} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors">Contact</a>
                                        <a href={`https://${t('header.contact.linkedin')}`} target="_blank" className="px-4 py-2 bg-blue-600/80 hover:bg-blue-600 rounded-lg text-sm font-medium transition-colors">LinkedIn</a>
                                    </div>
                                </div>
                            </div>
                        </GlassWindow>

                        {/* 2. Experience Window */}
                        <GlassWindow
                            isOpen={windows.experience}
                            onClose={() => toggleWindow('experience')}
                            title="Career_Log.db"
                            icon={Briefcase}
                            zIndex={zIndexes.experience}
                            onFocus={() => bringToFront('experience')}
                        >
                            <div className="space-y-6">
                                {experience.map((job, i) => (
                                    <div key={i} className="relative pl-6 border-l border-white/20 pb-6 last:border-0 hover:bg-white/5 p-2 rounded-r-xl transition-colors">
                                        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
                                        <span className="text-xs text-white/50 block mb-1 font-mono">{job.period}</span>
                                        <h3 className="text-lg font-bold">{job.role}</h3>
                                        <p className="text-blue-300 text-sm mb-2">{job.company}</p>
                                        <p className="text-sm opacity-70">{job.description}</p>
                                    </div>
                                ))}
                            </div>
                        </GlassWindow>

                        {/* 3. Projects Window */}
                        <GlassWindow
                            isOpen={windows.projects}
                            onClose={() => toggleWindow('projects')}
                            title="Deployments.json"
                            icon={FolderGit2}
                            zIndex={zIndexes.projects}
                            onFocus={() => bringToFront('projects')}
                        >
                            <div className="grid grid-cols-1 gap-4">
                                {projects.map((proj, i) => (
                                    <div key={i} className="bg-black/20 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group" onClick={() => window.open(proj.link, '_blank')}>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold group-hover:text-blue-300 transition-colors">{proj.title}</h3>
                                            <span className="text-[10px] uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded text-white/60">{proj.company}</span>
                                        </div>
                                        <p className="text-xs opacity-60 mb-3">{proj.description}</p>
                                        <div className="flex items-center gap-1 text-[10px] text-blue-300 font-mono">
                                            <Terminal size={10} /> {proj.tech}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </GlassWindow>

                        {/* 4. Skills Window */}
                        <GlassWindow
                            isOpen={windows.skills}
                            onClose={() => toggleWindow('skills')}
                            title="Plugins.lib"
                            icon={Code}
                            zIndex={zIndexes.skills}
                            onFocus={() => bringToFront('skills')}
                        >
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-white/10 border border-white/5 rounded-lg text-sm font-mono text-white/80 hover:bg-white/20 hover:scale-105 transition-all cursor-default">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </GlassWindow>
                    </AnimatePresence>
                </div>
            </div>

            {/* Dock */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-2xl border border-white/20 px-4 py-3 rounded-2xl flex items-center gap-4 shadow-2xl z-50 hover:scale-105 transition-transform duration-300">
                <DockIcon icon={User} label="Profile" active={windows.profile} onClick={() => toggleWindow('profile')} />
                <DockIcon icon={Briefcase} label="Experience" active={windows.experience} onClick={() => toggleWindow('experience')} />
                <DockIcon icon={FolderGit2} label="Projects" active={windows.projects} onClick={() => toggleWindow('projects')} />
                <DockIcon icon={Code} label="Skills" active={windows.skills} onClick={() => toggleWindow('skills')} />
                <div className="w-px h-8 bg-white/20 mx-1"></div>
                <DockIcon icon={LayoutGrid} label="Reset-Layout" active={false} onClick={() => setWindows({ profile: true, experience: false, projects: false, skills: false })} />
            </div>

        </div>
    );
};

const DockIcon = ({ icon: Icon, label, active, onClick }: any) => (
    <div className="group relative flex flex-col items-center">
        <button
            onClick={onClick}
            className={`p-3 rounded-xl transition-all duration-300 ${active ? 'bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-110' : 'bg-transparent hover:bg-white/10 hover:scale-110'}`}
        >
            <Icon size={24} className="text-white" />
        </button>
        {active && <div className="absolute -bottom-2 w-1 h-1 bg-white rounded-full" />}
        <span className="absolute -top-10 px-2 py-1 bg-black/80 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap backdrop-blur-sm">
            {label}
        </span>
    </div>
);

export default ImmersiveLayout;
