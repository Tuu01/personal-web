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

// py-1 keeps a comfortable tap height in the tighter phone layout.
const linkClass =
  "w-fit py-1 underline-offset-4 decoration-cobalt hover:underline hover:text-ink sm:py-0";

const Footer = ({ prompt = true }) => (
  <footer className="mt-auto border-t border-line bg-paper">
    <div className="shell py-8 sm:py-12 md:py-16">
      {prompt && (
        <div className="mb-8 flex flex-col gap-3 sm:mb-12 sm:gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[18ch] text-2xl font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[32px] md:text-[40px]">
            Have a product to design and build?
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="w-fit text-base font-semibold text-cobalt underline decoration-2 underline-offset-[6px] hover:text-ink sm:text-lg md:text-xl"
          >
            {EMAIL}
          </a>
        </div>
      )}

      {/* Phone: brand row on top, the two link lists side by side. */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 text-sm text-muted sm:grid-cols-[1fr_auto_auto] sm:gap-16 sm:pt-8">
        <div className="col-span-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 sm:col-span-1 sm:flex-col sm:items-start sm:justify-start sm:gap-3">
          <Link to="/" aria-label="Home" className="w-fit text-[20px] sm:text-[22px]">
            <Wordmark full />
          </Link>
          <p className="hidden sm:block">Designs it, builds it, ships it.</p>
          <p className="font-mono text-xs sm:hidden">&copy; {new Date().getFullYear()} Trong Tu Luu</p>
        </div>
        <nav aria-label="Work" className="flex flex-col gap-0.5 sm:gap-2">
          <span className="eyebrow">Work</span>
          {work.map(({ name, to }) => (
            <Link key={to} to={to} className={linkClass}>
              {name}
            </Link>
          ))}
        </nav>
        <nav aria-label="Elsewhere" className="flex flex-col gap-0.5 sm:gap-2">
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

      <p className="mt-10 hidden font-mono text-xs text-muted sm:block">
        &copy; {new Date().getFullYear()} Trong Tu Luu
      </p>
    </div>
  </footer>
);

export default Footer;
