// =============================================================
// ShopBook - Register API Route (save user to database)
// =============================================================

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(9).max(10),
    password: z.string().min(6),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input
        const result = registerSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { success: false, error: "Dữ liệu không hợp lệ", details: result.error.flatten() },
                { status: 400 }
            );
        }

        const { name, email, phone, password } = result.data;

        // Lazy import prisma to avoid build-time error
        const { default: prisma } = await import("@/lib/prisma");

        // Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { success: false, error: "Email này đã được đăng ký" },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Format phone with +84
        const fullPhone = `+84${phone.replace(/^0/, "")}`;

        // Create user in database
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                phone: fullPhone,
                role: "USER",
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                createdAt: true,
            },
        });

        return NextResponse.json(
            { success: true, data: user, message: "Đăng ký thành công!" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Register API Error:", error);
        return NextResponse.json(
            { success: false, error: "Lỗi hệ thống, vui lòng thử lại" },
            { status: 500 }
        );
    }
}
