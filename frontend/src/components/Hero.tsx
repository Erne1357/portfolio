import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Github, Linkedin, ChevronDown, Mail } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import translations from "../i18n/translations";

export default function Hero() {
  const { lang } = useLang();
  const t = translations[lang];
  const [particlesReady, setParticlesReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setParticlesReady(true));
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary"
    >
      {/* Particle background */}
      {particlesReady && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 60,
            particles: {
              number: { value: 65, density: { enable: true, width: 900 } },
              color: { value: "#00f5d4" },
              opacity: { value: { min: 0.08, max: 0.35 } },
              size: { value: { min: 1, max: 2.5 } },
              links: {
                enable: true,
                color: "#00f5d4",
                distance: 160,
                opacity: 0.1,
                width: 1,
              },
              move: {
                enable: true,
                speed: 0.6,
                random: true,
                outModes: { default: "out" },
              },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "grab" },
                onClick: { enable: true, mode: "push" },
              },
              modes: {
                grab: { distance: 160, links: { opacity: 0.35 } },
                push: { quantity: 3 },
              },
            },
          }}
        />
      )}

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,245,212,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Greeting */}
        <motion.p
          className="font-mono text-accent text-sm md:text-base tracking-widest uppercase mb-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t.hero_greeting}
        </motion.p>

        {/* Name */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          ERNESTO{" "}
          <span className="gradient-text">VILLARREAL</span>
        </motion.h1>

        {/* Typing role */}
        <motion.div
          className="font-mono text-lg md:text-2xl text-text-secondary mb-6 min-h-[2rem] flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          key={lang}
        >
          <TypeAnimation
            sequence={[
              t.hero_role_1, 2200,
              t.hero_role_2, 2200,
              t.hero_role_3, 2200,
              t.hero_role_4, 2200,
              t.hero_role_5, 2200,
            ]}
            wrapper="span"
            speed={52}
            repeat={Infinity}
            cursor={true}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {t.hero_tagline_1}{" "}
          <span className="text-accent font-semibold">ITCJ</span>.{" "}
          {t.hero_tagline_2}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
        >
          <button onClick={() => scrollTo("projects")} className="btn-primary">
            {t.hero_cta_projects}
          </button>
          <a
            href="https://github.com/Erne1357"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <Github size={16} />
            GitHub
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex justify-center gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {[
            {
              href: "https://www.linkedin.com/in/ernesto-villarreal-ibarra-49a443337/",
              icon: <Linkedin size={19} />,
              label: "LinkedIn",
            },
            {
              href: "mailto:villarreal.i.ernesto@gmail.com",
              icon: <Mail size={19} />,
              label: "Email",
            },
            {
              href: "https://github.com/Erne1357",
              icon: <Github size={19} />,
              label: "GitHub",
            },
          ].map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="text-text-muted hover:text-accent transition-all duration-200 hover:scale-110"
            >
              {icon}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-accent/50 hover:text-accent transition-colors"
        onClick={() => scrollTo("about")}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Scroll down"
      >
        <ChevronDown size={26} />
      </motion.button>
    </section>
  );
}
