import React from "react";
import { useLocation, Link } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Craft", path: "/" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="w-full bg-white top-0 z-30 backdrop-blur-md">
      <div className="max-w-[80vw] mx-auto px-10 py-3 flex items-center justify-between border-b border-neutral-200">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo/tuuhyped_logo.png"
            alt="Tuuhyped Logo"
            className="h-[20px] w-auto"
          />
        </Link>

        {/* Navigation Links */}
        <nav className="space-x-10 text-[16px] font-medium text-black/50">
          {navItems.map(({ name, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={name}
                to={path}
                className={`hover:underline underline-offset-4 transition-colors ${
                  isActive ? "text-black underline" : "text-black/50"
                }`}
              >
                {name}
              </Link>
            );
          })}

          {/* CV DOWNLOAD BUTTON */}
          <a
            href="/CV/CV_Tuu.pdf"
            download
            className="hover:underline underline-offset-4 transition-colors text-black/50"
          >
            CV
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
