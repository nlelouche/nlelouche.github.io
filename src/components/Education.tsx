import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface EducationItem {
    school: string;
    degree: string;
    status: string;
}

const Education = () => {
    const { t } = useTranslation();
    const education = t('education', { returnObjects: true }) as EducationItem[];

    return (
        <section className="mb-20">
            <h2 className="text-3xl font-display font-bold mb-8 text-white flex items-center gap-3">
                <span className="text-primary/50">04.</span> {t('sections.education')}
            </h2>
            <div className="grid grid-cols-1 gap-6">
                {education.map((edu, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 border-l-2 border-primary/30 bg-surface/30 backdrop-blur-sm hover:bg-surface/50 transition-colors"
                    >
                        <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                        <p className="text-primary font-mono text-sm mt-1">{edu.school}</p>
                        <p className="text-muted text-sm mt-2">{edu.status}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
export default Education;
