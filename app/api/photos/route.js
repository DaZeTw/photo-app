import connectMongoDB from "@/lib/mongodb";
import Photo from "@/models/Photo";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { image } = await request.json();
  await connectMongoDB();
  await Photo.create({ image });
  return NextResponse.json({ message: "Photo Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const photos = await Photo.find();
  return NextResponse.json({ photos });
}
