const GridLinesDashed = () => {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none">
      <div className="relative w-full h-full max-w-[92vw] md:max-w-[80vw] mx-auto">
        {/* 3 dashed lines aligned to the content container */}
        <div className="absolute top-0 bottom-0 left-1/4 w-px border-l border-dashed border-black/5" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px border-l border-dashed border-black/5" />
        <div className="absolute top-0 bottom-0 left-3/4 w-px border-l border-dashed border-black/5" />
      </div>
    </div>
  );
};

export default GridLinesDashed;