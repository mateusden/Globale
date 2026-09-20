import { Flag } from "lucide-react";

export default function BandeiraleTitle() {
  return (
    <h1
      className="flex items-center justify-center sm:text-5xl text-4xl font-bold tracking-tight text-white gap-2"
      style={{ fontFamily: "var(--font-title)" }}
    >
      <Flag className="text-amber-600" style={{ width: "1em", height: "1em" }} strokeWidth={2.5} />
      <span>Bandeirale</span>
    </h1>
  );
}