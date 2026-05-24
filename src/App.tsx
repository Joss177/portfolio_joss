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
              INGENIERO EN TECNOLOGÍAS DE LA INFORMACIÓN // DISEÑO DE ALTO VOLTAJE
            </p>
          </div>

          {/* Quick Storm Engine status settings on bottom */}
          <div className="flex items-center gap-4 bg-black/60 px-4 py-2 rounded-xl border border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-ping" />
              <span className="text-[10px] font-mono text-neutral-400 uppercase">Estado de tormenta:</span>
            </div>

            <div className="flex gap-1.5">
              <button
                onClick={() => setThemeMode('mild')}
                className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase transition-all ${
                  themeMode === 'mild'
                    ? 'bg-neutral-800 text-white border border-neutral-600'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                Llovizna
              </button>
              <button
                onClick={() => setThemeMode('heavy')}
                className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase transition-all ${
                  themeMode === 'heavy'
                    ? 'bg-indigo-950/60 text-indigo-300 border border-indigo-500/40'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                Tormenta Eléctrica
              </button>
            </div>
          </div>
          
        </div>
      </footer>

      {/* Floating helpful Storm Alert guidance (disappears after interaction) */}
      <div className="fixed bottom-4 left-4 z-40 max-w-xs p-3 bg-neutral-950/90 backdrop-blur border border-indigo-500/30 rounded-xl shadow-2xl pointer-events-auto hidden md:flex items-start gap-2.5 animate-[bounce_4s_infinite]">
        <CloudLightning className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0 animate-pulse" />
        <div className="text-left font-mono text-[9px]">
          <div className="text-white font-bold uppercase">EXPERIENCIA INMERSIVA</div>
          <p className="text-neutral-450 text-neutral-400 mt-1">
            Activa el altavoz del header para escuchar el sonido matemático de la lluvia y truenos sintéticos procedimentales.
          </p>
        </div>
      </div>

    </div>
  );
}
