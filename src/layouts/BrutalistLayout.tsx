import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LanguageSwitch from '../components/LanguageSwitch';
import { ArrowRight, Star, Zap, MousePointer2 } from 'lucide-react';

const BrutalistLayout = () => {
    const { t } = useTranslation();
    const projects = t('projects', { returnObjects: true }) as any[];
    const experience = t('experience', { returnObjects: true }) as any[];
    const skills = t('skills.list', { returnObjects: true }) as string[];

    // Marquee component for that brutalist vibe
    const Marquee = ({ text, direction = 1 }: { text: string; direction?: number }) => (
        <div className="bg-black text-[#FFE600] py-3 overflow-hidden border-y-4 border-black rotate-1 scale-105 my-12 relative z-20">
            <motion.div
                className="whitespace-nowrap font-black text-2xl uppercase tracking-tighter"
                animate={{ x: direction * -1000 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
                {Array(20).fill(text).map((item, i) => (
                    <span key={i} className="mx-8">{item}</span>
                ))}
            </motion.div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#E0E7FF] text-black font-mono selection:bg-[#FF00D6] selection:text-white cursor-crosshair overflow-x-hidden">

            {/* Brutalist Nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-0">
                <div className="bg-white border-b-4 border-r-4 border-black p-4 hover:bg-[#FF00D6] hover:text-white transition-colors cursor-pointer">
                    <Link to="/" className="font-black text-lg tracking-tight uppercase">
                        ERROR: SWITCH_TO_SAFE_MODE
                    </Link>
                </div>
                <div className="p-4 bg-black text-white border-b-4 border-l-4 border-white">
                    <LanguageSwitch />
                </div>
            </nav>

            <main className="pt-32 pb-20 px-4 max-w-7xl mx-auto">

                {/* Hero: Broken Layout */}
                <header className="relative mb-32 grid grid-cols-1 md:grid-cols-12 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -100, rotate: -5 }}
                        animate={{ opacity: 1, x: 0, rotate: -2 }}
                        className="md:col-span-8 bg-[#FFE600] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 md:p-16 relative z-10"
                    >
                        <div className="absolute -top-6 -right-6 bg-[#FF00D6] text-white p-4 font-bold rotate-12 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
                            <Star className="animate-spin-slow" /> OPEN FOR WORK
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.8] tracking-tighter mb-6">
                            {t('header.name').split(' ').map((w, i) => <span key={i} className="block">{w}</span>)}
                        </h1>
                        <p className="text-2xl font-bold bg-white inline-block px-2 border-2 border-black rotate-1">
                            {t('header.role')}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="md:col-span-4 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col justify-between rotate-2"
                    >
                        <Zap size={48} className="text-[#FFE600] drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] fill-current" />
                        <p className="text-lg font-bold leading-tight mt-4">
                            {t('header.pitch')}
                        </p>
                        <div className="mt-8 flex flex-col gap-2">
                            <a href={`mailto:${t('header.contact.email')}`} className="bg-black text-white p-3 text-center font-bold hover:bg-[#FF00D6] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[4px_4px_0px_white]">EMAIL ME</a>
                        </div>
                    </motion.div>
                </header>

                <Marquee text="/// SENIOR ENGINEER /// GAME DEV /// ARCHITECT ///" />

                {/* Experience: The 'Stack' */}
                <section className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <h2 className="text-5xl font-black uppercase bg-black text-white px-6 py-2 -rotate-1 inline-block">
                            {t('sections.experience')}
                        </h2>
                        <div className="h-4 flex-grow bg-stripes-pattern border-y-4 border-black"></div>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        {experience.map((job, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ x: idx % 2 === 0 ? -50 : 50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                className={`bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_#FF00D6] transition-all group ${idx % 2 !== 0 ? 'md:ml-24 rotate-1' : '-rotate-1'}`}
                            >
                                <div className="flex justify-between items-start border-b-4 border-black pb-4 mb-4">
                                    <h3 className="text-3xl font-black uppercase">{job.company}</h3>
                                    <span className="bg-[#FFE600] border-2 border-black px-2 font-bold text-sm">
                                        {job.period}
                                    </span>
                                </div>
                                <h4 className="text-xl font-bold mb-2 group-hover:text-[#FF00D6] transition-colors">
                                    ► {job.role}
                                </h4>
                                <p className="font-medium leading-relaxed opacity-90">
                                    {job.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Skills: Sticker Bomb */}
                <section className="mb-32 p-12 bg-black border-4 border-black relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                    <h2 className="text-4xl font-black text-center text-white mb-12 uppercase tracking-widest relative z-10">
                        Tech Arsenal
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4 relative z-10">
                        {skills.map((skill, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.2, rotate: Math.random() * 10 - 5, zIndex: 10 }}
                                className="bg-white border-4 border-black px-4 py-2 font-bold text-lg shadow-[4px_4px_0px_0px_#FF00D6] cursor-help transform rotate-3"
                                style={{ rotate: `${Math.random() * 6 - 3}deg` }}
                            >
                                {skill}
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Projects: Brutal Grid */}
                <section>
                    <h2 className="text-6xl font-black text-right mb-12 text-outline-black text-transparent hover:text-black transition-colors cursor-default">
                        {t('sections.projects')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projects.map((proj, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="bg-[#FF00D6] border-4 border-black p-1 shadow-[8px_8px_0px_0px_black]"
                            >
                                <div className="bg-white border-2 border-black h-full p-6 flex flex-col relative overflow-hidden">
                                    <MousePointer2 className="absolute top-2 right-2 opacity-10 w-24 h-24 rotate-12" />
                                    <h3 className="text-3xl font-black mb-2 uppercase italic">{proj.title}</h3>
                                    <p className="font-mono text-sm mb-4 border-b-2 border-black pb-2">{proj.company}</p>
                                    <p className="mb-8 font-bold flex-grow">{proj.description}</p>
                                    <button onClick={() => window.open(proj.link, '_blank')} className="self-start bg-black text-white px-6 py-3 font-bold uppercase hover:bg-[#FFE600] hover:text-black hover:scale-105 transition-all flex items-center gap-2 border-2 border-transparent hover:border-black">
                                        Play It <ArrowRight size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

            </main>

            <div className="fixed bottom-4 left-4 z-50 pointer-events-none">
                <div className="bg-white border-2 border-black p-2 font-mono text-xs shadow-[2px_2px_0px_black]">
                    X: {0} Y: {0} // BRUTAL_OS v1.0
                </div>
            </div>
        </div>
    );
};

export default BrutalistLayout;
