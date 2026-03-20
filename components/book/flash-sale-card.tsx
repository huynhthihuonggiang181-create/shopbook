"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingCart, Eye, BookOpen } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice, calcDiscount } from "@/lib/utils";
import type { Book } from "@/types";

interface FlashSaleCardProps {
    book: Book;
}

export function FlashSaleCard({ book }: FlashSaleCardProps) {
    const router = useRouter();
    const addItem = useCartStore((s) => s.addItem);
    const discount = book.salePrice ? calcDiscount(book.price, book.salePrice) : 0;

    // Simulate stock/sold for progress bar
    const totalStock = book.stock + book.sold;
    const soldPercent = totalStock > 0 ? (book.sold / totalStock) * 100 : 0;
    const displayPercent = Math.max(soldPercent, 5); // at least show a little red

    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
        >
            <div
                onClick={() => router.push(`/books/${book.slug}`)}
                className="relative block aspect-[3/4] overflow-hidden bg-white cursor-pointer px-4 pt-4 pb-2"
            >
                {book.image ? (
                    <Image
                        src={book.image}
                        alt={book.title}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-105 p-4"
                        sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 rounded-lg">
                        <BookOpen className="h-12 w-12 text-red-200" />
                    </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/5 group-hover:opacity-100">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            addItem(book);
                        }}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white shadow-md hover:bg-red-700"
                    >
                        <ShoppingCart className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/books/${book.slug}`);
                        }}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-md hover:text-red-600"
                    >
                        <Eye className="h-4 w-4" />
                    </motion.button>
                </div>
            </div>

            <div className="p-3 flex flex-col flex-1">
                <Link href={`/books/${book.slug}`}>
                    <h3 className="text-sm text-gray-800 line-clamp-2 hover:text-red-600 transition-colors leading-tight mb-2 font-medium">
                        {book.title}
                    </h3>
                </Link>

                <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-base font-bold text-red-600">
                            {formatPrice(book.salePrice || book.price)}
                        </span>
                        {discount > 0 && (
                            <span className="rounded bg-red-600 px-1 py-0.5 text-[10px] font-bold text-white">
                                -{discount}%
                            </span>
                        )}
                    </div>
                    {book.salePrice && (
                        <div className="text-xs text-gray-400 line-through mb-2.5">
                            {formatPrice(book.price)}
                        </div>
                    )}

                    {/* Progress Bar */}
                    <div className="relative h-4 w-full rounded-full bg-gray-200 overflow-hidden">
                        <div
                            className="absolute left-0 top-0 h-full bg-red-500 rounded-full transition-all duration-1000"
                            style={{ width: `${displayPercent}%` }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white uppercase drop-shadow-md z-10">
                            Đã bán {book.sold}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
