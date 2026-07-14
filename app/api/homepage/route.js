import { NextResponse } from "next/server";
import { getHomepageData } from "@/lib/public-data";

export async function GET() {
  const homepage = await getHomepageData();
  return NextResponse.json(homepage);
}
