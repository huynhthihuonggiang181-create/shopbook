// =============================================================
// ShopBook - Star Rating Component
// =============================================================

"use client";

import { Star, StarHalf } from "lucide-react";
import { getStarArray } from "@/lib/utils";

interface StarRatingProps {
    rating: number;
    count?: number;
    size?: "sm" | "md" | "lg";
    showCount?: boolean;
}

const sizeMap = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
};

export function StarRating({
    rating,
    count,
    size = "md",
    showCount = true,
}: StarRatingProps) {
    const stars = getStarArray(rating);

    return (
        <div className="flex items-center gap-1">
            <div className="flex">
                {stars.map((type, i) => {
                    if (type === "full")
                        return (
                            <Star
                                key={i}
                                className={`${sizeMap[size]} fill-amber-400 text-amber-400`}
                            />
                        );
                    if (type === "half")
                        return (
                            <StarHalf
                                key={i}
                                className={`${sizeMap[size]} fill-amber-400 text-amber-400`}
                            />
                        );
                    return (
                        <Star
                            key={i}
                            className={`${sizeMap[size]} text-gray-300`}
                        />
                    );
                })}
            </div>
            {showCount && count !== undefined && (
                <span className="text-xs text-gray-500">({count})</span>
            )}
        </div>
    );
}
