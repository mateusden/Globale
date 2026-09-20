import { Languages } from "lucide-react";

export default function IdiomaleTitle() {
  return (
    <h1
      className="flex items-center justify-center text-5xl font-bold tracking-tight text-white"
      style={{ fontFamily: "var(--font-title)", gap: "0.05em" }}
    >
      <span>IDIOMA</span>
      <Languages
        className="text-amber-600"
        style={{ width: "0.9em", height: "0.9em" }}
        strokeWidth={2.5}
      />
      <span>LE</span>
    </h1>
  );
}