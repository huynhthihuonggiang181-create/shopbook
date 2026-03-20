export const dynamic = 'force-dynamic';
// =============================================================
// ShopBook - Admin Stats API (Real DB)
// =============================================================

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const [totalBooks, totalUsers, totalOrders, categories] = await Promise.all([
            prisma.book.count({ where: { deletedAt: null } }),
            prisma.user.count({ where: { deletedAt: null } }),
            prisma.order.count({ where: { deletedAt: null } }),
            prisma.category.findMany({
                where: { deletedAt: null },
                include: { _count: { select: { books: true } } },
            }),
        ]);

        // Revenue
        const orders = await prisma.order.findMany({
            where: { status: { in: ["PAID", "COMPLETED"] }, deletedAt: null },
            select: { total: true, createdAt: true },
        });

        const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total), 0);

        // Recent orders
        const recentOrders = await prisma.order.findMany({
            where: { deletedAt: null },
            include: {
                user: { select: { name: true, email: true } },
                _count: { select: { items: true } },
            },
            orderBy: { createdAt: "desc" },
            take: 10,
        });

        // Top selling books
        const topBooks = await prisma.book.findMany({
            where: { deletedAt: null },
            orderBy: { sold: "desc" },
            take: 5,
            select: { id: true, title: true, sold: true, price: true, salePrice: true, image: true },
        });

        return NextResponse.json({
            success: true,
            data: {
                totalBooks,
                totalUsers,
                totalOrders,
                totalRevenue,
                categories: categories.map((c) => ({ ...c, bookCount: c._count.books })),
                recentOrders: recentOrders.map((o) => ({
                    ...o,
                    total: Number(o.total),
                    subtotal: Number(o.subtotal),
                    shippingFee: Number(o.shippingFee),
                })),
                topBooks: topBooks.map((b) => ({
                    ...b,
                    price: Number(b.price),
                    salePrice: b.salePrice ? Number(b.salePrice) : null,
                })),
            },
        });
    } catch (error) {
        console.error("Admin Stats Error:", error);
        return NextResponse.json({ success: false, error: "Lỗi hệ thống" }, { status: 500 });
    }
}

