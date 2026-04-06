import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ChevronDown, ChevronUp, CheckCircle2, ChevronLeft, ChevronRight, ImageIcon, X } from "lucide-react";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { useLang } from "../i18n/LanguageContext";
import translations, { type Translations } from "../i18n/translations";
import type { Project } from "../types";

const CATEGORY_COLORS: Record<string, string> = {
  cyan: "rgba(0,245,212,0.12)",
  purple: "rgba(108,99,255,0.12)",
  green: "rgba(34,197,94,0.12)",
};
const CATEGORY_BORDER: Record<string, string> = {
  cyan: "rgba(0,245,212,0.3)",
  purple: "rgba(108,99,255,0.3)",
  green: "rgba(34,197,94,0.3)",
};
const CATEGORY_TEXT: Record<string, string> = {
  cyan: "#00f5d4",
  purple: "#a78bfa",
  green: "#4ade80",
};

function ImageGallery({ images, accentColor }: { images: Project["images"]; accentColor: string }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [errorImages, setErrorImages] = useState<Set<number>>(new Set());

  if (!images || images.length === 0) return null;

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  const handleImageError = (index: number) => {
    setErrorImages((prev) => new Set(prev).add(index));
  };

  // If all images failed to load, don't show gallery
  if (errorImages.size === images.length) return null;

  return (
    <>
      <div className="mb-5 relative group/gallery">
        {/* Main image */}
        <div
          className="relative w-full aspect-video rounded-xl overflow-hidden bg-bg-primary border border-white/5 cursor-pointer"
          onClick={() => setLightbox(true)}
        >
          {!errorImages.has(current) ? (
            <>
              {!loadedImages.has(current) && (
                <div className="absolute inset-0 flex items-center justify-center bg-bg-primary">
                  <ImageIcon size={32} className="text-text-muted/30 animate-pulse" />
                </div>
              )}
              <img
                src={images[current].src}
                alt={images[current].alt}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  loadedImages.has(current) ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => handleImageLoad(current)}
                onError={() => handleImageError(current)}
              />
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg-primary/80 gap-2">
              <ImageIcon size={32} className="text-text-muted/30" />
              <span className="text-text-muted text-xs font-mono">Screenshot pending</span>
            </div>
          )}

          {/* Overlay hint */}
          <div className="absolute inset-0 bg-black/0 group-hover/gallery:bg-black/20 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover/gallery:opacity-100 transition-opacity text-white text-xs font-mono bg-black/50 px-3 py-1.5 rounded-full">
              Click to expand
            </span>
          </div>
        </div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/gallery:opacity-100 transition-opacity hover:bg-black/70"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/gallery:opacity-100 transition-opacity hover:bg-black/70"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className="w-1.5 h-1.5 rounded-full transition-all"
                style={{
                  background: i === current ? accentColor : "rgba(255,255,255,0.3)",
                  transform: i === current ? "scale(1.4)" : "scale(1)",
                }}
              />
            ))}
          </div>
        )}

        {/* Image caption */}
        <p className="text-text-muted text-[0.65rem] font-mono mt-2 text-center truncate">
          {images[current].alt}
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              onClick={() => setLightbox(false)}
            >
              <X size={20} />
            </button>

            <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              <img
                src={images[current].src}
                alt={images[current].alt}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-black/80"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-black/80"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
              <p className="text-white/70 text-sm font-mono mt-3 text-center">
                {images[current].alt} ({current + 1}/{images.length})
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ProjectCard({ project, index, t }: { project: Project; index: number; t: Translations }) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-60px" });

  const accentColor = CATEGORY_TEXT[project.category_color] ?? "#00f5d4";
  const bgColor = CATEGORY_COLORS[project.category_color] ?? "rgba(0,245,212,0.12)";
  const borderColor = CATEGORY_BORDER[project.category_color] ?? "rgba(0,245,212,0.3)";

  return (
    <motion.div
      ref={cardRef}
      className="project-card glass-card flex flex-col"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
    >
      {/* Top accent bar */}
      <div
        className="h-0.5 w-full rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
      />

      <div className="p-7 flex flex-col flex-1">
        {/* Number + category */}
        <div className="flex items-center justify-between mb-5">
          <span
            className="font-mono text-4xl font-black opacity-15 leading-none"
            style={{ color: accentColor }}
          >
            {project.number}
          </span>
          <span
            className="text-xs font-mono font-semibold px-3 py-1 rounded-full"
            style={{
              background: bgColor,
              border: `1px solid ${borderColor}`,
              color: accentColor,
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Title & subtitle */}
        <h3 className="text-2xl font-black text-white mb-1">{project.title}</h3>
        <p className="font-mono text-xs mb-4" style={{ color: accentColor }}>
          {project.subtitle}
        </p>

        {/* Image Gallery */}
        <ImageGallery images={project.images} accentColor={accentColor} />

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((tech) => (
            <span key={tech} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {Object.entries(project.stats)
            .slice(0, 3)
            .map(([key, val]) => (
              <div
                key={key}
                className="text-center py-2 rounded-lg"
                style={{
                  background: bgColor,
                  border: `1px solid ${borderColor}`,
                }}
              >
                <div className="font-mono font-bold text-sm" style={{ color: accentColor }}>
                  {val}
                </div>
                <div className="text-text-muted text-[0.65rem] capitalize mt-0.5">
                  {key.replace(/_/g, " ")}
                </div>
              </div>
            ))}
        </div>

        {/* Expand / collapse features */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-2 text-xs font-mono text-text-muted hover:text-accent transition-colors mb-3"
        >
          {expanded ? (
            <>
              <ChevronUp size={14} /> {t.projects_hide_features}
            </>
          ) : (
            <>
              <ChevronDown size={14} /> {t.projects_show_features} ({project.features.length})
            </>
          )}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2 mb-5 overflow-hidden"
            >
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                  <CheckCircle2
                    size={14}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: accentColor }}
                  />
                  {f}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Status + links */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-accent/8">
          <span className="font-mono text-xs text-text-muted">
            {t.projects_status}:{" "}
            <span style={{ color: accentColor }}>{project.status}</span>
          </span>
          <div className="flex gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-text-muted hover:text-accent transition-colors"
              >
                <Github size={17} />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live demo"
                className="text-text-muted hover:text-accent transition-colors"
              >
                <ExternalLink size={17} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { lang } = useLang();
  const t = translations[lang];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { data: projects, loading } = usePortfolioData<Project[]>("/api/v1/projects");

  return (
    <section id="projects" className="relative py-28 bg-bg-secondary grid-bg">
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, var(--bg-primary), transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--bg-primary), transparent)" }}
      />

      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <p className="section-label mb-3">{t.projects_section_label}</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            {t.projects_title_1} <span className="gradient-text">{t.projects_title_2}</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-xl text-[0.95rem]">
            {t.projects_subtitle}
          </p>
        </motion.div>

        {/* Cards */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="glass-card p-7 animate-pulse">
                <div className="h-8 w-8 bg-accent/10 rounded mb-4" />
                <div className="h-6 w-2/3 bg-accent/10 rounded mb-2" />
                <div className="h-4 w-1/2 bg-accent/5 rounded mb-4" />
                <div className="space-y-2">
                  {[100, 90, 80].map((w) => (
                    <div key={w} className="h-3 bg-accent/5 rounded" style={{ width: `${w}%` }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} t={t} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
