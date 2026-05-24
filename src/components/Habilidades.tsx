import React from 'react';
import { motion } from 'motion/react';
import { 
  Code2, 
  FileCode, 
  Braces, 
  Server, 
  Atom, 
  Zap, 
  Terminal, 
  Code, 
  Orbit, 
  Database,
  DatabaseBackup,
  Cake,
  CloudLightning
} from 'lucide-react';

interface SkillItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  glow: string;
  borderHover: string;
}

export const Habilidades: React.FC = () => {
  // 12 Tools detailed
  const skillDetails: { [key: string]: SkillItem } = {
    html: { name: 'HTML5', icon: Code2, color: 'text-orange-500', glow: 'rgba(249, 115, 22, 0.35)', borderHover: 'hover:border-orange-500/50' },
    css: { name: 'CSS3', icon: FileCode, color: 'text-blue-500', glow: 'rgba(59, 130, 246, 0.35)', borderHover: 'hover:border-blue-500/50' },
    js: { name: 'JavaScript', icon: Braces, color: 'text-yellow-500', glow: 'rgba(234, 179, 8, 0.35)', borderHover: 'hover:border-yellow-500/50' },
    php: { name: 'PHP', icon: Server, color: 'text-indigo-400', glow: 'rgba(129, 140, 248, 0.35)', borderHover: 'hover:border-indigo-400/50' },
    react: { name: 'React', icon: Atom, color: 'text-cyan-400', glow: 'rgba(34, 211, 238, 0.35)', borderHover: 'hover:border-cyan-400/50' },
    fastapi: { name: 'FastAPI', icon: Zap, color: 'text-emerald-400', glow: 'rgba(52, 211, 153, 0.4)', borderHover: 'hover:border-emerald-400/50' },
    astro: { name: 'Astro', icon: Orbit, color: 'text-purple-400', glow: 'rgba(192, 132, 252, 0.35)', borderHover: 'hover:border-purple-400/50' },
    mysql: { name: 'MySQL', icon: Database, color: 'text-blue-400', glow: 'rgba(96, 165, 250, 0.35)', borderHover: 'hover:border-blue-400/50' },
    postgresql: { name: 'PostgreSQL', icon: DatabaseBackup, color: 'text-cyan-500', glow: 'rgba(6, 182, 212, 0.35)', borderHover: 'hover:border-cyan-500/50' },
    nodejs: { name: 'Node.js', icon: Terminal, color: 'text-green-500', glow: 'rgba(34, 197, 94, 0.35)', borderHover: 'hover:border-green-500/50' },
    typescript: { name: 'TypeScript', icon: Code, color: 'text-sky-500', glow: 'rgba(14, 165, 233, 0.35)', borderHover: 'hover:border-sky-500/50' },
    cakephp: { name: 'CakePHP', icon: Cake, color: 'text-red-500', glow: 'rgba(239, 68, 68, 0.35)', borderHover: 'hover:border-red-500/50' },
  };

  // Structured in an INVERTED TRIANGLE format:
  // Row 1: 5 skills
  // Row 2: 4 skills
  // Row 3: 2 skills
  // Row 4: 1 skill
  // Total = 12 skills tapering down down down!
  const rows = [
    ['html', 'css', 'js', 'php', 'react'],
    ['fastapi', 'nodejs', 'typescript', 'astro'],
    ['mysql', 'postgresql'],
    ['cakephp'],
  ];

  return (
    <section id="habilidades" className="py-24 relative overflow-hidden bg-black/40">
      
      {/* Background neon thunder grids */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent shadow-[0_4px_30px_rgba(99,102,241,0.2)]" />
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[22rem] h-[22rem] bg-cyan-900/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="w-[92%] max-w-5xl mx-auto relative z-20">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="text-xs font-mono font-medium tracking-widest text-cyan-400 uppercase mb-1">
            STK DE HERRAMIENTAS
          </p>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight flex items-center justify-center gap-2">
            <span>Habilidades</span>
            <CloudLightning className="w-5 h-5 text-indigo-400 animate-pulse" />
          </h2>
          <p className="text-neutral-500 text-xs mt-3 font-mono">
            Estructuradas en jerarquía de optimización técnica
          </p>
        </div>

        {/* INVERTED TRIANGLE FLOW CONTAINER */}
        <div className="flex flex-col gap-5 sm:gap-6 items-center">
          {rows.map((rowKeys, rowIndex) => {
            return (
              <motion.div
                key={rowIndex}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: rowIndex * 0.15 }}
                className="flex flex-wrap gap-4 sm:gap-5 justify-center w-full"
              >
                {rowKeys.map((key) => {
                  const s = skillDetails[key];
                  if (!s) return null;
                  const IconComp = s.icon;

                  return (
                    <motion.div
                      key={key}
                      whileHover={{ 
                        scale: 1.06, 
                        y: -4,
                        boxShadow: `0 8px 30px ${s.glow}`
                      }}
                      className={`flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 backdrop-blur-sm p-4 relative cursor-pointer overflow-hidden transition-all duration-300 ${s.borderHover}`}
                    >
                      {/* Interactive glowing spot behind */}
                      <span className="absolute -inset-2 bg-gradient-to-tr from-transparent via-indigo-500/3 to-transparent opacity-0 hover:opacity-100 transition-opacity rounded-2xl" />
                      
                      {/* Tool Icon with dynamic styling color */}
                      <div className="mb-3.5 p-2 rounded-xl bg-black/60 border border-white/5 shadow-inner relative z-10">
                        <IconComp className={`w-6 h-6 sm:w-7 sm:h-7 ${s.color} transition-all duration-300`} />
                      </div>

                      {/* Tool name label */}
                      <span className="text-neutral-300 hover:text-white font-mono text-[10px] sm:text-xs font-bold tracking-wide relative z-10 text-center uppercase">
                        {s.name}
                      </span>
                      
                      {/* Minor electric nodes identifier tag lines */}
                      <span className="absolute bottom-1 right-2 text-[7px] font-mono text-neutral-700/85">
                        [ {key.substring(0, 3)} ]
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>
            );
          })}
        </div>
        
        {/* Subtle decorative target line indicating direction */}
        <div className="flex justify-center mt-12 opacity-30 select-none pointer-events-none">
          <div className="flex flex-col items-center">
            <div className="w-[1px] h-10 bg-gradient-to-b from-indigo-500 to-transparent" />
            <CloudLightning className="w-4 h-4 text-indigo-400 rotate-180 mb-2 animate-bounce" />
          </div>
        </div>

      </div>
    </section>
  );
};
