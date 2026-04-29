import dbConnect from "@/libs/dbConnect";
import history from "@/model/history";
import user from "@/model/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: any) {

}

export async function POST(request: NextRequest) {
    await dbConnect()

    const body = await request.json()
    console.log(body)
    let savedInfo
    try {
        savedInfo = await history.create({
            coin: body.coin,
            amount: body.amount,
            direction: body.direction,
            wallet : body.wallet,
            user : body.userid
        })
        const OurUser = await user.findOne({
            email : body.user
        });
        OurUser.history.push(savedInfo._id)
        await OurUser.save()
    } catch (err) {
        throw new Error(`big error : ${err}`)
    }
    return NextResponse.json(body);
}