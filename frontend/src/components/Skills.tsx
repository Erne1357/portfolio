import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Globe, Database, Settings, Zap, Cpu, Server, Shield } from "lucide-react";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { useLang } from "../i18n/LanguageContext";
import translations from "../i18n/translations";
import type { SkillCategory } from "../types";

const ICON_MAP: Record<string, React.ReactNode> = {
  code: <Code2 size={18} />,
  globe: <Globe size={18} />,
  database: <Database size={18} />,
  settings: <Settings size={18} />,
  zap: <Zap size={18} />,
  cpu: <Cpu size={18} />,
  server: <Server size={18} />,
  shield: <Shield size={18} />,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

export default function Skills() {
  const { lang } = useLang();
  const t = translations[lang];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { data: categories, loading } = usePortfolioData<SkillCategory[]>("/api/v1/skills");

  return (
    <section id="skills" className="relative py-28 bg-bg-primary">
      {/* Radial accent glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="section-container" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <p className="section-label mb-3">{t.skills_section_label}</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            {t.skills_title_1} <span className="gradient-text">{t.skills_title_2}</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-xl text-[0.95rem]">
            {t.skills_subtitle}
          </p>
        </motion.div>

        {/* Skill grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="glass-card p-6 animate-pulse">
                <div className="h-5 w-5 bg-accent/20 rounded mb-3" />
                <div className="h-4 w-32 bg-accent/10 rounded mb-4" />
                <div className="flex flex-wrap gap-2">
                  {[70, 90, 60, 80].map((w) => (
                    <div key={w} className="h-7 rounded-lg bg-accent/5" style={{ width: `${w}px` }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {categories?.map((cat) => (
              <motion.div
                key={cat.name}
                className="glass-card p-6 group hover:border-accent/30 transition-colors"
                variants={cardVariants}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent/15 transition-colors">
                    {ICON_MAP[cat.icon] ?? <Code2 size={18} />}
                  </div>
                  <h3 className="font-bold text-white text-sm tracking-wide">{cat.name}</h3>
                </div>

                {/* Skill badges */}
                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={containerVariants}
                >
                  {cat.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      className="skill-badge"
                      variants={badgeVariants}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Bottom note */}
        <motion.p
          className="mt-10 text-center font-mono text-xs text-text-muted"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {t.skills_footer}
        </motion.p>
      </div>
    </section>
  );
}
