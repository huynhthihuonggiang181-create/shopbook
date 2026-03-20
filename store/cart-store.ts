// =============================================================
// ShopBook - Cart Zustand Store
// =============================================================

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Book } from "@/types";

export interface CartItemData {
    id: string;
    bookId: string;
    book: Book;
    quantity: number;
}

interface CartStore {
    items: CartItemData[];
    isOpen: boolean;

    // Actions
    addItem: (book: Book, quantity?: number) => void;
    removeItem: (bookId: string) => void;
    updateQuantity: (bookId: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;

    // Computed
    total: () => number;
    itemCount: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addItem: (book: Book, quantity = 1) => {
                const { items } = get();
                const existing = items.find((item) => item.bookId === book.id);

                if (existing) {
                    // Update quantity if item already exists
                    set({
                        items: items.map((item) =>
                            item.bookId === book.id
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        ),
                        isOpen: true,
                    });
                } else {
                    // Add new item
                    set({
                        items: [
                            ...items,
                            {
                                id: `cart-${book.id}-${Date.now()}`,
                                bookId: book.id,
                                book,
                                quantity,
                            },
                        ],
                        isOpen: true,
                    });
                }
            },

            removeItem: (bookId: string) => {
                set({ items: get().items.filter((item) => item.bookId !== bookId) });
            },

            updateQuantity: (bookId: string, quantity: number) => {
                if (quantity <= 0) {
                    get().removeItem(bookId);
                    return;
                }
                set({
                    items: get().items.map((item) =>
                        item.bookId === bookId ? { ...item, quantity } : item
                    ),
                });
            },

            clearCart: () => set({ items: [] }),
            toggleCart: () => set({ isOpen: !get().isOpen }),
            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),

            total: () => {
                return get().items.reduce((sum, item) => {
                    const price = item.book.salePrice || item.book.price;
                    return sum + price * item.quantity;
                }, 0);
            },

            itemCount: () => {
                return get().items.reduce((sum, item) => sum + item.quantity, 0);
            },
        }),
        {
            name: "shopbook-cart",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ items: state.items }), // Only persist items
        }
    )
);
