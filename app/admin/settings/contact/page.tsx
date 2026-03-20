"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Save, Settings, MapPin, Phone, Mail, Facebook } from "lucide-react";

export default function ContactSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        contact_address: "",
        contact_phone: "",
        contact_email: "",
        social_facebook: "",
    });

    useEffect(() => {
        fetch("/api/settings")
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    setForm({
                        contact_address: data.data.contact_address || "",
                        contact_phone: data.data.contact_phone || "",
                        contact_email: data.data.contact_email || "",
                        social_facebook: data.data.social_facebook || "",
                    });
                }
            })
            .finally(() => setLoading(false));
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (data.success) {
                alert("Đã lưu cài đặt thành công!");
            } else {
                alert("Lỗi: " + data.error);
            }
        } catch (error) {
            console.error(error);
            alert("Đã xảy ra lỗi khi lưu.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="animate-pulse space-y-4">
            <div className="h-10 w-1/4 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-100 rounded-xl"></div>
        </div>;
    }

    return (
        <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
                        <Settings className="h-6 w-6 text-gray-500" /> Cài đặt Liên hệ & Mạng xã hội
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">Quản lý địa chỉ cửa hàng, thông tin liên lạc hiển thị ở chân trang.</p>
                </div>
                <Button onClick={handleSave} loading={saving} icon={<Save className="h-4 w-4" />}>
                    Lưu cài đặt
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Thông tin liên hệ</h3>
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-1.5">
                                <MapPin className="h-4 w-4 text-gray-400" /> Địa chỉ cửa hàng
                            </label>
                            <textarea
                                value={form.contact_address}
                                onChange={(e) => setForm({ ...form, contact_address: e.target.value })}
                                placeholder="123 Nguyễn Huệ, Q.1, TP.HCM"
                                rows={2}
                                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-1.5">
                                <Phone className="h-4 w-4 text-gray-400" /> Số điện thoại / Hotline
                            </label>
                            <input
                                value={form.contact_phone}
                                onChange={(e) => setForm({ ...form, contact_phone: e.target.value })}
                                placeholder="1900 1234"
                                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-1.5">
                                <Mail className="h-4 w-4 text-gray-400" /> Email hỗ trợ
                            </label>
                            <input
                                value={form.contact_email}
                                onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
                                placeholder="hello@nhagiang.vn"
                                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Mạng xã hội</h3>
                    <div className="grid gap-6">
                        <div>
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-1.5">
                                <Facebook className="h-4 w-4 text-blue-600" /> Link Fanpage Facebook
                            </label>
                            <input
                                value={form.social_facebook}
                                onChange={(e) => setForm({ ...form, social_facebook: e.target.value })}
                                placeholder="https://www.facebook.com/nhagiang.vn"
                                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                            />
                            <p className="mt-1.5 text-xs text-gray-500">Khách hàng click vào icon Facebook ở chân trang sẽ được chuyển hướng tới link này.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
