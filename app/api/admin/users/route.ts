export const dynamic = 'force-dynamic';
// =============================================================
// ShopBook - Admin Users API (Real DB)
// =============================================================

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get("search") || "";

        const where: any = { deletedAt: null };
        if (search) {
            where.OR = [
                { name: { contains: search } },
                { email: { contains: search } },
            ];
        }

        const users = await prisma.user.findMany({
            where,
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                avatar: true,
                createdAt: true,
                _count: { select: { orders: true } },
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ success: true, data: users });
    } catch (error) {
        console.error("Admin Users Error:", error);
        return NextResponse.json({ success: false, error: "Lỗi hệ thống" }, { status: 500 });
    }
}

// Toggle user role
export async function PUT(request: NextRequest) {
    try {
        const { userId, role } = await request.json();

        const user = await prisma.user.update({
            where: { id: userId },
            data: { role },
            select: { id: true, name: true, email: true, role: true },
        });

        return NextResponse.json({ success: true, data: user });
    } catch (error) {
        console.error("Update User Error:", error);
        return NextResponse.json({ success: false, error: "Lỗi cập nhật" }, { status: 500 });
    }
}

