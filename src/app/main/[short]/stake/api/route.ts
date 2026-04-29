import dbConnect from "@/libs/dbConnect";
import { NextResponse } from "next/server";
import stakeSchema from "@/model/userstake";
import User from "@/model/user";

export async function GET(request: any) {
  await dbConnect();

  const stakes = await stakeSchema.find({});

  return NextResponse.json(stakes);
}

export async function POST(request: any) {
  await dbConnect();
  let step = 0;
  const body = await request.json();
  let stake;
  try {
    stake = await stakeSchema.create(body);
    step = 1;
    const user = await User.findById(body.user);
    user.balance[body.coin] = user.balance[body.coin] -= body.amount;
    await user.save();
    step = 2;
    return NextResponse.json(stake);
  } catch (err) {
    if (step === 1) {
      await stakeSchema.findByIdAndDelete(stake._id);
      return NextResponse.error();
    }
  }
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
