import { db } from "../../../../config/db";
import { NextResponse } from "next/server";
import { generatedImages, prompt } from "../../../../models/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const collection = await db
      .select()
      .from(prompt)
      .innerJoin(generatedImages, eq(prompt.id, generatedImages.promptId));

    return NextResponse.json(collection);
  } catch (e) {
    return NextResponse.json(
      { message: "Something is wrong" },
      { status: 500 },
    );
  }
}
