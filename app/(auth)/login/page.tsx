// =============================================================
// Sách Nhà Giang - Login Page (Red Theme + Logo)
// =============================================================

"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError(result.error);
            } else {
                router.push("/");
                router.refresh();
            }
        } catch {
            setError("Lỗi hệ thống, vui lòng thử lại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Panel - Form */}
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
                                <p className="text-sm text-gray-400">Sách hay mỗi ngày</p>
                            </div>
                        </Link>
                    </div>

                    <h2 className="text-center text-xl font-bold text-gray-900">Đăng nhập</h2>
                    <p className="mt-1 text-center text-sm text-gray-500">Chào mừng bạn trở lại</p>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-600"
                        >
                            <AlertCircle className="h-4 w-4 flex-shrink-0" />
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        {/* Email */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="email@example.com"
                                    className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-10 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
                        >
                            {loading ? (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            ) : (
                                "Đăng nhập →"
                            )}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Chưa có tài khoản?{" "}
                        <Link href="/register" className="font-semibold text-red-600 hover:text-red-700">
                            Đăng ký
                        </Link>
                    </p>
                </motion.div>
            </div>

            {/* Right Panel - Decorative */}
            <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-red-600 via-red-500 to-red-700 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-red-400/30 blur-3xl" />
                    <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-red-800/20 blur-3xl" />
                </div>
                <div className="relative text-center px-8">
                    <img src="/BANNER.png?v=2" alt="Nhà Giang" className="mx-auto max-h-[320px] object-contain drop-shadow-2xl mb-8" />
                    <h2 className="text-3xl font-extrabold text-white">Chào mừng trở lại!</h2>
                    <p className="mt-2 text-lg text-red-100">Tiếp tục hành trình tri thức cùng Nhà Giang</p>
                </div>
            </div>
        </div>
    );
}
