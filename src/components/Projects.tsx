
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Play, Lock, Image as ImageIcon } from 'lucide-react';

interface ProjectsProps {
    data: any;
}

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
    // Generate a deterministic gradient based on index for placeholder
    const gradients = [
        "from-red-900 to-slate-900",
        "from-blue-900 to-slate-900",
        "from-green-900 to-slate-900",
        "from-purple-900 to-slate-900"
    ];
    const bgGradient = gradients[index % gradients.length];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl hover:shadow-[0_0_30px_rgba(20,184,166,0.3)] transition-all duration-500"
        >
            {/* Background Image / Placeholder */}
            {project.image ? (
                <div className="absolute inset-0">
                    <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                </div>
            ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-60 group-hover:scale-110 transition-transform duration-700 ease-out`}></div>
            )}

            {/* Overlay Gradient (always visible but darker at bottom) */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

            {/* Content Container */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">

                {/* Title & Badge (Always visible) */}
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-3xl font-bold text-white font-sans tracking-tight mb-2 flex items-center gap-3">
                        {project.name}
                        {project.url && <ExternalLink size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />}
                    </h3>
                </div>

                {/* Hidden Details (Slide up on hover) */}
                <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 overflow-hidden transition-all duration-300 ease-in-out">
                    <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech: string, i: number) => (
                            <span key={i} className="px-2 py-0.5 text-xs font-mono bg-white/10 text-primary border border-primary/20 rounded">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Click Area */}
            {project.url && (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20 focus:outline-none focus:ring-2 focus:ring-primary">
                    <span className="sr-only">View {project.name}</span>
                </a>
            )}
        </motion.div>
    );
}

export const Projects: React.FC<ProjectsProps> = ({ data }) => {
    return (
        <section id="projects" className="py-24 px-6 max-w-7xl mx-auto relative">
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent dark:from-slate-900 dark:to-transparent pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 flex items-end justify-between relative z-10"
            >
                <div>
                    <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-500 mb-2">
                        Featured Shipments
                    </h2>
                    <p className="font-mono text-primary text-sm">SELECT_PROJECT_TO_INSPECT</p>
                </div>

                <div className="hidden md:block">
                    <div className="flex gap-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
                        ))}
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                {data.projects.map((project: any, index: number) => (
                    <ProjectCard key={index} project={project} index={index} />
                ))}

                {/* Placeholder if needed */}
                {data.projects.length % 2 !== 0 && (
                    <div className="aspect-video bg-slate-100 dark:bg-slate-900/50 rounded-xl border border-slate-300 dark:border-white/5 border-dashed flex items-center justify-center flex-col gap-4 group cursor-help transition-colors">
                        <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary/20 transition-colors shadow-sm">
                            <ImageIcon size={24} className="text-slate-400 dark:text-slate-500 group-hover:text-primary transition-colors" />
                        </div>
                        <span className="font-mono text-slate-400 dark:text-slate-500 text-xs shadow-sm">MORE_PROJECTS_LOADING...</span>
                    </div>
                )}
            </div>
        </section>
    );
};
