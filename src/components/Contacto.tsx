import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, ShieldCheck } from 'lucide-react';

export const Contacto: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Por favor, rellena los campos obligatorios (*)');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('https://formspree.io/f/xgoqzqno', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        alert('Hubo un error al enviar. Intenta de nuevo.');
      }
    } catch {
      alert('Error de conexión. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-24 relative overflow-hidden bg-black/50 border-t border-neutral-900">

      {/* Background radial cloud haze highlight */}
      <div className="absolute bottom-0 left-1/4 w-[30rem] h-[30rem] bg-purple-950/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-[92%] max-w-5xl mx-auto relative z-20">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

          {/* Left Column: Interactive FORM */}
          <div className="md:col-span-7 order-2 md:order-1">
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
                    Asunto
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Ej. Vacante de "
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
                    placeholder="Cuéntame sobre la vacante o la oportunidad..."
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
                      <span>Enviando mensaje...</span>
                    </>
                  ) : submitSuccess ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Mensaje Enviado con Éxito</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-indigo-200" />
                      <span>Enviar Mensaje</span>
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
                      <div className="text-white text-xs font-bold">¡Mensaje Recibido!</div>
                      <p className="text-[10px] text-neutral-400">Josue responderá a la brevedad.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

          {/* Right Column: Title and information, oriented to job opportunities */}
          <div className="md:col-span-5 text-left space-y-8 order-1 md:order-2">
            <div>
              <h2 className="text-4xl font-sans font-black text-white tracking-tight">
                ¡Hablemos!
              </h2>
              <p className="text-sm text-neutral-400 mt-4 leading-relaxed font-sans">
                Estoy en búsqueda activa de nuevas oportunidades laborales.
                Si tu equipo tiene una vacante abierta, un proceso de reclutamiento en marcha,
                o simplemente quieres platicar sobre cómo puedo aportar valor a tu empresa,
                escríbeme y con gusto conversamos.
              </p>
            </div>

            {/* Quick direct details */}
            <div className="space-y-2 text-xs font-mono text-neutral-500">
              <div>Disponibilidad: Inmediata</div>
              <div>Ubicación: México // Remoto</div>
              <div>Zona Horaria: UTC-6 (CST)</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};