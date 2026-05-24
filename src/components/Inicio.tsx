import React from 'react';
import { motion } from 'motion/react';
import { Linkedin, Github, FileText, Send, ArrowRight, CloudLightning, GraduationCap } from 'lucide-react';
import avatarImg from '../assets/images/FOTOMIA.jpg';

interface InicioProps {
  onContactClick: () => void;
  onTriggerLightning: () => void;
}

export const Inicio: React.FC<InicioProps> = ({ onContactClick, onTriggerLightning }) => {
  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center justify-center pt-24 pb-16 relative overflow-hidden"
    >
      {/* Background radial atmosphere glow colors */}
      <div className="absolute top-1/4 left-1/4 w-[25rem] h-[25rem] bg-indigo-900/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[25rem] h-[25rem] bg-purple-900/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-[92%] max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-20">
        
        {/* Left column: Text details */}
        <div className="md:col-span-7 flex flex-col justify-center order-2 md:order-1 text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex items-center gap-2 mb-4 bg-indigo-950/40 border border-indigo-500/30 px-3 py-1.5 rounded-full w-max cursor-pointer hover:border-indigo-400 group"
        
          >
            <GraduationCap className="w-3.5 h-3.5 text-indigo-400 animate-bounce group-hover:text-cyan-300" />
            <span className="text-[10px] font-mono font-medium tracking-wide text-indigo-200 uppercase">
              Ingeniero Tecnologías de la Información
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold text-white tracking-tight leading-none mb-3"
          >
            Josué Raymundo <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-200 to-purple-400 drop-shadow-[0_2px_15px_rgba(99,102,241,0.25)]">
              Partida Flores
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-2xl text-neutral-400 max-w-lg mb-8 leading-relaxed font-sans"
          >
            Full Stack Web Development
          </motion.h2>

          {/* Call to Actions & social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mb-8"
          >
            <button
              onClick={onContactClick}
              className="relative group overflow-hidden px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium text-xs tracking-wider uppercase transition-all shadow-[0_4px_25px_rgba(99,102,241,0.35)] hover:shadow-[0_4px_30px_rgba(34,197,94,0.15)] hover:from-indigo-500 hover:to-blue-500 active:scale-[0.98] focus:outline-none flex items-center gap-2"
            >
              <Send className="w-4 h-4 text-indigo-100 group-hover:translate-x-0.5 transition-transform" />
              <span>Contáctame</span>
              <span className="absolute -inset-0.5 bg-white/20 blur opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
            </button>

            {/* Simulated CV download with nice feedback or actual alert description */}
            <a
            href="/JosueCV.pdf"
              download="CV_Josue_Partida.pdf"
              className="px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white font-medium text-xs tracking-wider uppercase transition-all border border-neutral-700 hover:border-neutral-500 active:scale-[0.98] focus:outline-none flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-neutral-400" />
              <span>Descargar CV</span>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-4 text-neutral-500 font-mono text-xs border-t border-neutral-800/80 pt-6"
          >
            <span className="text-[10px] text-neutral-600 uppercase tracking-widest">Mis redes:</span>
            
            <a
              href="https://linkedin.com/in/josue20" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-neutral-400 hover:text-indigo-400 transition-colors py-1 px-2 rounded-lg hover:bg-indigo-950/20"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/Joss177"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-neutral-400 hover:text-cyan-400 transition-colors py-1 px-2 rounded-lg hover:bg-cyan-950/20"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </motion.div>
        </div>

        {/* Right column: Non-square floating custom cropped avatar */}
        <div className="md:col-span-5 flex justify-center order-1 md:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-72 h-72 sm:w-80 sm:h-80 group cursor-pointer"
            onClick={onTriggerLightning}
          >
            {/* Background glowing layer structured around the cropped path */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-indigo-500 via-sky-500 to-purple-600 rounded-[2rem] opacity-30 blur-2xl group-hover:opacity-55 transition-opacity duration-500" />
            
            {/* Elegant futuristic non-square frame overlaying clip-path polygonal border */}
            <div className="absolute inset-0 bg-indigo-950/40 rounded-[2.5rem] border-2 border-dashed border-indigo-500/30 group-hover:border-indigo-400/60 p-1.5 transition-colors duration-500">
              
              {/* Image with irregular clip-path styled mask */}
              <div 
                className="w-full h-full relative overflow-hidden bg-neutral-900"
                style={{
                  clipPath: 'polygon(15% 0%, 100% 12%, 85% 100%, 0% 88%)', // Irregular electric trapezoidal shape
                }}
              >
                <img
                  src={avatarImg}
                  alt="Josue Raymundo Partida Flores"
                  className="w-full h-full object-cover grayscale-[35%] hover:grayscale-0 contrast-125 scale-105 group-hover:scale-110 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Animated overlay gradient scanlines simulating lightning */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-indigo-950/20 to-transparent mix-blend-overlay" />
                <div className="absolute inset-x-0 top-0 h-[2px] bg-sky-300 shadow-[0_0_15px_rgba(56,189,248,1)] animate-[pulse_1.5s_infinite] opacity-30" />
              </div>
            </div>

            {/* Little floating indicators */}
            <div className="absolute -top-3 -right-3 p-2 bg-black/85 backdrop-blur-md rounded-xl border border-indigo-400/40 text-sky-400 text-xs font-mono shadow-lg flex items-center gap-1.5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>Online</span>
            </div>

            
          </motion.div>
        </div>

      </div>
    </section>
  );
};
