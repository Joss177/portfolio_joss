
import React from 'react';
import { motion } from 'motion/react';
import {
  PlayCircle,
  BriefcaseBusiness,
  Code2,
  Film,
} from 'lucide-react';

interface PortfolioItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  video: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'CatMotions',
    subtitle: 'Sistema de visión por computadora',
    description:
      'Sistema Inteligente de Reconocimiento de Gestos y Expresiones Faciales en Tiempo Real mediante Visión por Computadora y Deep Learning.',
    technologies: [
    'Python',
    'YOLO26',
    'OpenCV',
    'PyTorch',
    'Roboflow',
    'Google Colab',
    'NumPy',
    'Pillow',
    'Git',
    'GitHub',
    ],
    video: '/videos/CatMotionDemostracion.mp4',
  },
];

export const Portafolio: React.FC = () => {
  return (
    <section
      id="portafolio"
      className="py-24 relative overflow-hidden bg-neutral-950/20"
    >
      {/* Atmósfera de fondo */}
      <div className="absolute top-1/4 right-0 w-[35rem] h-[35rem] bg-indigo-950/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Línea superior */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent" />

      <div className="w-[92%] max-w-5xl mx-auto relative z-20">

        {/* Encabezado */}
        <div className="mb-16 text-center md:text-left">
          <p className="text-xs font-mono font-medium tracking-widest text-indigo-400 uppercase mb-1">
            DEMOSTRACIONES Y DESARROLLOS
          </p>

          <div className="flex flex-col md:flex-row md:items-baseline gap-3 justify-center md:justify-start">
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
              Portafolio de Trabajo
            </h2>

            <div className="h-0.5 flex-1 max-w-[12rem] bg-indigo-500/20 rounded hidden md:block" />
          </div>

          <p className="text-xs font-mono text-neutral-500 mt-2">
            Proyectos desarrollados y demostraciones de funcionamiento
          </p>
        </div>

        {/* Lista de proyectos */}
        <div className="space-y-8">
          {portfolioItems.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="group relative rounded-2xl border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm overflow-hidden shadow-2xl hover:border-indigo-500/30 transition-all duration-300"
            >

              {/* Línea luminosa */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/70 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

                {/* Video */}
                <div className="relative bg-black flex flex-col justify-center min-w-0">
                  <div className="aspect-video w-full overflow-hidden">
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-contain"
                      aria-label={`Demostración de ${project.title}`}
                    >
                      <source
                        src={project.video}
                        type="video/mp4"
                      />
                      Tu navegador no soporta videos HTML5.
                    </video>
                  </div>

                  <div className="px-5 py-3 border-t border-neutral-800/80 flex items-center gap-2">
                    <Film className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                      Video demostrativo
                    </span>
                  </div>
                </div>

                {/* Información */}
                <div className="p-6 sm:p-8 flex flex-col justify-between">

                  <div>
                    <div className="flex items-start gap-3 mb-5">
                      <div className="w-11 h-11 shrink-0 rounded-xl bg-indigo-950/60 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:text-cyan-400 transition-colors">
                        <BriefcaseBusiness className="w-5 h-5" />
                      </div>

                      <div>
                        <p className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold mb-1">
                          Proyecto {String(index + 1).padStart(2, '0')}
                        </p>

                        <h3 className="text-xl font-bold text-white tracking-tight">
                          {project.title}
                        </h3>

                        <p className="text-xs text-neutral-500 mt-1">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed text-neutral-400">
                      {project.description}
                    </p>

                    <div className="mt-7">
                      <div className="flex items-center gap-2 mb-3">
                        <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                        <p className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                          Tecnologías utilizadas
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-8 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                    <span className="text-[9px] font-mono tracking-widest text-neutral-600 uppercase">
                      Portafolio profesional
                    </span>

                    <PlayCircle className="w-4 h-4 text-indigo-400/70 group-hover:text-cyan-400 transition-colors" />
                  </div>

                </div>

              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};
