import { NextResponse } from "next/server";
import { evaluateGuess, getSecretOfTheDay } from "../gameLogic";

export async function POST(request) {
  const { guess } = await request.json();
  const guessYear = parseInt(guess, 10);

  if (isNaN(guessYear)) {
    return NextResponse.json({ error: "Digite um ano válido." }, { status: 400 });
  }

  const secret = getSecretOfTheDay();
  const result = evaluateGuess(guessYear, secret.year);

  return NextResponse.json({
    ...result,
    revealedYear: result.won ? secret.year : null,
  });
}