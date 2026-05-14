import { Reveal } from "./reveal";

export function SectionMarker({ num, label, className }: { num: string; label: string; className?: string }) {
  return (
    <Reveal className={`section-marker${className ? " " + className : ""}`}>
      <span className="num">§ {num}</span> · {label}
    </Reveal>
  );
}
