import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        const { id } = await params;
        const body = await request.json();
        const { action, fullName, phone, street, ward, district, city, isDefault } = body;

        if (action === "SET_DEFAULT" || isDefault) {
            await prisma.address.updateMany({
                where: { userId: session.user.id },
                data: { isDefault: false }
            });
        }

        const address = await prisma.address.update({
            where: { id, userId: session.user.id },
            data: action === "SET_DEFAULT" ? { isDefault: true } : {
                fullName, phone, street, ward, district, city, isDefault
            }
        });

        return NextResponse.json({ success: true, data: address });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Lỗi Update" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        const { id } = await params;
        await prisma.address.delete({ where: { id, userId: session.user.id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Lỗi Delete" }, { status: 500 });
    }
}
