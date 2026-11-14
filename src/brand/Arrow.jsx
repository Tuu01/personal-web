// The brand arrow: square caps, mitred joins, drawn on a 24px grid.
export const Arrow = ({ className = "w-[18px] h-[18px]", dir = "right" }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={`shrink-0 ${dir === "left" ? "rotate-180" : ""} ${className}`}
  >
    <path
      d="M4 12H19M13 6l6 6-6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
  </svg>
);
