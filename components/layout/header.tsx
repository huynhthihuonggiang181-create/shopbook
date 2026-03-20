"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    ShoppingCart,
    User,
    Menu,
    X,
    Heart,
    LogOut,
    ChevronDown,
    LayoutGrid,
    Bell,
    Settings,
    Shield
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/store/cart-store";
import { NAV_LINKS } from "@/constants";

export function Header() {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [unreadNotifications, setUnreadNotifications] = useState(0);
    const [categories, setCategories] = useState<any[]>([]);

    const pathname = usePathname();
    const itemCount = useCartStore((s) => s.itemCount);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session?.user) {
            fetch("/api/notifications")
                .then(r => r.json())
                .then(d => {
                    if (d.success) setUnreadNotifications(d.unreadCount || 0);
                })
                .catch(console.error);
        }

        fetch("/api/categories")
            .then(r => r.json())
            .then(d => {
                if (d.success) setCategories(d.data);
            })
            .catch(console.error);
    }, [session]);

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm relative">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 sm:h-20 items-center justify-between gap-4 sm:gap-6">
                    {/* 1. Logo */}
                    <Link href="/" className="flex items-center shrink-0">
                        <img src="/LOGO.png" alt="Nhà Giang" className="h-14 sm:h-[72px] w-auto object-contain py-1" />
                    </Link>

                    {/* 2. Categories Button */}
                    <div className="hidden md:block relative shrink-0">
                        <button
                            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                            className="flex items-center gap-2 hover:bg-red-50 text-gray-700 hover:text-red-600 px-3 py-2 rounded-xl transition-colors font-medium border border-transparent hover:border-red-100"
                        >
                            <LayoutGrid className="h-6 w-6" />
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </button>

                        {/* Categories Dropdown (Mega menu placeholder) */}
                        <AnimatePresence>
                            {isCategoryOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-12 left-0 w-64 bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden z-50"
                                >
                                    <div className="p-2 space-y-1 max-h-[60vh] overflow-y-auto custom-scrollbar">
                                        <Link href="/books" onClick={() => setIsCategoryOpen(false)} className="block px-4 py-2 hover:bg-red-50 hover:text-red-600 rounded-lg text-sm text-gray-700 font-medium border-b border-gray-50 mb-1">Tất cả Sách</Link>
                                        {categories.map((cat) => (
                                            <Link
                                                key={cat.id}
                                                href={`/books?category=${cat.slug}`}
                                                onClick={() => setIsCategoryOpen(false)}
                                                className="block px-4 py-2 hover:bg-red-50 hover:text-red-600 rounded-lg text-sm text-gray-700"
                                            >
                                                {cat.name}
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* 3. Search Bar (Fahasa style: large, takes remaining space, red button) */}
                    <div className="flex-1 max-w-2xl relative hidden sm:flex">
                        <input
                            type="text"
                            placeholder="Tìm kiếm sách bạn mong muốn..."
                            className="w-full rounded-full border border-gray-300 py-2.5 pl-5 pr-14 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-shadow bg-gray-50/50 hover:bg-white"
                        />
                        <button className="absolute right-1 top-1 bottom-1 px-4 rounded-full bg-red-600 hover:bg-red-700 transition-colors flex items-center justify-center">
                            <Search className="h-4 w-4 text-white" />
                        </button>
                    </div>

                    {/* 4. Actions (Icons on the right) */}
                    <div className="flex items-center gap-1 sm:gap-4 shrink-0">
                        {/* Mobile Search Icon */}
                        <button className="sm:hidden p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full">
                            <Search className="h-5 w-5" />
                        </button>

                        {/* Notifications */}
                        {session?.user && (
                            <Link href="/profile#notifications" className="relative p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors hidden sm:block flex flex-col items-center gap-1 group">
                                <div className="relative">
                                    <Bell className="h-6 w-6 group-hover:fill-red-50" />
                                    {unreadNotifications > 0 && (
                                        <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1.5 text-[10px] font-bold text-white border-2 border-white">
                                            {unreadNotifications > 99 ? '99+' : unreadNotifications}
                                        </span>
                                    )}
                                </div>
                                <span className="text-[10px] font-medium hidden lg:block">Thông báo</span>
                            </Link>
                        )}

                        {/* Cart */}
                        <Link href="/cart" className="relative p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors flex flex-col items-center gap-1 group">
                            <div className="relative">
                                <ShoppingCart className="h-6 w-6 group-hover:fill-red-50" />
                                {itemCount() > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white border-2 border-white">
                                        {itemCount()}
                                    </span>
                                )}
                            </div>
                            <span className="text-[10px] font-medium hidden lg:block">Giỏ hàng</span>
                        </Link>

                        {/* User Account */}
                        {status === "loading" ? (
                            <div className="h-10 w-10 sm:w-20 rounded-xl bg-gray-100 animate-pulse ml-2" />
                        ) : session?.user ? (
                            <div className="relative">
                                <button
                                    onMouseEnter={() => setIsUserMenuOpen(true)}
                                    // onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors flex flex-col items-center gap-1"
                                >
                                    <User className="h-6 w-6" />
                                    <span className="text-[10px] font-medium hidden lg:block truncate max-w-[80px]">Tài khoản</span>
                                </button>

                                <AnimatePresence>
                                    {isUserMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            onMouseLeave={() => setIsUserMenuOpen(false)}
                                            className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-gray-100 bg-white shadow-2xl shadow-gray-200/50 z-50 overflow-hidden"
                                        >
                                            <div className="bg-red-50 p-4 shrink-0 flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-lg font-bold text-red-600 shadow-sm">
                                                    {session.user.name?.charAt(0).toUpperCase() || "U"}
                                                </div>
                                                <div className="overflow-hidden">
                                                    <p className="text-sm font-bold text-gray-900 truncate">{session.user.name}</p>
                                                    <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                                                </div>
                                            </div>
                                            <div className="p-2">
                                                {session.user?.role === "ADMIN" && (
                                                    <Link href="/admin/dashboard" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                                                        <Shield className="h-4 w-4" /> Bảng điều khiển Admin
                                                    </Link>
                                                )}
                                                <Link href="/profile" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                                                    <User className="h-4 w-4" /> Quản lý tài khoản
                                                </Link>
                                                <Link href="/profile#orders" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                                                    <ShoppingCart className="h-4 w-4" /> Đơn hàng của tôi
                                                </Link>
                                                <Link href="/profile#wishlist" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                                                    <Heart className="h-4 w-4" /> Sản phẩm yêu thích
                                                </Link>
                                            </div>
                                            <div className="border-t border-gray-50 p-2">
                                                <button onClick={() => signOut({ callbackUrl: "/" })} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors">
                                                    <LogOut className="h-4 w-4" /> Đăng xuất
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link href="/login" className="flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors ml-2">
                                <User className="h-6 w-6" />
                                <span className="text-[10px] font-medium hidden lg:block">Đăng nhập</span>
                            </Link>
                        )}

                        {/* Language Selector (VN Flag placeholder) */}
                        <div className="hidden sm:flex items-center gap-1 p-2 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-200 cursor-pointer text-gray-600">
                            <span className="text-xl leading-none">🇻🇳</span>
                            <ChevronDown className="h-3 w-3 text-gray-400" />
                        </div>

                        {/* Mobile Menu Button */}
                        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-xl ml-1">
                            {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav (Dropdown) */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-gray-100 md:hidden bg-white absolute top-full left-0 right-0 shadow-xl"
                    >
                        <nav className="space-y-1 px-4 py-4">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className={`block rounded-xl px-4 py-3 text-sm font-medium ${pathname === link.href ? "bg-red-50 text-red-600" : "text-gray-600 hover:bg-gray-50"}`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
