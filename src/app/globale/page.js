"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { todayKey } from "./utils";
import GlobaleTitle from "./GlobaleTitle";
import Keyboard from "./keyboard";

const MAX_GUESSES = 6;

export default function Home() {
  const [secretLength, setSecretLength] = useState(null);
  const [wordBreaks, setWordBreaks] = useState([]);
  const [rawSecret, setRawSecret] = useState(""); // só preenchido quando revelado
  const [guesses, setGuesses] = useState([]);
  const [current, setCurrent] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [keyStates, setKeyStates] = useState({});
  const [loading, setLoading] = useState(false);

  // Busca as infos do dia no servidor (tamanho da palavra, etc)
  useEffect(() => {
    async function loadWordInfo() {
      const res = await fetch("/globale/api/word-info");
      const data = await res.json();
      setSecretLength(data.length);
      setWordBreaks(data.wordBreaks);

      // tenta carregar progresso salvo
      const saved = localStorage.getItem(todayKey());
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.secretLength === data.length) {
          setGuesses(parsed.guesses);
          setGameOver(parsed.gameOver);
          setKeyStates(parsed.keyStates);
          setRawSecret(parsed.rawSecret || "");
          if (parsed.gameOver) setMessage(parsed.message);
        } else {
          localStorage.removeItem(todayKey());
        }
      }
    }
    loadWordInfo();
  }, []);

  // Salva progresso
  useEffect(() => {
    if (guesses.length === 0) return;
    localStorage.setItem(
      todayKey(),
      JSON.stringify({
        guesses,
        gameOver,
        keyStates,
        message,
        rawSecret,
        secretLength,
      }),
    );
  }, [guesses, gameOver, keyStates, message, rawSecret, secretLength]);

  const submitGuess = useCallback(async () => {
    if (gameOver || !secretLength || loading) return;
    if (current.length !== secretLength) {
      setMessage(`Digite um país com ${secretLength} letras.`);
      return;
    }

    setLoading(true);
    const res = await fetch("/globale/api/guess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guess: current }),
    });
    const data = await res.json();
    setLoading(false);

    if (data.error) {
      setMessage(data.error);
      return;
    }

    const newGuesses = [
      ...guesses,
      { guess: current.toUpperCase(), result: data.result },
    ];
    setGuesses(newGuesses);
    setCurrent("");
    setMessage("");

    setKeyStates((prev) => {
      const updated = { ...prev };
      const rank = { absent: 0, present: 1, correct: 2 };
      current
        .toUpperCase()
        .split("")
        .forEach((ch, i) => {
          const state = data.result[i];
          if (!updated[ch] || rank[state] > rank[updated[ch]]) {
            updated[ch] = state;
          }
        });
      return updated;
    });

    const revealTime = secretLength * 150 + 400;

    if (data.won) {
      setGameOver(true);
      setRawSecret(data.revealedSecret);
      setTimeout(
        () => setMessage(`Isso! Era ${data.revealedSecret}.`),
        revealTime,
      );
    } else if (newGuesses.length >= MAX_GUESSES) {
      setGameOver(true);
      // busca a resposta certa só agora que perdeu, numa rota separada
      const revealRes = await fetch("/globale/api/reveal");
      const revealData = await revealRes.json();
      setRawSecret(revealData.secret);
      setTimeout(
        () => setMessage(`Não foi dessa vez. Era ${revealData.secret}.`),
        revealTime,
      );
    }
  }, [current, secretLength, guesses, gameOver, loading]);

  useEffect(() => {
    function handleKey(e) {
      if (gameOver || !secretLength) return;
      if (e.key === "Enter") submitGuess();
      else if (e.key === "Backspace") setCurrent((c) => c.slice(0, -1));
      else if (/^[a-zA-Z]$/.test(e.key) && current.length < secretLength) {
        setCurrent((c) => c + e.key.toUpperCase());
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameOver, submitGuess, current, secretLength]);

  const handleKeyPress = (ch) => {
    if (gameOver || !secretLength) return;
    if (current.length < secretLength) setCurrent((c) => c + ch);
  };

  const handleBackspace = () => {
    if (gameOver) return;
    setCurrent((c) => c.slice(0, -1));
  };

  if (!secretLength) return <div className="p-8 text-white">Carregando...</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-8 gap-4">
      <Link
        href="/"
        className="self-start text-slate-400 hover:text-amber-600 transition-colors mb-2"
      >
        <ArrowLeft size={24} />
      </Link>
      <GlobaleTitle />
      <p className="text-slate-400 text-sm">
        {secretLength} letras, em {wordBreaks.length + 1} palavra(s).
      </p>
      <div className="w-full overflow-x-auto px-2">
        <div className="flex flex-col gap-1 sm:gap-1.5 w-fit mx-auto">
          {Array.from({ length: MAX_GUESSES }).map((_, rowIdx) => {
            const submitted = guesses[rowIdx];
            const displayLetters = submitted
              ? submitted.guess
              : rowIdx === guesses.length
                ? current.padEnd(secretLength, " ")
                : "".padEnd(secretLength, " ");

            const isLastSubmittedRow =
              submitted && rowIdx === guesses.length - 1;

            return (
              <div className="flex gap-0.5 sm:gap-1" key={rowIdx}>
                {displayLetters.split("").map((ch, colIdx) => {
                  const state = submitted ? submitted.result[colIdx] : "";
                  const bg =
                    state === "correct"
                      ? "bg-green-700 border-green-700"
                      : state === "present"
                        ? "bg-yellow-700 border-yellow-700"
                        : state === "absent"
                          ? "bg-slate-700 border-slate-700"
                          : "bg-slate-900 border-slate-600";

                  return (
                    <span key={colIdx} className="flex gap-1">
                      {wordBreaks.includes(colIdx) && (
                        <span className="w-2 sm:w-3" />
                      )}
                      <span
                        style={
                          isLastSubmittedRow
                            ? { animationDelay: `${colIdx * 150}ms` }
                            : {}
                        }
                        className={`w-8 h-9 sm:w-12 sm:h-12 flex text-xl text-yellow-100 items-center justify-center border-2 rounded font-bold  uppercase ${bg} ${
                          isLastSubmittedRow ? "tile-flip" : ""
                        }`}
                      >
                        {ch.trim()}
                      </span>
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={submitGuess}
        disabled={loading}
        className="bg-amber-400 hover:bg-amber-300 text-yellow-900 hover:text-yellow-800 disabled:opacity-50 px-5 py-2 rounded-sm text-lg font-bold mt-2"
      >
        {loading ? "..." : "Enviar"}
      </button>

      <Keyboard
        onKeyPress={handleKeyPress}
        onEnter={submitGuess}
        onBackspace={handleBackspace}
        keyStates={keyStates}
      />

      <p className="text-base h-6">{message}</p>
    </div>
  );
}
