import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Mail, Phone, GraduationCap, Briefcase, User } from "lucide-react";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { useLang } from "../i18n/LanguageContext";
import translations from "../i18n/translations";
import type { AboutData } from "../types";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function About() {
  const { lang } = useLang();
  const t = translations[lang];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { data, loading } = usePortfolioData<AboutData>("/api/v1/about");

  return (
    <section id="about" className="relative py-28 bg-bg-secondary grid-bg">
      {/* Subtle top fade */}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, var(--bg-primary), transparent)" }}
      />

      <div className="section-container" ref={ref}>
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          className="mb-14"
        >
          <p className="section-label mb-3">{t.about_section_label}</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            {t.about_title_1} <span className="gradient-text">{t.about_title_2}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* LEFT — Photo + stats */}
          <motion.div
            className="md:col-span-2 flex flex-col items-center md:items-start gap-6"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={1}
          >
            {/* Profile photo */}
            <div className="relative">
              <div className="w-52 h-52 md:w-60 md:h-60 rounded-2xl photo-glow overflow-hidden bg-bg-primary border-2 border-accent/30">
                <img
                  src={data?.photo ?? "/images/profile.jpg"}
                  alt="Ernesto Villarreal"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const parent = target.parentElement!;
                    parent.innerHTML = `
                      <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;
                        background:linear-gradient(135deg,rgba(0,245,212,0.12),rgba(108,99,255,0.12));
                        font-family:'JetBrains Mono',monospace;font-size:3rem;font-weight:700;color:#00f5d4;">
                        EV
                      </div>`;
                  }}
                />
              </div>
              {/* Status badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-bg-primary border border-accent/30 rounded-full px-3 py-1.5 text-xs font-mono whitespace-nowrap shadow-lg">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-accent">{t.about_available}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="w-full grid grid-cols-2 gap-3 mt-4">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="stat-card animate-pulse">
                      <div className="h-7 bg-accent/10 rounded mb-1" />
                      <div className="h-3 bg-accent/5 rounded w-3/4 mx-auto" />
                    </div>
                  ))
                : [
                    { value: `${data?.stats.projects ?? 3}`, label: data?.stats_labels.projects ?? "Projects" },
                    { value: `${data?.stats.languages ?? 6}`, label: data?.stats_labels.languages ?? "Languages" },
                    { value: `${data?.stats.icpc_finals ?? 2}x`, label: data?.stats_labels.icpc_finals ?? "ICPC Finals" },
                    { value: `${data?.stats.years_coding ?? 7}+`, label: data?.stats_labels.years_coding ?? "Years Coding" },
                  ].map(({ value, label }) => (
                    <div key={label} className="stat-card">
                      <div className="text-2xl font-black text-accent font-mono">{value}</div>
                      <div className="text-xs text-text-muted mt-0.5">{label}</div>
                    </div>
                  ))}
            </div>
          </motion.div>

          {/* RIGHT — Info */}
          <motion.div
            className="md:col-span-3 flex flex-col gap-6"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={2}
          >
            {/* Bio */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <User size={16} className="text-accent" />
                <span className="font-mono text-xs text-accent tracking-widest uppercase">{t.about_profile}</span>
              </div>
              {loading ? (
                <div className="space-y-2">
                  {[80, 100, 90, 70].map((w) => (
                    <div key={w} className="h-4 bg-accent/10 rounded animate-pulse" style={{ width: `${w}%` }} />
                  ))}
                </div>
              ) : (
                <p className="text-text-secondary leading-relaxed text-[0.95rem]">{data?.bio}</p>
              )}
            </div>

            {/* Current role */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase size={16} className="text-accent" />
                <span className="font-mono text-xs text-accent tracking-widest uppercase">{t.about_experience}</span>
              </div>
              {data?.current_role && (
                <div>
                  <div className="flex flex-wrap items-baseline gap-2 mb-1">
                    <span className="font-bold text-white">{data.current_role.position}</span>
                    <span className="text-accent font-mono text-sm">@</span>
                    <span className="text-accent font-semibold">{data.current_role.company}</span>
                  </div>
                  <p className="font-mono text-xs text-text-muted mb-3">{data.current_role.period}</p>
                  <p className="text-text-secondary text-sm leading-relaxed">{data.current_role.description}</p>
                </div>
              )}
            </div>

            {/* Education */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap size={16} className="text-accent" />
                <span className="font-mono text-xs text-accent tracking-widest uppercase">{t.about_education}</span>
              </div>
              <div className="space-y-4">
                {data?.education.map((edu, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white text-sm">{edu.degree}</p>
                      <p className="text-text-secondary text-sm">{edu.institution}</p>
                      <p className="font-mono text-xs text-text-muted mt-0.5">{edu.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact info */}
            <div className="flex flex-wrap gap-3">
              {data && (
                <>
                  <a
                    href={`mailto:${data.email}`}
                    className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    <Mail size={14} className="text-accent" />
                    {data.email}
                  </a>
                  <span className="text-text-muted hidden sm:block">·</span>
                  <span className="flex items-center gap-2 text-sm text-text-secondary">
                    <Phone size={14} className="text-accent" />
                    {data.phone}
                  </span>
                  <span className="text-text-muted hidden sm:block">·</span>
                  <span className="flex items-center gap-2 text-sm text-text-secondary">
                    <MapPin size={14} className="text-accent" />
                    {data.location}
                  </span>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
