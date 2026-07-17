import { NextResponse } from "next/server";
import { getHomepageData } from "@/lib/public-data";

export async function GET() {
  try {
    const homepage = await getHomepageData();
    return NextResponse.json(homepage);
  } catch (error) {
    console.error("Homepage API error:", error);
    return NextResponse.json(
      {
        featuredProducts: [],
        latestProducts: [],
        categories: [],
      },
      { status: 200 },
    );
  }
}
