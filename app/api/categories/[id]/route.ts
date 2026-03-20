// =============================================================
// Sách Nhà Giang - Categories Individual API (PUT, DELETE)
// =============================================================

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        if (session?.user?.role !== "ADMIN") {
            return NextResponse.json({ success: false, error: "Không có quyền" }, { status: 403 });
        }

        const body = await request.json();

        const category = await prisma.category.update({
            where: { id },
            data: {
                name: body.name,
                slug: body.slug,
                description: body.description,
                icon: body.icon,
                image: body.image,
            },
        });

        return NextResponse.json({ success: true, data: category });
    } catch (error) {
        console.error("Update Category Error:", error);
        return NextResponse.json({ success: false, error: "Lỗi cập nhật danh mục" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        if (session?.user?.role !== "ADMIN") {
            return NextResponse.json({ success: false, error: "Không có quyền" }, { status: 403 });
        }

        // Find all books in this category to cascade hard delete everything
        const books = await prisma.book.findMany({ where: { categoryId: id }, select: { id: true } });
        const bookIds = books.map((b: any) => b.id);

        // Cascade hard delete: delete associated data for these books, then the books, then the category
        await prisma.$transaction([
            prisma.review.deleteMany({ where: { bookId: { in: bookIds } } }),
            prisma.cartItem.deleteMany({ where: { bookId: { in: bookIds } } }),
            prisma.orderItem.deleteMany({ where: { bookId: { in: bookIds } } }),
            prisma.book.deleteMany({ where: { categoryId: id } }),
            prisma.category.delete({ where: { id } }),
        ]);

        return NextResponse.json({ success: true, message: "Đã xóa vĩnh viễn danh mục và dữ liệu liên quan khỏi Database" });
    } catch (error) {
        console.error("Delete Category Error:", error);
        return NextResponse.json({ success: false, error: "Lỗi xóa danh mục" }, { status: 500 });
    }
}
