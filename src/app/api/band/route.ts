import { NextResponse } from "next/server";
import { fetchPublicBand } from "@/lib/stagerise";

export const revalidate = 60;

export async function GET() {
  try {
    const payload = await fetchPublicBand();
    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to load StageRise band data",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 502 },
    );
  }
}
