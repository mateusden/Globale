import { FLAGS_DATA } from "../data";

function getBrazilDateString() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(now);
}

export function dailySeed() {
  const dateStr = getBrazilDateString() + "-bandeirale";
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function getSecretOfTheDay() {
  const idx = dailySeed() % FLAGS_DATA.length;
  return FLAGS_DATA[idx];
}

function normalizeText(s) {
  return s
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getStartYear(period) {
  // period vem tipo "1922–1991", pega o primeiro número
  return parseInt(period.split(/[–-]/)[0].trim(), 10);
}

export function evaluateGuess(guessName, secret) {
  const won = normalizeText(guessName) === normalizeText(secret.name);

  const guessEntry = FLAGS_DATA.find(
    (f) => normalizeText(f.name) === normalizeText(guessName)
  );

  if (!guessEntry) {
    return { won, regionMatch: null, yearDirection: null };
  }

  const regionMatch = guessEntry.region === secret.region;

  const guessYear = getStartYear(guessEntry.period);
  const secretYear = getStartYear(secret.period);
  let yearDirection = null;
  if (!won) {
    yearDirection = secretYear > guessYear ? "depois" : "antes";
  }

  return { won, regionMatch, yearDirection };
}