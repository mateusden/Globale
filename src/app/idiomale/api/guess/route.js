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
    ...result,
    revealedSecret: result.won ? secret.name : null,
  });
}