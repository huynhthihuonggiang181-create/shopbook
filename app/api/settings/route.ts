import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const settings = await prisma.setting.findMany();
        const data = settings.reduce((acc: any, curr: any) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});
        return NextResponse.json({ success: true, data });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message || "Lỗi Server" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json(); // { contact_address: "...", contact_phone: "..." }

        for (const [key, value] of Object.entries(body)) {
            await prisma.setting.upsert({
                where: { key },
                update: { value: String(value) },
                create: { key, value: String(value) },
            });
        }

        return NextResponse.json({ success: true });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message || "Lỗi Server" }, { status: 500 });
    }
}
