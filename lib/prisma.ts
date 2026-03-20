// =============================================================
// ShopBook - Prisma Client Singleton (Prisma 7 + MariaDB Adapter)
// =============================================================

import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

function createPrismaClient() {
    const url = process.env.DATABASE_URL || "";

    // Use URL constructor for reliable parsing
    const parsed = new URL(url);

    const adapter = new PrismaMariaDb({
        host: parsed.hostname,
        port: parseInt(parsed.port || "3306"),
        user: decodeURIComponent(parsed.username),
        password: decodeURIComponent(parsed.password),
        database: parsed.pathname.slice(1), // remove leading "/"
        connectionLimit: 5,
    });

    return new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === "development" ? ["query"] : [],
    });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
