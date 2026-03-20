import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        // Mark all as read
        await prisma.notification.updateMany({
            where: { userId: session.user.id, isRead: false },
            data: { isRead: true }
        });

        return NextResponse.json({ success: true, message: "Đã đánh dấu đọc tất cả" });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Lỗi Server" }, { status: 500 });
    }
}
