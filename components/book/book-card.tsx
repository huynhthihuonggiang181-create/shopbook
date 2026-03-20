// =============================================================
// ShopBook - Book Card (Red + White Design) - Fixed
// =============================================================

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingCart, Eye, Star, BookOpen } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice, calcDiscount } from "@/lib/utils";
import type { Book } from "@/types";

interface BookCardProps {
    book: Book;
}

export function BookCard({ book }: BookCardProps) {
    const router = useRouter();
    const addItem = useCartStore((s) => s.addItem);
    const discount = book.salePrice ? calcDiscount(book.price, book.salePrice) : 0;

    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow"
        >
            {/* Image - use div + onClick instead of Link to avoid nested <a> */}
            <div
                onClick={() => router.push(`/books/${book.slug}`)}
                className="relative block aspect-[3/4] overflow-hidden bg-gray-50 cursor-pointer"
            >
                {book.image ? (
                    <Image
                        src={book.image}
                        alt={book.title}
                        fill
                        className="object-contain object-center transition-transform duration-500 group-hover:scale-105 bg-white"
                        sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
                        <BookOpen className="h-12 w-12 text-red-200" />
                    </div>
                )}

                {/* Discount Badge */}
                {discount > 0 && (
                    <div className="absolute left-3 top-3 rounded-lg bg-red-600 px-2 py-1 text-[11px] font-bold text-white shadow-sm">
                        -{discount}%
                    </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            addItem(book);
                        }}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700"
                    >
                        <ShoppingCart className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/books/${book.slug}`);
                        }}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg hover:text-red-600"
                    >
                        <Eye className="h-5 w-5" />
                    </motion.button>
                </div>
            </div>

            {/* Details */}
            <div className="p-4">
                <Link href={`/books/${book.slug}`}>
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-2 hover:text-red-600 transition-colors leading-tight">
                        {book.title}
                    </h3>
                </Link>
                <p className="mt-1.5 text-xs text-gray-400">{book.author}</p>

                {/* Rating */}
                <div className="mt-2 flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-semibold text-gray-700">{book.rating}</span>
                    <span className="text-xs text-gray-300">({book.ratingCount})</span>
                </div>

                {/* Price */}
                <div className="mt-2.5 flex items-center gap-2">
                    <span className="text-base font-extrabold text-red-600">
                        {formatPrice(book.salePrice || book.price)}
                    </span>
                    {book.salePrice && (
                        <span className="text-xs text-gray-400 line-through">
                            {formatPrice(book.price)}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
