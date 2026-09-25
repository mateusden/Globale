"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Sparkles } from "lucide-react";
import { todayKey } from "./utils";
import GlobaleTitle from "./GlobaleTitle";
import Keyboard from "./keyboard";

const MAX_GUESSES = 6;

export default function Home() {
  const [secretLength, setSecretLength] = useState(null);
  const [wordBreaks, setWordBreaks] = useState([]);
  const [rawSecret, setRawSecret] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [current, setCurrent] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [keyStates, setKeyStates] = useState({});
  const [loading, setLoading] = useState(false);

  // Busca as infos do dia no servidor
  useEffect(() => {
    async function loadWordInfo() {
      const res = await fetch("/globale/api/word-info");
      const data = await res.json();
      setSecretLength(data.length);
      setWordBreaks(data.wordBreaks);

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
        () => setMessage(`Sensacional! Era ${data.revealedSecret}.`),
        revealTime,
      );
    } else if (newGuesses.length >= MAX_GUESSES) {
      setGameOver(true);
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

  if (!secretLength) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
        <div className="bg-[#f6f0e8] border-4 border-slate-950 rounded-2xl p-6 shadow-[6px_6px_0px_0px_#000] text-slate-950 font-black flex items-center gap-3">
          <Sparkles className="animate-spin w-5 h-5 text-amber-500" />
          <span>Carregando o desafio do dia...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-between p-4 sm:p-6">
      
      {/* Botão de Voltar + Card Principal */}
      <div className="w-full max-w-2xl flex flex-col items-center gap-4">
        
        {/* Topo com Voltar */}
        <div className="w-full flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl border-2 border-slate-950 shadow-[3px_3px_0px_0px_#000] hover:-translate-y-0.5 hover:bg-amber-300 transition-all"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
            <span>Hub</span>
          </Link>

          <span className="px-3 py-1 bg-sky-200 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl border-2 border-slate-950 shadow-[2px_2px_0px_0px_#000]">
            {secretLength} Letras · {wordBreaks.length + 1} Palavra(s)
          </span>
        </div>

        {/* Card Neobrutalista do Jogo */}
        <div className="w-full bg-[#f6f0e8] border-4 border-slate-950 rounded-3xl p-5 sm:p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] flex flex-col items-center gap-6 text-slate-950">
          
          <GlobaleTitle />

          {/* Grade de Palavras / Tabuleiro */}
          <div className="w-full overflow-x-auto py-2">
            <div className="flex flex-col gap-1.5 sm:gap-2 w-fit mx-auto">
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
                  <div className="flex gap-1 sm:gap-1.5 justify-center" key={rowIdx}>
                    {displayLetters.split("").map((ch, colIdx) => {
                      const state = submitted ? submitted.result[colIdx] : "";
                      
                      // Estilos Neobrutalistas para os blocos
                      let bgStyle = "bg-white text-slate-950 border-slate-950 shadow-[2px_2px_0px_0px_#000]";
                      
                      if (state === "correct") {
                        bgStyle = "bg-emerald-400 text-slate-950 border-slate-950 shadow-[2px_2px_0px_0px_#000]";
                      } else if (state === "present") {
                        bgStyle = "bg-amber-300 text-slate-950 border-slate-950 shadow-[2px_2px_0px_0px_#000]";
                      } else if (state === "absent") {
                        bgStyle = "bg-slate-300 text-slate-600 border-slate-950 shadow-[1px_1px_0px_0px_#000]";
                      }

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
                            className={`w-9 h-10 sm:w-12 sm:h-12 flex text-lg sm:text-2xl items-center justify-center border-3 rounded-xl font-black uppercase transition-all ${bgStyle} ${
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

          {/* Botão de Enviar */}
          <button
            onClick={submitGuess}
            disabled={loading || gameOver}
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-black text-base px-6 py-2.5 rounded-xl border-3 border-slate-950 shadow-[3px_3px_0px_0px_#000] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" strokeWidth={2.5} />
            <span>{loading ? "Verificando..." : "Enviar Tentativa"}</span>
          </button>

          {/* Mensagem / Feedback */}
          {message && (
            <div className="w-full bg-amber-200 border-3 border-slate-950 rounded-xl p-3 text-center text-slate-950 font-black text-sm sm:text-base shadow-[3px_3px_0px_0px_#000] animate-bounce">
              {message}
            </div>
          )}

          {/* Teclado Virtual */}
          <div className="w-full pt-2">
            <Keyboard
              onKeyPress={handleKeyPress}
              onEnter={submitGuess}
              onBackspace={handleBackspace}
              keyStates={keyStates}
            />
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="pt-6 text-center text-slate-500 text-xs">
        Meridiano Globale · Desafio Diário
      </footer>

    </div>
  );
}