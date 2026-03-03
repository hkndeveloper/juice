import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music, List, X } from 'lucide-react';
import { cvData } from '../data/cvData';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPlayerOpen, setIsPlayerOpen] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);
    const [showPlaylist, setShowPlaylist] = useState(false);
    const [progress, setProgress] = useState(0);

    const audioRef = useRef(null);
    const constraintsRef = useRef(null);
    const tracks = cvData.music || [];
    const currentTrack = tracks[currentTrackIndex];

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(err => console.log("Autoplay blocked or file missing:", err));
        }
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        const nextIndex = (currentTrackIndex + 1) % tracks.length;
        setCurrentTrackIndex(nextIndex);
        setIsPlaying(true);
    };

    const handlePrev = () => {
        const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        setCurrentTrackIndex(prevIndex);
        setIsPlaying(true);
    };

    const onTimeUpdate = () => {
        const current = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        if (duration) {
            setProgress((current / duration) * 100);
        }
    };

    useEffect(() => {
        if (isPlaying && audioRef.current) {
            audioRef.current.play().catch(() => setIsPlaying(false));
        }
    }, [currentTrackIndex]);

    if (tracks.length === 0) return null;

    return (
        <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-[100]">
            {/* Audio Element */}
            <audio
                ref={audioRef}
                src={currentTrack.url}
                onTimeUpdate={onTimeUpdate}
                onEnded={handleNext}
                autoPlay={isPlaying}
            />

            {/* Draggable Trigger Container */}
            <motion.div
                drag
                dragConstraints={constraintsRef}
                dragElastic={0.1}
                dragMomentum={false}
                initial={{ x: 0, y: 0 }}
                className="absolute pointer-events-auto z-[101]"
                style={{ right: '40px', bottom: '40px' }}
            >
                <div className="relative">
                    {/* The Trigger Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsPlayerOpen(!isPlayerOpen)}
                        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 border-2 ${isPlayerOpen
                            ? 'bg-space-void border-white/10 rotate-90'
                            : 'bg-tech-blue border-tech-blue/40'
                            }`}
                    >
                        {isPlayerOpen ? (
                            <X className="text-white" size={24} />
                        ) : (
                            <div className={`relative ${isPlaying ? 'animate-spin-slow' : ''}`}>
                                <Music className="text-space-void" size={28} />
                                {isPlaying && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-tech-blue animate-pulse" />
                                )}
                            </div>
                        )}
                    </motion.button>

                    {/* Full Player UI Panel */}
                    <AnimatePresence>
                        {isPlayerOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
                                animate={{ opacity: 1, scale: 1, x: -350, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
                                className="absolute bottom-0 right-0 w-[340px] glass-nirvana p-6 rounded-[32px] border-white/5 shadow-2xl overflow-hidden"
                            >
                                {/* Drag Instruction for User */}
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white/10 rounded-full md:hidden" />

                                <div className="flex flex-col gap-6">
                                    {/* Track Info */}
                                    <div className="flex items-center gap-4">
                                        <div className={`w-14 h-14 rounded-2xl bg-tech-blue/10 flex items-center justify-center border border-tech-blue/20 ${isPlaying ? 'animate-pulse' : ''}`}>
                                            <Music className="text-tech-blue" size={24} />
                                        </div>
                                        <div className="flex flex-col overflow-hidden">
                                            <h4 className="text-white font-black text-sm uppercase tracking-tighter truncate">
                                                {currentTrack.title}
                                            </h4>
                                            <span className="text-white/40 text-[10px] uppercase font-black tracking-widest">
                                                {currentTrack.artist}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="relative w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-tech-blue shadow-[0_0_10px_rgba(0,210,255,0.5)]"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>

                                    {/* Controls */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <button onClick={handlePrev} className="text-white/40 hover:text-tech-blue transition-colors">
                                                <SkipBack size={20} fill="currentColor" />
                                            </button>
                                            <button
                                                onClick={togglePlay}
                                                className="w-12 h-12 rounded-full bg-tech-blue text-space-void flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,210,255,0.4)]"
                                            >
                                                {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} className="ml-1" fill="currentColor" />}
                                            </button>
                                            <button onClick={handleNext} className="text-white/40 hover:text-tech-blue transition-colors">
                                                <SkipForward size={20} fill="currentColor" />
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="hidden group-hover:flex items-center gap-2">
                                                <button onClick={() => setIsMuted(!isMuted)} className="text-white/40 hover:text-white">
                                                    {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                                                </button>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="1"
                                                    step="0.01"
                                                    value={volume}
                                                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                                                    className="w-12 h-1 accent-tech-blue bg-white/10 rounded-full appearance-none cursor-pointer"
                                                />
                                            </div>
                                            <button
                                                onClick={() => setShowPlaylist(!showPlaylist)}
                                                className={`p-2 rounded-lg transition-colors ${showPlaylist ? 'bg-tech-blue/20 text-tech-blue' : 'text-white/40 hover:text-white'}`}
                                            >
                                                <List size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Playlist Popup Inside Panel */}
                                <AnimatePresence>
                                    {showPlaylist && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mt-6 border-t border-white/5 pt-4"
                                        >
                                            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                                {tracks.map((track, idx) => (
                                                    <button
                                                        key={track.id}
                                                        onClick={() => {
                                                            setCurrentTrackIndex(idx);
                                                            setIsPlaying(true);
                                                        }}
                                                        className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all ${currentTrackIndex === idx ? 'bg-tech-blue/10 text-tech-blue' : 'text-white/60 hover:bg-white/5 hover:text-white'
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-[10px] font-mono opacity-40">{String(idx + 1).padStart(2, '0')}</span>
                                                            <div className="text-left leading-none">
                                                                <p className="text-xs font-black uppercase tracking-tight truncate w-32">{track.title}</p>
                                                            </div>
                                                        </div>
                                                        {currentTrackIndex === idx && isPlaying && <div className="w-1.5 h-1.5 rounded-full bg-tech-blue animate-pulse" />}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default MusicPlayer;
