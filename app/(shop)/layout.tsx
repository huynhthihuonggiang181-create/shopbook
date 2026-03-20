// =============================================================
// ShopBook - Shop Layout (with Header/Footer/CartDrawer)
// =============================================================

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <CartDrawer />
            <main className="min-h-screen">{children}</main>
            <Footer />
        </>
    );
}
