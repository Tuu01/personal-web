import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Wordmark } from "../brand/Wordmark";
import { CV_URL } from "../lib/site";

const links = [
  { name: "Work", to: "/#work" },
  { name: "Visual", to: "/visual" },
  { name: "About", to: "/about" },
];

const linkClass =
  "text-[15px] font-semibold text-ink no-underline underline-offset-[6px] decoration-2 decoration-cobalt hover:underline";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the phone menu on any navigation, and on Escape.
  useEffect(() => setOpen(false), [location.pathname, location.hash]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (to) =>
    !to.includes("#") && location.pathname.startsWith(to);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/92 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between md:h-[72px]">
        <Link to="/" aria-label="Home" className="text-[22px] md:text-[24px]">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {links.map(({ name, to }) => (
            <NavLink
              key={name}
              to={to}
              className={`${linkClass} ${isActive(to) ? "underline" : ""}`}
              aria-current={isActive(to) ? "page" : undefined}
            >
              {name}
            </NavLink>
          ))}
          <a href={CV_URL} className={linkClass} download>
            CV
          </a>
          <Link
            to="/contact"
            className="inline-flex h-10 items-center rounded-lg bg-ink px-4 text-sm font-semibold text-paper transition-colors hover:bg-cobalt hover:text-on-cobalt"
          >
            Contact
          </Link>
        </nav>

        <button
          type="button"
          className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[6px] md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-[2px] w-[22px] bg-ink transition-transform ${open ? "translate-y-[4px] rotate-45" : ""}`}
          />
          <span
            className={`block h-[2px] w-[22px] bg-ink transition-transform ${open ? "-translate-y-[4px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="border-t border-line bg-paper md:hidden"
        >
          <ul className="shell flex flex-col py-2">
            {links.map(({ name, to }) => (
              <li key={name}>
                <Link
                  to={to}
                  className="flex h-12 items-center border-b border-line text-lg font-semibold"
                >
                  {name}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={CV_URL}
                download
                className="flex h-12 items-center border-b border-line text-lg font-semibold"
              >
                CV
              </a>
            </li>
            <li>
              <Link
                to="/contact"
                className="flex h-12 items-center text-lg font-semibold text-cobalt"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
