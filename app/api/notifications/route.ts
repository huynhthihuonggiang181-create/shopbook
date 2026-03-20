export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        const notifications = await prisma.notification.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: "desc" },
            take: 50
        });

        const unreadCount = await prisma.notification.count({
            where: { userId: session.user.id, isRead: false }
        });

        return NextResponse.json({ success: true, data: notifications, unreadCount });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Lỗi Server" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (session?.user?.role !== "ADMIN") return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });

        const { userId, title, content } = await request.json();

        if (userId === "ALL") {
            const users = await prisma.user.findMany({ select: { id: true } });
            await prisma.notification.createMany({
                data: users.map(u => ({ userId: u.id, title, content }))
            });
            return NextResponse.json({ success: true, message: "Đã gửi thông báo hàng loạt" });
        }

        const notification = await prisma.notification.create({
            data: { userId, title, content }
        });
        return NextResponse.json({ success: true, data: notification });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Lỗi Gửi Thông Báo" }, { status: 500 });
    }
}

