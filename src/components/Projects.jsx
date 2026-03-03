import React from 'react';
import { motion } from 'framer-motion';
import { cvData } from '../data/cvData';
import { ExternalLink, Code2 } from 'lucide-react';

const Projects = () => {
    return (
        <section id="projeler" className="section-padding relative">
            <div className="container mx-auto max-w-6xl">
                <motion.h2
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-20 text-glow-blue"
                >
                    Projeler
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {cvData.projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-nirvana p-8 rounded-[40px] border-white/5 relative group overflow-hidden tech-border"
                        >
                            <div className="relative z-10">
                                <span className="text-tech-light/40 font-mono text-[10px] block mb-4 uppercase tracking-[0.4em] font-black">
                                    Project {project.id}
                                </span>

                                <h3 className="text-3xl font-black text-white mb-2 uppercase group-hover:text-tech-blue transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-tech-light font-black text-[10px] mb-6 uppercase tracking-widest">
                                    {project.tech}
                                </p>

                                <p className="text-slate-400 text-lg leading-relaxed font-medium italic mb-8">
                                    {project.description}
                                </p>

                                <motion.a
                                    href={project.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    whileHover={{ x: 5, color: "#00d2ff" }}
                                    className="inline-flex items-center gap-2 text-white/60 font-black text-[10px] uppercase tracking-[0.2em] transition-all"
                                >
                                    <Code2 size={16} /> GitHub'da İncele <ExternalLink size={14} />
                                </motion.a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
