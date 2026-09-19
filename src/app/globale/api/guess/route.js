import { NextResponse } from "next/server";
import { normalize, evaluateGuess, getSecretOfTheDay } from "../gameLogic";

export async function POST(request) {
  const { guess } = await request.json();

  const rawSecret = getSecretOfTheDay();
  const secret = normalize(rawSecret);
  const normalizedGuess = normalize(guess);

  if (normalizedGuess.length !== secret.length) {
    return NextResponse.json(
      { error: `O país precisa ter ${secret.length} letras.` },
      { status: 400 }
    );
  }

  const result = evaluateGuess(normalizedGuess, secret);
  const won = result.every((r) => r === "correct");

  return NextResponse.json({
    result,
    won,
    // só manda a resposta certa se ganhou (o cliente vai usar isso só nesse caso)
    revealedSecret: won ? rawSecret : null,
  });
}