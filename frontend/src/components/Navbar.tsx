import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Menu, X, Languages } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import translations from "../i18n/translations";

export default function Navbar() {
  const { lang, toggleLang } = useLang();
  const t = translations[lang];
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const NAV_LINKS = [
    { label: t.nav_about, href: "#about" },
    { label: t.nav_skills, href: "#skills" },
    { label: t.nav_projects, href: "#projects" },
    { label: t.nav_achievements, href: "#achievements" },
    { label: t.nav_contact, href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["about", "skills", "projects", "achievements", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "navbar-blur" : "bg-transparent"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav className="section-container flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-mono font-bold text-lg tracking-wider group"
        >
          <span className="text-accent group-hover:text-white transition-colors">&gt;</span>
          <span className="text-white"> EV</span>
          <span className="text-accent animate-pulse">_</span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.slice(1);
            return (
              <li key={id}>
                <button
                  onClick={() => scrollTo(href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                    active === id
                      ? "text-accent"
                      : "text-text-secondary hover:text-white"
                  }`}
                >
                  {active === id && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-lg bg-accent/10 border border-accent/20"
                    />
                  )}
                  <span className="relative">{label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Language toggle + social icons + mobile menu */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-text-secondary hover:text-accent transition-colors px-2.5 py-1.5 rounded-lg hover:bg-accent/5 border border-transparent hover:border-accent/20"
            aria-label="Toggle language"
          >
            <Languages size={16} />
            <span className="text-xs font-mono font-bold uppercase">{lang === "en" ? "ES" : "EN"}</span>
          </button>

          <a
            href="https://github.com/Erne1357"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-text-secondary hover:text-accent transition-colors p-2"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/ernesto-villarreal-ibarra-49a443337/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-text-secondary hover:text-accent transition-colors p-2"
          >
            <Linkedin size={18} />
          </a>
          <button
            className="md:hidden text-text-secondary hover:text-accent transition-colors p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden navbar-blur border-t border-accent/10"
          >
            <ul className="section-container py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-text-secondary hover:text-accent hover:bg-accent/5 rounded-lg transition-all"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
