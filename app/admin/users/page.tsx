// =============================================================
// ShopBook - Admin Users (Real DB)
// =============================================================

"use client";

import { useState, useEffect } from "react";
import { Search, Shield, ShieldOff } from "lucide-react";

export default function AdminUsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const loadUsers = () => {
        setLoading(true);
        const params = new URLSearchParams();
        if (search) params.set("search", search);

        fetch(`/api/admin/users?${params}`)
            .then((r) => r.json())
            .then((d) => d.success && setUsers(d.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    useEffect(() => { loadUsers(); }, []);
    useEffect(() => { const t = setTimeout(loadUsers, 500); return () => clearTimeout(t); }, [search]);

    const toggleRole = async (userId: string, currentRole: string) => {
        const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
        if (!confirm(`Bạn có chắc muốn ${newRole === "ADMIN" ? "thăng lên Admin" : "hạ xuống User"}?`)) return;

        try {
            await fetch("/api/admin/users", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, role: newRole }),
            });
            loadUsers();
        } catch (error) {
            console.error("Toggle role error:", error);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-extrabold text-gray-900">Quản lý người dùng</h1>

            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Tìm tên, email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-4 text-sm focus:border-red-500 focus:outline-none"
                />
            </div>

            {loading ? (
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => <div key={i} className="h-16 rounded-xl bg-gray-100 animate-pulse" />)}
                </div>
            ) : users.length === 0 ? (
                <div className="py-12 text-center text-gray-400">Không tìm thấy người dùng</div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left px-4 py-3 font-medium text-gray-500">Người dùng</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-500">Điện thoại</th>
                                <th className="text-center px-4 py-3 font-medium text-gray-500">Đơn hàng</th>
                                <th className="text-center px-4 py-3 font-medium text-gray-500">Vai trò</th>
                                <th className="text-center px-4 py-3 font-medium text-gray-500">Ngày tham gia</th>
                                <th className="text-center px-4 py-3 font-medium text-gray-500">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
                                                {user.name?.charAt(0).toUpperCase() || "U"}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{user.name}</p>
                                                <p className="text-xs text-gray-400">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">{user.phone || "—"}</td>
                                    <td className="px-4 py-3 text-center text-gray-600">{user._count?.orders || 0}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${user.role === "ADMIN" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"
                                            }`}>
                                            {user.role === "ADMIN" ? <Shield className="h-3 w-3" /> : null}
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center text-xs text-gray-500">
                                        {new Date(user.createdAt).toLocaleDateString("vi")}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            onClick={() => toggleRole(user.id, user.role)}
                                            title={user.role === "ADMIN" ? "Hạ xuống User" : "Thăng lên Admin"}
                                            className={`rounded-lg p-1.5 transition-colors ${user.role === "ADMIN"
                                                    ? "text-red-500 hover:bg-red-50"
                                                    : "text-gray-400 hover:bg-emerald-50 hover:text-emerald-600"
                                                }`}
                                        >
                                            {user.role === "ADMIN" ? <ShieldOff className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                                        </button>
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
