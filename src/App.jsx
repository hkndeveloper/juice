import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import MusicPlayer from './components/MusicPlayer';
import LoadingScreen from './components/LoadingScreen';
import Experience3D from './components/Experience3D';

function App() {
  const [showCharacter, setShowCharacter] = React.useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide character after scrolling down 300px (roughly half of hero)
      if (window.scrollY > 300) {
        setShowCharacter(false);
      } else {
        setShowCharacter(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Smooth scroll reset on refresh
    window.scrollTo(0, 0);
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  return (
    <div className="min-h-screen relative selection:bg-neon-green/30 selection:text-white">
      <LoadingScreen />
      <Experience3D showCharacter={showCharacter} />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
        <MusicPlayer />

        {/* Footer */}
        <footer className="py-12 text-center border-t border-white/5 bg-space-void/80 backdrop-blur-md">
          <p className="text-[10px] uppercase tracking-[0.6em] font-black text-white/20">
            Designed & Built with Precision & 3D Nirvana
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
