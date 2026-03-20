// =============================================================
// ShopBook - Cart Page (Red Theme)
// =============================================================

"use client";

import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, BookOpen } from "lucide-react";

export default function CartPage() {
    const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();
    const shippingFee = total() > 200000 ? 0 : 30000;

    if (items.length === 0) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
                <ShoppingBag className="h-20 w-20 text-gray-200" />
                <h2 className="mt-4 text-xl font-bold text-gray-900">Giỏ hàng trống</h2>
                <p className="mt-2 text-sm text-gray-500">Hãy thêm sách vào giỏ hàng</p>
                <Link href="/books"><Button className="mt-6">Khám phá sách</Button></Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            <div className="bg-gradient-to-r from-red-600 to-red-500">
                <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
                    <h1 className="text-2xl font-extrabold text-white">Giỏ hàng ({items.length})</h1>
                </div>
            </div>

            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-3">
                        <AnimatePresence>
                            {items.map((item) => (
                                <motion.div key={item.id} layout exit={{ opacity: 0, x: -100, height: 0 }} className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                                    <div className="relative h-24 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-red-50 to-orange-50">
                                        {item.book.image ? (
                                            <Image src={item.book.image} alt={item.book.title} fill className="object-cover" sizes="64px" />
                                        ) : (
                                            <div className="flex h-full items-center justify-center"><BookOpen className="h-6 w-6 text-red-200" /></div>
                                        )}
                                    </div>
                                    <div className="flex flex-1 flex-col justify-between">
                                        <div>
                                            <Link href={`/books/${item.book.slug}`} className="text-sm font-bold text-gray-900 hover:text-red-600">{item.book.title}</Link>
                                            <p className="text-xs text-gray-400 mt-0.5">{item.book.author}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1.5">
                                                <button onClick={() => updateQuantity(item.bookId, item.quantity - 1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50"><Minus className="h-3.5 w-3.5" /></button>
                                                <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.bookId, item.quantity + 1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50"><Plus className="h-3.5 w-3.5" /></button>
                                            </div>
                                            <span className="text-sm font-bold text-red-600">{formatPrice((item.book.salePrice || item.book.price) * item.quantity)}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => removeItem(item.bookId)} className="self-start rounded-lg p-1.5 text-gray-300 hover:bg-red-50 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm h-fit sticky top-24">
                        <h3 className="text-base font-bold text-gray-900">Tóm tắt đơn hàng</h3>
                        <div className="mt-4 space-y-3 text-sm">
                            <div className="flex justify-between"><span className="text-gray-500">Tạm tính</span><span className="font-medium">{formatPrice(total())}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">Phí vận chuyển</span><span className={shippingFee === 0 ? "text-emerald-600 font-medium" : "font-medium"}>{shippingFee === 0 ? "Miễn phí" : formatPrice(shippingFee)}</span></div>
                            <div className="border-t pt-3 flex justify-between"><span className="font-bold text-gray-900">Tổng cộng</span><span className="text-xl font-extrabold text-red-600">{formatPrice(total() + shippingFee)}</span></div>
                        </div>
                        <Link href="/checkout"><Button className="w-full mt-5" size="lg">Thanh toán <ArrowRight className="h-4 w-4" /></Button></Link>
                        <button onClick={clearCart} className="w-full mt-2 text-center text-xs text-gray-400 hover:text-red-500">Xóa giỏ hàng</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
