export const dynamic = 'force-dynamic';
// =============================================================
// ShopBook - Admin Orders API (Real DB)
// =============================================================

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get("search") || "";
        const status = searchParams.get("status") || "";

        const where: any = { deletedAt: null };
        if (search) {
            where.OR = [
                { orderNumber: { contains: search } },
                { user: { name: { contains: search } } },
            ];
        }
        if (status) {
            where.status = status;
        }

        const orders = await prisma.order.findMany({
            where,
            include: {
                user: { select: { name: true, email: true } },
                items: {
                    include: { book: { select: { title: true, image: true } } },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        const serialized = orders.map((o) => ({
            ...o,
            total: Number(o.total),
            subtotal: Number(o.subtotal),
            shippingFee: Number(o.shippingFee),
            items: o.items.map((i) => ({ ...i, price: Number(i.price) })),
        }));

        return NextResponse.json({ success: true, data: serialized });
    } catch (error) {
        console.error("Admin Orders Error:", error);
        return NextResponse.json({ success: false, error: "Lỗi hệ thống" }, { status: 500 });
    }
}

// Update order status
export async function PUT(request: NextRequest) {
    try {
        const { orderId, status } = await request.json();

        const order = await prisma.order.update({
            where: { id: orderId },
            data: { status },
        });

        return NextResponse.json({
            success: true,
            data: { ...order, total: Number(order.total) },
        });
    } catch (error) {
        console.error("Update Order Error:", error);
        return NextResponse.json({ success: false, error: "Lỗi cập nhật" }, { status: 500 });
    }
}

