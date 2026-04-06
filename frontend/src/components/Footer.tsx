import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import translations from "../i18n/translations";

export default function Footer() {
  const { lang } = useLang();
  const t = translations[lang];
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg-primary border-t border-accent/8 py-10">
      <div className="section-container flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="font-mono font-bold text-base">
          <span className="text-accent">&gt;</span>
          <span className="text-white"> EV</span>
          <span className="text-accent">_</span>
        </div>

        {/* Copyright */}
        <p className="text-text-muted text-xs font-mono text-center">
          &copy; {year} Ernesto Villarreal Ibarra &middot; {t.footer_built_with}{" "}
          <span className="text-accent">React</span> +{" "}
          <span className="text-accent">FastAPI</span> +{" "}
          <span className="text-accent">Docker</span>
          <span className="inline-flex items-center gap-1 ml-1">
            &middot; {t.footer_with_love} <Heart size={11} className="text-red-400 inline" fill="currentColor" />
          </span>
        </p>

        {/* Social */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Erne1357"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-text-muted hover:text-accent transition-colors"
          >
            <Github size={17} />
          </a>
          <a
            href="https://www.linkedin.com/in/ernesto-villarreal-ibarra-49a443337/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-text-muted hover:text-accent transition-colors"
          >
            <Linkedin size={17} />
          </a>
          <a
            href="mailto:villarreal.i.ernesto@gmail.com"
            aria-label="Email"
            className="text-text-muted hover:text-accent transition-colors"
          >
            <Mail size={17} />
          </a>
        </div>
      </div>
    </footer>
  );
}
