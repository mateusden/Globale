import { Compass } from "lucide-react";

export default function MeridianoTitle() {
  return (
    <h1
      className="flex items-center justify-center sm:text-5xl text-4xl font-bold tracking-tight text-white gap-0.5"
      style={{ fontFamily: "var(--font-title)" }}
    >
      <span>Meridian</span>
      <Compass
        className="text-amber-500"
        style={{ width: "0.9em", height: "0.9em" }}
        strokeWidth={2.5}
      />
    </h1>
  );
}