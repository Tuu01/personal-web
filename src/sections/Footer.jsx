import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-white">
      {/* CONTAINED HORIZONTAL LINE */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[80vw]" />
      </div>

      {/* FOOTER CONTENT */}
      <div className="relative w-full max-w-[80vw] mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm text-neutral-800">
        {/* DASHED GRID LINES */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 bottom-0 left-[20vw] w-px border-l border-dashed border-black/10" />
          <div className="absolute top-0 bottom-0 left-[40vw] w-px border-l border-dashed border-black/10" />
          <div className="absolute top-0 bottom-0 left-[60vw] w-px border-l border-dashed border-black/10" />
        </div>

        {/* COLUMN 1: Logo */}
        <Link to="/" className="z-10 flex items-start justify-start">
          <img
            src="/logo/tuuhyped_logo.png"
            alt="Tuuhyped Logo"
            className="h-[25px] w-auto"
          />
        </Link>

        {/* COLUMN 2: Projects */}
        <div className="flex flex-col space-y-2">
          <span className="font-medium text-neutral-400 uppercase">
            Project
          </span>
          <a href="/P1" className="hover:underline">
            Booking Website
          </a>
          <a href="/P2" className="hover:underline">
            Management Software
          </a>
          <a href="/P3" className="hover:underline">
            2D Game
          </a>
        </div>

        {/* COLUMN 3: Contact */}
        <div className="z-10">
          <h4 className="font-medium text-neutral-400 uppercase mb-3 tracking-wide">
            Contact
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="mailto:work.tuuhard@gmail.com"
                className="hover:underline"
              >
                Mail
              </a>
            </li>

            <li>
              <a href="/CV/CV_Tuu.pdf" download className="hover:underline">
                CV
              </a>
            </li>
          </ul>
        </div>

        {/* COLUMN 4: Details */}
        <div className="z-10 text-sm text-neutral-600 flex flex-col gap-3">
          {/* <div className="flex gap-3 text-lg">🌞 🌙</div> */}
          <p>© 2025 Trong Tu Luu. All Rights Reserved.</p>
          {/* <p className="text-xs">
            Made with 🖤 and Strawberry Matcha Lattes
            <br />
            (120% sugar, less ice).
          </p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
