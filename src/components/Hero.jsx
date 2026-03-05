import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cvData } from "../data/cvData";

/* ──────────────────────────────────────────────────────────
   SubtitleReveal — Aceternity-style, soldan sağa açılış
   Subtitle metnine uygulanır. Base: soluk — Reveal: renkli + glow
────────────────────────────────────────────────────────── */
const SubtitleReveal = ({ text }) => {
    const cardRef = useRef(null);
    const [pct, setPct] = useState(0);
    const [isOver, setIsOver] = useState(false);
    const leftRef = useRef(0);
    const widthRef = useRef(1);

    useEffect(() => {
        const update = () => {
            if (!cardRef.current) return;
            const r = cardRef.current.getBoundingClientRect();
            leftRef.current = r.left;
            widthRef.current = r.width || 1;
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const onMove = (e) => {
        const x = e.clientX - leftRef.current;
        setPct(Math.min(100, Math.max(0, (x / widthRef.current) * 100)));
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={onMove}
            onMouseEnter={() => setIsOver(true)}
            onMouseLeave={() => { setIsOver(false); setPct(0); }}
            className="relative select-none cursor-crosshair inline-block"
        >
            {/* Base — soluk, her zaman görünür */}
            <p className="text-[1.1vw] md:text-[0.95rem] text-white/25 font-bold tracking-[0.55em] uppercase pl-[0.55em]">
                {text}
            </p>

            {/* Reveal — soldan sağa, clipPath */}
            <motion.p
                className="absolute inset-0 text-[1.1vw] md:text-[0.95rem] font-bold tracking-[0.55em] uppercase pl-[0.55em]"
                style={{
                    color: '#fff',
                    textShadow: '0 0 16px rgba(68,178,223,0.8)',
                }}
                animate={{
                    clipPath: isOver
                        ? `inset(0 ${100 - pct}% 0 0)`
                        : `inset(0 100% 0 0)`,
                }}
                transition={{ duration: 0, ease: "linear" }}
            >
                {text}
            </motion.p>
        </div>
    );
};

/* ── Letter-by-letter animation ── */
const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};
const letterVariants = {
    hidden: { opacity: 0, x: -32, skewX: 8 },
    visible: { opacity: 1, x: 0, skewX: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const AnimatedWord = ({ text, className, style }) => (
    <motion.span
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`inline-flex ${className}`}
        style={style}
    >
        {text.split("").map((char, i) => (
            <motion.span key={i} variants={letterVariants} style={{ display: "inline-block" }}>
                {char === " " ? "\u00A0" : char}
            </motion.span>
        ))}
    </motion.span>
);

const NAME_FONT = { fontFamily: "'Orbitron', sans-serif" };

const Hero = () => {
    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

    return (
        <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            <div className="relative z-10 text-center px-6 pointer-events-none w-full h-full flex flex-col justify-between py-24">
                <motion.div
                    style={{ y: y1, opacity, scale }}
                    className="flex flex-col items-center mt-12"
                >
                    {/* ── HAKAN KEKEÇ — harf harf animasyon ── */}
                    <div className="relative mb-[16rem]">
                        <h1
                            className="flex items-baseline justify-center gap-[0.35em] leading-none font-heading"
                            style={NAME_FONT}
                        >
                            <AnimatedWord
                                text={cvData.hero.name}
                                className="text-[8vw] md:text-[4.2rem]"
                                style={{ color: '#fff', textShadow: '0 0 22px rgba(68,178,223,0.7)' }}
                            />
                            <AnimatedWord
                                text={cvData.hero.surname}
                                className="text-[8vw] md:text-[4.2rem]"
                                style={{ color: '#fff', textShadow: '0 0 22px rgba(231,20,65,0.7)' }}
                            />
                        </h1>
                    </div>

                    {/* ── BİLGİSAYAR MÜHENDİSİ — TextReveal efekti ── */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="relative mb-12 pointer-events-auto"
                    >
                        <SubtitleReveal text={cvData.hero.title} />
                    </motion.div>
                </motion.div>

                {/* Hero Tagline — Bottom */}
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
                        animate={{ y: [0, 60, 0], opacity: [0, 1, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-[-1px] w-[3px] h-3 bg-tech-blue rounded-full shadow-[0_0_10px_#00d2ff]"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
