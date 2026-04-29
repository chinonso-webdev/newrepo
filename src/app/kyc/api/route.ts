import dbConnect from "@/libs/dbConnect";
import user from "@/model/user";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { NextResponse, NextRequest } from "next/server";


export async function POST(req: NextRequest) {

    const contentType = req.headers.get("content-type") || "";

    if (!contentType.includes("multipart/form-data")) {
        return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get("frontImage");
        const id = formData.get("id");
        console.log(file)

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const buffer = Buffer.from(await (file as File).arrayBuffer());
        if (buffer.length > 2 * 1024 * 1024) {
            return NextResponse.json({ error: "File size exceeds 2MB" }, { status: 400 });
        }

        // Create uploads/kyc directory
        const uploadsDir = path.join(process.cwd(), "public", "uploads", "kyc");
        await mkdir(uploadsDir, { recursive: true });

        // Save file locally with timestamp as unique key
        const fileName = `${Date.now()}-${(file as File).name}`;
        const filePath = path.join(uploadsDir, fileName);
        await writeFile(filePath, buffer);

        // Store the public URL path in database
        const fileUrl = `/uploads/kyc/${fileName}`;
        
        await dbConnect()
        await user.findByIdAndUpdate({ _id: id }, { kyc: fileUrl })

        return NextResponse.json({ url: fileUrl }, { status: 200 });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
