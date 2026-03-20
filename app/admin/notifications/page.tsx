"use client";

import { useState } from "react";
import { Bell, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export default function NotificationsAdminPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({ type: "", text: "" });

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); setMsg({ type: "", text: "" });
        try {
            const res = await fetch("/api/notifications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: "ALL", title, content })
            });
            const data = await res.json();
            if (data.success) {
                setMsg({ type: "success", text: "Đã gửi thông báo đến tất cả khách hàng thành công!" });
                setTitle(""); setContent("");
            } else {
                setMsg({ type: "error", text: data.error });
            }
        } catch {
            setMsg({ type: "error", text: "Lỗi kết nối" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200">
                    <Bell className="h-6 w-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-black tracking-tight text-gray-900">Push Notifications</h1>
                    <p className="text-sm font-medium text-gray-500">Gửi thông báo đẩy đến tất cả người dùng</p>
                </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm max-w-2xl">
                {msg.text && (
                    <div className={`p-4 mb-6 rounded-xl flex items-center gap-2 ${msg.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {msg.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                        {msg.text}
                    </div>
                )}

                <form onSubmit={handleSend} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1">Tiêu đề thông báo</label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="VD: Siêu sale ngày 11/11 đã bắt đầu!"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1">Nội dung chi tiết</label>
                        <textarea
                            required
                            rows={4}
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                            placeholder="Nhập nội dung thông báo..."
                        />
                    </div>
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading || !title || !content}
                            className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            <Send className="h-5 w-5" />
                            {loading ? "Đang gửi..." : "Gửi thông báo hàng loạt"}
                        </button>
                        <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
                            <AlertCircle className="h-3 w-3" /> Thông báo sẽ được đẩy tới mục <Bell className="h-3 w-3 inline" /> của mọi khách hàng.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
