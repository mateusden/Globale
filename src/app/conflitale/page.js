"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUp, ArrowDown, Check, Send, Sparkles, MapPin } from "lucide-react";
import ConflitaleTitle from "./ConflitaleTitle";

const MAX_GUESSES = 6;

function todayKeyConflitale() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return `conflitale-${formatter.format(now)}`;
}

const PROXIMITY_STYLE = {
  correct: "bg-emerald-400 text-slate-950 border-2 border-slate-950 shadow-[1.5px_1.5px_0px_0px_#000]",
  "muito perto": "bg-amber-300 text-slate-950 border-2 border-slate-950 shadow-[1.5px_1.5px_0px_0px_#000]",
  perto: "bg-orange-300 text-slate-950 border-2 border-slate-950 shadow-[1.5px_1.5px_0px_0px_#000]",
  longe: "bg-slate-200 text-slate-700 border-2 border-slate-950 shadow-[1.5px_1.5px_0px_0px_#000]",
  "muito longe": "bg-slate-300 text-slate-500 border-2 border-slate-950 shadow-[1.5px_1.5px_0px_0px_#000]",
};

export default function Conflitale() {
  const [conflict, setConflict] = useState(null);
  const [current, setCurrent] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadConflict() {
      const res = await fetch("/conflitale/api/conflict-info");
      const data = await res.json();
      setConflict(data);

      const saved = localStorage.getItem(todayKeyConflitale());
      if (saved) {
        const parsed = JSON.parse(saved);
        setGuesses(parsed.guesses);
        setGameOver(parsed.gameOver);
        setMessage(parsed.message);
      }
    }
    loadConflict();
  }, []);

  useEffect(() => {
    if (guesses.length === 0) return;
    localStorage.setItem(
      todayKeyConflitale(),
      JSON.stringify({ guesses, gameOver, message }),
    );
  }, [guesses, gameOver, message]);

  function formatYear(year) {
    if (year < 0) return `${Math.abs(year)} a.C.`;
    return `${year} d.C.`;
  }

  const submitGuess = useCallback(async () => {
    if (gameOver || !current.trim() || loading) return;

    setLoading(true);
    const res = await fetch("/conflitale/api/guess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guess: current.trim() }),
    });
    const data = await res.json();
    setLoading(false);

    if (data.error) {
      setMessage(data.error);
      return;
    }

    const newGuesses = [...guesses, data];
    setGuesses(newGuesses);
    setCurrent("");
    setMessage("");

    if (data.won) {
      setGameOver(true);
      setMessage(`Acertou em cheio! Foi em ${formatYear(data.revealedYear)}.`);
    } else if (newGuesses.length >= MAX_GUESSES) {
      setGameOver(true);
      const revealRes = await fetch("/conflitale/api/reveal");
      const revealData = await revealRes.json();
      setMessage(`Não foi dessa vez. Foi em ${formatYear(revealData.year)}.`);
    }
  }, [current, guesses, gameOver, loading]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") submitGuess();
  };

  if (!conflict) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
        <div className="bg-[#f6f0e8] border-4 border-slate-950 rounded-2xl p-6 shadow-[6px_6px_0px_0px_#000] text-slate-950 font-black flex items-center gap-3">
          <Sparkles className="animate-spin w-5 h-5 text-orange-600" />
          <span>Carregando o conflito do dia...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-between p-4 sm:p-6">
      
      <div className="w-full max-w-2xl flex flex-col items-center gap-4">
        
        {/* Topo com botão do Hub */}
        <div className="w-full flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl border-2 border-slate-950 shadow-[3px_3px_0px_0px_#000] hover:-translate-y-0.5 hover:bg-amber-300 transition-all"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
            <span>Hub</span>
          </Link>

          <span className="px-3 py-1 bg-orange-200 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl border-2 border-slate-950 shadow-[2px_2px_0px_0px_#000]">
            Desafio Histórico
          </span>
        </div>

        {/* Card Principal Bege Neobrutalista */}
        <div className="w-full bg-[#f6f0e8] border-4 border-slate-950 rounded-3xl p-5 sm:p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] flex flex-col items-center gap-6 text-slate-950">
          
          <ConflitaleTitle />
          <p className="text-slate-800 font-bold text-sm text-center -mt-2">
            Em que ano teve início este conflito histórico?
          </p>

          {/* Card do Conflito do Dia */}
          <div className="relative w-full bg-orange-100 border-3 border-slate-950 rounded-2xl p-5 sm:p-6 text-center text-slate-950 shadow-[4px_4px_0px_0px_#000] my-1 flex flex-col gap-2">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange-400 text-slate-950 border-2 border-slate-950 px-3 py-0.5 rounded-md text-xs font-black uppercase tracking-wider shadow-[1.5px_1.5px_0px_0px_#000]">
              Conflito do Dia
            </span>
            
            <h2 className="text-xl sm:text-2xl font-black pt-1">{conflict.name}</h2>
            <p className="text-slate-800 font-bold text-xs sm:text-sm leading-relaxed">
              {conflict.description}
            </p>

            {conflict.region && (
              <div className="inline-flex items-center justify-center gap-1 self-center bg-white border border-slate-950 px-2.5 py-0.5 rounded-full text-xs font-black text-slate-800 mt-1">
                <MapPin size={13} className="text-orange-600" />
                <span>{conflict.region}</span>
              </div>
            )}
          </div>

          {/* Cabeçalho da Lista de Palpites */}
          <div className="w-full flex items-center justify-between text-xs font-black text-slate-800 px-1 border-b-2 border-slate-950/20 pb-2">
            <span>Tentativas ({guesses.length}/{MAX_GUESSES})</span>
            <span>Dica de Proximidade</span>
          </div>

          {/* Lista de Palpites Feitos */}
          <div className="w-full flex flex-col gap-2.5">
            {guesses.map((g, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-white border-3 border-slate-950 rounded-2xl p-3 shadow-[3px_3px_0px_0px_#000]"
              >
                <span className="font-black text-slate-950 text-base sm:text-lg pl-1">
                  {formatYear(g.guessYear)}
                </span>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-xl text-xs font-black uppercase ${
                      PROXIMITY_STYLE[g.proximity] || PROXIMITY_STYLE["longe"]
                    }`}
                  >
                    {g.proximity === "correct" ? "Acertou!" : g.proximity}
                  </span>

                  <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 border-2 border-slate-950 font-black shadow-[1px_1px_0px_0px_#000]">
                    {g.direction === "antes" && (
                      <ArrowDown size={18} strokeWidth={3} className="text-slate-800" />
                    )}
                    {g.direction === "depois" && (
                      <ArrowUp size={18} strokeWidth={3} className="text-slate-800" />
                    )}
                    {g.direction === "correct" && (
                      <Check size={18} strokeWidth={3} className="text-emerald-600" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Form de Palpite */}
          {!gameOver && (
            <div className="w-full relative mt-2">
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <input
                  type="number"
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="EX: 1945 OU -264 (P/ 264 A.C.)"
                  className="w-full sm:flex-1 bg-white border-3 border-slate-950 focus:bg-amber-100 outline-none rounded-xl px-4 py-3 text-slate-950 font-black placeholder:text-slate-400 placeholder:font-bold text-xs sm:text-sm uppercase shadow-[3px_3px_0px_0px_#000] transition-all"
                />

                <button
                  onClick={submitGuess}
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 bg-orange-400 hover:bg-orange-300 disabled:opacity-50 text-slate-950 font-black text-base px-6 py-3 rounded-xl border-3 border-slate-950 shadow-[3px_3px_0px_0px_#000] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer whitespace-nowrap"
                >
                  <Send className="w-4 h-4" strokeWidth={2.5} />
                  <span>{loading ? "..." : "Enviar"}</span>
                </button>
              </div>
            </div>
          )}

          {/* Feedback de Mensagem */}
          {message && (
            <div className="w-full bg-amber-200 border-3 border-slate-950 rounded-xl p-3 text-center text-slate-950 font-black text-sm sm:text-base shadow-[3px_3px_0px_0px_#000] animate-bounce mt-2">
              {message}
            </div>
          )}

        </div>
      </div>

      {/* Footer */}
      <footer className="pt-6 text-center text-slate-500 text-xs">
        Meridiano Conflitale · Desafio Diário
      </footer>

    </div>
  );
}