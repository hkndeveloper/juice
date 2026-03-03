import React from 'react';
import { motion } from 'framer-motion';

const Planets = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Optimized Gas Giant - Reduced blur and shadows */}
            <motion.div
                initial={{ x: '105%', y: '10%' }}
                animate={{
                    x: '95%',
                    y: '12%',
                }}
                transition={{ duration: 60, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
                className="absolute w-[300px] h-[300px] rounded-full"
                style={{
                    background: 'radial-gradient(circle at 30% 30%, #3A506B, #1C2541 70%)',
                    boxShadow: '0 0 30px rgba(58, 80, 107, 0.15)'
                }}
            />

            {/* Optimized Smaller Planet */}
            <motion.div
                initial={{ x: '-10%', y: '70%' }}
                animate={{
                    x: '-5%',
                    y: '68%',
                }}
                transition={{ duration: 50, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
                className="absolute w-[100px] h-[100px] rounded-full"
                style={{
                    background: 'radial-gradient(circle at 30% 30%, #FF006E, #8338EC 80%)',
                    boxShadow: '0 0 20px rgba(255, 0, 110, 0.1)'
                }}
            />
        </div>
    );
};

export default Planets;
