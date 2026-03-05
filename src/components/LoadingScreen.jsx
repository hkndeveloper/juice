import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@react-three/drei';

const LoadingScreen = () => {
    const { progress, active } = useProgress();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (progress === 100 && !active) {
            const timeout = setTimeout(() => setIsLoading(false), 500);
            return () => clearTimeout(timeout);
        }
    }, [progress, active]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, ease: "easeInOut" }
                    }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-space-void"
                >
                    <div className="relative flex flex-col items-center gap-8 max-w-xs w-full px-6">
                        {/* Static Logo/Title Area */}
                        <div className="text-center">
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-2xl font-heading font-black text-white tracking-[0.4em] uppercase mb-2"
                            >
                                HAKAN <span className="text-neon-green">KEKEÇ</span>
                            </motion.h2>
                            <p className="text-[10px] text-neon-green/40 uppercase tracking-[0.6em] font-bold">
                                Initializing System
                            </p>
                        </div>

                        {/* Progress Container */}
                        <div className="w-full space-y-4">
                            <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    className="absolute top-0 left-0 h-full bg-neon-green shadow-[0_0_15px_rgba(34,197,94,0.6)]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.1 }}
                                />
                            </div>

                            <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-black">
                                <span className="text-white/20">Loading Assets</span>
                                <span className="text-neon-green">{Math.round(progress)}%</span>
                            </div>
                        </div>

                        {/* Ambient Glow */}
                        <div className="absolute -z-10 w-64 h-64 bg-neon-green/5 blur-[100px] rounded-full" />
                    </div>

                    {/* Footer decoration */}
                    <div className="absolute bottom-12 left-0 w-full flex flex-col items-center gap-4">
                        <div className="w-px h-12 bg-gradient-to-t from-neon-green/20 to-transparent" />
                        <span className="text-[8px] uppercase tracking-[0.8em] text-white/10 font-black">
                            3D Nirvana Engine v2.0
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
