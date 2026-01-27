
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Globe, Server, Layers, Code, Brain, Rocket, GraduationCap } from 'lucide-react';
import clsx from 'clsx';

interface SkillsProps {
    data: any;
}

const ProgressRing = ({ radius, stroke, progress, icon: Icon, color }: { radius: number; stroke: number; progress: number, icon: any, color: string }) => {
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center">
            <svg
                height={radius * 2}
                width={radius * 2}
                className="rotate-[-90deg]"
            >
                <circle
                    stroke="currentColor"
                    strokeWidth={stroke}
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    className="text-slate-200 dark:text-white/10"
                />
                <motion.circle
                    initial={{ strokeDashoffset: circumference }}
                    whileInView={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    stroke={color}
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset }}
                    strokeLinecap="round"
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
            </svg>
            <div className="absolute text-slate-500 dark:text-slate-300">
                <Icon size={24} />
            </div>
        </div>
    );
};

const SkillCard = ({ title, items, icon: Icon, delay, className, subTitle }: { title: string, items: string[], icon: any, delay: number, className?: string, subTitle?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className={clsx(
            "relative bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-2xl shadow-xl hover:border-primary/30 transition-all duration-300 group overflow-hidden",
            className
        )}
    >
        <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity text-slate-900 dark:text-white">
            <Icon size={64} />
        </div>

        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
                <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 font-sans tracking-tight">{title}</h3>
                {subTitle && <span className="text-xs text-primary font-mono bg-primary/10 px-2 py-0.5 rounded">{subTitle}</span>}
            </div>

            <div className="flex flex-wrap gap-2">
                {items.map((item, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 text-sm rounded text-slate-700 dark:text-slate-300 font-mono hover:text-primary dark:hover:text-white hover:border-primary/50 transition-colors cursor-default">
                        {item}
                    </span>
                ))}
            </div>
        </div>
    </motion.div>
);

export const Skills: React.FC<SkillsProps> = ({ data }) => {
    const { skills } = data;

    return (
        <section id="skills" className="py-24 px-6 max-w-7xl mx-auto relative">
            <div className="absolute inset-0 bg-grain pointer-events-none z-0"></div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-16 relative z-10"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-500">
                    Technical Arsenal
                </h2>
                <div className="h-[1px] w-full bg-gradient-to-r from-primary/50 to-transparent max-w-xs" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 relative z-10">

                {/* Featured Engines - Interactive Rings */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="md:col-span-6 lg:col-span-8 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-around gap-8 shadow-xl"
                >
                    <div className="text-center">
                        <ProgressRing radius={60} stroke={8} progress={95} icon={Rocket} color="#14b8a6" />
                        <h4 className="mt-4 font-bold text-xl text-slate-900 dark:text-white">Unity 3D</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-mono">Expert / AAA</p>
                    </div>
                    <div className="text-center opacity-80">
                        <ProgressRing radius={50} stroke={6} progress={70} icon={Cpu} color="#8b5cf6" />
                        <h4 className="mt-4 font-bold text-lg text-slate-900 dark:text-white">Unreal Engine</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-mono">Research / R&D</p>
                    </div>
                    <div className="text-center opacity-90">
                        <ProgressRing radius={50} stroke={6} progress={90} icon={Code} color="#3b82f6" />
                        <h4 className="mt-4 font-bold text-lg text-slate-900 dark:text-white">C# Architecture</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-mono">Senior Lead</p>
                    </div>
                </motion.div>

                {/* AI Metrics */}
                <div className="md:col-span-6 lg:col-span-4">
                    <SkillCard
                        title="AI & Automation"
                        subTitle="INTEGRATED"
                        items={skills.ai}
                        icon={Brain}
                        delay={0.2}
                        className="h-full bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-slate-900/50"
                    />
                </div>

                {/* Languages & Platforms */}
                <SkillCard
                    title="Languages"
                    items={skills.languages}
                    icon={Code}
                    delay={0.3}
                    className="md:col-span-3 lg:col-span-4"
                />
                <SkillCard
                    title="Platforms"
                    items={skills.platforms}
                    icon={Globe}
                    delay={0.35}
                    className="md:col-span-3 lg:col-span-4"
                />
                <SkillCard
                    title="DevOps Stack"
                    items={skills.tools}
                    icon={Server}
                    delay={0.4}
                    className="md:col-span-6 lg:col-span-4"
                />

                {/* Full Width Leadership */}
                <SkillCard
                    title="Leadership & Education"
                    items={[...skills.methodologies, "MBA IT Management", "Game Design Degree"]}
                    icon={GraduationCap}
                    delay={0.5}
                    className="md:col-span-6 lg:col-span-12 bg-gradient-to-r from-primary/5 to-transparent"
                />

            </div>
        </section>
    );
};
