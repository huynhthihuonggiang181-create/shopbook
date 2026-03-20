export const dynamic = 'force-dynamic';
// =============================================================
// ShopBook - Books API (Real DB)
// =============================================================

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "12");
        const search = searchParams.get("search") || "";
        const category = searchParams.get("category") || "";
        const sort = searchParams.get("sort") || "newest";
        const featured = searchParams.get("featured");
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");

        const where: any = { deletedAt: null };

        if (search) {
            where.OR = [
                { title: { contains: search } },
                { author: { contains: search } },
            ];
        }
        if (category) {
            where.category = { slug: category };
        }
        if (featured === "true") {
            where.featured = true;
        }
        if (minPrice) {
            where.price = { ...where.price, gte: parseFloat(minPrice) };
        }
        if (maxPrice && maxPrice !== "Infinity") {
            where.price = { ...where.price, lte: parseFloat(maxPrice) };
        }

        const orderBy: any = (() => {
            switch (sort) {
                case "price-asc": return { price: "asc" };
                case "price-desc": return { price: "desc" };
                case "popular": return { sold: "desc" };
                case "rating": return { rating: "desc" };
                default: return { createdAt: "desc" };
            }
        })();

        const [books, total] = await Promise.all([
            prisma.book.findMany({
                where,
                include: { category: { select: { id: true, name: true, slug: true, icon: true } } },
                orderBy,
                skip: (page - 1) * limit,
                take: limit,
            }),
            prisma.book.count({ where }),
        ]);

        // Convert Decimal to number for JSON serialization
        const serialized = books.map((b: any) => ({
            ...b,
            price: Number(b.price),
            salePrice: b.salePrice ? Number(b.salePrice) : null,
        }));

        return NextResponse.json({
            success: true,
            data: serialized,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Books API Error:", error);
        return NextResponse.json({ success: false, error: "Lỗi hệ thống" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body.title || !body.categoryId || body.price === undefined || body.price === null) {
            return NextResponse.json({ success: false, error: "Vui lòng nhập đủ thông tin bắt buộc (Tên sách, Danh mục, Giá bìa)" }, { status: 400 });
        }

        const book = await prisma.book.create({
            data: {
                title: body.title,
                slug: body.slug,
                author: body.author,
                description: body.description || "",
                price: body.price,
                salePrice: body.salePrice || null,
                isbn: body.isbn || null,
                publisher: body.publisher || null,
                pages: body.pages || null,
                stock: body.stock || 0,
                featured: body.featured || false,
                image: body.image || null,
                category: { connect: { id: body.categoryId } },
            },
            include: { category: true },
        });

        return NextResponse.json({
            success: true,
            data: { ...book, price: Number(book.price), salePrice: book.salePrice ? Number(book.salePrice) : null },
        }, { status: 201 });
    } catch (error: any) {
        console.error("Create Book Error:", error.message || error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}

