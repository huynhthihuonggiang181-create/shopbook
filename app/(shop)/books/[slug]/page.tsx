// =============================================================
// ShopBook - Book Detail Page (Real DB Data)
// =============================================================

"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ShoppingCart, Star, Minus, Plus, Shield, Truck, RotateCcw, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { BookCard } from "@/components/book/book-card";
import { formatPrice, calcDiscount } from "@/lib/utils";

export default function BookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [book, setBook] = useState<any>(null);
    const [related, setRelated] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const addItem = useCartStore((s) => s.addItem);

    useEffect(() => {
        fetch(`/api/books/${slug}`)
            .then((r) => r.json())
            .then((d) => {
                if (d.success) {
                    setBook(d.data);
                    setRelated(d.related || []);
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) {
        return (
            <div className="bg-white min-h-screen">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-2">
                        <div className="h-96 rounded-2xl bg-gray-100 animate-pulse" />
                        <div className="space-y-4">
                            <div className="h-8 w-3/4 rounded bg-gray-100 animate-pulse" />
                            <div className="h-6 w-1/2 rounded bg-gray-100 animate-pulse" />
                            <div className="h-10 w-1/3 rounded bg-gray-100 animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-900">Không tìm thấy sách</h2>
                    <Link href="/books" className="mt-4 text-sm text-red-600 hover:underline">← Quay lại</Link>
                </div>
            </div>
        );
    }

    const discount = book.salePrice ? calcDiscount(book.price, book.salePrice) : 0;
    const displayPrice = book.salePrice || book.price;

    const handleAddToCart = () => {
        addItem({
            id: book.id,
            title: book.title,
            slug: book.slug,
            author: book.author,
            price: book.price,
            salePrice: book.salePrice,
            image: book.image,
            stock: book.stock,
            category: book.category,
        } as any, quantity);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Breadcrumb */}
            <div className="border-b border-gray-100">
                <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/" className="hover:text-red-600">Trang chủ</Link>
                        <ChevronRight className="h-3 w-3" />
                        <Link href="/books" className="hover:text-red-600">Sách</Link>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-gray-900 font-medium truncate">{book.title}</span>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Image */}
                    <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 min-h-[400px]">
                        {book.image ? (
                            <div className="relative h-80 w-56 overflow-hidden rounded-xl shadow-lg border-2 border-gray-100 bg-white">
                                <Image
                                    src={book.image}
                                    alt={book.title}
                                    fill
                                    className="object-contain object-center"
                                    sizes="(max-width: 640px) 100vw, 50vw"
                                />
                            </div>
                        ) : (
                            <div className="flex h-64 w-48 items-center justify-center rounded-xl bg-red-50 border-2 border-red-100 shadow-lg">
                                <span className="text-4xl">📖</span>
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                        {book.category && (
                            <Link href={`/books?category=${book.category.slug}`} className="inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100">
                                {book.category.name}
                            </Link>
                        )}
                        <h1 className="mt-3 text-2xl font-extrabold text-gray-900 lg:text-3xl">{book.title}</h1>
                        <p className="mt-1 text-lg text-gray-500">{book.author}</p>

                        {/* Rating */}
                        <div className="mt-3 flex items-center gap-2">
                            <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1">
                                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                <span className="text-sm font-bold text-amber-700">{book.rating}</span>
                            </div>
                            <span className="text-xs text-gray-400">({book.ratingCount} đánh giá) · Đã bán {book.sold}</span>
                        </div>

                        {/* Price */}
                        <div className="mt-4 flex items-baseline gap-3">
                            <span className="text-3xl font-extrabold text-red-600">{formatPrice(displayPrice)}</span>
                            {book.salePrice && (
                                <>
                                    <span className="text-lg text-gray-400 line-through">{formatPrice(book.price)}</span>
                                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">-{discount}%</span>
                                </>
                            )}
                        </div>

                        {/* Stock */}
                        <p className={`mt-2 text-sm ${book.stock > 0 ? "text-emerald-600" : "text-red-600"}`}>
                            {book.stock > 0 ? `✓ Còn ${book.stock} sản phẩm` : "✗ Hết hàng"}
                        </p>

                        {/* Quantity + Add */}
                        {book.stock > 0 && (
                            <div className="mt-6 flex items-center gap-4">
                                <div className="flex items-center rounded-xl border border-gray-200">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 text-gray-500 hover:text-red-600">
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                                    <button onClick={() => setQuantity(Math.min(book.stock, quantity + 1))} className="px-3 py-2 text-gray-500 hover:text-red-600">
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                                <Button onClick={handleAddToCart} size="lg" className="flex-1" icon={isAdded ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}>
                                    {isAdded ? "Đã thêm!" : "Thêm vào giỏ"}
                                </Button>
                            </div>
                        )}

                        {/* Trust */}
                        <div className="mt-6 grid grid-cols-3 gap-3">
                            {[
                                { icon: Shield, text: "Chính hãng" },
                                { icon: Truck, text: "Giao nhanh" },
                                { icon: RotateCcw, text: "Đổi trả 7 ngày" },
                            ].map((t) => (
                                <div key={t.text} className="flex flex-col items-center gap-1 rounded-xl bg-gray-50 p-3">
                                    <t.icon className="h-5 w-5 text-red-500" />
                                    <span className="text-xs font-medium text-gray-600">{t.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Details */}
                        <div className="mt-6 rounded-xl border border-gray-100 p-4">
                            <h3 className="font-semibold text-gray-900 mb-2">Thông tin chi tiết</h3>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                {book.publisher && <p className="text-gray-500">NXB: <span className="text-gray-900">{book.publisher}</span></p>}
                                {book.pages && <p className="text-gray-500">Số trang: <span className="text-gray-900">{book.pages}</span></p>}
                                {book.isbn && <p className="text-gray-500">ISBN: <span className="text-gray-900">{book.isbn}</span></p>}
                                <p className="text-gray-500">Ngôn ngữ: <span className="text-gray-900">{book.language}</span></p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Description */}
                {book.description && (
                    <div className="mt-10 rounded-xl border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-3">Mô tả sách</h2>
                        <p className="text-sm leading-relaxed text-gray-600">{book.description}</p>
                    </div>
                )}

                {/* Related */}
                {related.length > 0 && (
                    <div className="mt-10">
                        <h2 className="mb-4 text-lg font-bold text-gray-900">Sách cùng danh mục</h2>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                            {related.map((b: any) => (
                                <BookCard key={b.id} book={b} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
