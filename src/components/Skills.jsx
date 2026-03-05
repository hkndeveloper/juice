import React from 'react';
import { motion } from 'framer-motion';
import { cvData } from '../data/cvData';

const Skills = () => {
    return (
        <section id="skills" className="section-padding relative">
            <div className="container mx-auto max-w-5xl">
                <motion.h2
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tighter mb-20 text-glow-blue"
                >
                    Yetenekler
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {cvData.skills.map((group, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="glass-nirvana p-10 rounded-[40px] border-white/5 group hover:border-tech-blue/30 transition-all duration-500"
                        >
                            <h3 className="text-white font-heading font-black mb-8 text-2xl tracking-tighter uppercase">
                                {group.category}
                            </h3>

                            <div className="flex flex-wrap gap-3">
                                {group.items.map((skill, sIdx) => (
                                    <span
                                        key={sIdx}
                                        className="px-6 py-3 bg-tech-blue/5 border border-tech-blue/10 text-tech-light text-[10px] font-black rounded-xl uppercase tracking-[0.2em]"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
