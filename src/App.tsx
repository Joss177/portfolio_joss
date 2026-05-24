import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { RainEffect } from './components/RainEffect';
import { Inicio } from './components/Inicio';
import { SobreMi } from './components/SobreMi';
import { Habilidades } from './components/Habilidades';
import { Proyectos } from './components/Proyectos';
import { Contacto } from './components/Contacto';
import { stormAudio } from './components/AudioEngine';
import { CloudLightning, TriangleAlert } from 'lucide-react';

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [lightningCounter, setLightningCounter] = useState<number>(0);
  const [themeMode, setThemeMode] = useState<'mild' | 'heavy'>('heavy');

  // Sync procedural rain synthesizer state with user toggle
  useEffect(() => {
    if (soundEnabled) {
      stormAudio.startRain();
    } else {
      stormAudio.stopRain();
    }
    return () => {
      stormAudio.stopRain();
    };
  }, [soundEnabled]);

  // Handle playing lightning rumble sounds when lightning strikes
  const handleLightningStrikeSound = () => {
    if (soundEnabled) {
      stormAudio.triggerThunder();
    }
  };

  // User manually sparks a lightning strike from the buttons
  const triggerManualLightning = () => {
    setLightningCounter((prev) => prev + 1);
  };

  // Scroll to contact form trigger helper
  const handleScrollToContact = () => {
    const el = document.getElementById('contacto');
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-neutral-100 font-sans selection:bg-indigo-500/35 selection:text-white relative overflow-hidden">
      
      {/* 1. Procedural Falling Rain & Animated Lightning background layer */}
      <RainEffect
        density={themeMode === 'heavy' ? 70 : 30}
        isStorm={themeMode === 'heavy'}
        lightningTrigger={lightningCounter}
        onLightningStrike={handleLightningStrikeSound}
      />

      {/* Atmospheric moving clouds shadows wrapper container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-color-burn opacity-25 select-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[130%] h-[60%] bg-gradient-to-b from-neutral-800 via-neutral-900 to-transparent blur-[80px] animate-[pulse_12s_infinite]" />
      </div>

      {/* Floating Header Actions and Navigations */}
      <Header
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onTriggerLightning={triggerManualLightning}
      />

      {/* Main Single Page structural blocks */}
      <main className="relative z-20 w-full">
        
        {/* INICIO */}
        <Inicio
          onContactClick={handleScrollToContact}
          onTriggerLightning={triggerManualLightning}
        />

        {/* SOBRE MI */}
        <SobreMi />

        {/* HABILIDADES */}
        <Habilidades />

        {/* PROYECTOS */}
        <Proyectos />

        {/* CONTACTO */}
        <Contacto />
      </main>

      {/* Atmospheric Footer floating parameters */}
      <footer className="w-full bg-[#040406] border-t border-neutral-900/60 py-8 relative z-30">
        <div className="w-[92%] max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="text-left">
            <p className="text-xs font-mono text-neutral-400">
              © 2026 JOSUE RAYMUNDO PARTIDA FLORES. TODOS LOS DERECHOS RESERVADOS.
            </p>
            <p className="text-[10px] font-mono text-neutral-600 mt-1 uppercase tracking-widest">
              INGENIERO EN TECNOLOGÍAS DE LA INFORMACIÓN 
            </p>
          </div>
          
        </div>
      </footer>



    </div>
  );
}
