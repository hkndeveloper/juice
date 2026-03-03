import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Starfield = () => {
    // Reduced count and pre-calculated for performance
    const stars = useMemo(() => {
        return Array.from({ length: 60 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 1.5 + 0.5,
            duration: Math.random() * 3 + 2,
        }));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 bg-space-deep overflow-hidden">
            {/* Subtle Static Gradient for depth instead of complex mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(58,80,107,0.1),transparent_70%)]" />

            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    initial={{ opacity: 0.1 }}
                    animate={{ opacity: [0.1, 0.6, 0.1] }}
                    transition={{
                        duration: star.duration,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute bg-white rounded-full"
                    style={{
                        top: star.top,
                        left: star.left,
                        width: star.size,
                        height: star.size,
                        boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,0.5)`,
                    }}
                />
            ))}
        </div>
    );
};

export default Starfield;
