// =============================================================
// ShopBook - Global Loading State
// =============================================================

export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center gap-4">
                <div className="relative h-12 w-12">
                    <div className="absolute inset-0 animate-ping rounded-full bg-indigo-400 opacity-20"></div>
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
                </div>
                <p className="text-sm text-gray-500">Đang tải...</p>
            </div>
        </div>
    );
}
