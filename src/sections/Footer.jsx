import { Link } from "react-router-dom";
import { Wordmark } from "../brand/Wordmark";
import { EMAIL, GITHUB, LINKEDIN, CV_URL } from "../lib/site";

const work = [
  { name: "Badminton Queue", to: "/work/badminton-queue" },
  { name: "The Nail Fairy", to: "/work/nail-fairy" },
  { name: "AI video platform", to: "/work/splento" },
  { name: "NSMS", to: "/work/nsms" },
  { name: "2D game", to: "/work/2d-game" },
];

const linkClass =
  "underline-offset-4 decoration-cobalt hover:underline hover:text-ink";

const Footer = ({ prompt = true }) => (
  <footer className="mt-auto border-t border-line bg-paper">
    <div className="shell py-12 md:py-16">
      {prompt && (
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[18ch] text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] md:text-[40px]">
            Have a product to design and build?
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="text-lg font-semibold text-cobalt underline decoration-2 underline-offset-[6px] hover:text-ink md:text-xl"
          >
            {EMAIL}
          </a>
        </div>
      )}

      <div className="grid gap-8 border-t border-line pt-8 text-sm text-muted sm:grid-cols-[1fr_auto_auto] sm:gap-16">
        <div className="flex flex-col gap-3">
          <Link to="/" aria-label="Home" className="w-fit text-[22px]">
            <Wordmark full />
          </Link>
          <p>Designs it, builds it, ships it.</p>
        </div>
        <nav aria-label="Work" className="flex flex-col gap-2">
          <span className="eyebrow">Work</span>
          {work.map(({ name, to }) => (
            <Link key={to} to={to} className={linkClass}>
              {name}
            </Link>
          ))}
        </nav>
        <nav aria-label="Elsewhere" className="flex flex-col gap-2">
          <span className="eyebrow">Elsewhere</span>
          <a href={GITHUB} className={linkClass} rel="noreferrer" target="_blank">
            GitHub
          </a>
          <a href={LINKEDIN} className={linkClass} rel="noreferrer" target="_blank">
            LinkedIn
          </a>
          <a href={CV_URL} className={linkClass} download>
            CV (PDF)
          </a>
          <Link to="/contact" className={linkClass}>
            Contact
          </Link>
        </nav>
      </div>

      <p className="mt-10 font-mono text-xs text-muted">
        &copy; {new Date().getFullYear()} Trong Tu Luu
      </p>
    </div>
  </footer>
);

export default Footer;
