import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, Github, Linkedin, MapPin, Send } from "lucide-react";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { useLang } from "../i18n/LanguageContext";
import translations from "../i18n/translations";
import type { AboutData } from "../types";

export default function Contact() {
  const { lang } = useLang();
  const t = translations[lang];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { data } = usePortfolioData<AboutData>("/api/v1/about");

  const LINKS = [
    {
      key: "email",
      icon: <Mail size={20} />,
      label: t.contact_email,
      getValue: (d: AboutData) => d.email,
      getHref: (d: AboutData) => `mailto:${d.email}`,
      color: "#00f5d4",
    },
    {
      key: "phone",
      icon: <Phone size={20} />,
      label: t.contact_phone,
      getValue: (d: AboutData) => d.phone,
      getHref: (d: AboutData) => `tel:${d.phone.replace(/\s/g, "")}`,
      color: "#00f5d4",
    },
    {
      key: "github",
      icon: <Github size={20} />,
      label: "GitHub",
      getValue: () => "github.com/Erne1357",
      getHref: (d: AboutData) => d.github,
      color: "#a78bfa",
    },
    {
      key: "linkedin",
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
      getValue: () => "Ernesto Villarreal Ibarra",
      getHref: (d: AboutData) => d.linkedin,
      color: "#60a5fa",
    },
    {
      key: "location",
      icon: <MapPin size={20} />,
      label: t.contact_location,
      getValue: (d: AboutData) => d.location,
      getHref: () =>
        "https://maps.google.com/?q=Ciudad+Juarez+Chihuahua+Mexico",
      color: "#4ade80",
    },
  ];

  return (
    <section id="contact" className="relative py-28 bg-bg-secondary grid-bg">
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, var(--bg-primary), transparent)" }}
      />

      {/* Accent glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(0,245,212,0.04) 0%, transparent 65%)",
        }}
      />

      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <p className="section-label mb-3 justify-center">{t.contact_section_label}</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            {t.contact_title_1}{t.contact_title_1 && " "}<span className="gradient-text">{t.contact_title_2}</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-lg mx-auto text-[0.95rem]">
            {t.contact_subtitle}
          </p>
        </motion.div>

        {/* Contact card */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="glass-card p-8 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <div className="flex flex-col gap-3">
              {data &&
                LINKS.map(({ key, icon, label, getValue, getHref, color }) => (
                  <a
                    key={key}
                    href={getHref(data)}
                    target={key === "email" || key === "phone" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="contact-link group"
                  >
                    <span
                      className="flex-shrink-0 transition-colors"
                      style={{ color }}
                    >
                      {icon}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-mono text-text-muted mb-0.5">{label}</p>
                      <p className="text-sm text-text-primary font-medium truncate group-hover:text-accent transition-colors">
                        {getValue(data)}
                      </p>
                    </div>
                  </a>
                ))}
            </div>
          </motion.div>

          {/* CTA button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <a
              href="mailto:villarreal.i.ernesto@gmail.com"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Send size={16} />
              {t.contact_cta}
            </a>
            <p className="text-text-muted text-xs font-mono mt-4">
              {t.contact_response}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
