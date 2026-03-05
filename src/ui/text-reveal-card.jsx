/**
 * TextRevealCard — Aceternity UI-style mouse-follow reveal effect
 * Text: dimmed version shown by default
 * RevealText: colored version revealed under the mouse spotlight
 */
import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

/* ─── Main Card ─────────────────────────────────────────── */
export const TextRevealCard = ({
    text,
    revealText,
    children,
    className = "",
}) => {
    const cardRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = useCallback((e) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }, []);

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative overflow-hidden select-none cursor-crosshair ${className}`}
        >
            {/* Optional title / description children */}
            {children}

            {/* Text layers */}
            <div className="relative">
                {/* Base layer — dimmed "ghost" text */}
                <span
                    className="absolute inset-0 text-white/20 pointer-events-none"
                    aria-hidden="true"
                >
                    {text}
                </span>

                {/* Reveal layer — clipped by radial gradient spotlight */}
                <motion.span
                    className="relative pointer-events-none"
                    style={{
                        WebkitMaskImage: isHovered
                            ? `radial-gradient(circle 140px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`
                            : "none",
                        maskImage: isHovered
                            ? `radial-gradient(circle 140px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`
                            : "none",
                    }}
                >
                    {revealText}
                </motion.span>
            </div>
        </div>
    );
};

/* ─── Sub-components (optional, for use inside the card) ─── */
export const TextRevealCardTitle = ({ children, className = "" }) => (
    <h2 className={`text-white text-lg font-bold mb-2 ${className}`}>
        {children}
    </h2>
);

export const TextRevealCardDescription = ({ children, className = "" }) => (
    <p className={`text-white/50 text-sm ${className}`}>{children}</p>
);
