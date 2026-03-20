// =============================================================
// ShopBook - Single Book API (Real DB)
// =============================================================

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        const book = await prisma.book.findUnique({
            where: { slug, deletedAt: null },
            include: {
                category: { select: { id: true, name: true, slug: true } },
                reviews: {
                    where: { deletedAt: null },
                    include: { user: { select: { id: true, name: true, avatar: true } } },
                    orderBy: { createdAt: "desc" },
                    take: 10,
                },
            },
        });

        if (!book) {
            return NextResponse.json({ success: false, error: "Không tìm thấy sách" }, { status: 404 });
        }

        // Related books
        const related = await prisma.book.findMany({
            where: { categoryId: book.categoryId, id: { not: book.id }, deletedAt: null },
            include: { category: { select: { id: true, name: true, slug: true } } },
            take: 5,
        });

        const serialize = (b: any) => ({
            ...b,
            price: Number(b.price),
            salePrice: b.salePrice ? Number(b.salePrice) : null,
        });

        return NextResponse.json({
            success: true,
            data: serialize(book),
            related: related.map(serialize),
        });
    } catch (error) {
        console.error("Book Detail API Error:", error);
        return NextResponse.json({ success: false, error: "Lỗi hệ thống" }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const body = await request.json();

        if (!body.title || !body.categoryId || body.price === undefined || body.price === null) {
            return NextResponse.json({ success: false, error: "Vui lòng nhập đủ thông tin bắt buộc (Tên sách, Danh mục, Giá bìa)" }, { status: 400 });
        }

        const book = await prisma.book.update({
            where: { slug },
            data: {
                title: body.title,
                author: body.author,
                description: body.description,
                price: body.price,
                salePrice: body.salePrice || null,
                stock: body.stock,
                featured: body.featured,
                category: { connect: { id: body.categoryId } },
                image: body.image,
            },
        });

        return NextResponse.json({
            success: true,
            data: { ...book, price: Number(book.price), salePrice: book.salePrice ? Number(book.salePrice) : null },
        });
    } catch (error: any) {
        console.error("Update Book Error:", error.message || error);
        return NextResponse.json({ success: false, error: "Lỗi cập nhật sách, vui lòng kiểm tra lại thông tin" }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        await prisma.book.update({
            where: { slug },
            data: { deletedAt: new Date() },
        });
        return NextResponse.json({ success: true, message: "Đã xóa sách" });
    } catch (error) {
        console.error("Delete Book Error:", error);
        return NextResponse.json({ success: false, error: "Lỗi xóa sách" }, { status: 500 });
    }
}
