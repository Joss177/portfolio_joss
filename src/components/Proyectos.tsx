import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FolderGit2, ArrowUpRight, X, Sparkles, CloudLightning } from 'lucide-react';
import projectFastApiImg from '../assets/images/Vocalb.png';
import projectAstroImg from '../assets/images/CLASSTRACK.png';
import projectDatabaseImg from '../assets/images/EDCO.png';

interface ProjectItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  imageUrl: string;
  repoUrl: string;
  accentColor: string;
}

export const Proyectos: React.FC = () => {
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);

  const projects: ProjectItem[] = [
    {
      id: 1,
      title: 'VocabQuest',
      subtitle: 'Pagina web de Aprendizaje en Ingles',
      description: 'VocabQuest es una pagina web de aprendizaje de vocabulario inglés estilo Kahoot, diseñada para estudiar vocabulario de B1 que se preparan para el TOEFL. de mi universidad',
      tech: ['React', 'Vite', 'TypeScript', 'FireBase'],
      imageUrl: projectFastApiImg,
      repoUrl: 'https://github.com/Joss177/-VocabQuest',
      accentColor: 'indigo-500',
    },
    {
      id: 2,
      title: 'ClassTrack',
      subtitle: 'Sistema Web Universitario',
      description: 'Classtrack es una aplicativa web para la Universidad Politécnica de Sinaloa, especificamente para la carrera de TI. Gestión de usuarios (Laboratorista, Docentes). Gestión de camaras de seguridad y de horarios. Gestión de google sheets con asistencias de alumnos. Gestión de procesos administrativos.',
      tech: ['FastApi','React','Vue','Python',  'Postgresql'],
      imageUrl: projectAstroImg,
      repoUrl: 'https://github.com/Joss177/ClassTrack2',
      accentColor: 'purple-500',
    },
    {
      id: 3,
      title: 'EDCO',
      subtitle: 'Sistema Web Constructura',
      description: 'EDCO es un sistema web para una constructura. Gestión de usuarios como supervisores, contratistas, encargados, Creación de proyectos, documentos y exportalos en PDF (requisiciones, reportes, estados de cuenta). Subir fotografias y videos de en cada proyecto, y gestión pagos de materiales.',
      tech: ['CakePHP', 'PHP', 'JS', 'MySQL'],
      imageUrl: projectDatabaseImg,
      repoUrl: 'x',
      accentColor: 'cyan-500',
    },
  ];

  const handleToggleProject = (id: number) => {
    if (activeProjectId === id) {
      setActiveProjectId(null); // Close if clicked again
    } else {
      setActiveProjectId(id); // Open selection
    }
  };

  return (
    <section id="proyectos" className="py-24 relative overflow-hidden bg-neutral-950/40">
      
      {/* Background neon ambient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[35rem] h-[35rem] bg-indigo-950/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-[92%] max-w-5xl mx-auto relative z-20">
        
        {/* Section title */}
        <div className="mb-16 text-center md:text-left">
          <p className="text-xs font-mono font-medium tracking-widest text-indigo-400 uppercase mb-1">
            PORTFOLIO DE CREACIONES
          </p>
          <div className="flex flex-col md:flex-row md:items-baseline gap-3 justify-center md:justify-start">
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
              Mis Proyectos
            </h2>
            <div className="h-0.5 flex-1 max-w-[12rem] bg-indigo-500/20 rounded hidden md:block" />
          </div>
          <p className="text-xs font-mono text-neutral-500 mt-2">
            Da clic sobre cada casilla para revelar detalles técnicos y código fuente
          </p>
        </div>

        {/* PROJECTS CASILLAS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((proj) => {
            const isSelected = activeProjectId === proj.id;

            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: proj.id * 0.15 }}
                className="relative h-96 rounded-2xl border border-neutral-800 bg-neutral-900/60 overflow-hidden group shadow-2xl cursor-pointer"
                onClick={() => handleToggleProject(proj.id)}
              >
                {/* 1. Project Background Image with reactive Blur Filter on click */}
                <div 
                  className="w-full h-full relative overflow-hidden transition-all duration-500 bg-neutral-950"
                  style={{
                    filter: isSelected ? 'blur(12px) brightness(0.25)' : 'none',
                    scale: isSelected ? 1.05 : 1.0,
                  }}
                >
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Outer gradient overlay showing basic title from start */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-300 ${isSelected ? 'opacity-0' : 'opacity-100'}`} />
                  
                  <div className={`absolute bottom-6 inset-x-6 z-10 text-left transition-all duration-300 ${isSelected ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold bg-indigo-950/80 px-2 py-1 rounded border border-indigo-500/20">
                      {proj.tech[0]}
                    </span>
                    <h3 className="text-xl font-sans font-extrabold text-white tracking-tight mt-3">
                      {proj.title}
                    </h3>
                    <p className="text-xs font-sans text-neutral-400 mt-1 uppercase tracking-wider">
                      {proj.subtitle}
                    </p>
                  </div>
                </div>

                {/* 2. Detailed Info Overlay rendered dynamically with Blur effect active */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="absolute inset-0 p-6 flex flex-col justify-between text-left z-20 bg-black/45 cursor-default"
                      onClick={(e) => e.stopPropagation()} // Stop clicking inside overlay from closing
                    >
                      {/* Close Trigger Button */}
                      <button
                        onClick={() => setActiveProjectId(null)}
                        className="absolute top-4 right-4 p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/60 text-neutral-400 hover:text-white transition-all focus:outline-none active:scale-95"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="p-1.5 rounded bg-indigo-950/70 border border-indigo-500/30 text-indigo-400">
                            <CloudLightning className="w-4 h-4 animate-pulse" />
                          </span>
                          <div>
                            <h3 className="text-xl font-bold font-sans text-white tracking-tight">
                              {proj.title}
                            </h3>
                            <p className="text-[10px] font-mono tracking-widest text-indigo-300 uppercase leading-none">
                              {proj.tech[0]} Project
                            </p>
                          </div>
                        </div>

                        <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-sans mt-2">
                          {proj.description}
                        </p>

                        {/* Technologies badges */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {proj.tech.map((v) => (
                            <span 
                              key={v}
                              className="px-2 py-0.5 rounded text-[9px] font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/20"
                            >
                              {v}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Code Repository Button */}
                      <div className="pt-4 border-t border-neutral-800/80 flex justify-between items-center">
                        <span className="text-[9px] font-mono text-neutral-500">
                          STATUS // COMPILED // OK
                        </span>
                        
                        <a
                          href={proj.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-[10px] uppercase font-bold tracking-wider hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] active:scale-95 transition-all text-right"
                        >
                          <FolderGit2 className="w-3.5 h-3.5" />
                          <span>Repositorio</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Subtle outer hover lighting flare */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
