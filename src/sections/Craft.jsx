const CraftSection = () => {
  return (
    <section className="relative w-full bg-paper">
      {/* Outer wrapper to control max width and grid alignment */}
      <div className="relative max-w-[92vw] md:max-w-[80vw] mx-auto border-b border-neutral-200">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 bottom-0 left-1/4 w-px border-l border-dashed border-black/5" />
          <div className="absolute top-0 bottom-0 left-1/2 w-px border-l border-dashed border-black/5" />
          <div className="absolute top-0 bottom-0 left-3/4 w-px border-l border-dashed border-black/5" />
        </div>
        {/* Full-width top line */}
        <div className="w-full h-px bg-neutral-200" />
        {/* Left-biased section head: the rule sits above the word rather
            than centring the whole block. */}
        <div className="px-4 py-16 md:py-20">
          <div className="w-7 h-[2px] rounded-lg bg-neutral-800" />
          <h2 className="mt-4 text-2xl font-semibold tracking-tight uppercase text-neutral-800">
            Project
          </h2>
        </div>
      </div>
    </section>
  );
};

export default CraftSection;