export const dynamic = 'force-dynamic';
// =============================================================
// ShopBook - Categories API (Real DB)
// =============================================================

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            where: { deletedAt: null },
            include: { _count: { select: { books: true } } },
            orderBy: { name: "asc" },
        });

        return NextResponse.json({ success: true, data: categories });
    } catch (error) {
        console.error("Categories API Error:", error);
        return NextResponse.json({ success: false, error: "Lỗi hệ thống" }, { status: 500 });
    }
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (session?.user?.role !== "ADMIN") {
            return NextResponse.json({ success: false, error: "Không có quyền" }, { status: 403 });
        }

        const body = await request.json();

        const category = await prisma.category.create({
            data: {
                name: body.name,
                slug: body.slug,
                description: body.description || "",
                icon: body.icon || "📚",
                image: body.image || null,
            },
        });

        return NextResponse.json({ success: true, data: category }, { status: 201 });
    } catch (error) {
        console.error("Create Category Error:", error);
        return NextResponse.json({ success: false, error: "Lỗi tạo danh mục" }, { status: 500 });
    }
}

