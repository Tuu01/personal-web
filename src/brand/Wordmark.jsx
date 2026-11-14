// [tuu]¹⁰|1024: set in type rather than shipped as an image, so it follows the
// theme tokens and stays sharp at any size. Brackets and the exponent are cobalt.
export const Wordmark = ({ full = false, className = "" }) => (
  <span
    className={`font-mono font-medium whitespace-nowrap text-ink leading-none ${className}`}
    aria-label={full ? "[tuu] 10 | 1024" : "[tuu] 10"}
    role="img"
  >
    <span className="text-cobalt">[</span>tuu<span className="text-cobalt">]</span>
    <sup className="text-cobalt text-[0.5em] -top-[0.7em]">10</sup>
    {full && (
      <>
        <span className="text-muted">|</span>1024
      </>
    )}
  </span>
);

export const Monogram = ({ className = "" }) => (
  <span
    className={`font-mono font-medium whitespace-nowrap text-ink leading-none ${className}`}
    aria-label="[t] 10"
    role="img"
  >
    <span className="text-cobalt">[</span>t<span className="text-cobalt">]</span>
    <sup className="text-cobalt text-[0.45em] -top-[0.8em]">10</sup>
  </span>
);
