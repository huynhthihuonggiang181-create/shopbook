// =============================================================
// ShopBook - Button Component (Red Theme)
// =============================================================

"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
    icon?: React.ReactNode;
}

const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700 shadow-sm shadow-red-200",
    secondary: "bg-gray-900 text-white hover:bg-gray-800",
    outline: "border-2 border-gray-200 text-gray-700 hover:border-red-200 hover:text-red-600 hover:bg-red-50",
    ghost: "text-gray-600 hover:bg-gray-50 hover:text-red-600",
    danger: "bg-red-100 text-red-700 hover:bg-red-200",
};

const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
    md: "px-4 py-2.5 text-sm rounded-xl gap-2",
    lg: "px-6 py-3 text-sm rounded-xl gap-2",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", loading, icon, children, disabled, ...props }, ref) => {
        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
                whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
                disabled={disabled || loading}
                className={cn(
                    "inline-flex items-center justify-center font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...(props as React.ComponentProps<typeof motion.button>)}
            >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
                {children}
            </motion.button>
        );
    }
);

Button.displayName = "Button";
