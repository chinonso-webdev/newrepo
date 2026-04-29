import dbConnect from "@/libs/dbConnect";
import history from "@/model/history";
import user from "@/model/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: any) {
    await dbConnect()

    const histories = await history.find({
        confirmed: 'pending'
    }).exec()

    return NextResponse.json(histories);
}


export async function PUT(request: NextRequest) {

    await dbConnect()
    let Mainuser
    try {
        const requestBody = await request.json()
        console.log(requestBody)
        const histories = await history.findById(requestBody?._id)
        histories.confirmed = 'confirmed'
        Mainuser = await user.findById(histories.user);
        let key = `${requestBody?.coin}`
        if (histories.direction === 'in') {
            Mainuser.balance[key] += requestBody?.amount;
        } else if (histories.direction === 'out') {
            Mainuser.balance[key] -= requestBody?.amount;
        }
        await histories.save();
        await Mainuser.save();

        console.log(Mainuser, requestBody?.amount)
    } catch (err) {
        console.log(err)
    }
    return NextResponse.json(Mainuser);
}


export async function DELETE(request: NextRequest) {
    await dbConnect()
    const url = new URL(request.url)

    const id = url.searchParams.get("id")
    console.log(id)
    try {
        await history.findByIdAndDelete(id)
        return NextResponse.json(null);
    } catch (err) {
        console.log(err)
    }
}