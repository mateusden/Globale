"use client";

import IdiomaleTitle from "./IdiomaleTitle";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Check, X, ArrowUp, ArrowDown, Equal, Send, Sparkles } from "lucide-react";
import { COUNTRIES_DATA } from "./data";

const MAX_GUESSES = 6;

function todayKeyIdiomale() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return `idiomale-${formatter.format(now)}`;
}

export default function Idiomale() {
  const [phrase, setPhrase] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [current, setCurrent] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadPhrase() {
      const res = await fetch("/idiomale/api/phrase-info");
      const data = await res.json();
      setPhrase(data.phrase);

      const saved = localStorage.getItem(todayKeyIdiomale());
      if (saved) {
        const parsed = JSON.parse(saved);
        setGuesses(parsed.guesses);
        setGameOver(parsed.gameOver);
        setMessage(parsed.message);
      }
    }
    loadPhrase();
  }, []);

  useEffect(() => {
    if (guesses.length === 0) return;
    localStorage.setItem(
      todayKeyIdiomale(),
      JSON.stringify({ guesses, gameOver, message }),
    );
  }, [guesses, gameOver, message]);

  const filteredCountries = current.trim()
    ? COUNTRIES_DATA.filter((c) =>
        c.name.toLowerCase().includes(current.trim().toLowerCase()),
      ).slice(0, 6)
    : [];

  const submitGuess = useCallback(async () => {
    if (gameOver || !current.trim() || loading) return;

    setLoading(true);
    const res = await fetch("/idiomale/api/guess", {
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
      setMessage(`Mandou bem! Era ${data.revealedSecret}.`);
    } else if (newGuesses.length >= MAX_GUESSES) {
      setGameOver(true);
      const revealRes = await fetch("/idiomale/api/reveal");
      const revealData = await revealRes.json();
      setMessage(`Não foi dessa vez. Era ${revealData.secret}.`);
    }
  }, [current, guesses, gameOver, loading]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") submitGuess();
  };

  if (!phrase) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
        <div className="bg-[#f6f0e8] border-4 border-slate-950 rounded-2xl p-6 shadow-[6px_6px_0px_0px_#000] text-slate-950 font-black flex items-center gap-3">
          <Sparkles className="animate-spin w-5 h-5 text-emerald-600" />
          <span>Carregando a frase do dia...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-between p-4 sm:p-6">
      
      <div className="w-full max-w-2xl flex flex-col items-center gap-4">
        
        {/* Topo com Voltar ao Hub */}
        <div className="w-full flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl border-2 border-slate-950 shadow-[3px_3px_0px_0px_#000] hover:-translate-y-0.5 hover:bg-amber-300 transition-all"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
            <span>Hub</span>
          </Link>

          <span className="px-3 py-1 bg-emerald-200 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl border-2 border-slate-950 shadow-[2px_2px_0px_0px_#000]">
            Desafio de Idioma
          </span>
        </div>

        {/* Card Principal Bege Neobrutalista */}
        <div className="w-full bg-[#f6f0e8] border-4 border-slate-950 rounded-3xl p-5 sm:p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] flex flex-col items-center gap-6 text-slate-950">
          
          <IdiomaleTitle />
          <p className="text-slate-800 font-bold text-sm text-center -mt-2">
            Em qual país esta frase é falada?
          </p>

          {/* Caixa da Frase do Dia */}
          <div className="relative w-full bg-emerald-100 border-3 border-slate-950 rounded-2xl p-6 text-xl sm:text-2xl font-black text-center text-slate-950 shadow-[4px_4px_0px_0px_#000] my-2">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-400 text-slate-950 border-2 border-slate-950 px-3 py-0.5 rounded-md text-xs font-black uppercase tracking-wider shadow-[1.5px_1.5px_0px_0px_#000]">
              Frase do Dia
            </span>
            "{phrase}"
          </div>

          {/* Legenda de Pistas */}
          <div className="w-full flex items-center justify-between text-xs font-black text-slate-800 px-1 border-b-2 border-slate-950/20 pb-2">
            <span className="text-sm">Palpites ({guesses.length}/{MAX_GUESSES})</span>
            <div className="flex gap-2 text-[11px] uppercase">
              <span className="px-1.5 py-0.5 bg-white border border-slate-950 rounded">🌍 Cont.</span>
              <span className="px-1.5 py-0.5 bg-white border border-slate-950 rounded">🧭 Hemis.</span>
              <span className="px-1.5 py-0.5 bg-white border border-slate-950 rounded">👥 Pop.</span>
            </div>
          </div>

          {/* Lista de Palpites Feitos */}
          <div className="w-full flex flex-col gap-2.5">
            {guesses.map((g, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-white border-3 border-slate-950 rounded-2xl p-3 shadow-[3px_3px_0px_0px_#000]"
              >
                <span className="font-black text-slate-950 text-base sm:text-lg pl-1">
                  {g.guessName}
                </span>

                <div className="flex gap-2">
                  {/* Continente */}
                  <div
                    className={`w-9 h-9 flex items-center justify-center rounded-xl border-2 border-slate-950 font-black shadow-[1.5px_1.5px_0px_0px_#000] ${
                      g.continentMatch ? "bg-emerald-400 text-slate-950" : "bg-slate-200 text-slate-500"
                    }`}
                    title="Continente"
                  >
                    {g.continentMatch ? <Check size={20} strokeWidth={3} /> : <X size={20} strokeWidth={3} />}
                  </div>

                  {/* Hemisfério */}
                  <div
                    className={`w-9 h-9 flex items-center justify-center rounded-xl border-2 border-slate-950 font-black shadow-[1.5px_1.5px_0px_0px_#000] ${
                      g.hemisphereMatch ? "bg-emerald-400 text-slate-950" : "bg-slate-200 text-slate-500"
                    }`}
                    title="Hemisfério"
                  >
                    {g.hemisphereMatch ? <Check size={20} strokeWidth={3} /> : <X size={20} strokeWidth={3} />}
                  </div>

                  {/* População */}
                  <div
                    className={`w-9 h-9 flex items-center justify-center rounded-xl border-2 border-slate-950 font-black shadow-[1.5px_1.5px_0px_0px_#000] ${
                      g.populationHint === "correct"
                        ? "bg-emerald-400 text-slate-950"
                        : "bg-amber-300 text-slate-950"
                    }`}
                    title="População"
                  >
                    {g.populationHint === "correct" ? (
                      <Equal size={20} strokeWidth={3} />
                    ) : g.populationHint === "higher" ? (
                      <ArrowUp size={20} strokeWidth={3} />
                    ) : (
                      <ArrowDown size={20} strokeWidth={3} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Campo de Palpite e Autocomplete */}
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
                  placeholder="DIGITE O NOME DO PAÍS..."
                  className="w-full sm:flex-1 bg-white border-3 border-slate-950 focus:bg-amber-100 outline-none rounded-xl px-4 py-3 text-slate-950 font-black placeholder:text-slate-400 placeholder:font-bold text-sm uppercase shadow-[3px_3px_0px_0px_#000] transition-all"
                />

                <button
                  onClick={submitGuess}
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 text-slate-950 font-black text-base px-6 py-3 rounded-xl border-3 border-slate-950 shadow-[3px_3px_0px_0px_#000] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer whitespace-nowrap"
                >
                  <Send className="w-4 h-4" strokeWidth={2.5} />
                  <span>{loading ? "..." : "Enviar"}</span>
                </button>
              </div>

              {/* Dropdown Autocomplete */}
              {showDropdown && filteredCountries.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-3 border-slate-950 rounded-xl overflow-hidden z-20 shadow-[5px_5px_0px_0px_#000]">
                  {filteredCountries.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setCurrent(c.name);
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2.5 font-black text-slate-950 text-sm hover:bg-emerald-200 uppercase border-b border-slate-200 last:border-b-0 transition-colors"
                    >
                      {c.name}
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
        Meridiano Idiomale · Desafio Diário
      </footer>

    </div>
  );
}