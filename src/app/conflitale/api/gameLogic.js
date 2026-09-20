import { Hahmlet } from "next/font/google";
import { CONFLICTS_DATA } from "../data";

function getBrazilDateString() {
    const now = new Date()
    const formatter = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Sao_Paulo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    })
    return formatter.format(now);
}

export function dailySeed() {
    const dateStr = getBrazilDateString() + "-conflitale";
    let hash = 0
    for (let i = 0; i < dateStr.length; i++) {
        hash = (hash * 31 + dateStr.charCodeAt(i)) >>> 0;
    }
    return hash
}

export function getSecretOfTheDay() {
    const idx = dailySeed() % CONFLICTS_DATA.length
    return CONFLICTS_DATA[idx]
}

function getProximity(diff) {
    const abs = Math.abs(diff)
    if (abs === 0) return "correct";
    if (abs <= 5) return "muito perto";
    if (abs <= 20) return "perto"
    if (abs <= 50) return "longe"
    return "muito longe"
}

export function evaluateGuess(guessYear, secretYear) {
    const diff = secretYear - guessYear
    const won = diff === 0
    const direction = diff === 0 ? "correct" : diff > 0 ? "depois" : "antes";
    const proximity = getProximity(diff)

    return {
        guessYear,
        direction,
        proximity,
        won,
    }
}