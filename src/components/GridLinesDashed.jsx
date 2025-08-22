const GridLinesDashed = () => {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none">
      <div className="relative w-full h-full max-w-screen-2xl mx-auto">
        {/* 3 dashed lines equally spaced between 10vw and 90vw */}
        <div className="absolute top-0 bottom-0 left-[30vw] w-px border-l border-dashed border-black/5" />
        <div className="absolute top-0 bottom-0 left-[50vw] w-px border-l border-dashed border-black/5" />
        <div className="absolute top-0 bottom-0 left-[70vw] w-px border-l border-dashed border-black/5" />
      </div>
    </div>
  );
};

export default GridLinesDashed;
