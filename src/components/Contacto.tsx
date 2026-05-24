import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Cpu, CheckCircle, ShieldCheck, Github, Linkedin, CloudLightning } from 'lucide-react';

export const Contacto: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Por favor, rellena los campos marcados como obligatorios (*)');
      return;
    }

    setIsSubmitting(true);
    // Simulate API mail post
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000); // clear splash after 5s
    }, 1800);
  };

  const stack = [
    { label: 'Dynamic State Engine', value: 'React 19 & TypeScript' },
    { label: 'Responsive Layouts', value: 'Tailwind CSS v4' },
    { label: 'Fluid Interactions', value: 'Framer Motion' },
    { label: 'Storm & Rain Physics', value: '2D HTML5 Canvas Context' },
    { label: 'Thunder Audio Synth', value: 'HTML5 Web Audio API' },
    { label: 'Visual System Vectors', value: 'Lucide React' },
  ];

  return (
    <section id="contacto" className="py-24 relative overflow-hidden bg-black/50 border-t border-neutral-900">
      
      {/* Background radial cloud haze highlight */}
      <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-purple-950/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-[92%] max-w-5xl mx-auto relative z-20">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Title, information and Tech Stack */}
          <div className="md:col-span-5 text-left space-y-8">
            <div>
              <p className="text-xs font-mono font-medium tracking-widest text-indigo-400 uppercase mb-1">
                ¿TIENES UN PROYECTO EN MENTE?
              </p>
              <h2 className="text-4xl font-sans font-black text-white tracking-tight">
                ¡Hablemos!
              </h2>
              <p className="text-sm text-neutral-400 mt-4 leading-relaxed font-sans">
                ¿Buscas optimizar servidores, construir APIs ágiles o renovar un portal interactivo? 
                Envíame un mensaje y colaboremos juntos en tu próximo desafío digital.
              </p>
            </div>

            {/* TECNOLOGÍA QUE SE UTILIZÓ */}
            <div className="p-5 rounded-2xl bg-neutral-900/65 border border-indigo-500/15 space-y-4">
              <div className="flex items-center gap-2 text-indigo-400 pb-2 border-b border-neutral-800">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-white">
                  Tecnología que se utilizó
                </span>
              </div>
              
              <ul className="space-y-3 font-mono text-[10px] sm:text-xs">
                {stack.map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center text-neutral-400 border-b border-neutral-800/40 pb-1.5 last:border-b-0 last:pb-0">
                    <span className="text-[10px] text-neutral-500">{item.label}:</span>
                    <span className="text-white hover:text-indigo-400 transition-colors font-medium text-right text-[11px] uppercase">
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick direct details */}
            <div className="space-y-2 text-xs font-mono text-neutral-500">
              <div>Ubicación: México // Remoto</div>
              <div>Zona Horaria: UTC-6 (CST)</div>
              <div>Contacto: josueraymundo406@gmail.com</div>
            </div>
          </div>

          {/* Right Column: Interactive FORM */}
          <div className="md:col-span-7">
            <div className="relative p-6 sm:p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-md">
              
              <h3 className="text-lg font-bold font-sans text-white tracking-tight mb-6 text-left border-b border-neutral-800 pb-3">
                Formulario de Contacto
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                      Tu Nombre <span className="text-indigo-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ej. Josue Raymundo"
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800 focus:border-indigo-500 hover:border-neutral-700 text-xs sm:text-sm text-white focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                      Correo Electrónico <span className="text-indigo-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ejemplo@correo.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800 focus:border-indigo-500 hover:border-neutral-700 text-xs sm:text-sm text-white focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                    Asunto de la consulta
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Ej. Oportunidad de Proyecto / Colaboración"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800 focus:border-indigo-500 hover:border-neutral-700 text-xs sm:text-sm text-white focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                    Tu Mensaje <span className="text-indigo-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Escribe los detalles aquí..."
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800 focus:border-indigo-500 hover:border-neutral-700 text-xs sm:text-sm text-white focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit button with glow and submission feedback */}
                <button
                  type="submit"
                  disabled={isSubmitting || submitSuccess}
                  className={`w-full relative group overflow-hidden px-6 py-3.5 rounded-xl text-white font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all focus:outline-none flex items-center justify-center gap-2 ${
                    submitSuccess
                      ? 'bg-emerald-600 shadow-[0_4px_25px_rgba(16,185,129,0.3)]'
                      : isSubmitting
                      ? 'bg-indigo-800 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.45)] cursor-pointer active:scale-[0.99]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin rounded-full h-4.5 w-4.5 border-2 border-white/20 border-t-white" />
                      <span>Transmitiendo señales...</span>
                    </>
                  ) : submitSuccess ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Señales Encapsuladas con Éxito</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-indigo-200" />
                      <span>Enviar Mensaje Eléctrico</span>
                    </>
                  )}
                  <span className="absolute -inset-0.5 bg-white/10 blur opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                </button>
              </form>

              {/* Status alerts */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute inset-x-6 bottom-4 p-4 rounded-xl bg-neutral-950 border border-emerald-500/30 flex items-center gap-3"
                  >
                    <ShieldCheck className="w-5 h-5 text-emerald-400 bg-emerald-950/40 p-0.5 rounded" />
                    <div className="text-left">
                      <div className="text-white text-xs font-bold">¡Mensaje Transmitido!</div>
                      <p className="text-[10px] text-neutral-400">Josue responderá a la brevedad.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
