import { NextResponse } from "next/server";
import { getWordBreaks, getSecretOfTheDay } from "../gameLogic";

export async function GET() {
  const rawSecret = getSecretOfTheDay();
  const wordBreaks = getWordBreaks(rawSecret);
  const length = rawSecret.replace(/ /g, "").length;

  return NextResponse.json({ length, wordBreaks });
}