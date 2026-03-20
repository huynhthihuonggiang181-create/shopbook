"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { BookOpen } from "lucide-react";
import { usePathname } from "next/navigation";

export function PageLoader({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();

    const hasMounted = useRef(false);

    useEffect(() => {
        if (hasMounted.current) return;
        hasMounted.current = true;

        setIsLoading(true);
        // Ngừng body scroll kéo thả khi loading
        document.body.style.overflow = "hidden";

        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "";
        }, 800);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "";
        };
    }, [pathname]);

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        key="global-loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/95 backdrop-blur-md"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-red-600 to-red-400 shadow-2xl shadow-red-600/40"
                        >
                            <BookOpen className="h-10 w-10 text-white" />
                        </motion.div>
                        <motion.p
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="mt-6 text-sm font-bold tracking-widest text-red-600 uppercase"
                        >
                            Đang tải trang...
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Content wrapped with animation when not loading */}
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                animate={{
                    opacity: isLoading ? 0 : 1,
                    y: isLoading ? 50 : 0,
                    filter: isLoading ? "blur(10px)" : "blur(0px)"
                }}
                transition={{
                    duration: 0.8,
                    delay: isLoading ? 0 : 0.2,
                    ease: [0.22, 1, 0.36, 1], // Smooth spring bezier
                }}
            >
                {children}
            </motion.div>
        </>
    );
}
