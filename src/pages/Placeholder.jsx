import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import { Arrow } from "../brand/Arrow";

// A page that exists in the room but has no confirmed content yet, and the 404.
const Placeholder = ({ eyebrow, title, text, back = { to: "/", label: "Back to the room" } }) => (
  <PageShell>
    <div className="shell flex min-h-[50vh] flex-col justify-center gap-5 py-20">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="max-w-[18ch] text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">{title}</h1>
      {text && <p className="max-w-[48ch] text-lg leading-relaxed text-muted">{text}</p>}
      <Link to={back.to} className="inline-flex w-fit items-center gap-1.5 font-semibold text-cobalt hover:text-ink">
        <Arrow dir="left" className="h-4 w-4" />
        {back.label}
      </Link>
    </div>
  </PageShell>
);

export const BadmintonClicker = () => (
  <Placeholder
    eyebrow="Work / Lab / Made by hand"
    title="Badminton clicker"
    text="A 3D-printed piece from the Lab. Photos and the write-up are coming soon."
    back={{ to: "/#lab", label: "Back to the Lab" }}
  />
);

export const NotFound = () => (
  <Placeholder eyebrow="404" title="Nothing on this shelf." text="The page you were looking for isn’t here." />
);
