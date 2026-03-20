// =============================================================
// ShopBook - Admin Orders (Real DB)
// =============================================================

"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const STATUS_OPTIONS = [
    { value: "", label: "Tất cả" },
    { value: "PENDING", label: "Chờ xử lý" },
    { value: "PAID", label: "Đã thanh toán" },
    { value: "SHIPPED", label: "Đang giao" },
    { value: "COMPLETED", label: "Hoàn thành" },
    { value: "CANCELLED", label: "Đã hủy" },
];

const STATUS_COLORS: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    PAID: "bg-blue-100 text-blue-700",
    SHIPPED: "bg-purple-100 text-purple-700",
    COMPLETED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
};

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const loadOrders = () => {
        setLoading(true);
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (statusFilter) params.set("status", statusFilter);

        fetch(`/api/orders?${params}`)
            .then((r) => r.json())
            .then((d) => d.success && setOrders(d.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    useEffect(() => { loadOrders(); }, []);
    useEffect(() => { const t = setTimeout(loadOrders, 500); return () => clearTimeout(t); }, [search, statusFilter]);

    const updateStatus = async (orderId: string, newStatus: string) => {
        try {
            await fetch("/api/orders", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId, status: newStatus }),
            });
            loadOrders();
        } catch (error) {
            console.error("Update error:", error);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-extrabold text-gray-900">Quản lý đơn hàng</h1>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm mã đơn, tên khách..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-4 text-sm focus:border-red-500 focus:outline-none"
                    />
                </div>
                <div className="flex gap-2">
                    {STATUS_OPTIONS.map((s) => (
                        <button
                            key={s.value}
                            onClick={() => setStatusFilter(s.value)}
                            className={`rounded-xl px-3 py-2 text-xs font-medium transition-colors ${statusFilter === s.value
                                    ? "bg-red-600 text-white"
                                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => <div key={i} className="h-16 rounded-xl bg-gray-100 animate-pulse" />)}
                </div>
            ) : orders.length === 0 ? (
                <div className="py-12 text-center text-gray-400">Chưa có đơn hàng nào</div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left px-4 py-3 font-medium text-gray-500">Mã đơn</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-500">Khách hàng</th>
                                <th className="text-center px-4 py-3 font-medium text-gray-500">Sản phẩm</th>
                                <th className="text-right px-4 py-3 font-medium text-gray-500">Tổng tiền</th>
                                <th className="text-center px-4 py-3 font-medium text-gray-500">Trạng thái</th>
                                <th className="text-center px-4 py-3 font-medium text-gray-500">Ngày tạo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                                    <td className="px-4 py-3 font-mono text-xs font-medium">{order.orderNumber}</td>
                                    <td className="px-4 py-3">
                                        <p className="font-medium text-gray-900">{order.user?.name || "—"}</p>
                                        <p className="text-xs text-gray-400">{order.user?.email || "—"}</p>
                                    </td>
                                    <td className="px-4 py-3 text-center text-gray-600">{order.items?.length || 0}</td>
                                    <td className="px-4 py-3 text-right font-medium text-red-600">{formatPrice(order.total)}</td>
                                    <td className="px-4 py-3 text-center">
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateStatus(order.id, e.target.value)}
                                            className={`rounded-lg px-2 py-1 text-xs font-medium border-0 cursor-pointer ${STATUS_COLORS[order.status] || ""}`}
                                        >
                                            {STATUS_OPTIONS.filter((s) => s.value).map((s) => (
                                                <option key={s.value} value={s.value}>{s.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-4 py-3 text-center text-xs text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString("vi")}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
