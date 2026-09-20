"use client";

import IdiomaleTitle from "./IdiomaleTitle";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Check, X, ArrowUp, ArrowDown, Equal } from "lucide-react";
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
      setMessage(`Isso! Era ${data.revealedSecret}.`);
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

  if (!phrase) return <div className="p-8 text-white">Carregando...</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-8 gap-4">
      <Link
        href="/"
        className="self-start text-slate-400 hover:text-white mb-2"
      >
        <ArrowLeft size={24} />
      </Link>

      <IdiomaleTitle />
      <p className="text-slate-400 text-sm text-center max-w-md">
        Qual país fala essa frase?
      </p>

      <div className="relative bg-slate-800 border-2 border-amber-700/40 rounded-xl px-8 py-6 text-2xl text-center max-w-md shadow-lg">
        <span className="absolute -top-3 left-4 bg-slate-900 px-2 text-xs text-amber-600 font-bold tracking-wide">
          FRASE DO DIA
        </span>
        {phrase}
      </div>

      <div className="flex flex-col gap-2 w-full max-w-md">
        <div className="flex justify-end gap-2 text-xs text-slate-500 w-full max-w-md">
          <span>🌍 Continente</span>
          <span>🧭 Hemisfério</span>
          <span>👥 População</span>
        </div>
        {guesses.map((g, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-slate-800 border-2 border-slate-700 rounded-lg px-4 py-3"
          >
            <span className="font-bold text-lg">{g.guessName}</span>
            <div className="flex gap-2">
              <div
                className={`w-9 h-9 flex items-center justify-center rounded-lg ${
                  g.continentMatch ? "bg-green-700" : "bg-slate-700"
                }`}
                title="Continente"
              >
                {g.continentMatch ? <Check size={18} /> : <X size={18} />}
              </div>
              <div
                className={`w-9 h-9 flex items-center justify-center rounded-lg ${
                  g.hemisphereMatch ? "bg-green-700" : "bg-slate-700"
                }`}
                title="Hemisfério"
              >
                {g.hemisphereMatch ? <Check size={18} /> : <X size={18} />}
              </div>
              <div
                className={`w-9 h-9 flex items-center justify-center rounded-lg ${
                  g.populationHint === "correct"
                    ? "bg-green-700"
                    : "bg-amber-700"
                }`}
                title="População"
              >
                {g.populationHint === "correct" ? (
                  <Equal size={18} />
                ) : g.populationHint === "higher" ? (
                  <ArrowUp size={18} />
                ) : (
                  <ArrowDown size={18} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {!gameOver && (
        <div className="w-full max-w-md relative">
          <div className="flex flex-col items-center sm:flex-row gap-2 w-full">
            <input
              type="text"
              value={current}
              onChange={(e) => {
                setCurrent(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onKeyDown={handleKeyDown}
              placeholder="Nome do país"
              className="w-full sm:flex-1 bg-slate-800 border-2 border-slate-700 focus:border-amber-600 outline-none rounded-lg px-4 py-3 text-white mb-1 uppercase transition-colors"
            />
            <button
              onClick={submitGuess}
              disabled={loading}
              className="w-40 sm:w-auto bg-amber-400 hover:bg-amber-300 text-yellow-900 hover:text-yellow-800 disabled:opacity-50 px-5 py-3 rounded-lg text-lg font-bold whitespace-nowrap"
            >
              {loading ? "..." : "Enviar"}
            </button>
          </div>

          {showDropdown && filteredCountries.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border-2 border-slate-700 rounded-lg overflow-hidden z-10">
              {filteredCountries.map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    setCurrent(c.name);
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-700 uppercase"
                >
                  {c.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <p className="text-base h-6">{message}</p>
    </div>
  );
}
