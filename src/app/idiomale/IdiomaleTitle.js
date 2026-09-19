import { Languages } from "lucide-react";

export default function IdiomaleTitle() {
  return (
    <h1
      className="flex items-center justify-center text-4xl font-bold tracking-tight text-white"
      style={{ fontFamily: "var(--font-title)", gap: "0.15em" }}
    >
      <span>IDIOMA</span>
      <Languages
        className="text-amber-600"
        style={{ width: "0.85em", height: "0.85em" }}
        strokeWidth={2.5}
      />
      <span>LE</span>
    </h1>
  );
}