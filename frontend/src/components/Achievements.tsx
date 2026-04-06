import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Medal, Award, Star } from "lucide-react";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { useLang } from "../i18n/LanguageContext";
import translations, { type Translations } from "../i18n/translations";
import type { Achievement } from "../types";

const ICON_MAP: Record<string, React.ReactNode> = {
  trophy: <Trophy size={28} />,
  medal: <Medal size={28} />,
  award: <Award size={28} />,
};

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  cyan: {
    bg: "rgba(0,245,212,0.06)",
    border: "rgba(0,245,212,0.2)",
    text: "#00f5d4",
    glow: "0 0 30px rgba(0,245,212,0.12)",
  },
  gold: {
    bg: "rgba(251,191,36,0.06)",
    border: "rgba(251,191,36,0.25)",
    text: "#fbbf24",
    glow: "0 0 30px rgba(251,191,36,0.12)",
  },
  blue: {
    bg: "rgba(59,130,246,0.06)",
    border: "rgba(59,130,246,0.25)",
    text: "#60a5fa",
    glow: "0 0 30px rgba(59,130,246,0.12)",
  },
};

function AchievementCard({
  item,
  index,
  t,
}: {
  item: Achievement;
  index: number;
  t: Translations;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const colors = COLOR_MAP[item.color] ?? COLOR_MAP.cyan;

  return (
    <motion.div
      ref={ref}
      className="achievement-card glass-card p-6 flex flex-col gap-4"
      style={{ borderColor: inView ? colors.border : undefined }}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ boxShadow: colors.glow }}
    >
      {/* Icon + year */}
      <div className="flex items-start justify-between">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
        >
          {ICON_MAP[item.icon] ?? <Star size={28} />}
        </div>
        <span className="font-mono text-xs text-text-muted bg-bg-primary/60 px-3 py-1 rounded-full border border-white/5">
          {item.year}
        </span>
      </div>

      {/* Title */}
      <div>
        <h3 className="font-black text-white text-lg leading-tight mb-1">{item.title}</h3>
        <p className="font-mono text-xs" style={{ color: colors.text }}>
          {item.event}
        </p>
      </div>

      {/* Rank / Place badge */}
      {(item.rank || item.place) && (
        <div
          className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-lg text-sm font-mono font-bold"
          style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
        >
          {item.place ? (
            <>
              <Medal size={14} />
              {item.place} {t.achievements_place}
            </>
          ) : (
            <>
              <Trophy size={14} />
              {t.achievements_rank} {item.rank}
            </>
          )}
        </div>
      )}

      {/* Description */}
      <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
    </motion.div>
  );
}

export default function Achievements() {
  const { lang } = useLang();
  const t = translations[lang];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { data: achievements, loading } = usePortfolioData<Achievement[]>("/api/v1/achievements");

  return (
    <section id="achievements" className="relative py-28 bg-bg-primary">
      {/* Purple glow */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle at bottom right, rgba(108,99,255,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <p className="section-label mb-3">{t.achievements_section_label}</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            {t.achievements_title_1}{" "}
            <span className="gradient-text">{t.achievements_title_2}</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-xl text-[0.95rem]">
            {t.achievements_subtitle}
          </p>
        </motion.div>

        {/* ICPC highlight banner */}
        <motion.div
          className="glass-card p-6 mb-8 flex flex-col sm:flex-row items-center gap-5 border-accent/20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center text-accent flex-shrink-0">
            <Trophy size={28} />
          </div>
          <div>
            <h3 className="font-black text-white text-lg mb-1">
              {t.achievements_icpc_title}
            </h3>
            <p className="text-text-secondary text-sm">
              {t.achievements_icpc_desc_1}{" "}
              <span className="text-accent font-semibold">
                {t.achievements_icpc_desc_2}
              </span>{" "}
              {t.achievements_icpc_desc_3}
            </p>
          </div>
        </motion.div>

        {/* Cards grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="glass-card p-6 animate-pulse">
                <div className="w-14 h-14 bg-accent/10 rounded-xl mb-4" />
                <div className="h-5 w-3/4 bg-accent/10 rounded mb-2" />
                <div className="h-3 w-1/2 bg-accent/5 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {achievements?.map((item, i) => (
              <AchievementCard key={item.id} item={item} index={i} t={t} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
