// =============================================================
// ShopBook - Footer (Red + White Premium Design)
// =============================================================

import Link from "next/link";
import { BookOpen, Mail, Phone, MapPin, Facebook, MessageCircle } from "lucide-react";
import prisma from "@/lib/prisma";

export async function Footer() {
    let settings: Record<string, string> = {};
    try {
        const rawSettings = await prisma.setting.findMany();
        settings = rawSettings.reduce((acc: any, curr: any) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});
    } catch (e) { }

    const address = settings["contact_address"] || "123 Nguyễn Huệ, Q.1, TP.HCM";
    const phone = settings["contact_phone"] || "1900 1234";
    const email = settings["contact_email"] || "hello@nhagiang.vn";
    const facebookUrl = settings["social_facebook"] || "#";
    return (
        <footer className="border-t border-gray-100 bg-white">
            {/* Main footer */}
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-2.5">
                            <img src="/LOGO.png" alt="Nhà Giang" className="h-9 w-9 rounded-xl object-contain" />
                            <div className="flex flex-col leading-none">
                                <span className="text-lg font-extrabold text-red-600">Nhà Giang</span>
                                <span className="text-[10px] text-gray-400 font-medium">Sách hay mỗi ngày</span>
                            </div>
                        </Link>
                        <p className="mt-4 text-sm leading-relaxed text-gray-500">
                            Sách Nhà Giang - Khám phá hàng ngàn đầu sách chất lượng với giá ưu đãi.
                        </p>
                        <div className="mt-4 flex items-center gap-3">
                            <Link href={facebookUrl} target="_blank" className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors">
                                <Facebook className="h-4 w-4" />
                            </Link>
                            <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors">
                                <MessageCircle className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-bold text-gray-900">Khám phá</h4>
                        <ul className="mt-4 space-y-2.5">
                            {["Sách mới", "Bán chạy", "Khuyến mãi", "Tác giả nổi bật"].map((item) => (
                                <li key={item}>
                                    <Link href="/books" className="text-sm text-gray-500 hover:text-red-600 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-sm font-bold text-gray-900">Hỗ trợ</h4>
                        <ul className="mt-4 space-y-2.5">
                            {["Hướng dẫn mua hàng", "Chính sách đổi trả", "Giao hàng & Vận chuyển", "Câu hỏi thường gặp"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-sm text-gray-500 hover:text-red-600 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-bold text-gray-900">Liên hệ</h4>
                        <ul className="mt-4 space-y-3">
                            <li className="flex items-start gap-2.5">
                                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                                <span className="text-sm text-gray-500 whitespace-pre-wrap">{address}</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Phone className="h-4 w-4 flex-shrink-0 text-red-500" />
                                <span className="text-sm text-gray-500">{phone}</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Mail className="h-4 w-4 flex-shrink-0 text-red-500" />
                                <span className="text-sm text-gray-500">{email}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-100">
                <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
                    <p className="text-center text-xs text-gray-400">
                        © 2026 Sách Nhà Giang. All rights reserved. Made with ❤️ in Vietnam.
                    </p>
                </div>
            </div>
        </footer>
    );
}
