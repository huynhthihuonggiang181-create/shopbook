export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function PUT(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { action, ...data } = body;

        if (action === "UPDATE_INFO") {
            const user = await prisma.user.update({
                where: { id: session.user.id },
                data: {
                    name: data.name,
                    phone: data.phone,
                }
            });
            return NextResponse.json({ success: true, user });
        }

        if (action === "UPDATE_VAT") {
            const user = await prisma.user.update({
                where: { id: session.user.id },
                data: {
                    vatType: data.vatType,
                    vatName: data.vatName,
                    vatTaxCode: data.vatTaxCode,
                    vatAddress: data.vatAddress,
                    vatEmail: data.vatEmail,
                }
            });
            return NextResponse.json({ success: true, user });
        }

        if (action === "CHANGE_PASSWORD") {
            const { currentPassword, newPassword } = data;

            // Get current user to check password
            const user = await prisma.user.findUnique({ where: { id: session.user.id } });
            if (!user) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });

            const isValid = await bcrypt.compare(currentPassword, user.password);
            if (!isValid) {
                return NextResponse.json({ success: false, error: "Mật khẩu hiện tại không đúng" }, { status: 400 });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await prisma.user.update({
                where: { id: session.user.id },
                data: { password: hashedPassword }
            });

            return NextResponse.json({ success: true, message: "Mật khẩu đã được thay đổi" });
        }

        return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });

    } catch (error) {
        console.error("Profile update error:", error);
        return NextResponse.json({ success: false, error: "Lỗi hệ thống" }, { status: 500 });
    }
}

