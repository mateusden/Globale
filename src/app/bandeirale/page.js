"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import BandeiraleTitle from "./BandeiraleTitle";
import { FLAGS_DATA } from "./data";
import { ArrowLeft, Check, X, ArrowUp, ArrowDown } from "lucide-react";

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

    const newGuesses = [...guesses, data];
    setGuesses(newGuesses);
    setCurrent("");
    setMessage("");

    if (data.won) {
      setGameOver(true);
      setMessage(
        `Isso! Era ${data.revealedSecret.name} (${data.revealedSecret.period}).`,
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

  if (!flagFile) return <div className="p-8 text-white">Carregando...</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-8 gap-4">
      <Link
        href="/"
        className="self-start text-slate-400 hover:text-white mb-2"
      >
        <ArrowLeft size={24} />
      </Link>

      <BandeiraleTitle />
      <p className="text-slate-400 mb-2 text-sm text-center max-w-md">
        Que país/entidade histórica é essa bandeira?
      </p>

      <div className="relative bg-slate-800 border-2 border-amber-700/40 rounded-xl p-6 max-w-md shadow-lg w-full">
        <span className="absolute -top-3 left-4 bg-slate-900 px-2 text-xs text-amber-600 font-bold tracking-wide">
          BANDEIRA DO DIA
        </span>
        <div className="w-full aspect-[3/2] rounded-lg overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center p-2">
          <img
            src={`/flags/${flagFile}`}
            alt="Bandeira do dia"
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <p className="text-amber-600 text-xs text-center mt-3">{region}</p>
      </div>

      <div className="flex flex-col gap-2 w-full max-w-md">
        {guesses.length > 0 && (
          <div className="flex justify-end gap-3 text-xs text-slate-500 w-full max-w-md">
            <span>🌍 Região</span>
            <span>📅 Período</span>
          </div>
        )}
        {guesses.map((g, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-slate-800 border-2 border-slate-700 rounded-lg px-4 py-3"
          >
            <span className="font-bold">{g.guess}</span>
            {!g.won && (
              <div className="flex gap-2">
                <div
                  className={`w-9 h-9 flex items-center justify-center rounded-lg ${
                    g.regionMatch ? "bg-green-700" : "bg-slate-700"
                  }`}
                  title="Região"
                >
                  {g.regionMatch ? <Check size={18} /> : <X size={18} />}
                </div>
                <div
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-amber-700"
                  title="Período"
                >
                  {g.yearDirection === "depois" ? (
                    <ArrowUp size={18} />
                  ) : (
                    <ArrowDown size={18} />
                  )}
                </div>
              </div>
            )}
            {g.won && (
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-green-700">
                <Check size={18} />
              </div>
            )}
          </div>
        ))}
      </div>

      {!gameOver && (
        <div className="w-full max-w-md relative">
          <div className="flex flex-col items-center sm:flex-row gap-2">
            <input
              type="text"
              value={current}
              onChange={(e) => {
                setCurrent(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onKeyDown={handleKeyDown}
              placeholder="Nome do país/entidade"
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

          {showDropdown && filteredFlags.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border-2 border-slate-700 rounded-lg overflow-hidden z-10">
              {filteredFlags.map((f) => (
                <button
                  key={f.name}
                  onClick={() => {
                    setCurrent(f.name);
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-700"
                >
                  {f.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <p className="text-sm h-6 text-center">{message}</p>
    </div>
  );
}
