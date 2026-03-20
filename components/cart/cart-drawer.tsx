// =============================================================
// ShopBook - Cart Drawer (Red + White Theme)
// =============================================================

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Minus, Plus, Trash2, ArrowRight, BookOpen } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
    const [isOpen, setIsOpen] = useState(false);
    const { items, removeItem, updateQuantity, total, itemCount } = useCartStore();

    return (
        <>
            {/* Floating Cart Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-200 hover:bg-red-700 transition-colors lg:hidden"
            >
                <ShoppingCart className="h-6 w-6" />
                {itemCount() > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-bold text-white">
                        {itemCount()}
                    </span>
                )}
            </motion.button>

            {/* Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                            <div className="flex items-center gap-2">
                                <ShoppingCart className="h-5 w-5 text-red-600" />
                                <h2 className="text-base font-bold text-gray-900">Giỏ hàng ({itemCount()})</h2>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto px-5 py-4">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16">
                                    <ShoppingCart className="h-16 w-16 text-gray-200" />
                                    <p className="mt-4 text-sm font-medium text-gray-500">Giỏ hàng trống</p>
                                    <Button variant="outline" className="mt-4" onClick={() => setIsOpen(false)}>
                                        Tiếp tục mua sắm
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <AnimatePresence>
                                        {items.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                layout
                                                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                                className="flex gap-3 rounded-xl border border-gray-100 p-3"
                                            >
                                                <div className="relative h-20 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-red-50 to-orange-50">
                                                    {item.book.image ? (
                                                        <Image src={item.book.image} alt={item.book.title} fill className="object-cover" sizes="56px" />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center">
                                                            <BookOpen className="h-5 w-5 text-red-200" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex flex-1 flex-col justify-between min-w-0">
                                                    <div>
                                                        <p className="text-xs font-bold text-gray-900 line-clamp-1">{item.book.title}</p>
                                                        <p className="text-[11px] text-gray-400">{item.book.author}</p>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-1.5">
                                                            <button onClick={() => updateQuantity(item.bookId, item.quantity - 1)} className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50">
                                                                <Minus className="h-3 w-3" />
                                                            </button>
                                                            <span className="text-xs font-bold w-5 text-center">{item.quantity}</span>
                                                            <button onClick={() => updateQuantity(item.bookId, item.quantity + 1)} className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50">
                                                                <Plus className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                        <span className="text-xs font-bold text-red-600">
                                                            {formatPrice((item.book.salePrice || item.book.price) * item.quantity)}
                                                        </span>
                                                    </div>
                                                </div>

                                                <button onClick={() => removeItem(item.bookId)} className="self-start text-gray-300 hover:text-red-500">
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </button>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="border-t border-gray-100 px-5 py-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Tạm tính</span>
                                    <span className="text-lg font-extrabold text-gray-900">{formatPrice(total())}</span>
                                </div>
                                <Link href="/checkout" onClick={() => setIsOpen(false)}>
                                    <Button className="w-full" size="lg">
                                        Thanh toán <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full text-center text-xs text-gray-400 hover:text-gray-600"
                                >
                                    Tiếp tục mua sắm
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
