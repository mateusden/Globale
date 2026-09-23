import { NextResponse } from "next/server";
import { evaluateGuess, getSecretOfTheDay } from "../gameLogic";

export async function POST(request) {
  const { guess } = await request.json();
  const secret = getSecretOfTheDay();
  const result = evaluateGuess(guess, secret);

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({
    guess,
    won: result.won,
    regionMatch: result.regionMatch,
    yearDirection: result.yearDirection,
    revealedSecret: result.won ? { name: secret.name, period: secret.period } : null,
  });
}