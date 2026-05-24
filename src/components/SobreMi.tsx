import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Shield, Trophy, Sparkles } from 'lucide-react';
import avatarImg from '../assets/images/josue_avatar_1779587593398.png';

export const SobreMi: React.FC = () => {
  return (
    <section id="sobre-mi" className="py-24 relative overflow-hidden bg-neutral-950/20">
      
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 right-0 w-[30rem] h-[30rem] bg-indigo-950/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-[92%] max-w-5xl mx-auto relative z-20">
        
        {/* Section title */}
        <div className="mb-16 text-center md:text-left">
          <p className="text-xs font-mono font-medium tracking-widest text-indigo-400 uppercase mb-1">
            CONÓCEME UN POCO MÁS
          </p>
          <div className="flex flex-col md:flex-row md:items-baseline gap-3 justify-center md:justify-start">
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
              Sobre Mi
            </h2>
            <div className="h-0.5 flex-1 max-w-[12rem] bg-indigo-500/20 rounded hidden md:block" />
          </div>
        </div>

        {/* Contents grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Rectangular photo */}
          <div className="md:col-span-4 flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-64 h-80 rounded-2xl p-1 bg-gradient-to-b from-indigo-500/30 to-purple-500/10 hover:border-indigo-400/40 transition-colors shadow-2xl overflow-hidden group"
            >
              {/* Rectangular image container */}
              <div className="w-full h-full rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
                <img
                  src={avatarImg}
                  alt="Josue Raymundo Partida Flores"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Tech scan overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
              </div>

              {/* Holographic framing lines */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-indigo-400/80 rounded-tl-sm pointer-events-none" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-indigo-400/80 rounded-tr-sm pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-indigo-400/80 rounded-bl-sm pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-indigo-400/80 rounded-br-sm pointer-events-none" />
            </motion.div>
          </div>

          {/* Right Column: Two columns/blocks of info as lorem equivalents (custom structured blocks) */}
          <div className="md:col-span-8 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {/* Paragraph 1 */}
              <div className="bg-neutral-900/65 border border-indigo-950/20 p-6 rounded-2xl relative group hover:border-indigo-500/20 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3 text-indigo-400">
                  <Terminal className="w-4 h-4 text-indigo-400/95" />
                  <span className="text-[10px] font-mono tracking-widest uppercase">Formación y Enfoque</span>
                </div>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-sans">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                  dolor in reprehenderit in voluptate.
                </p>
                <span className="absolute bottom-3 right-3 text-[10px] font-mono text-neutral-700 group-hover:text-indigo-600/65 transition-colors">
                  01 // PARAGRAPH
                </span>
              </div>

              {/* Paragraph 2 */}
              <div className="bg-neutral-900/65 border border-indigo-950/20 p-6 rounded-2xl relative group hover:border-indigo-500/20 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3 text-cyan-400">
                  <Shield className="w-4 h-4 text-cyan-400/95" />
                  <span className="text-[10px] font-mono tracking-widest uppercase">Metas y Aspiraciones</span>
                </div>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-sans">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in 
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
                  sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id 
                  est laborum. Consectetur elit sed do eiusmod lorem.
                </p>
                <span className="absolute bottom-3 right-3 text-[10px] font-mono text-neutral-700 group-hover:text-cyan-600/65 transition-colors">
                  02 // PARAGRAPH
                </span>
              </div>
            </motion.div>

            {/* Quick dynamic status tags/stats */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="grid grid-cols-3 gap-4 font-mono text-neutral-400 text-[10px] border-t border-neutral-850 pt-5"
            >
              <div className="flex items-center gap-2">
                <Trophy className="w-3.5 h-3.5 text-orange-400" />
                <div>
                  <div className="text-white font-bold">100% Comprometido</div>
                  <div className="text-[9px] text-neutral-500">Ingeniería Web</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <div>
                  <div className="text-white font-bold">Arquitecturas Limpias</div>
                  <div className="text-[9px] text-neutral-500">FastAPI, React & Astro</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-purple-400" />
                <div>
                  <div className="text-white font-bold">Bases de Datos</div>
                  <div className="text-[9px] text-neutral-500 font-sans">SQL Avanzado</div>
                </div>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};
