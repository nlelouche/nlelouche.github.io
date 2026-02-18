import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import TiltCard from './TiltCard';

interface ProjectItem {
    title: string;
    company: string;
    description: string;
    link: string;
    linkText: string;
}

const Projects = () => {
    const { t } = useTranslation();
    const projects = t('projects', { returnObjects: true }) as ProjectItem[];

    return (
        <section className="mb-20">
            <h2 className="text-3xl font-display font-bold mb-8 text-white flex items-center gap-3">
                <span className="text-primary/50">05.</span> {t('sections.projects')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="h-full"
                    >
                        <TiltCard className="h-full">
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block h-full p-6 bg-surface border border-white/10 rounded-lg hover:border-primary/50 transition-colors relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="relative z-10 flex flex-col h-full">
                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors flex items-center gap-2">
                                        {project.title}
                                        <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </h3>
                                    <p className="text-xs font-mono text-primary/70 mb-4">{project.company}</p>
                                    <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-4 flex-grow">
                                        {project.description}
                                    </p>
                                    <span className="text-xs font-mono text-primary group-hover:underline mt-auto inline-block">
                                        {project.linkText} &rarr;
                                    </span>
                                </div>
                            </a>
                        </TiltCard>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
export default Projects;
