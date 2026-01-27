
import React from 'react';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';

interface FooterProps {
    data: any;
}

export const Footer: React.FC<FooterProps> = ({ data }) => {
    return (
        <footer id="contact" className="bg-slate-900 border-t border-slate-800 text-slate-300 py-16 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold text-white mb-2">Ready to Collaborate?</h2>
                    <p className="text-slate-400 max-w-md">
                        Looking for senior engineering leadership or complex system architecture? Let's connect.
                    </p>
                </div>

                <div className="flex gap-6">
                    <a href={data.profiles.find((p: any) => p.network === 'LinkedIn')?.url} target="_blank" className="p-3 bg-slate-800 rounded-full hover:bg-primary hover:text-slate-900 transition-all transform hover:-translate-y-1">
                        <Linkedin size={24} />
                    </a>
                    <a href={`mailto:${data.email}`} className="p-3 bg-slate-800 rounded-full hover:bg-primary hover:text-slate-900 transition-all transform hover:-translate-y-1">
                        <Mail size={24} />
                    </a>
                    {/* GitHub link is assumed or generic as it wasn't in CV, but good to have */}
                    <a href="https://github.com" target="_blank" className="p-3 bg-slate-800 rounded-full hover:bg-primary hover:text-slate-900 transition-all transform hover:-translate-y-1">
                        <Github size={24} />
                    </a>
                    <a href="/CV_Lelouche.pdf" download className="p-3 bg-slate-800 rounded-full hover:bg-secondary hover:text-white transition-all transform hover:-translate-y-1" aria-label="Download CV">
                        <FileText size={24} />
                    </a>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-600 font-mono">
                <p>Built with Astro.build & Tailwind CSS • © {new Date().getFullYear()} {data.name}</p>
            </div>
        </footer>
    );
};
