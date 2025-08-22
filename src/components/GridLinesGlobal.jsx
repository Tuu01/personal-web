import clsx from "clsx";

const GridLinesGlobal = ({ hidden }) => {
  return (
    <div
      className={clsx(
        "fixed inset-0 z-[9999] pointer-events-none transition-opacity duration-300",
        hidden ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="relative w-full h-full max-w-screen-2xl mx-auto">
        {/* Solid grid lines at 10vw from sides */}
        <div className="absolute top-0 bottom-0 left-[10vw] w-px bg-black/10" />
        <div className="absolute top-0 bottom-0 right-[10vw] w-px bg-black/10" />
      </div>
    </div>
  );
};

export default GridLinesGlobal;
