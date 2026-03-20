export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const flashSales = await prisma.flashSale.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                _count: { select: { items: true } }
            }
        });
        return NextResponse.json({ success: true, data: flashSales });
    } catch (error) {
        console.error("GET FlashSales Error:", error);
        return NextResponse.json({ success: false, error: "Lỗi hệ thống" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (session?.user?.role !== "ADMIN") {
            return NextResponse.json({ success: false, error: "Không có quyền" }, { status: 403 });
        }

        const body = await request.json();
        const { name, startDate, endDate, status, items } = body;

        if (!name || !startDate || !endDate) {
            return NextResponse.json({ success: false, error: "Thiếu thông tin bắt buộc" }, { status: 400 });
        }

        const flashSale = await prisma.flashSale.create({
            data: {
                name,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                status: status || "ACTIVE",
                items: {
                    create: items ? items.map((item: any) => ({
                        bookId: item.bookId,
                        discountPrice: item.discountPrice
                    })) : []
                }
            },
            include: { items: true }
        });

        return NextResponse.json({ success: true, data: flashSale }, { status: 201 });
    } catch (error) {
        console.error("Create FlashSale Error:", error);
        return NextResponse.json({ success: false, error: "Lỗi tạo chương trình Flash Sale" }, { status: 500 });
    }
}

