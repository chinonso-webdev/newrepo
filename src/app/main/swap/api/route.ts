import dbConnect from "@/libs/dbConnect";
import user from "@/model/user";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  await dbConnect();
  const body = await request.json();
  try {
    const existingUser = await user.findOne({
      email: body.email,
    });

    existingUser.balance[body.from] -= body.fromAmount;
    existingUser.balance[body.to] = +body.toAmount;

    await existingUser.save();
    return NextResponse.json(existingUser);
  } catch (err) {
    throw new Error(`big error : ${err}`);
  }
}
