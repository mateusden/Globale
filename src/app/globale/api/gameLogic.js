import { COUNTRIES } from "./countries";

export function normalize(s) {
  return s.toUpperCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Z]/g, "");
}

function getBrazilDateString() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(now); // retorna algo tipo "2026-09-18"
}

export function getWordBreaks(rawName) {
  const upper = rawName.toUpperCase();
  const breaks = [];
  let letterCount = 0;
  for (const ch of upper) {
    if (ch === " ") breaks.push(letterCount);
    else letterCount++;
  }
  return breaks;
}

export function dailySeed() {
  const dateStr = getBrazilDateString();
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function evaluateGuess(guess, secret) {
  const result = new Array(guess.length).fill("absent");
  const secretArr = secret.split("");
  const guessArr = guess.split("");
  const used = new Array(secretArr.length).fill(false);

  for (let i = 0; i < guessArr.length; i++) {
    if (guessArr[i] === secretArr[i]) {
      result[i] = "correct";
      used[i] = true;
    }
  }
  for (let i = 0; i < guessArr.length; i++) {
    if (result[i] === "correct") continue;
    for (let j = 0; j < secretArr.length; j++) {
      if (!used[j] && guessArr[i] === secretArr[j]) {
        result[i] = "present";
        used[j] = true;
        break;
      }
    }
  }
  return result;
}

export function getSecretOfTheDay() {
  const idx = dailySeed() % COUNTRIES.length;
  return COUNTRIES[idx];
}