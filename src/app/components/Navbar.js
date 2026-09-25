"use client";

import { useState } from "react";
import Link from "next/link";
import { Compass, Menu, X, Gamepad2, Info } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900 border-b-4 border-slate-950 px-4 sm:px-8 py-3 shadow-[0_4px_0_0_#000]">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        
        {/* Logo com ícone em caixa destacada */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          onClick={() => setOpen(false)}
        >
          <div className="w-10 h-10 rounded-xl bg-amber-400 border-3 border-slate-950 flex items-center justify-center text-slate-950 shadow-[2px_2px_0px_0px_#000] group-hover:-translate-y-0.5 group-hover:bg-amber-300 transition-all">
            <Compass className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <span
            className="text-2xl sm:text-3xl font-black tracking-tight text-white group-hover:text-amber-300 transition-colors"
            style={{ fontFamily: "var(--font-title)" }}
          >
            Meridiano
          </span>
        </Link>

        {/* Links Desktop estilo Botões Neobrutalistas */}
        <nav className="hidden sm:flex items-center gap-3">
          <Link
            href="/"
            className="px-4 py-2 bg-sky-200 text-slate-950 font-black text-sm rounded-xl border-2 border-slate-950 shadow-[3px_3px_0px_0px_#000] hover:-translate-y-0.5 hover:bg-sky-300 transition-all"
          >
            Jogos
          </Link>
          <Link
            href="/sobre"
            className="px-4 py-2 bg-amber-300 text-slate-950 font-black text-sm rounded-xl border-2 border-slate-950 shadow-[3px_3px_0px_0px_#000] hover:-translate-y-0.5 hover:bg-amber-400 transition-all"
          >
            Sobre
          </Link>
        </nav>

        {/* Botão Hambúrguer Mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden p-2 rounded-xl bg-amber-400 text-slate-950 border-2 border-slate-950 shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5 transition-all"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" strokeWidth={2.5} /> : <Menu className="w-6 h-6" strokeWidth={2.5} />}
        </button>
      </div>

      {/* Menu Mobile Dropdown Neobrutalista */}
      {open && (
        <div className="sm:hidden max-w-5xl mx-auto pt-3">
          <div className="bg-[#f6f0e8] border-4 border-slate-950 rounded-2xl p-3 shadow-[6px_6px_0px_0px_#000] space-y-2">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-sky-200 border-2 border-slate-950 text-slate-950 font-black text-base shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5 transition-all"
              onClick={() => setOpen(false)}
            >
              <Gamepad2 className="w-5 h-5 text-slate-950" strokeWidth={2.5} />
              <span>Jogos</span>
            </Link>
            <Link
              href="/sobre"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-300 border-2 border-slate-950 text-slate-950 font-black text-base shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5 transition-all"
              onClick={() => setOpen(false)}
            >
              <Info className="w-5 h-5 text-slate-950" strokeWidth={2.5} />
              <span>Sobre</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}