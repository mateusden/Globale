import { NextResponse } from "next/server";
import { getSecretOfTheDay } from "../gameLogic";

export async function GET() {
    return NextResponse.json({ secret: getSecretOfTheDay() })    
}