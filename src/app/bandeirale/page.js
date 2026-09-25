"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import BandeiraleTitle from "./BandeiraleTitle";
import { FLAGS_DATA } from "./data";
import {
  ArrowLeft,
  Check,
  X,
  ArrowUp,
  ArrowDown,
  Send,
  Sparkles,
  MapPin,
} from "lucide-react";

const MAX_GUESSES = 6;

function todayKeyBandeirale() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return `bandeirale-${formatter.format(now)}`;
}

export default function Bandeirale() {
  const [flagFile, setFlagFile] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [region, setRegion] = useState("");
  const [current, setCurrent] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadFlag() {
      const res = await fetch("/bandeirale/api/flag-info");
      const data = await res.json();
      setFlagFile(data.flagFile);
      setRegion(data.region);

      const saved = localStorage.getItem(todayKeyBandeirale());
      if (saved) {
        const parsed = JSON.parse(saved);
        setGuesses(parsed.guesses);
        setGameOver(parsed.gameOver);
        setMessage(parsed.message);
      }
    }
    loadFlag();
  }, []);

  useEffect(() => {
    if (guesses.length === 0) return;
    localStorage.setItem(
      todayKeyBandeirale(),
      JSON.stringify({ guesses, gameOver, message }),
    );
  }, [guesses, gameOver, message]);

  const filteredFlags = current.trim()
    ? FLAGS_DATA.filter((f) =>
        f.name.toLowerCase().includes(current.trim().toLowerCase()),
      ).slice(0, 6)
    : [];

  const submitGuess = useCallback(async () => {
    if (gameOver || !current.trim() || loading) return;

    setLoading(true);
    const res = await fetch("/bandeirale/api/guess", {
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
      setMessage(
        `Boa! Era ${data.revealedSecret.name} (${data.revealedSecret.period}).`,
      );
    } else if (newGuesses.length >= MAX_GUESSES) {
      setGameOver(true);
      const revealRes = await fetch("/bandeirale/api/reveal");
      const revealData = await revealRes.json();
      setMessage(
        `Não foi dessa vez. Era ${revealData.name} (${revealData.period}).`,
      );
    }
  }, [current, guesses, gameOver, loading]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") submitGuess();
  };

  if (!flagFile) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
        <div className="bg-[#f6f0e8] border-4 border-slate-950 rounded-2xl p-6 shadow-[6px_6px_0px_0px_#000] text-slate-950 font-black flex items-center gap-3">
          <Sparkles className="animate-spin w-5 h-5 text-rose-600" />
          <span>Carregando a bandeira do dia...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-between p-4 sm:p-6">
      <div className="w-full max-w-2xl flex flex-col items-center gap-4">
        {/* Topo com botão de navegação */}
        <div className="w-full flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl border-2 border-slate-950 shadow-[3px_3px_0px_0px_#000] hover:-translate-y-0.5 hover:bg-amber-300 transition-all"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
            <span>Hub</span>
          </Link>

          <span className="px-3 py-1 bg-rose-200 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl border-2 border-slate-950 shadow-[2px_2px_0px_0px_#000]">
            Vexilologia Histórica
          </span>
        </div>

        {/* Card Principal Neobrutalista */}
        <div className="w-full bg-[#f6f0e8] border-4 border-slate-950 rounded-3xl p-5 sm:p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] flex flex-col items-center gap-6 text-slate-950">
          <BandeiraleTitle />
          <p className="text-slate-800 font-bold text-sm text-center -mt-2">
            A qual entidade ou país histórico pertence esta bandeira?
          </p>

          {/* Card da Bandeira do Dia */}
          {/* Card da Bandeira do Dia */}
          <div className="relative w-full bg-rose-100 border-3 border-slate-950 rounded-2xl p-4 sm:p-5 text-center text-slate-950 shadow-[4px_4px_0px_0px_#000] my-1 flex flex-col items-center gap-3">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-rose-400 text-slate-950 border-2 border-slate-950 px-3 py-0.5 rounded-md text-xs font-black uppercase tracking-wider shadow-[1.5px_1.5px_0px_0px_#000]">
              Bandeira do Dia
            </span>

            {/* Fundo alterado para bg-slate-950 para dar contraste em bandeiras brancas */}
            <div className="w-full aspect-[3/2] max-h-52 rounded-xl overflow-hidden border-3 border-slate-950 bg-slate-950 flex items-center justify-center p-3 shadow-[2.5px_2.5px_0px_0px_#000] mt-2">
              <img
                src={`/flags/${flagFile}`}
                alt="Bandeira do dia"
                className="max-w-full max-h-full object-contain drop-shadow-md"
              />
            </div>

            {region && (
              <div className="inline-flex items-center gap-1.5 bg-white border border-slate-950 px-3 py-1 rounded-full text-xs font-black text-slate-800">
                <MapPin size={13} className="text-rose-600" />
                <span>Região: {region}</span>
              </div>
            )}
          </div>

          {/* Legenda dos Palpites */}
          {guesses.length > 0 && (
            <div className="w-full flex items-center justify-between text-xs font-black text-slate-800 px-1 border-b-2 border-slate-950/20 pb-2">
              <span>
                Palpites ({guesses.length}/{MAX_GUESSES})
              </span>
              <div className="flex gap-2 text-[11px] uppercase">
                <span className="px-1.5 py-0.5 bg-white border border-slate-950 rounded">
                  🌍 Região
                </span>
                <span className="px-1.5 py-0.5 bg-white border border-slate-950 rounded">
                  📅 Período
                </span>
              </div>
            </div>
          )}

          {/* Lista de Palpites Feitos */}
          <div className="w-full flex flex-col gap-2.5">
            {guesses.map((g, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-white border-3 border-slate-950 rounded-2xl p-3 shadow-[3px_3px_0px_0px_#000]"
              >
                <span className="font-black text-slate-950 text-base sm:text-lg pl-1">
                  {g.guess}
                </span>

                {!g.won ? (
                  <div className="flex gap-2">
                    {/* Badge da Região */}
                    <div
                      className={`w-9 h-9 flex items-center justify-center rounded-xl border-2 border-slate-950 font-black shadow-[1.5px_1.5px_0px_0px_#000] ${
                        g.regionMatch
                          ? "bg-emerald-400 text-slate-950"
                          : "bg-slate-200 text-slate-500"
                      }`}
                      title="Região"
                    >
                      {g.regionMatch ? (
                        <Check size={20} strokeWidth={3} />
                      ) : (
                        <X size={20} strokeWidth={3} />
                      )}
                    </div>

                    {/* Badge de Orientação Temporal */}
                    <div
                      className="w-9 h-9 flex items-center justify-center rounded-xl bg-amber-300 text-slate-950 border-2 border-slate-950 font-black shadow-[1.5px_1.5px_0px_0px_#000]"
                      title="Período Histórico"
                    >
                      {g.yearDirection === "depois" ? (
                        <ArrowUp size={20} strokeWidth={3} />
                      ) : (
                        <ArrowDown size={20} strokeWidth={3} />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-emerald-400 text-slate-950 border-2 border-slate-950 font-black shadow-[1.5px_1.5px_0px_0px_#000]">
                    <Check size={20} strokeWidth={3} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Campo de Busca e Botão Enviar */}
          {!gameOver && (
            <div className="w-full relative mt-2">
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <input
                  type="text"
                  value={current}
                  onChange={(e) => {
                    setCurrent(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  onKeyDown={handleKeyDown}
                  placeholder="DIGITE O PAÍS OU ENTIDADE..."
                  className="w-full sm:flex-1 bg-white border-3 border-slate-950 focus:bg-amber-100 outline-none rounded-xl px-4 py-3 text-slate-950 font-black placeholder:text-slate-400 placeholder:font-bold text-xs sm:text-sm uppercase shadow-[3px_3px_0px_0px_#000] transition-all"
                />

                <button
                  onClick={submitGuess}
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 bg-rose-400 hover:bg-rose-300 disabled:opacity-50 text-slate-950 font-black text-base px-6 py-3 rounded-xl border-3 border-slate-950 shadow-[3px_3px_0px_0px_#000] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer whitespace-nowrap"
                >
                  <Send className="w-4 h-4" strokeWidth={2.5} />
                  <span>{loading ? "..." : "Enviar"}</span>
                </button>
              </div>

              {/* Autocomplete Dropdown */}
              {showDropdown && filteredFlags.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-3 border-slate-950 rounded-xl overflow-hidden z-20 shadow-[5px_5px_0px_0px_#000]">
                  {filteredFlags.map((f) => (
                    <button
                      key={f.name}
                      onClick={() => {
                        setCurrent(f.name);
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2.5 font-black text-slate-950 text-sm hover:bg-rose-200 uppercase border-b border-slate-200 last:border-b-0 transition-colors"
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              )}
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
        Meridiano Bandeirale · Desafio Diário
      </footer>
    </div>
  );
}
