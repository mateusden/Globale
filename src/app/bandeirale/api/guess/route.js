import { NextResponse } from "next/server";
import { evaluateGuess, getSecretOfTheDay } from "../gameLogic";

export async function POST(request) {
  const { guess } = await request.json();
  const secret = getSecretOfTheDay();
  const result = evaluateGuess(guess, secret);

  return NextResponse.json({
    guess,
    won: result.won,
    regionMatch: result.regionMatch,
    yearDirection: result.yearDirection,
    revealedSecret: result.won ? { name: secret.name, period: secret.period } : null,
  });
}