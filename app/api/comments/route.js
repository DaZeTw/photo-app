import connectMongoDB from "@/lib/mongodb";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { photoId, text } = await request.json();
  await connectMongoDB();
  await Comment.create({ photoId, text });
  return NextResponse.json({ message: "Comment Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const comments = await Comment.find();
  return NextResponse.json({ comments });
}
