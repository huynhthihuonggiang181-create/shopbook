// =============================================================
// ShopBook - Utility Functions
// =============================================================

import { type ClassValue, clsx } from "clsx";

// Combine class names (Tailwind-friendly)
export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

// Format price in VND
export function formatPrice(price: number): string {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price);
}

// Generate slug from title
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
}

// Generate order number
export function generateOrderNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `SB-${timestamp}-${random}`;
}

// Calculate discount percentage
export function calcDiscount(price: number, salePrice: number): number {
    if (!salePrice || salePrice >= price) return 0;
    return Math.round(((price - salePrice) / price) * 100);
}

// Truncate text
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
}

// Render star rating
export function getStarArray(rating: number): ("full" | "half" | "empty")[] {
    const stars: ("full" | "half" | "empty")[] = [];
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) stars.push("full");
        else if (rating >= i - 0.5) stars.push("half");
        else stars.push("empty");
    }
    return stars;
}

// Format date to Vietnamese locale
export function formatDate(date: string | Date): string {
    return new Intl.DateTimeFormat("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(new Date(date));
}

// Wait helper (useful for skeleton loading demo)
export function wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
