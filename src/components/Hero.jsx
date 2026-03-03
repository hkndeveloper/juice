import React, { Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cvData } from "../data/cvData";

const Hero = () => {
    const { scrollYProgress } = useScroll();

    // Smooth scroll animations for text
    const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

    return (
        <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Main Content Overlay */}
            <div className="relative z-10 text-center px-6 pointer-events-none w-full h-full flex flex-col justify-between py-24">
                <motion.div
                    style={{ y: y1, opacity, scale }}
                    className="flex flex-col items-center mt-12"
                >
                    {/* Epic Typography */}
                    <div className="relative mb-[16rem]">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-[10vw] md:text-[5.5rem] font-black leading-[0.8] tracking-tighter text-white uppercase"
                        >
                            {cvData.hero.name}
                        </motion.h1>
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-[10vw] md:text-[5.5rem] font-black leading-[0.8] tracking-tighter text-tech-blue uppercase text-glow-blue"
                        >
                            {cvData.hero.surname}
                        </motion.h1>
                    </div>

                    {/* Subtitle with Scanline Effect */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="relative mb-12"
                    >
                        <p className="text-[2.2vw] md:text-[1.8rem] text-tech-light font-bold tracking-[1em] uppercase max-w-4xl mx-auto pl-[1em]">
                            {cvData.hero.title}
                        </p>
                    </motion.div>
                </motion.div>

                {/* Hero Tagline - Moved to Bottom */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="flex items-center justify-center gap-4 mb-20"
                >
                    <div className="w-8 h-[1px] bg-tech-blue/40" />
                    <span className="text-[10px] uppercase tracking-[0.6em] text-white/40 font-black italic">
                        {cvData.hero.subtitle}
                    </span>
                    <div className="w-8 h-[1px] bg-tech-blue/40" />
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block"
            >
                <div className="relative w-[1px] h-24 bg-gradient-to-b from-transparent via-tech-blue/30 to-transparent">
                    <motion.div
                        animate={{
                            y: [0, 60, 0],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-0 left-[-1px] w-[3px] h-3 bg-tech-blue rounded-full shadow-[0_0_10px_#00d2ff]"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
