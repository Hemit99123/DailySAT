import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/mongo";
import { Db } from "mongodb";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const league = searchParams.get("league");

    if (!league) {
      return NextResponse.json(
        { error: "League parameter is required" },
        { status: 400 }
      );
    }
    const validLeagues = ["Bronze", "Silver", "Gold", "Platinum"];
    if (!validLeagues.includes(league)) {
      return NextResponse.json(
        { error: "Invalid league parameter" },
        { status: 400 }
      );
    }
    await client.connect();
    const db: Db = client.db("DailySAT");

    const leaderboardData = await db
      .collection("leaderboard")
      .find({ league: league })
      .sort({ points: -1, wins: -1 })
      .toArray();

    return NextResponse.json({
      message: "Leaderboard successfully retrieved",
      data: leaderboardData,
      league: league,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch leaderboard data" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
