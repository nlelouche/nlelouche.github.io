
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroProps {
    data: any;
}

export const Hero: React.FC<HeroProps> = ({ data }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

    return (
        <section ref={ref} className="h-screen flex items-center relative overflow-hidden px-6 max-w-7xl mx-auto">
            {/* Background Decor */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] mix-blend-screen"></div>
            </div>

            <div className="flex flex-col items-center justify-center w-full z-10 text-center">

                <motion.div style={{ y }} className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="h-[1px] w-12 bg-primary"></div>
                            <span className="font-mono text-primary tracking-widest text-sm uppercase">System Online</span>
                            <div className="h-[1px] w-12 bg-primary"></div>
                        </div>

                        <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-2 leading-none text-slate-900 dark:text-white">
                            {data.name.split(' ').slice(0, 2).join(' ')}
                        </h1>
                        <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 leading-none text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-900 dark:from-slate-200 dark:to-slate-600">
                            {data.name.split(' ').slice(2).join(' ')}
                        </h1>

                        <h2 className="text-xl md:text-3xl text-primary font-light mb-6 font-mono">
                            {`<${data.label} />`}
                        </h2>

                        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
                            {data.pitch}
                        </p>

                        <div className="flex flex-wrap justify-center gap-6">
                            <a href="#projects" className="group relative px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold overflow-hidden skew-x-[-10deg] hover:scale-105 transition-transform shadow-lg hover:shadow-primary/50">
                                <span className="relative z-10 inline-block skew-x-[10deg]">Explore Work</span>
                                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </a>

                            <a href="#contact" className="px-10 py-4 border border-slate-300 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors skew-x-[-10deg]">
                                <span className="inline-block skew-x-[10deg]">Contact_Me</span>
                            </a>
                        </div>
                    </motion.div>
                </motion.div>

            </div>

            <motion.div
                className="absolute bottom-6 left-6 flex items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <span className="font-mono text-xs text-slate-400">SCROLL_DOWN</span>
                <div className="w-12 h-[1px] bg-slate-400"></div>
            </motion.div>
        </section>
    );
};
