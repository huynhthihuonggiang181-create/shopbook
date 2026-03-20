export const dynamic = 'force-dynamic';
// =============================================================
// ShopBook - Local File Upload API
// =============================================================

import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (session?.user?.role !== "ADMIN") {
            return NextResponse.json({ success: false, error: "Không có quyền" }, { status: 403 });
        }

        const data = await request.formData();
        const file: File | null = data.get("file") as unknown as File;

        if (!file) {
            return NextResponse.json({ success: false, error: "Không có file" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Sanitize filename
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const filename = `${Date.now()}-${originalName}`;
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        const filepath = path.join(uploadDir, filename);

        await writeFile(filepath, buffer);

        const url = `/uploads/${filename}`;

        return NextResponse.json({ success: true, url });
    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ success: false, error: "Lỗi upload file" }, { status: 500 });
    }
}

