// =============================================================
// Sách Nhà Giang - Register Page (Red Theme + Logo + Phone VN)
// =============================================================

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User, Mail, Lock, Phone, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Mật khẩu xác nhận không khớp");
            return;
        }
        if (form.phone.length < 9 || form.phone.length > 10) {
            setError("Số điện thoại phải từ 9-10 chữ số");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    password: form.password,
                }),
            });
            const data = await res.json();
            if (!data.success) {
                setError(data.error || "Đăng ký thất bại");
            } else {
                setSuccess(true);
                setTimeout(() => router.push("/login"), 2000);
            }
        } catch {
            setError("Lỗi hệ thống, vui lòng thử lại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Panel - Decorative */}
            <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-red-600 via-red-500 to-red-700 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-red-400/30 blur-3xl" />
                    <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-red-800/20 blur-3xl" />
                </div>
                <div className="relative text-center px-8">
                    <img src="/BANNER.png?v=2" alt="Nhà Giang" className="mx-auto max-h-[320px] object-contain drop-shadow-2xl mb-8" />
                    <h2 className="text-3xl font-extrabold text-white">Chào mừng đến Nhà Giang!</h2>
                    <p className="mt-2 text-lg text-red-100">Tham gia cộng đồng yêu sách lớn nhất Việt Nam</p>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex flex-col items-center gap-3">
                            <img src="/LOGO.png" alt="Nhà Giang" className="h-16 w-16 rounded-2xl object-contain shadow-lg shadow-red-100" />
                            <div>
                                <h1 className="text-2xl font-extrabold text-red-600">Nhà Giang</h1>
                                <p className="text-sm text-gray-400">Tạo tài khoản mới</p>
                            </div>
                        </Link>
                    </div>

                    {success && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mb-4 flex items-center gap-2 rounded-xl bg-green-50 p-3 text-sm text-green-600"
                        >
                            <CheckCircle className="h-4 w-4" /> Đăng ký thành công! Đang chuyển đến trang đăng nhập...
                        </motion.div>
                    )}

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-600"
                        >
                            <AlertCircle className="h-4 w-4 flex-shrink-0" /> {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">Họ tên</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="Nguyễn Văn A"
                                    className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder="email@example.com"
                                    className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">Số điện thoại</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    <span className="text-red-600 font-bold">+84</span>
                                </div>
                                <input
                                    type="tel"
                                    required
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
                                    placeholder="912 345 678"
                                    className="w-full rounded-xl border border-gray-200 py-2.5 pl-[88px] pr-4 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">Mật khẩu</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    minLength={6}
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    placeholder="••••••••"
                                    className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-10 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    required
                                    value={form.confirmPassword}
                                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                    placeholder="••••••••"
                                    className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || success}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
                        >
                            {loading ? (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            ) : (
                                "Đăng ký →"
                            )}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Đã có tài khoản?{" "}
                        <Link href="/login" className="font-semibold text-red-600 hover:text-red-700">
                            Đăng nhập
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
