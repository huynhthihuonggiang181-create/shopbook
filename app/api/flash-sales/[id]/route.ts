import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        if (id === "active") {
            // Find currently active flash sale
            const now = new Date();
            const activeSale = await prisma.flashSale.findFirst({
                where: {
                    status: "ACTIVE",
                    startDate: { lte: now },
                    endDate: { gte: now }
                },
                include: {
                    items: {
                        include: {
                            book: {
                                include: { category: true }
                            }
                        }
                    }
                },
                orderBy: { endDate: "asc" }
            });

            if (!activeSale) return NextResponse.json({ success: true, data: null });

            // Format items to look like standard books but with salePrice replaced
            const formattedSale = {
                ...activeSale,
                books: activeSale.items.map((item: any) => ({
                    ...item.book,
                    salePrice: Number(item.discountPrice)
                }))
            };

            return NextResponse.json({ success: true, data: formattedSale });
        }

        // Get specific flash sale by ID
        const flashSale = await prisma.flashSale.findUnique({
            where: { id },
            include: {
                items: {
                    include: { book: true }
                }
            }
        });

        if (!flashSale) return NextResponse.json({ success: false, error: "Không tìm thấy" }, { status: 404 });
        return NextResponse.json({ success: true, data: flashSale });
    } catch (error) {
        console.error("GET FlashSale Error:", error);
        return NextResponse.json({ success: false, error: "Lỗi hệ thống" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (session?.user?.role !== "ADMIN") return NextResponse.json({ success: false, error: "Không có quyền" }, { status: 403 });

        const { id } = await params;
        const body = await request.json();
        const { name, startDate, endDate, status, items } = body;

        // Delete old items and insert new ones
        await prisma.flashSaleItem.deleteMany({
            where: { flashSaleId: id }
        });

        const flashSale = await prisma.flashSale.update({
            where: { id },
            data: {
                name,
                startDate: startDate ? new Date(startDate) : undefined,
                endDate: endDate ? new Date(endDate) : undefined,
                status,
                items: {
                    create: items ? items.map((item: any) => ({
                        bookId: item.bookId,
                        discountPrice: item.discountPrice
                    })) : []
                }
            },
            include: { items: true }
        });

        return NextResponse.json({ success: true, data: flashSale });
    } catch (error) {
        console.error("Update FlashSale Error:", error);
        return NextResponse.json({ success: false, error: "Lỗi cập nhật" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (session?.user?.role !== "ADMIN") return NextResponse.json({ success: false, error: "Không có quyền" }, { status: 403 });

        const { id } = await params;

        await prisma.flashSale.delete({
            where: { id }
        });

        return NextResponse.json({ success: true, message: "Đã xóa chương trình Flash Sale" });
    } catch (error) {
        console.error("Delete FlashSale Error:", error);
        return NextResponse.json({ success: false, error: "Lỗi xóa" }, { status: 500 });
    }
}
