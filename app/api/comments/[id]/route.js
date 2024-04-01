import connectMongoDB from "@/lib/mongodb";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const comment = await Comment.find({ photoId: id });
  return NextResponse.json({ comment }, { status: 200 });
}
