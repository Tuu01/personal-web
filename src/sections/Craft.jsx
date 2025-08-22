import GridLinesDashed from "../components/GridLinesDashed";

const CraftSection = () => {
  return (
    <section className=" relative w-full bg-[#ffffff]">
      <GridLinesDashed />
      {/* Outer wrapper to control max width and grid alignment */}
      <div className="max-w-[80vw] mx-auto border-b border-neutral-200">
        {/* Full-width top line */}
        <div className="w-full h-px bg-neutral-200" />
        {/* Centered title with padding */}
        <div className="py-6 px-4 text-center">
          {/* Centered title with short line on top */}
          <div className="relative py-16 text-center">
            {/* Line above text, absolutely centered */}
            <div className="absolute top-14 left-1/2 -translate-x-1/2 w-7 h-[2px] rounded-lg bg-neutral-800" />
            <h2 className="text-2xl font-semibold tracking-tight uppercase text-neutral-800">
              Project
            </h2>
          </div>
        </div>

        {/* Full-width bottom line */}
        {/* <div className="w-full h-px bg-neutral-200" /> */}
      </div>
    </section>
  );
};

export default CraftSection;
