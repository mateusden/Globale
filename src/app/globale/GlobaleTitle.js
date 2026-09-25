import { Earth } from "lucide-react";

export default function GlobaleTitle() {
  return (
    <h1
      className="flex items-center justify-center text-4xl sm:text-5xl font-black tracking-tight text-slate-950 select-none my-1"
      style={{ fontFamily: "var(--font-title)" }}
    >
      <span>GL</span>
      <span className="inline-flex items-center justify-center mx-1 p-1 sm:p-1.5 bg-sky-400 rounded-xl border-3 border-slate-950 shadow-[2.5px_2.5px_0px_0px_#000] text-slate-950 hover:rotate-6 transition-transform">
        <Earth className="w-7 h-7 sm:w-9 sm:h-9" strokeWidth={2.8} />
      </span>
      <span>BALE</span>
    </h1>
  );
}