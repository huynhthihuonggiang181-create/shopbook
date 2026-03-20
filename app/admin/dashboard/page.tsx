// =============================================================
// ShopBook - Admin Dashboard (Real DB Data)
// =============================================================

"use client";

import { useState, useEffect } from "react";
import { BookOpen, Users, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function AdminDashboard() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/stats")
            .then((r) => r.json())
            .then((d) => d.success && setStats(d.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="space-y-4">
                <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-28 rounded-xl bg-gray-100 animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    const statCards = [
        { label: "Tổng sách", value: stats?.totalBooks || 0, icon: BookOpen, color: "bg-blue-50 text-blue-600" },
        { label: "Người dùng", value: stats?.totalUsers || 0, icon: Users, color: "bg-emerald-50 text-emerald-600" },
        { label: "Đơn hàng", value: stats?.totalOrders || 0, icon: ShoppingCart, color: "bg-amber-50 text-amber-600" },
        { label: "Doanh thu", value: formatPrice(stats?.totalRevenue || 0), icon: DollarSign, color: "bg-red-50 text-red-600" },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>

            {/* Stat Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {statCards.map((s) => (
                    <div key={s.label} className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${s.color}`}>
                            <s.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">{s.label}</p>
                            <p className="text-xl font-bold text-gray-900">{s.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Category Breakdown */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Danh mục sách</h2>
                <div className="space-y-3">
                    {(stats?.categories || []).map((cat: any) => (
                        <div key={cat.id} className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">{cat.name}</span>
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-32 rounded-full bg-gray-100 overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-red-500"
                                        style={{ width: `${Math.min(100, (cat.bookCount / (stats?.totalBooks || 1)) * 100)}%` }}
                                    />
                                </div>
                                <span className="text-sm font-medium text-gray-900 w-6 text-right">{cat.bookCount}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Books */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                    <TrendingUp className="inline h-5 w-5 text-red-500 mr-2" />
                    Bán chạy nhất
                </h2>
                <div className="space-y-3">
                    {(stats?.topBooks || []).map((book: any, i: number) => (
                        <div key={book.id} className="flex items-center gap-4 rounded-xl bg-gray-50 p-3">
                            <span className="text-lg font-bold text-gray-300 w-6">#{i + 1}</span>
                            <div className="flex h-10 w-8 items-center justify-center rounded-lg bg-red-50 text-sm">📖</div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{book.title}</p>
                                <p className="text-xs text-gray-500">Đã bán: {book.sold}</p>
                            </div>
                            <span className="text-sm font-bold text-red-600">{formatPrice(book.salePrice || book.price)}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Orders */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Đơn hàng gần đây</h2>
                {(stats?.recentOrders || []).length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-4">Chưa có đơn hàng</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left py-2 font-medium text-gray-500">Mã đơn</th>
                                    <th className="text-left py-2 font-medium text-gray-500">Khách hàng</th>
                                    <th className="text-left py-2 font-medium text-gray-500">Trạng thái</th>
                                    <th className="text-right py-2 font-medium text-gray-500">Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(stats?.recentOrders || []).map((order: any) => (
                                    <tr key={order.id} className="border-b border-gray-50">
                                        <td className="py-3 font-mono text-xs">{order.orderNumber}</td>
                                        <td className="py-3">{order.user?.name || "—"}</td>
                                        <td className="py-3">
                                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${order.status === "COMPLETED" ? "bg-green-100 text-green-700" :
                                                    order.status === "PAID" ? "bg-blue-100 text-blue-700" :
                                                        order.status === "SHIPPED" ? "bg-purple-100 text-purple-700" :
                                                            order.status === "CANCELLED" ? "bg-red-100 text-red-700" :
                                                                "bg-yellow-100 text-yellow-700"
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-3 text-right font-medium text-red-600">{formatPrice(order.total)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
