import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FolderGit2, ArrowUpRight, X, CloudLightning, ChevronLeft, ChevronRight } from 'lucide-react';
import projectFastApiImg from '../assets/images/Vocalb.png';
import projectAstroImg from '../assets/images/CLASSTRACK.png';
import projectDatabaseImg from '../assets/images/EDCO.png';
import projectErpImg from '../assets/images/NextProyect.png';
import projectDatabaseImg2 from '../assets/images/EDCO2.png';
import projectDatabaseImg3 from '../assets/images/EDCO4.png';
import projectDatabaseImg4 from '../assets/images/EDCO5.png';

interface ProjectItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  images: string[];
  repoUrl: string;
  accentColor: string;
}

// ─── Mini Carousel ────────────────────────────────────────────────────────────
interface CarouselProps {
  images: string[];
  title: string;
}

const ImageCarousel: React.FC<CarouselProps> = ({ images, title }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  // ── Drag to pan ──────────────────────────────────────────────
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{ mx: number; my: number; ox: number; oy: number } | null>(null);
  const MAX_PAN = 18;

  const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

  const onMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    dragStart.current = { mx: e.clientX, my: e.clientY, ox: offset.x, oy: offset.y };
    setIsDragging(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragStart.current) return;
    const dx = ((e.clientX - dragStart.current.mx) / e.currentTarget.clientWidth) * 100;
    const dy = ((e.clientY - dragStart.current.my) / e.currentTarget.clientHeight) * 100;
    setOffset({
      x: clamp(dragStart.current.ox + dx, -MAX_PAN, MAX_PAN),
      y: clamp(dragStart.current.oy + dy, -MAX_PAN, MAX_PAN),
    });
  };

  const onMouseUp = () => {
    dragStart.current = null;
    setIsDragging(false);
  };

  // Reset pan when slide changes
  useEffect(() => { setOffset({ x: 0, y: 0 }); }, [current]);

  const go = (dir: 1 | -1, e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(dir);
    setCurrent((prev) => (prev + dir + images.length) % images.length);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <div
      className="w-full h-full relative overflow-hidden"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.img
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          src={images[current]}
          alt={`${title} screenshot ${current + 1}`}
          className="absolute inset-0 w-full h-full object-cover grayscale-[35%] group-hover:grayscale-0 transition-filter duration-700"
          style={{
            willChange: 'transform',
            objectPosition: `${50 + offset.x}% ${50 + offset.y}%`,
            transition: isDragging ? 'none' : 'object-position 0.3s ease',
          }}
          draggable={false}
        />
      </AnimatePresence>

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => go(-1, e)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1 rounded-lg bg-black/50 hover:bg-black/80 text-white/70 hover:text-white transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => go(1, e)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1 rounded-lg bg-black/50 hover:bg-black/80 text-white/70 hover:text-white transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === current ? 'bg-indigo-400 w-3' : 'bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
export const Proyectos: React.FC = () => {
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);

  const projects: ProjectItem[] = [
    {
      id: 1,
      title: 'VocabQuest',
      subtitle: 'Pagina web de Aprendizaje en Inglés',
      description:
        'VocabQuest es una página web de aprendizaje de vocabulario inglés estilo Kahoot, diseñada para estudiar vocabulario de B1 que se preparan para el TOEFL de mi universidad.',
      tech: ['React', 'Vite', 'TypeScript', 'Firebase'],
      images: [projectFastApiImg, projectFastApiImg, projectFastApiImg],
      repoUrl: 'https://github.com/Joss177/-VocabQuest',
      accentColor: 'indigo-500',
    },
    {
      id: 2,
      title: 'ClassTrack',
      subtitle: 'Sistema Web Universitario',
      description:
        'Classtrack es una aplicación web para la Universidad Politécnica de Sinaloa, específicamente para la carrera de TI. Gestión de usuarios (Laboratorista, Docentes), cámaras de seguridad, horarios, Google Sheets con asistencias y procesos administrativos.',
      tech: ['FastAPI', 'React', 'Vue', 'Python', 'PostgreSQL'],
      images: [projectAstroImg, projectAstroImg, projectAstroImg],
      repoUrl: 'https://github.com/Joss177/ClassTrack2',
      accentColor: 'purple-500',
    },
    {
      id: 3,
      title: 'EDCO',
      subtitle: 'Sistema Web Constructora',
      description:
        'EDCO es un sistema web para una constructora. Gestión de supervisores, contratistas y encargados. Creación de proyectos, documentos exportables en PDF (requisiciones, reportes, estados de cuenta), fotografías/videos por proyecto y gestión de pagos de materiales.',
      tech: ['CakePHP', 'PHP', 'JS', 'MySQL'],
      images: [projectDatabaseImg, projectDatabaseImg2, projectDatabaseImg3, projectDatabaseImg4],
      repoUrl: '#',
      accentColor: 'cyan-500',
    },

    {
      id: 4,
      title: 'Sistema ERP',
      subtitle: 'Proximo Proyecto',
      description:
        'Sistema ERP básico desarrollado como proyecto de práctica. Gestión de inventario, ventas y clientes en una sola plataforma, enfocado en entender flujos empresariales reales.',
      tech: ['?', '?', '?', '?'],
      images: [projectErpImg],
      repoUrl: '#',
      accentColor: 'cyan-500',
    },
  ];

  const handleToggleProject = (id: number) => {
    setActiveProjectId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="proyectos" className="py-24 relative overflow-hidden bg-neutral-950/40">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[35rem] h-[35rem] bg-indigo-950/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-[92%] max-w-5xl mx-auto relative z-20">
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
            Hover para navegar capturas · Clic para revelar detalles técnicos
          </p>
        </div>

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
    
                <div
                  className="w-full h-full transition-all duration-500"
                  style={{
                    filter: isSelected ? 'blur(12px) brightness(0.25)' : 'none',
                    transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  <ImageCarousel images={proj.images} title={proj.title} />

                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-300 pointer-events-none ${
                      isSelected ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <div
                    className={`absolute bottom-6 inset-x-6 z-10 text-left transition-all duration-300 ${
                      isSelected ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'
                    }`}
                  >
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

                {/* ── Info overlay ── */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="absolute inset-0 p-6 flex flex-col justify-between text-left z-20 bg-black/45 cursor-default"
                      onClick={(e) => e.stopPropagation()}
                    >
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

                      <div className="pt-4 border-t border-neutral-800/80 flex justify-between items-center">
    
                        <a
                          href={proj.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-[10px] uppercase font-bold tracking-wider hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] active:scale-95 transition-all"
                        >
                          <FolderGit2 className="w-3.5 h-3.5" />
                          <span>Repositorio</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};