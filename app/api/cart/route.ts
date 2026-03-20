// =============================================================
// ShopBook - Cart API Route Handler
// =============================================================

import { NextRequest, NextResponse } from "next/server";

// GET /api/cart - Get current user's cart
export async function GET(request: NextRequest) {
    try {
        // In production:
        // const session = await getServerSession(authOptions);
        // const cartItems = await prisma.cartItem.findMany({
        //   where: { userId: session.user.id },
        //   include: { book: true },
        // });

        return NextResponse.json({
            success: true,
            data: [],
            message: "Cart items (empty - connect DB for real data)",
        });
    } catch (error) {
        console.error("Cart GET Error:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// POST /api/cart - Add item to cart
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { bookId, quantity = 1 } = body;

        if (!bookId) {
            return NextResponse.json(
                { success: false, error: "bookId is required" },
                { status: 400 }
            );
        }

        // In production:
        // const cartItem = await prisma.cartItem.upsert({
        //   where: { userId_bookId: { userId: session.user.id, bookId } },
        //   update: { quantity: { increment: quantity } },
        //   create: { userId: session.user.id, bookId, quantity },
        //   include: { book: true },
        // });

        return NextResponse.json({
            success: true,
            data: { bookId, quantity },
            message: "Item added to cart",
        });
    } catch (error) {
        console.error("Cart POST Error:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// DELETE /api/cart - Remove item from cart
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const bookId = searchParams.get("bookId");

        if (!bookId) {
            return NextResponse.json(
                { success: false, error: "bookId is required" },
                { status: 400 }
            );
        }

        // In production:
        // await prisma.cartItem.delete({
        //   where: { userId_bookId: { userId: session.user.id, bookId } },
        // });

        return NextResponse.json({
            success: true,
            message: "Item removed from cart",
        });
    } catch (error) {
        console.error("Cart DELETE Error:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
