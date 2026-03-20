// =============================================================
// ShopBook - NextAuth Type Extensions
// =============================================================

import "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            role: "USER" | "ADMIN";
            image?: string | null;
        };
    }

    interface User {
        role: "USER" | "ADMIN";
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: "USER" | "ADMIN";
    }
}
