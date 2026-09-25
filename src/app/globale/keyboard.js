"use client";

import { Delete } from "lucide-react";

const ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"]
];

export default function Keyboard({ onKeyPress, onBackspace, keyStates = {} }) {
  return (
    <div className="w-fit mx-auto flex flex-col gap-1.5 p-2.5 sm:p-3.5 bg-slate-900 rounded-2xl border-3 border-slate-950 shadow-[4px_4px_0px_0px_#000] mt-4">
      {/* Linha 1 */}
      <div className="flex justify-center gap-1 sm:gap-1.5 w-full">
        {ROWS[0].map((ch) => (
          <KeyButton key={ch} ch={ch} onKeyPress={onKeyPress} state={keyStates[ch]} />
        ))}
      </div>

      {/* Linha 2 */}
      <div className="flex justify-center gap-1 sm:gap-1.5 w-full">
        {ROWS[1].map((ch) => (
          <KeyButton key={ch} ch={ch} onKeyPress={onKeyPress} state={keyStates[ch]} />
        ))}
      </div>

      {/* Linha 3 */}
      <div className="flex justify-center gap-1 sm:gap-1.5 w-full">
        {ROWS[2].map((ch) => (
          <KeyButton key={ch} ch={ch} onKeyPress={onKeyPress} state={keyStates[ch]} />
        ))}
        <button
          onClick={onBackspace}
          aria-label="Apagar letra"
          className="w-10 sm:w-12 h-11 sm:h-12 bg-rose-400 hover:bg-rose-300 text-slate-950 rounded-xl border-2 border-slate-950 font-black shadow-[1.5px_1.5px_0px_0px_#000] active:translate-y-0.5 transition-all flex items-center justify-center cursor-pointer shrink-0"
        >
          <Delete size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

function KeyButton({ ch, onKeyPress, state }) {
  const bg =
    state === "correct"
      ? "bg-emerald-400 text-slate-950"
      : state === "present"
        ? "bg-amber-300 text-slate-950"
        : state === "absent"
          ? "bg-slate-700 text-slate-400 border-slate-800"
          : "bg-slate-800 text-white hover:bg-slate-700";

  return (
    <button
      onClick={() => onKeyPress(ch)}
      className={`w-9 sm:w-11 h-11 sm:h-12 rounded-xl border-2 border-slate-950 font-black text-xs sm:text-base shadow-[1.5px_1.5px_0px_0px_#000] active:translate-y-0.5 transition-all flex items-center justify-center cursor-pointer shrink-0 ${bg}`}
    >
      {ch}
    </button>
  );
}