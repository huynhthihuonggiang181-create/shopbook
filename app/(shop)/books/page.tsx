// =============================================================
// ShopBook - Books Listing Page (Real DB Data)
// =============================================================

"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { BookCard } from "@/components/book/book-card";
import { SORT_OPTIONS, PRICE_RANGES } from "@/constants";
import { Button } from "@/components/ui/button";

export default function BooksPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [books, setBooks] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 0 });

    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
    const [selectedSort, setSelectedSort] = useState(searchParams.get("sort") || "newest");
    const [selectedPrice, setSelectedPrice] = useState(searchParams.get("price") || "");
    const [showFilters, setShowFilters] = useState(false);

    const page = parseInt(searchParams.get("page") || "1");

    useEffect(() => {
        fetch("/api/categories")
            .then((r) => r.json())
            .then((d) => d.success && setCategories(d.data))
            .catch(console.error);
    }, []);

    useEffect(() => {
        setLoading(true);
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", "12");
        if (search) params.set("search", search);
        if (selectedCategory) params.set("category", selectedCategory);
        if (selectedSort) params.set("sort", selectedSort);

        if (selectedPrice) {
            const range = PRICE_RANGES.find((r) => r.value === selectedPrice);
            if (range) {
                params.set("minPrice", String(range.min));
                if (range.max !== Infinity) params.set("maxPrice", String(range.max));
            }
        }

        fetch(`/api/books?${params}`)
            .then((r) => r.json())
            .then((d) => {
                if (d.success) {
                    setBooks(d.data);
                    setPagination(d.pagination);
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [page, search, selectedCategory, selectedSort, selectedPrice]);

    const applyFilters = () => {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (selectedCategory) params.set("category", selectedCategory);
        if (selectedSort) params.set("sort", selectedSort);
        if (selectedPrice) params.set("price", selectedPrice);
        router.push(`/books?${params}`);
    };

    const clearFilters = () => {
        setSearch("");
        setSelectedCategory("");
        setSelectedSort("newest");
        setSelectedPrice("");
        router.push("/books");
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-500">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-extrabold text-white">Tất cả sách</h1>
                    <p className="text-sm text-red-100 mt-1">Khám phá bộ sưu tập đa dạng</p>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                {/* Search & Filter Bar */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm sách..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                            className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-4 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <select
                            value={selectedSort}
                            onChange={(e) => { setSelectedSort(e.target.value); }}
                            className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none"
                        >
                            {SORT_OPTIONS.map((o) => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm hover:bg-gray-50"
                        >
                            <SlidersHorizontal className="h-4 w-4" /> Lọc
                        </button>
                        <Button size="sm" onClick={applyFilters}>Áp dụng</Button>
                    </div>
                </div>

                {/* Filter Panel */}
                {showFilters && (
                    <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-semibold text-gray-900">Bộ lọc</h3>
                            <button onClick={clearFilters} className="text-xs text-red-600 hover:underline">Xóa tất cả</button>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {/* Category */}
                            <div>
                                <label className="text-xs font-medium text-gray-500 mb-1 block">Danh mục</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                                >
                                    <option value="">Tất cả</option>
                                    {categories.map((c: any) => (
                                        <option key={c.id} value={c.slug}>{c.name} ({c._count?.books || 0})</option>
                                    ))}
                                </select>
                            </div>
                            {/* Price */}
                            <div>
                                <label className="text-xs font-medium text-gray-500 mb-1 block">Khoảng giá</label>
                                <select
                                    value={selectedPrice}
                                    onChange={(e) => setSelectedPrice(e.target.value)}
                                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                                >
                                    <option value="">Tất cả</option>
                                    {PRICE_RANGES.map((r) => (
                                        <option key={r.value} value={r.value}>{r.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Results */}
                <div className="mb-4 text-sm text-gray-500">
                    Tìm thấy <strong className="text-gray-900">{pagination.total}</strong> cuốn sách
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="h-72 rounded-xl bg-gray-100 animate-pulse" />
                        ))}
                    </div>
                ) : books.length === 0 ? (
                    <div className="py-16 text-center">
                        <p className="text-lg font-medium text-gray-500">Không tìm thấy sách nào</p>
                        <button onClick={clearFilters} className="mt-2 text-sm text-red-600 hover:underline">Xóa bộ lọc</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        {books.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <div className="mt-8 flex justify-center gap-2">
                        {Array.from({ length: pagination.totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => router.push(`/books?page=${i + 1}`)}
                                className={`h-10 w-10 rounded-xl text-sm font-medium transition-colors ${page === i + 1
                                        ? "bg-red-600 text-white"
                                        : "border border-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-600"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
