import { COUNTRIES_DATA } from "../data";

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

function normalizeText(s) {
  return s
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function dailySeed() {
  // soma um valor fixo pra não coincidir com o país do dia do Globale
  const dateStr = getBrazilDateString() + "-idiomale";
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function getSecretOfTheDay() {
  const idx = dailySeed() % COUNTRIES_DATA.length;
  return COUNTRIES_DATA[idx];
}

export function evaluateGuess(guessName, secretCountry) {
  const guessCountry = COUNTRIES_DATA.find(
    (c) => normalizeText(c.name) === normalizeText(guessName)
  );

  if (!guessCountry) {
    return { error: "País não encontrado na lista." };
  }

  const continentMatch = guessCountry.continent === secretCountry.continent;
  const hemisphereMatch = guessCountry.hemisphere === secretCountry.hemisphere;

  let populationHint;
  if (guessCountry.population === secretCountry.population) {
    populationHint = "correct";
  } else if (guessCountry.population < secretCountry.population) {
    populationHint = "higher"; // a resposta certa tem população MAIOR que o palpite
  } else {
    populationHint = "lower"; // a resposta certa tem população MENOR que o palpite
  }

  const won = guessCountry.name === secretCountry.name;

  return {
    guessName: guessCountry.name,
    continentMatch,
    hemisphereMatch,
    populationHint,
    won,
  };
}