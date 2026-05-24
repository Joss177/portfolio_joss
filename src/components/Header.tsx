import React, { useState, useEffect } from 'react';
import { CloudLightning, Volume2, VolumeX, Code2, GraduationCap } from 'lucide-react';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onTriggerLightning: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  onTriggerLightning,
}) => {
  const [activeTab, setActiveTab] = useState('inicio');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setScrolled(scrollPos > 40);

      const sections = ['inicio', 'sobre-mi', 'habilidades', 'proyectos', 'contacto'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const offsetTop = el.offsetTop - 120;
          const offsetHeight = el.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveTab(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      });
      setActiveTab(id);
    }
  };

  const menuItems = [
    { label: 'Inicio', id: 'inicio' },
    { label: 'Sobre Mi', id: 'sobre-mi' },
    { label: 'Herramientas', id: 'habilidades' },
    { label: 'Proyectos', id: 'proyectos' },
    { label: 'Contacto', id: 'contacto' },
  ];

  return (
    <header
      id="main-nav-header"
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl z-50 rounded-2xl transition-all duration-300 border ${
        scrolled
          ? 'bg-black/75 backdrop-blur-md border-indigo-500/30 shadow-[0_4px_30px_rgba(30,27,75,0.4)] py-3 px-6'
          : 'bg-transparent border-transparent py-5 px-6'
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => scrollToSection('inicio')}
          className="flex items-center gap-2 group text-left focus:outline-none"
        >
          <div className="relative p-1.5 rounded-lg bg-indigo-950/60 border border-indigo-500/35 group-hover:border-cyan-400/60 transition-colors">
           <Code2 className="w-5 h-5 text-indigo-400 group-hover:text-cyan-300 transition-colors animate-pulse" />
            <span className="absolute -inset-0.5 rounded-lg bg-indigo-500/20 blur opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <h1 className="font-mono text-sm tracking-wider font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-400">
              JOSUE.DEV
            </h1>
            <p className="text-[9px] font-mono text-indigo-400/70 uppercase tracking-widest leading-none">
              IT Engineer
            </p>
          </div>
        </button>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center gap-1.5 bg-neutral-950/45 py-1 px-1.5 rounded-xl border border-white/5">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-1.5 rounded-lg font-sans text-xs tracking-medium transition-all duration-300 relative ${
                  isActive
                    ? 'text-white'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-indigo-600/30 border border-indigo-400/40 rounded-lg shadow-[0_0_12px_rgba(99,102,241,0.25)] z-0" />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sound toggle & lightning bolt controller */}
        <div className="flex items-center gap-2">
          {/* Lightning trigger */}
          <button
            onClick={onTriggerLightning}
            title="Invocar Relámpago"
            className="p-2 rounded-xl bg-orange-950/20 border border-orange-500/20 hover:border-orange-400/60 text-orange-400 hover:text-orange-200 hover:shadow-[0_0_15px_rgba(251,146,60,0.35)] active:scale-95 transition-all focus:outline-none"
          >
            <CloudLightning className="w-4 h-4" />
          </button>

          {/* Sound toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Silenciar sonidos de tormenta' : 'Activar sonido de tormenta'}
            className={`p-2 rounded-xl transition-all focus:outline-none active:scale-95 border ${
              soundEnabled
                ? 'bg-indigo-950/40 border-indigo-500/45 text-indigo-300 hover:text-indigo-100 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                : 'bg-neutral-900 border-neutral-700/60 text-neutral-500 hover:border-neutral-500'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
