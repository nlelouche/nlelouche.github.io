import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

interface ExperienceItem {
    company: string;
    role: string;
    period: string;
    description: string;
    tech: string;
}

const Experience = () => {
    const { t } = useTranslation();
    const experience = t('experience', { returnObjects: true }) as ExperienceItem[];

    return (
        <section className="mb-20">
            <h2 className="text-3xl font-display font-bold mb-8 text-white flex items-center gap-3">
                <span className="text-primary/50">02.</span> {t('sections.experience')}
            </h2>
            <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-12">
                {experience.map((job, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="pl-8 relative"
                    >
                        <span className="absolute -left-[5px] top-8 w-2.5 h-2.5 rounded-full bg-surface border border-primary shadow-[0_0_10px_#00f0ff]" />

                        <TiltCard className="p-6 bg-surface/30 border border-white/5 rounded-lg hover:bg-surface/50 hover:border-primary/20 transition-all">
                            <div className="mb-2">
                                <span className="text-sm font-mono text-primary/80 mb-1 block">{job.period}</span>
                                <h3 className="text-xl font-bold text-white">{job.role} <span className="text-muted font-normal">@ {job.company}</span></h3>
                            </div>

                            <p className="text-muted mb-4 leading-relaxed max-w-2xl">
                                {job.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {job.tech.split(',').map((tech, i) => (
                                    <span key={i} className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-primary/80 border border-white/5 hover:border-primary/30 transition-colors">
                                        {tech.trim()}
                                    </span>
                                ))}
                            </div>
                        </TiltCard>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
