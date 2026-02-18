import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Skills = () => {
    const { t } = useTranslation();
    const skills = t('skills.list', { returnObjects: true }) as string[];

    return (
        <section className="mb-20">
            <h2 className="text-3xl font-display font-bold mb-8 text-white flex items-center gap-3">
                <span className="text-primary/50">03.</span> {t('sections.skills')}
            </h2>
            <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.05, borderColor: '#00f0ff', color: '#fff' }}
                        className="px-4 py-2 bg-surface/50 backdrop-blur-sm border border-white/10 rounded-md text-muted font-mono text-sm cursor-default hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all"
                    >
                        {skill}
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
export default Skills;
