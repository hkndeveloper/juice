import React from 'react';
import { motion } from 'framer-motion';
import { cvData } from '../data/cvData';

const Experience = () => {
    return (
        <section id="experience" className="section-padding relative">
            <div className="container mx-auto max-w-5xl">
                <motion.h2
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-20 text-glow-blue"
                >
                    Deneyim
                </motion.h2>

                <div className="space-y-32">
                    {cvData.experience.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative pl-12 border-l border-tech-blue/20"
                        >
                            {/* Tech Indicator */}
                            <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-tech-blue shadow-[0_0_10px_rgba(0,210,255,0.5)]" />

                            <span className="text-tech-light/40 font-mono text-[10px] block mb-4 uppercase tracking-[0.4em] font-black">
                                {item.period}
                            </span>

                            <h3 className="text-3xl md:text-5xl font-black text-white mb-2 uppercase">
                                {item.title}
                            </h3>

                            <p className="text-tech-blue/80 font-black text-lg mb-8 uppercase tracking-widest">
                                {item.company}
                            </p>

                            <div className="glass-nirvana p-8 rounded-3xl border-white/5 text-slate-400 text-lg leading-relaxed font-medium italic">
                                {item.description}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
