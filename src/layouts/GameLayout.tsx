import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

// ─── STATIC DATA (levels & categories don't need translation) ────────────────
const SKILL_DATA = [
    { key: "Unity 3D", level: 95, category: "ENGINE" },
    { key: "C#", level: 92, category: "CODE" },
    { key: "System Architecture", level: 88, category: "DESIGN" },
    { key: "Tech Leadership", level: 85, category: "SOFT" },
    { key: "SDK Integration", level: 82, category: "CODE" },
    { key: "Scrum Master", level: 80, category: "SOFT" },
    { key: "Firebase / Backend", level: 68, category: "INFRA" },
    { key: "CI/CD (Jenkins)", level: 65, category: "INFRA" },
    { key: "C++", level: 55, category: "CODE" },
    { key: "JavaScript / Node.js", level: 50, category: "CODE" },
    { key: "Unreal Engine", level: 45, category: "ENGINE" },
    { key: "Groovy / Bash", level: 40, category: "CODE" },
];

const EXPERIENCE_DATA = [
    { company: "Trick Studios", rank: "S", tech: ["C#", "JavaScript", "Groovy", "Node.js"] },
    { company: "Games Station", rank: "S", tech: ["Unity 3D", "Firebase", "Ads SDK"] },
    { company: "Bigfoot Games", rank: "A", tech: ["Unity 3D", "Spine", "REST API"] },
    { company: "Autónomo", rank: "A", tech: ["Unity 3D", "Unreal Engine"] },
    { company: "Widow Games", rank: "A", tech: ["Unity 3D", "Jenkins"] },
    { company: "Artik Games", rank: "B", tech: ["C#", "Unity 3D"] },
    { company: "Three pillar Global", rank: "B", tech: ["Objective-C", "iPhone Dev"] },
    { company: "Teracode S.A", rank: "B", tech: ["Objective-C", "Scrum Master"] },
    { company: "Gameloft Argentina S.A", rank: "B", tech: ["C++", "Windows Mobile"] },
];

const PROJECTS_DATA = [
    {
        title: "Grow Empire: Rome",
        genre: "Tower Defense / Strategy",
        company: "Games Station",
        link: "https://play.google.com/store/search?q=grow+empire+rome&c=apps&hl=es_AR",
        color: "#FF6B35",
        image: "/games/grow_empire_rome.jpg",
        platforms: ["Android", "iOS", "Steam"],
        descIndex: 0,
        isVideo: false,
        stats: { installs: "10M+", rating: "4.6★" },
    },
    {
        title: "Pocket Politics 2",
        genre: "Gacha / Idle",
        company: "Bigfoot Games × Kongregate",
        link: "https://www.youtube.com/watch?v=_InELEm_gu0",
        color: "#7B2FBE",
        image: "/games/pocket_politics_2.png",
        platforms: ["Android", "iOS"],
        descIndex: 1,
        isVideo: true,
    },
    {
        title: "Fists of Furry",
        genre: "Idle / Action",
        company: "Bigfoot Games",
        link: "https://www.youtube.com/watch?v=E0BNigECmOk&t=1s",
        color: "#E63946",
        image: "/games/fists_of_furry.jpg",
        platforms: ["Android", "iOS"],
        descIndex: 2,
        isVideo: true,
    },
    {
        title: "Game of Warriors",
        genre: "Strategy / Tower Defense",
        company: "Games Station",
        link: "https://play.google.com/store/apps/details?id=com.strategygame.gameofwarriors&hl=es_AR",
        color: "#F4A261",
        image: "/games/game_of_warriors.jpg",
        platforms: ["Android", "iOS"],
        descIndex: 3,
        isVideo: false,
        stats: { installs: "29M+", rating: "4.6★" },
    },
    {
        title: "Hooligans: The Bravest",
        genre: "Beat'em Up / Tower Defense",
        company: "Artik Games",
        link: "https://www.youtube.com/watch?v=kqTK4_pE6ng",
        color: "#00D4AA",
        image: "/games/hooligans_the_bravest.jpg",
        platforms: ["Mobile"],
        descIndex: 4,
        isVideo: true,
    },
    {
        title: "Street Kings",
        genre: "3D Drag Racing",
        company: "Artik Games",
        link: "https://www.youtube.com/watch?v=udvP9G_0JDg",
        color: "#F72585",
        image: "/games/street_kings.webp",
        platforms: ["Mobile"],
        descIndex: 5,
        isVideo: true,
    },
    {
        title: "El Juego de la Vida",
        genre: "Board Game",
        company: "Widow Games",
        link: "https://play.google.com/store/apps/details?id=com.widowgames.LaVidaEsUnJuego&hl=es",
        color: "#4CC9F0",
        image: "/games/juego_de_la_vida.webp",
        platforms: ["Android", "iOS"],
        descIndex: 6,
        isVideo: false,
    },
    {
        title: "T.E.G. Mobile",
        genre: "Board Game / Strategy",
        company: "Widow Games",
        link: "https://play.google.com/store/apps/details?id=com.widowgames.warstrategy&hl=es_419",
        color: "#2D6A4F",
        image: "/games/teg_mobile.webp",
        platforms: ["Android", "iOS"],
        descIndex: 7,
        isVideo: false,
    },
];

const EDUCATION_DATA = [
    { status: "ACTIVE", icon: "🎓", eduIndex: 0 },
    { status: "COMPLETED", icon: "🕹️", eduIndex: 1 },
    { status: "INCOMPLETE", icon: "📚", eduIndex: 2 },
];

const RANK_COLORS: Record<string, string> = {
    S: "#FFD700",
    A: "#C0C0C0",
    B: "#CD7F32",
};

const CATEGORY_COLORS: Record<string, string> = {
    ENGINE: "#FF6B35",
    CODE: "#00D4AA",
    DESIGN: "#7B2FBE",
    SOFT: "#FFD700",
    INFRA: "#4ECDC4",
};

// ─── LANGUAGE SWITCH ─────────────────────────────────────────────────────────
const LangSwitch = () => {
    const { i18n: i18nHook } = useTranslation();
    const current = i18nHook.language.startsWith('es') ? 'es' : 'en';

    const toggle = () => {
        const next = current === 'es' ? 'en' : 'es';
        i18n.changeLanguage(next);
    };

    return (
        <button
            onClick={toggle}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-gray-700 hover:border-green-500 transition-all text-[10px] font-bold font-mono text-gray-400 hover:text-white"
            title="Switch language"
        >
            <span className={current === 'en' ? 'text-green-400' : 'text-gray-600'}>EN</span>
            <span className="text-gray-700">|</span>
            <span className={current === 'es' ? 'text-green-400' : 'text-gray-600'}>ES</span>
        </button>
    );
};

// ─── BOOT SCREEN ─────────────────────────────────────────────────────────────
const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
    const { t } = useTranslation();
    const bootLines: string[] = t('game.boot.lines', { returnObjects: true }) as string[];

    const [lines, setLines] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        setLines([]);
        setProgress(0);
        setDone(false);
        let i = 0;
        const interval = setInterval(() => {
            if (i < bootLines.length) {
                setLines(prev => [...prev, bootLines[i]]);
                setProgress(Math.round(((i + 1) / bootLines.length) * 100));
                i++;
            } else {
                clearInterval(interval);
                setDone(true);
            }
        }, 200);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language]);

    const getLineClass = (line: string) => {
        if (!line) return 'text-gray-400';
        if (line.includes('[OK]') || line.includes('[OK]')) return 'text-green-400';
        if (line.toUpperCase().includes('START') || line.toUpperCase().includes('PRESIONA')) return 'text-yellow-400 font-bold animate-pulse';
        return 'text-gray-400';
    };

    return (
        <motion.div
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 font-mono"
        >
            <div className="w-full max-w-2xl px-8">
                <div className="text-center mb-12">
                    <div className="text-6xl mb-4">🎮</div>
                    <h1 className="text-3xl font-black text-white tracking-widest">{t('game.boot.title')}</h1>
                    <p className="text-green-500 text-sm mt-1">{t('game.boot.subtitle')}</p>
                </div>

                <div className="bg-gray-950 border border-green-900 rounded-lg p-6 mb-8 min-h-[240px]">
                    {lines.map((line, i) => (
                        <motion.p
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`text-sm mb-1 ${getLineClass(line)}`}
                        >
                            {line}
                        </motion.p>
                    ))}
                    {!done && <span className="text-green-400 animate-pulse">█</span>}
                </div>

                <div className="mb-8">
                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                        <span>{t('game.boot.loading')}</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-green-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "linear" }}
                        />
                    </div>
                </div>

                <AnimatePresence>
                    {done && (
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={onComplete}
                            className="w-full py-4 bg-green-500 hover:bg-green-400 text-black font-black text-xl tracking-widest rounded-lg transition-colors"
                        >
                            {t('game.boot.pressStart')}
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

// ─── SKILL BAR ───────────────────────────────────────────────────────────────
const SkillBar = ({ skill, delay }: { skill: typeof SKILL_DATA[0]; delay: number }) => {
    const color = CATEGORY_COLORS[skill.category] || "#fff";
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className="mb-4"
        >
            <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ color, border: `1px solid ${color}`, opacity: 0.8 }}>
                        {skill.category}
                    </span>
                    <span className="text-sm text-white font-medium">{skill.key}</span>
                </div>
                <span className="text-xs font-mono" style={{ color }}>{skill.level}</span>
            </div>
            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${color}88, ${color})` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay, ease: "easeOut" }}
                />
            </div>
        </motion.div>
    );
};

// ─── SECTION HEADER ──────────────────────────────────────────────────────────
const SectionHeader = ({ number, title, subtitle }: { number: string; title: string; subtitle: string }) => (
    <div className="flex items-center gap-6 mb-16">
        <div className="text-6xl font-black text-gray-800 font-mono leading-none">{number}</div>
        <div>
            <p className="text-xs font-bold tracking-widest text-green-500 mb-1">{subtitle}</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">{title}</h2>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent ml-4 hidden md:block" />
    </div>
);

// ─── MAIN LAYOUT ─────────────────────────────────────────────────────────────
const GameLayout = () => {
    const { t } = useTranslation();
    const [booted, setBooted] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    // Translated experience data merged with static rank/tech
    const experience = EXPERIENCE_DATA.map((item, i) => {
        const expArr = t('experience', { returnObjects: true }) as any[];
        const expItem = expArr?.[i] || {};
        return { ...item, role: expItem.role || '', period: expItem.period || '', description: expItem.description || '' };
    });

    // Translated education data
    const educationArr = t('education', { returnObjects: true }) as any[];



    const navItems = [
        { id: "hero", label: t('game.nav.home'), icon: "🏠" },
        { id: "skills", label: t('game.nav.skills'), icon: "⚔️" },
        { id: "experience", label: t('game.nav.xpLog'), icon: "📜" },
        { id: "education", label: t('game.nav.training'), icon: "🎓" },
        { id: "projects", label: t('game.nav.games'), icon: "🎮" },
        { id: "contact", label: t('game.nav.contact'), icon: "📡" },
    ];

    const scrollTo = useCallback((id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setActiveSection(id);
    }, []);

    useEffect(() => {
        if (!booted) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { threshold: 0.4 }
        );
        navItems.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [booted, i18n.language]);

    const STATS = [
        { label: t('game.stats.yearsXP'), value: "15+", icon: "⚔️" },
        { label: t('game.stats.gamesShipped'), value: "10+", icon: "🎮" },
        { label: t('game.stats.techLeadRoles'), value: "3+", icon: "👥" },
        { label: t('game.stats.platforms'), value: "5+", icon: "🖥️" },
    ];

    const statusStyles: Record<string, { color: string; bg: string; label: string }> = {
        ACTIVE: { color: "#00D4AA", bg: "#00D4AA18", label: t('game.edu.active') },
        COMPLETED: { color: "#FFD700", bg: "#FFD70018", label: t('game.edu.completed') },
        INCOMPLETE: { color: "#888", bg: "#88888818", label: t('game.edu.incomplete') },
    };

    return (
        <div className="bg-gray-950 text-white min-h-screen font-sans overflow-x-hidden">
            {/* Boot Screen */}
            <AnimatePresence>
                {!booted && <BootScreen onComplete={() => setBooted(true)} />}
            </AnimatePresence>

            {!booted ? null : (
                <motion.div
                    ref={containerRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* ── SCROLL PROGRESS BAR ── */}
                    <div className="fixed top-0 left-0 right-0 h-0.5 bg-gray-900 z-50">
                        <motion.div className="h-full bg-green-500" style={{ width: progressWidth }} />
                    </div>

                    {/* ── HUD NAVBAR ── */}
                    <nav className="fixed top-0 left-0 right-0 z-40 pt-1">
                        <div className="flex items-center justify-between px-4 md:px-8 py-3 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
                            {/* Left: Player Info */}
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black font-black text-sm">L</div>
                                <div className="hidden md:block">
                                    <p className="text-xs font-bold text-white leading-none">LELOUCHE</p>
                                    <p className="text-[10px] text-green-500 font-mono">LVL 15 · TECH LEAD</p>
                                </div>
                            </div>

                            {/* Center: Nav */}
                            <div className="flex items-center gap-1 md:gap-2">
                                {navItems.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollTo(item.id)}
                                        className={`px-2 md:px-3 py-1.5 rounded text-[10px] md:text-xs font-bold tracking-wider transition-all ${activeSection === item.id
                                            ? "bg-green-500 text-black"
                                            : "text-gray-400 hover:text-white hover:bg-gray-800"
                                            }`}
                                    >
                                        <span className="md:hidden">{item.icon}</span>
                                        <span className="hidden md:inline">{item.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Right: Lang switch */}
                            <div className="flex items-center gap-2">
                                <LangSwitch />
                            </div>
                        </div>
                    </nav>

                    {/* ── HERO ── */}
                    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden pt-16">
                        <div className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: `
                  linear-gradient(rgba(0,212,170,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,212,170,0.3) 1px, transparent 1px)
                `,
                                backgroundSize: "60px 60px",
                                pointerEvents: "none",
                            }}
                        />
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

                        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full py-24 relative z-10 pointer-events-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                                {/* Left: Text */}
                                <div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-bold tracking-widest mb-6">
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            {t('game.available')}
                                        </div>

                                        <h1 className="text-5xl md:text-7xl font-black leading-[0.9] mb-6 tracking-tight">
                                            <span className="text-white">LELOUCHE</span>
                                            <br />
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
                                                DIETRICH
                                            </span>
                                        </h1>

                                        <div className="flex items-center gap-3 mb-8">
                                            <div className="h-px flex-1 bg-gray-800" />
                                            <p className="text-green-500 font-mono text-sm font-bold tracking-widest">
                                                {t('game.subtitle')}
                                            </p>
                                            <div className="h-px flex-1 bg-gray-800" />
                                        </div>

                                        <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
                                            {t('game.summary')}
                                        </p>

                                        <div className="flex flex-wrap gap-4">
                                            <button
                                                onClick={() => scrollTo("contact")}
                                                className="px-8 py-4 bg-green-500 hover:bg-green-400 text-black font-black text-sm tracking-widest rounded-lg transition-all hover:scale-105 active:scale-95"
                                            >
                                                {t('game.hire')}
                                            </button>
                                            <button
                                                onClick={() => scrollTo("projects")}
                                                className="px-8 py-4 border border-gray-700 hover:border-green-500 text-gray-300 hover:text-white font-bold text-sm tracking-widest rounded-lg transition-all"
                                            >
                                                {t('game.viewGames')}
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Right: Character Card */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, x: 40 }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    transition={{ duration: 0.7, delay: 0.2 }}
                                    className="relative"
                                >
                                    <div className="relative bg-gray-900 border border-gray-700 rounded-2xl p-8 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent pointer-events-none" />

                                        <div className="flex items-start justify-between mb-8">
                                            <div>
                                                <p className="text-[10px] text-gray-500 font-mono mb-1">{t('game.characterCard')}</p>
                                                <h3 className="text-xl font-black text-white">LELOUCHE D.</h3>
                                                <p className="text-green-500 text-sm font-mono">{t('game.class')}</p>
                                            </div>
                                            <div className="text-5xl">👾</div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-8">
                                            {STATS.map((stat, i) => (
                                                <div key={i} className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700/50">
                                                    <div className="text-2xl mb-1">{stat.icon}</div>
                                                    <div className="text-2xl font-black text-white">{stat.value}</div>
                                                    <div className="text-[10px] text-gray-500 font-mono uppercase">{stat.label}</div>
                                                </div>
                                            ))}
                                        </div>

                                        <div>
                                            <p className="text-[10px] text-gray-500 font-mono mb-3">{t('game.topSkills')}</p>
                                            {SKILL_DATA.slice(0, 3).map((skill, i) => (
                                                <div key={i} className="flex items-center gap-3 mb-2">
                                                    <span className="text-xs text-gray-400 w-28 truncate">{skill.key}</span>
                                                    <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                                                        <motion.div
                                                            className="h-full bg-green-500 rounded-full"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${skill.level}%` }}
                                                            transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                                        />
                                                    </div>
                                                    <span className="text-xs text-green-500 font-mono w-8 text-right">{skill.level}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* ── SKILLS ── */}
                    <section id="skills" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
                        <SectionHeader
                            number={t('game.sections.skillsNumber')}
                            title={t('game.sections.skillsTitle')}
                            subtitle={t('game.sections.skillsSubtitle')}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2">
                            {SKILL_DATA.map((skill, i) => (
                                <SkillBar key={i} skill={skill} delay={i * 0.04} />
                            ))}
                        </div>
                    </section>

                    {/* ── EXPERIENCE ── */}
                    <section id="experience" className="py-32 bg-gray-900/30">
                        <div className="px-6 md:px-12 max-w-7xl mx-auto">
                            <SectionHeader
                                number={t('game.sections.xpNumber')}
                                title={t('game.sections.xpTitle')}
                                subtitle={t('game.sections.xpSubtitle')}
                            />
                            <div className="space-y-4">
                                {experience.map((job, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.08 }}
                                        className="group bg-gray-900 border border-gray-800 hover:border-gray-600 rounded-xl p-6 transition-all cursor-default"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                                            <div
                                                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black shrink-0 border-2"
                                                style={{
                                                    color: RANK_COLORS[job.rank],
                                                    borderColor: RANK_COLORS[job.rank] + "44",
                                                    background: RANK_COLORS[job.rank] + "11",
                                                }}
                                            >
                                                {job.rank}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                                                    <div>
                                                        <h3 className="text-lg font-black text-white group-hover:text-green-400 transition-colors">
                                                            {job.role}
                                                        </h3>
                                                        <p className="text-green-500 text-sm font-mono">{job.company}</p>
                                                    </div>
                                                    <span className="text-xs text-gray-500 font-mono bg-gray-800 px-3 py-1 rounded-full self-start md:self-auto">
                                                        {job.period}
                                                    </span>
                                                </div>
                                                <p className="text-gray-400 text-sm leading-relaxed mb-3">{job.description}</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {job.tech.map((t, j) => (
                                                        <span key={j} className="text-[10px] font-mono text-gray-500 bg-gray-800 px-2 py-0.5 rounded">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ── EDUCATION ── */}
                    <section id="education" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
                        <SectionHeader
                            number={t('game.sections.eduNumber')}
                            title={t('game.sections.eduTitle')}
                            subtitle={t('game.sections.eduSubtitle')}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {EDUCATION_DATA.map((edu, i) => {
                                const st = statusStyles[edu.status];
                                const eduItem = educationArr?.[edu.eduIndex] || {};
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-4"
                                    >
                                        <div className="text-4xl">{edu.icon}</div>
                                        <div>
                                            <span
                                                className="text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full"
                                                style={{ color: st.color, background: st.bg }}
                                            >
                                                {st.label}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-base font-black text-white leading-snug mb-1">
                                                {eduItem.degree || ''}
                                            </h3>
                                            <p className="text-sm font-mono" style={{ color: st.color }}>
                                                {eduItem.school || ''}
                                            </p>
                                        </div>
                                        <p className="text-xs text-gray-600 font-mono mt-auto">{eduItem.status || ''}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </section>

                    {/* ── PROJECTS ── */}
                    <section id="projects" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
                        <SectionHeader
                            number={t('game.sections.projectsNumber')}
                            title={t('game.sections.projectsTitle')}
                            subtitle={t('game.sections.projectsSubtitle')}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {PROJECTS_DATA.map((project, i) => {
                                const allProjects = t('game.projects', { returnObjects: true }) as any[];
                                const projDesc = allProjects?.[i]?.description || '';
                                return (
                                    <motion.a
                                        key={i}
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        whileHover={{ y: -6 }}
                                        className="group block bg-gray-900 border border-gray-800 hover:border-gray-600 rounded-2xl overflow-hidden transition-all"
                                    >
                                        {/* Screenshot */}
                                        <div className="h-44 relative overflow-hidden bg-gray-800">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            {/* Color overlay on hover */}
                                            <div
                                                className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                                                style={{ background: `linear-gradient(to top, ${project.color}, transparent)` }}
                                            />
                                            {/* Platform badges */}
                                            <div className="absolute bottom-2 left-2 flex gap-1">
                                                {project.platforms.map((p, j) => (
                                                    <span key={j} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/70 text-white/80 backdrop-blur-sm">
                                                        {p}
                                                    </span>
                                                ))}
                                            </div>
                                            {/* YouTube badge */}
                                            {project.isVideo && (
                                                <div className="absolute top-2 right-2 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-1">
                                                    ▶ VIDEO
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-sm font-black text-white group-hover:text-green-400 transition-colors leading-tight mb-0.5">
                                                {project.title}
                                            </h3>
                                            <p className="text-[10px] font-bold tracking-widest mb-2" style={{ color: project.color }}>
                                                {project.genre}
                                            </p>
                                            <p className="text-[10px] text-gray-600 mb-2 font-mono">{project.company}</p>
                                            <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{projDesc}</p>
                                            {(project as any).stats && (
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className="text-[10px] font-mono text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded">
                                                        ⬇ {(project as any).stats.installs}
                                                    </span>
                                                    <span className="text-[10px] font-mono text-yellow-400 bg-yellow-400/10 px-1.5 py-0.5 rounded">
                                                        {(project as any).stats.rating}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-gray-500 group-hover:text-green-400 transition-colors">
                                                <span>{t('game.viewProject')}</span>
                                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                                            </div>
                                        </div>
                                    </motion.a>
                                );
                            })}
                        </div>
                    </section>

                    {/* ── CONTACT ── */}
                    <section id="contact" className="py-32 px-6 md:px-12">
                        <div className="max-w-3xl mx-auto text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-6xl mb-6">📡</div>
                                <SectionHeader
                                    number={t('game.sections.contactNumber')}
                                    title={t('game.sections.contactTitle')}
                                    subtitle={t('game.sections.contactSubtitle')}
                                />

                                <p className="text-gray-400 text-lg mb-12">
                                    {t('game.contact.tagline')}
                                </p>

                                <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center mb-8">
                                    <a
                                        href="mailto:calaverax@gmail.com"
                                        className="px-8 py-4 bg-green-500 hover:bg-green-400 text-black font-black text-sm tracking-widest rounded-xl transition-all hover:scale-105 active:scale-95"
                                    >
                                        {t('game.contact.email')}
                                    </a>
                                    <a
                                        href="https://linkedin.com/in/lelouche/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-8 py-4 border border-gray-700 hover:border-green-500 text-gray-300 hover:text-white font-bold text-sm tracking-widest rounded-xl transition-all"
                                    >
                                        {t('game.contact.linkedin')}
                                    </a>
                                    <a
                                        href="https://github.com/nlelouche"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-8 py-4 border border-gray-700 hover:border-green-500 text-gray-300 hover:text-white font-bold text-sm tracking-widest rounded-xl transition-all"
                                    >
                                        {t('game.contact.github')}
                                    </a>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                                    <a
                                        href={i18n.language.startsWith('es') ? '/CV_Lelouche.pdf' : '/CV-Lelouche_en.pdf'}
                                        download
                                        className="px-8 py-4 border border-green-500/40 hover:border-green-500 text-green-400 hover:text-green-300 font-bold text-sm tracking-widest rounded-xl transition-all hover:scale-105 flex items-center gap-2 justify-center"
                                    >
                                        ⬇ {t('game.contact.downloadCV')}
                                    </a>
                                </div>

                                <div className="border-t border-gray-800 pt-8">
                                    <p className="text-gray-600 text-xs font-mono">
                                        {t('game.contact.footer')}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                </motion.div>
            )}
        </div>
    );
};

export default GameLayout;
