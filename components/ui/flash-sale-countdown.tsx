"use client";

import { useState, useEffect } from "react";

export function FlashSaleCountdown({ endDate }: { endDate: string }) {
    const [timeLeft, setTimeLeft] = useState(() => {
        const diff = new Date(endDate).getTime() - Date.now();
        return diff > 0 ? Math.floor(diff / 1000) : 0;
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const diff = new Date(endDate).getTime() - Date.now();
            setTimeLeft(diff > 0 ? Math.floor(diff / 1000) : 0);
        }, 1000);
        return () => clearInterval(timer);
    }, [endDate]);

    const h = Math.floor(timeLeft / 3600);
    const m = Math.floor((timeLeft % 3600) / 60);
    const s = timeLeft % 60;

    const format = (n: number) => n.toString().padStart(2, '0');

    return (
        <div className="flex items-center gap-1.5">
            <span className="text-gray-600 text-sm font-medium mr-1">Kết thúc trong</span>
            <span className="bg-black text-white rounded px-1.5 py-0.5 font-bold text-sm">{format(h)}</span>
            <span className="text-black font-bold">:</span>
            <span className="bg-black text-white rounded px-1.5 py-0.5 font-bold text-sm">{format(m)}</span>
            <span className="text-black font-bold">:</span>
            <span className="bg-black text-white rounded px-1.5 py-0.5 font-bold text-sm">{format(s)}</span>
        </div>
    );
}
