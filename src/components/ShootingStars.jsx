import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ShootingStars = () => {
    const [stars, setStars] = useState([]);

    useEffect(() => {
        // Higher frequency for more dynamic background
        const interval = setInterval(() => {
            const newStar = {
                id: Math.random(),
                top: `${Math.random() * 60}%`,
                left: `${Math.random() * 100}%`,
                size: Math.random() * 3 + 1,
                duration: Math.random() * 0.5 + 0.8, // Faster, varied speeds
            };
            setStars((prev) => [...prev, newStar]);
            setTimeout(() => {
                setStars((prev) => prev.filter((s) => s.id !== newStar.id));
            }, 2000);
        }, 1500); // 1.5 seconds interval for more action

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden">
            <AnimatePresence>
                {stars.map((star) => (
                    <motion.div
                        key={star.id}
                        initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                        animate={{
                            x: -1200,
                            y: 1200,
                            opacity: [0, 1, 0.5, 0],
                            scale: [0, 1.5, 0.5, 0]
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: star.duration, ease: "easeOut" }}
                        className="absolute bg-gradient-to-l from-white via-cyan-glow to-transparent"
                        style={{
                            top: star.top,
                            left: star.left,
                            width: '250px', // Longer trails
                            height: '2px',
                            boxShadow: '0 0 30px #6FFFE9, 0 0 10px #fff',
                            transform: 'rotate(-45deg)'
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default ShootingStars;
