
import React, { useState, useEffect } from 'react';
import { Code2 } from 'lucide-react';

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

  const menuItems = [
    { label: 'Inicio', id: 'inicio' },
    { label: 'Sobre Mí', id: 'sobre-mi' },
    { label: 'Herramientas', id: 'habilidades' },
    { label: 'Experiencia', id: 'experiencia' },
    { label: 'Proyectos', id: 'proyectos' },
    { label: 'Contacto', id: 'contacto' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setScrolled(scrollPos > 40);

      for (const item of [...menuItems].reverse()) {
        const element = document.getElementById(item.id);

        if (element && scrollPos >= element.offsetTop - 150) {
          setActiveTab(item.id);
          break;
        }
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      const offset = 100;
      const position =
        element.getBoundingClientRect().top +
        window.scrollY -
        offset;

      window.scrollTo({
        top: position,
        behavior: 'smooth',
      });

      setActiveTab(id);
    } else {
      console.warn(`No se encontró la sección: ${id}`);
    }
  };

  return (
    <header
      id="main-nav-header"
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50 rounded-2xl transition-all duration-300 border ${
        scrolled
          ? 'bg-black/75 backdrop-blur-md border-indigo-500/30 shadow-[0_4px_30px_rgba(30,27,75,0.4)] py-3 px-6'
          : 'bg-transparent border-transparent py-5 px-6'
      }`}
    >
      <div className="flex items-center justify-between gap-4">

        {/* Brand / Logo */}
        <button
          onClick={() => scrollToSection('inicio')}
          className="flex items-center gap-2 group text-left focus:outline-none shrink-0"
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

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-neutral-950/45 py-1 px-1.5 rounded-xl border border-white/5">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1.5 rounded-lg font-sans text-xs transition-all duration-300 relative whitespace-nowrap ${
                  isActive
                    ? 'text-white'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-indigo-600/30 border border-indigo-400/40 rounded-lg shadow-[0_0_12px_rgba(99,102,241,0.25)] z-0" />
                )}

                <span className="relative z-10">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Controles opcionales */}
        <div className="flex items-center gap-2">
          {/* Los controles de sonido y relámpagos
              permanecen desactivados */}
        </div>
      </div>
    </header>
  );
};
