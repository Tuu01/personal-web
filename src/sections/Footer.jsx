import { Link } from "react-router-dom";

// Link targets are unchanged from the previous footer.
const projects = [
  { name: "Badminton Queue", path: "/P5" },
  { name: "AI Video Platform", path: "/P4" },
  { name: "Booking Website", path: "/P1" },
  { name: "POS System", path: "/P2" },
  { name: "2D Game", path: "/P3" },
];

const linkClass =
  "whitespace-nowrap rounded-sm hover:underline underline-offset-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2";

const Footer = () => {
  return (
    <footer className="w-full bg-paper">
      {/* CONTAINED HORIZONTAL LINE */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[92vw] md:max-w-[80vw] border-t border-black/10" />
      </div>

      <div className="w-full max-w-[92vw] md:max-w-[80vw] mx-auto px-4 py-10 md:py-14">
        {/* Colophon: mark and statement on the left, the work inline on the
            right. No column headers; five links don't need a taxonomy. */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="w-fit rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              <img
                src="/logo/tuuhyped_logo.png"
                alt="Tuuhyped Logo"
                className="h-[22px] w-auto"
              />
            </Link>
            <p className="max-w-[24ch] text-sm leading-snug text-black/50">
              I simplify, I humanize.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm md:justify-end">
            {projects.map(({ name, path }) => (
              <Link key={path} to={path} className={linkClass}>
                {name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Baseline row */}
        <div className="mt-10 flex flex-col gap-3 border-t border-black/10 pt-4 text-xs text-black/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Trong Tu Luu. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="mailto:work.tuuhard@gmail.com" className={linkClass}>
              Mail
            </a>
            <a href="/CV/Tuu_CV.pdf" download className={linkClass}>
              CV
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
