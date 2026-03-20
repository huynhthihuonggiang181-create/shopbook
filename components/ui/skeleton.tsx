// =============================================================
// ShopBook - Skeleton Loading Component
// =============================================================

"use client";

import { cn } from "@/lib/utils";

// Base Skeleton with shimmer
export function Skeleton({
    className = "",
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]",
                className
            )}
            {...props}
        />
    );
}

// Book Card Skeleton
export function BookCardSkeleton() {
    return (
        <div className="rounded-2xl bg-white p-4 shadow-sm">
            <Skeleton className="aspect-[3/4] w-full rounded-xl" />
            <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <div className="flex items-center gap-2 pt-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-4 w-16" />
                </div>
            </div>
        </div>
    );
}

// Book Grid Skeleton
export function BookGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: count }).map((_, i) => (
                <BookCardSkeleton key={i} />
            ))}
        </div>
    );
}

// Table Row Skeleton (for admin)
export function TableRowSkeleton({ cols = 5 }: { cols?: number }) {
    return (
        <tr className="border-b border-gray-100">
            {Array.from({ length: cols }).map((_, i) => (
                <td key={i} className="px-4 py-3">
                    <Skeleton className="h-4 w-full" />
                </td>
            ))}
        </tr>
    );
}
