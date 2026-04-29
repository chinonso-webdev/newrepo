import dbConnect from "@/libs/dbConnect";
import { NextResponse } from "next/server";
import stakeSchema from "@/model/stake";

export async function GET(request: any) {
  await dbConnect();

  const stakes = await stakeSchema.find({});

  return NextResponse.json(stakes);
}

export async function POST(request: any) {
  await dbConnect();

  const body = await request.json();

  const stake = await stakeSchema.create(body);

  return NextResponse.json(stake);
}

export async function PUT(request: any) {
  await dbConnect();

  const body = await request.json();

  const stake = await stakeSchema.findById(body._id);

  for (const key in body) {
    if (stake.hasOwnProperty(key)) {
      stake[key] = body[key];
    }
  }

  await stake.save();

  return NextResponse.json(stake);
}

export async function DELETE(request: any) {
  await dbConnect();

  const url = new URL(request.url);

  const id = url.searchParams.get("id");

  await stakeSchema.findByIdAndDelete(id);

  return NextResponse.json(true);
}
