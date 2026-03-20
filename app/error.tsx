// =============================================================
// ShopBook - Global Error Boundary
// =============================================================

"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Application Error:", error);
    }, [error]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Đã xảy ra lỗi!</h2>
                <p className="mt-2 text-sm text-gray-500">
                    Có gì đó không ổn. Vui lòng thử lại hoặc liên hệ hỗ trợ.
                </p>
                <Button
                    onClick={reset}
                    className="mt-6"
                    icon={<RefreshCw className="h-4 w-4" />}
                >
                    Thử lại
                </Button>
            </div>
        </div>
    );
}
