import React from 'react';
import { motion } from 'motion/react';
import { Brain } from 'lucide-react';

interface SkillItem {
  name: string;
  slug: string;
  color: string;
  glow: string;
  borderHover: string;
}

export const Habilidades: React.FC = () => {
  const skillDetails: { [key: string]: SkillItem } = {
    python: {
      name: 'Python',
      slug: 'python',
      color: '#3776AB',
      glow: 'rgba(55,118,171,0.35)',
      borderHover: 'hover:border-blue-400/50',
    },

    pandas: {
      name: 'Pandas',
      slug: 'pandas',
      color: '#150458',
      glow: 'rgba(21,4,88,0.35)',
      borderHover: 'hover:border-purple-400/50',
    },

    numpy: {
      name: 'NumPy',
      slug: 'numpy',
      color: '#4D77CF',
      glow: 'rgba(77,119,207,0.35)',
      borderHover: 'hover:border-blue-400/50',
    },

    postgresql: {
      name: 'PostgreSQL',
      slug: 'postgresql',
      color: '#4169E1',
      glow: 'rgba(65,105,225,0.35)',
      borderHover: 'hover:border-indigo-400/50',
    },

    excel: {
      name: 'Excel',
      slug: 'microsoftexcel',
      color: '#217346',
      glow: 'rgba(33,115,70,0.35)',
      borderHover: 'hover:border-green-500/50',
    },

    powerbi: {
      name: 'Power BI',
      slug: 'powerbi',
      color: '#F2C811',
      glow: 'rgba(242,200,17,0.35)',
      borderHover: 'hover:border-yellow-400/50',
    },

    tableau: {
      name: 'Tableau',
      slug: 'tableau',
      color: '#E97627',
      glow: 'rgba(233,118,39,0.35)',
      borderHover: 'hover:border-orange-400/50',
    },

    roboflow: {
      name: 'Roboflow',
      slug: 'roboflow',
      color: '#6706CE',
      glow: 'rgba(103,6,206,0.35)',
      borderHover: 'hover:border-purple-500/50',
    },

    colab: {
      name: 'Google Colab',
      slug: 'googlecolab',
      color: '#F9AB00',
      glow: 'rgba(249,171,0,0.35)',
      borderHover: 'hover:border-yellow-400/50',
    },

    fastapi: {
      name: 'FastAPI',
      slug: 'fastapi',
      color: '#009688',
      glow: 'rgba(0,150,136,0.35)',
      borderHover: 'hover:border-emerald-400/50',
    },

    github: {
      name: 'GitHub',
      slug: 'github',
      color: '#FFFFFF',
      glow: 'rgba(255,255,255,0.25)',
      borderHover: 'hover:border-neutral-400/50',
    },
  };

  const rows = [
    ['python', 'pandas', 'numpy'],
    ['postgresql', 'excel', 'powerbi'],
    ['tableau', 'roboflow', 'colab'],
    ['fastapi', 'github'],
  ];

  return (
    <section
      id="habilidades"
      className="py-24 relative overflow-hidden bg-black/40"
    >
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent shadow-[0_4px_30px_rgba(99,102,241,0.2)]" />

      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[22rem] h-[22rem] bg-cyan-900/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="w-[92%] max-w-5xl mx-auto relative z-20">

        {/* Título */}
        <div className="mb-16 text-center">
          <p className="text-xs font-mono font-medium tracking-widest text-cyan-400 uppercase mb-1">
            DATA & AI STACK
          </p>

          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight flex items-center justify-center gap-2">
            <span>Herramientas & Tecnologías</span>
          </h2>
        </div>

        {/* Habilidades */}
        <div className="flex flex-col gap-5 sm:gap-6 items-center">

          {rows.map((rowKeys, rowIndex) => (
            <motion.div
              key={rowIndex}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.6,
                delay: rowIndex * 0.15,
              }}
              className="flex flex-wrap gap-4 sm:gap-5 justify-center w-full"
            >
              {rowKeys.map((key) => {
                const s = skillDetails[key];

                if (!s) return null;

                return (
                  <motion.div
                    key={key}
                    whileHover={{
                      scale: 1.06,
                      y: -4,
                      boxShadow: `0 8px 30px ${s.glow}`,
                    }}
                    className={`
                      flex flex-col items-center justify-center
                      w-28 h-28 sm:w-32 sm:h-32
                      rounded-2xl
                      bg-neutral-900/40
                      border border-neutral-800/80
                      backdrop-blur-sm
                      p-4
                      relative
                      cursor-pointer
                      overflow-hidden
                      transition-all duration-300
                      ${s.borderHover}
                    `}
                  >
                    {/* Efecto hover */}
                    <span
                      className="
                        absolute -inset-2
                        bg-gradient-to-tr
                        from-transparent
                        via-indigo-500/3
                        to-transparent
                        opacity-0
                        hover:opacity-100
                        transition-opacity
                        rounded-2xl
                      "
                    />

                    {/* Icono */}
                    <div
                      className="
                        mb-3.5
                        p-2
                        rounded-xl
                        bg-black/60
                        border border-white/5
                        shadow-inner
                        relative z-10
                      "
                    >
                      <img
                        src={`https://cdn.simpleicons.org/${s.slug}/${s.color.replace('#', '')}`}
                        alt={s.name}
                        className="w-6 h-6 sm:w-7 sm:h-7"
                        loading="lazy"
                      />
                    </div>

                    {/* Nombre */}
                    <span
                      className="
                        text-neutral-300
                        hover:text-white
                        font-mono
                        text-[10px]
                        sm:text-xs
                        font-bold
                        tracking-wide
                        relative z-10
                        text-center
                        uppercase
                      "
                    >
                      {s.name}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          ))}

        </div>

        {/* Separador inferior */}
        <div className="flex justify-center mt-12 opacity-30 select-none pointer-events-none">
          <div className="flex flex-col items-center">
            <div className="w-[1px] h-10 bg-gradient-to-b from-indigo-500 to-transparent" />

            <Brain
              className="
                w-4 h-4
                text-indigo-400
                rotate-180
                mb-2
                animate-bounce
              "
            />
          </div>
        </div>

      </div>
    </section>
  );
};