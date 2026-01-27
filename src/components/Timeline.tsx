
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

interface TimelineProps {
    data: any;
}

const TimelineItem = ({ item, index }: { item: any, index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-8 md:pl-0 md:grid md:grid-cols-5 gap-8 mb-12 group"
        >
            {/* Timeline Line (for mobile absolute, desktop handled by parent) */}

            {/* Date / Metadata (Left on Desktop) */}
            <div className="md:col-span-1 md:text-right hidden md:block pt-2">
                <span className="font-mono text-primary text-sm font-bold block">{item.endDate}</span>
                <span className="font-mono text-slate-500 dark:text-slate-500 text-xs block">{item.startDate}</span>
            </div>

            {/* Node / Checkpoint */}
            <div className="absolute left-0 md:left-auto md:relative md:col-span-1 md:flex md:justify-center">
                <div className="w-4 h-4 rounded-full bg-slate-900 dark:bg-slate-900 border-2 border-primary z-10 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(20,184,166,0.5)]"></div>
            </div>

            {/* Content Card (Right on Desktop) */}
            <div className="md:col-span-3">
                <div className="relative bg-white dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 p-6 rounded-r-xl rounded-bl-xl border-l-[3px] border-l-primary shadow-lg hover:shadow-primary/10 transition-shadow">

                    <div className="md:hidden font-mono text-primary text-xs mb-2">
                        {item.startDate} - {item.endDate}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{item.position}</h3>
                    <h4 className="text-md text-slate-600 dark:text-slate-400 font-mono mb-4 flex items-center gap-2">
                        <Briefcase size={14} /> @ {item.company}
                    </h4>

                    <p className="text-slate-700 dark:text-slate-300 text-sm mb-4 leading-relaxed">
                        {item.summary}
                    </p>

                    {item.highlights && item.highlights.length > 0 && (
                        <ul className="space-y-1">
                            {item.highlights.map((h: string, i: number) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                                    <ChevronRight size={12} className="mt-0.5 text-primary shrink-0" />
                                    {h}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

export const Timeline: React.FC<TimelineProps> = ({ data }) => {
    return (
        <section id="experience" className="py-24 px-6 max-w-4xl mx-auto relative">
            <div className="absolute inset-0 bg-grain pointer-events-none z-0"></div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-20 text-center relative z-10"
            >
                <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-500">
                    Mission Log
                </h2>
                <p className="font-mono text-primary text-sm">EXPERIENCE_TRACKER_V2.0</p>
            </motion.div>

            <div className="relative z-10">
                {/* Vertical Line */}
                <div className="absolute left-2 md:left-[30%] top-4 bottom-4 w-[2px] bg-slate-200 dark:bg-white/10"></div>

                {data.work.map((item: any, index: number) => (
                    <TimelineItem key={index} item={item} index={index} />
                ))}
            </div>
        </section>
    );
};
