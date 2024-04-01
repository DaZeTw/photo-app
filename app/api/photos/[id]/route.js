import connectMongoDB from "@/lib/mongodb";
import Photo from "@/models/Photo";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const photo = await Photo.find({ _id: id });
  return NextResponse.json({ photo }, { status: 200 });
}
