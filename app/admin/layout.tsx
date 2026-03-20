// =============================================================
// ShopBook - Admin Layout (with sidebar + role toggle link)
// =============================================================

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BookOpen,
    ShoppingCart,
    Users,
    ChevronLeft,
    ChevronRight, // Keep for sidebar toggle
    Store, // Keep for "Về trang shop"
    LogOut,
    Tags, // This will be replaced by FolderTree for categories
    Zap,
    Bell, // Added for Notifications
    FolderTree, // Added for Categories
    MessageSquare, // Added for Reviews
    Settings,
} from "lucide-react";
import { signOut } from "next-auth/react";

const SIDEBAR_LINKS = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, color: "text-blue-500" },
    { label: "Quản lý sách", href: "/admin/books", icon: BookOpen, color: "text-green-500" },
    { label: "Danh mục", href: "/admin/categories", icon: FolderTree, color: "text-purple-500" },
    { label: "Flash Sale", href: "/admin/flash-sales", icon: Zap, color: "text-yellow-500" },
    { label: "Thông báo", href: "/admin/notifications", icon: Bell, color: "text-indigo-500" }, // Added
    { label: "Đơn hàng", href: "/admin/orders", icon: ShoppingCart, color: "text-orange-500" },
    { label: "Người dùng", href: "/admin/users", icon: Users, color: "text-pink-500" },
    { label: "Cài đặt liên hệ", href: "/admin/settings/contact", icon: Settings, color: "text-gray-500" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className={`sticky top-0 h-screen flex flex-col border-r border-gray-200 bg-white transition-all duration-300 ${collapsed ? "w-16" : "w-60"}`}>
                {/* Logo */}
                <div className="flex h-16 sm:h-20 items-center justify-between border-b border-gray-100 px-4">
                    {!collapsed && (
                        <Link href="/admin/dashboard" className="flex items-center shrink-0">
                            <img src="/LOGO.png" alt="Nhà Giang" className="h-10 sm:h-12 w-auto object-contain py-1" />
                        </Link>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 ${collapsed ? "mx-auto" : "ml-auto"}`}
                    >
                        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
                    {SIDEBAR_LINKS.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                title={collapsed ? item.label : undefined}
                                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                                    ? "bg-red-50 text-red-600"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                            >
                                <item.icon className="h-5 w-5 flex-shrink-0" />
                                {!collapsed && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="border-t border-gray-100 p-2 space-y-1">
                    <Link
                        href="/"
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        title={collapsed ? "Về trang shop" : undefined}
                    >
                        <Store className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && <span>Về trang shop</span>}
                    </Link>
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                        title={collapsed ? "Đăng xuất" : undefined}
                    >
                        <LogOut className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && <span>Đăng xuất</span>}
                    </button>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 p-6 lg:p-8">{children}</main>
        </div>
    );
}
