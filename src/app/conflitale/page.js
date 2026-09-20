"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUp, ArrowDown, Check } from "lucide-react";
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

const PROXIMITY_COLOR = {
  correct: "bg-green-700",
  "muito perto": "bg-amber-600",
  perto: "bg-amber-700",
  longe: "bg-slate-700",
  "muito longe": "bg-slate-800",
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
      setMessage(`Isso! Foi em ${formatYear(data.revealedYear)}.`);
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

  if (!conflict) return <div className="p-8 text-white">Carregando...</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-8 gap-4">
      <Link
        href="/"
        className="self-start text-slate-400 hover:text-white mb-2"
      >
        <ArrowLeft size={24} />
      </Link>

      <ConflitaleTitle />
      <p className="text-slate-400 text-sm text-center max-w-md">
        Em que ano começou esse conflito?
      </p>

      <div className="relative bg-slate-800 border-2 border-amber-700/40 rounded-xl px-8 py-6 max-w-md shadow-lg">
        <span className="absolute -top-3 left-4 bg-slate-900 px-2 text-xs text-amber-600 font-bold tracking-wide">
          CONFLITO DO DIA
        </span>
        <p className="text-xl font-bold text-center">{conflict.name}</p>
        <p className="text-slate-400 text-sm text-center mt-2">
          {conflict.description}
        </p>
        <p className="text-amber-600 text-xs text-center mt-3">
          {conflict.region}
        </p>
      </div>

      <div className="flex flex-col gap-2 w-full max-w-md">
        {guesses.map((g, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-slate-800 border-2 border-slate-700 rounded-lg px-4 py-3"
          >
            <span className="font-bold text-lg">{formatYear(g.guessYear)}</span>
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-lg text-sm font-bold ${PROXIMITY_COLOR[g.proximity]}`}
              >
                {g.proximity === "correct" ? "Acertou!" : g.proximity}
              </span>
              {g.direction === "antes" && (
                <ArrowDown size={20} className="text-slate-400" />
              )}
              {g.direction === "depois" && (
                <ArrowUp size={20} className="text-slate-400" />
              )}
              {g.direction === "correct" && (
                <Check size={20} className="text-green-500" />
              )}
            </div>
          </div>
        ))}
      </div>

      {!gameOver && (
        <div className="flex flex-col items-center sm:flex-row gap-2 w-full max-w-md">
          <input
            type="number"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ano (ex: 1950 ou -264 para 264 a.C.)"
            className="w-full sm:flex-1 bg-slate-800 border-2 border-slate-700 focus:border-amber-600 outline-none rounded-lg px-4 py-3 text-white transition-colors"
          />
          <button
            onClick={submitGuess}
            disabled={loading}
            className="w-40 sm:w-auto bg-amber-400 hover:bg-amber-300 text-yellow-900 hover:text-yellow-800 disabled:opacity-50 px-5 py-3 rounded-lg text-lg font-bold whitespace-nowrap"
          >
            {loading ? "..." : "Enviar"}
          </button>
        </div>
      )}

      <p className="text-base h-6 text-center">{message}</p>
    </div>
  );
}
