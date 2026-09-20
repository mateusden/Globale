import { NextResponse } from "next/server";
import { getSecretOfTheDay } from "../gameLogic";

export async function GET() {
  const secret = getSecretOfTheDay();
  return NextResponse.json({
    name: secret.name,
    description: secret.description,
    region: secret.region,
  });
}