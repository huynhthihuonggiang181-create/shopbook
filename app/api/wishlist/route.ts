export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return NextResponse.json({ success: false }, { status: 401 });

        const items = await prisma.wishlistItem.findMany({
            where: { userId: session.user.id },
            include: { book: { include: { category: true } } },
            orderBy: { createdAt: "desc" }
        });

        return NextResponse.json({ success: true, data: items });
    } catch { return NextResponse.json({ success: false }, { status: 500 }); }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return NextResponse.json({ success: false }, { status: 401 });

        const { bookId } = await request.json();

        // Check exists
        const exists = await prisma.wishlistItem.findUnique({
            where: { userId_bookId: { userId: session.user.id, bookId } }
        });

        if (exists) {
            await prisma.wishlistItem.delete({ where: { id: exists.id } });
            return NextResponse.json({ success: true, hasFavourited: false });
        }

        await prisma.wishlistItem.create({
            data: { userId: session.user.id, bookId }
        });
        return NextResponse.json({ success: true, hasFavourited: true });
    } catch { return NextResponse.json({ success: false }, { status: 500 }); }
}

