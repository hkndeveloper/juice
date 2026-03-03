import React from 'react';
import { motion } from 'framer-motion';
import { cvData } from '../data/cvData';
import { GraduationCap } from 'lucide-react';

const Education = () => {
    return (
        <section id="education" className="section-padding relative">
            <div className="container mx-auto max-w-4xl">
                <motion.h2
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-20 text-glow-blue"
                >
                    Eğitim
                </motion.h2>

                <div className="space-y-8">
                    {cvData.education.map((edu, index) => (
                        <motion.div
                            key={edu.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-nirvana p-10 rounded-[40px] border-white/5 relative group hover:border-tech-blue/30 transition-all flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left"
                        >
                            <div className="w-16 h-16 bg-tech-blue/10 rounded-2xl flex items-center justify-center border border-tech-blue/20 text-tech-blue shrink-0">
                                <GraduationCap size={32} />
                            </div>

                            <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
                                    <h3 className="text-2xl font-black text-white uppercase">
                                        {edu.school}
                                    </h3>
                                    <span className="text-tech-blue font-mono text-xs font-black tracking-widest bg-tech-blue/10 px-4 py-1 rounded-full border border-tech-blue/20">
                                        GPA: {edu.gpa}
                                    </span>
                                </div>
                                <p className="text-xl text-slate-300 font-bold mb-4">{edu.degree}</p>
                                <div className="flex justify-center md:justify-start gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
                                    <span>{edu.period}</span>
                                    <span>{edu.city}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
