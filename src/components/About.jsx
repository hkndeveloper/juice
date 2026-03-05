import React from 'react';
import { motion } from 'framer-motion';
import { cvData } from '../data/cvData';

const About = () => {
    return (
        <section id="about" className="section-padding relative">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="glass-nirvana p-12 md:p-20 rounded-[40px] nebula-border"
                >
                    <h2 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tighter mb-8 text-glow-pink">
                        {cvData.about.title}
                    </h2>

                    <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-medium italic">
                        {cvData.about.content}
                    </p>

                    <div className="mt-12 flex items-center gap-6">
                        <div className="h-px flex-1 bg-gradient-to-r from-nebula-cyan/30 to-transparent" />
                        <span className="text-nebula-cyan font-mono text-[10px] uppercase tracking-[0.4em] font-black">Nirvana Protocol Enabled</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
