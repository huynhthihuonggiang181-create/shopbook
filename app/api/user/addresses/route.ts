export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        const addresses = await prisma.address.findMany({
            where: { userId: session.user.id },
            orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }]
        });

        return NextResponse.json({ success: true, data: addresses });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Lỗi Server" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const { fullName, phone, street, ward, district, city, isDefault } = body;

        // If this is the first address or isDefault is true, set others to false
        const existingCount = await prisma.address.count({ where: { userId: session.user.id } });
        const shouldBeDefault = existingCount === 0 || isDefault;

        if (shouldBeDefault && existingCount > 0) {
            await prisma.address.updateMany({
                where: { userId: session.user.id },
                data: { isDefault: false }
            });
        }

        const address = await prisma.address.create({
            data: {
                userId: session.user.id,
                fullName,
                phone,
                street,
                ward,
                district,
                city,
                isDefault: shouldBeDefault
            }
        });

        return NextResponse.json({ success: true, data: address }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Lỗi Server" }, { status: 500 });
    }
}

