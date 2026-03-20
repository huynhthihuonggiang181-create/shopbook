// =============================================================
// Sách Nhà Giang - Homepage (Real DB + BANNER.png Hero)
// =============================================================
export const dynamic = 'force-dynamic';
import Link from "next/link";
import { Truck, Shield, RotateCcw, Headphones, ArrowRight, Star, Zap } from "lucide-react";
import { BookCard } from "@/components/book/book-card";
import { FlashSaleCard } from "@/components/book/flash-sale-card";
import { FlashSaleCountdown } from "@/components/ui/flash-sale-countdown";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

async function getActiveFlashSale() {
    const base = process.env.NEXT_PUBLIC_APP_URL ||"";
    try {
        const res = await fetch(`${base}/api/flash-sales/active`, { cache: "no-store" });
        const json = await res.json();
        return json.success ? json.data : null;
    } catch { return null; }
}

async function getCategories() {
    const base = process.env.NEXT_PUBLIC_APP_URL ||"";
    try {
        const res = await fetch(`${base}/api/categories`, { cache: "no-store" });
        const json = await res.json();
        return json.success ? json.data : [];
    } catch { return []; }
}

async function getBooks() {
    const base = process.env.NEXT_PUBLIC_APP_URL ||"";
    try {
        const res = await fetch(`${base}/api/books?limit=10`, { cache: "no-store" });
        const json = await res.json();
        return json.success ? json.data : [];
    } catch { return []; }
}

export default async function HomePage() {
    const [activeSale, categories, books] = await Promise.all([
        getActiveFlashSale(),
        getCategories(),
        getBooks(),
    ]);

    const features = [
        { icon: Truck, label: "Giao hàng miễn phí", desc: "Đơn từ 200k" },
        { icon: Shield, label: "Sách chính hãng", desc: "100% authentic" },
        { icon: RotateCcw, label: "Đổi trả dễ dàng", desc: "Trong 7 ngày" },
        { icon: Headphones, label: "Hỗ trợ 24/7", desc: "Luôn sẵn sàng" },
    ];

    return (
        <div className="bg-white">
            {/* Hero with BANNER.png */}
            <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-500 to-red-700 min-h-[480px]">
                {/* Background Blur Decorations */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-red-400/30 blur-3xl" />
                    <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-red-800/20 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-8 lg:grid-cols-2 py-12 lg:py-16">
                        {/* Left content */}
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white border border-white/20 mb-6">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> Mới cập nhật 2026
                            </div>

                            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                                Từng Trang Sách
                                <br />
                                <span className="text-red-200">Là Một Kỷ Niệm...</span>
                            </h1>

                            <p className="mt-5 max-w-lg text-lg text-red-100 leading-relaxed">
                                Khám phá những khoảnh khắc gia đình ấm áp, những bài học sâu sắc qua từng trang sách &quot;Nhà Giang&quot;.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link href="/books" className="rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-red-600 shadow-lg shadow-red-900/25 hover:bg-red-50 transition-all hover:scale-105">
                                    Khám phá ngay
                                </Link>
                                <Link href="/books" className="rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3.5 text-sm font-bold text-white hover:bg-white/20 transition-all">
                                    Mua sách Nhà Giang
                                </Link>
                            </div>

                            {/* Stats */}
                            <div className="mt-10 flex gap-8">
                                <div>
                                    <p className="text-2xl font-extrabold text-white">10K+</p>
                                    <p className="text-sm text-red-200">Đầu sách</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-extrabold text-white">50K+</p>
                                    <p className="text-sm text-red-200">Khách hàng</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-extrabold text-white">4.8★</p>
                                    <p className="text-sm text-red-200">Đánh giá</p>
                                </div>
                            </div>
                        </div>

                        {/* Right - BANNER image blended with red */}
                        <div className="relative hidden lg:flex items-center justify-center">
                            {/* Glow effect behind image */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="h-80 w-80 rounded-full bg-white/10 blur-3xl" />
                            </div>
                            <div className="relative">
                                {/* Image with red blend overlay */}
                                <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-red-900/30">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={`/BANNER.png?v=${Date.now()}`}
                                        alt="Sách Nhà Giang"
                                        className="relative z-10 object-cover max-h-[420px] w-auto rounded-3xl"
                                    />
                                    {/* Red gradient overlay on edges to blend */}
                                    <div className="absolute inset-0 z-20 rounded-3xl pointer-events-none"
                                        style={{
                                            background: `
                                                linear-gradient(to right, rgba(220,38,38,0.3) 0%, transparent 20%, transparent 80%, rgba(220,38,38,0.3) 100%),
                                                linear-gradient(to bottom, rgba(220,38,38,0.3) 0%, transparent 15%, transparent 85%, rgba(220,38,38,0.3) 100%)
                                            `
                                        }}
                                    />
                                </div>
                                {/* Decorative border glow */}
                                <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-br from-white/20 via-transparent to-red-400/20 -z-10 blur-sm" />

                                {/* Rating badge */}
                                <div className="absolute -right-3 top-6 z-30 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-red-900/20">
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <Star key={i} className={`h-4 w-4 ${i <= 4 ? "fill-yellow-400 text-yellow-400" : "fill-yellow-200 text-yellow-200"}`} />
                                        ))}
                                    </div>
                                    <span className="text-sm font-bold text-gray-900">4.8 / 5.0</span>
                                </div>

                                {/* Bottom floating card */}
                                <div className="absolute -bottom-3 -left-3 z-30 rounded-2xl bg-white/95 backdrop-blur-sm px-4 py-3 shadow-xl shadow-red-900/20">
                                    <p className="text-xs font-bold text-red-600">🔥 Bestseller</p>
                                    <p className="text-[11px] text-gray-500">Hơn 10,000+ đã bán</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Flash Sale Section */}
            {activeSale && activeSale.books && activeSale.books.length > 0 && (
                <section className="bg-gradient-to-b from-red-50 to-white py-12">
                    <ScrollReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Flash Sale Header */}
                        <div className="bg-white rounded-t-[2rem] px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-red-500 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-100/50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-6">
                                <h2 className="text-2xl md:text-3xl font-black italic text-red-600 flex items-center shrink-0">
                                    <Zap className="h-8 w-8 md:h-10 md:w-10 fill-red-600 mr-2" />
                                    {activeSale.name.toUpperCase()}
                                </h2>
                                <FlashSaleCountdown endDate={activeSale.endDate} />
                            </div>
                            <Link href="/books?featured=true" className="flex items-center gap-1 text-sm font-bold text-red-600 bg-red-50 px-4 py-2 rounded-full hover:bg-red-100 transition-colors whitespace-nowrap group">
                                Xem tất cả <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Flash Sale Body */}
                        <div className="bg-gradient-to-br from-red-600 to-red-500 p-4 sm:p-6 rounded-b-[2rem] shadow-2xl shadow-red-900/20">
                            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
                                {activeSale.books.map((book: any, idx: number) => (
                                    <ScrollReveal key={book.id} delay={0.1 * idx} direction="left">
                                        <div className="bg-white h-full rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                            <FlashSaleCard book={book} />
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </section>
            )}

            {/* Features Bar */}
            <section className="border-b border-gray-100 bg-white">
                <ScrollReveal className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                        {features.map((f, idx) => (
                            <ScrollReveal key={f.label} delay={0.1 * idx} direction="up" className="flex items-center gap-4 group">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-600 shadow-md shadow-red-500/20 group-hover:scale-110 transition-transform">
                                    <f.icon className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-extrabold text-gray-900">{f.label}</p>
                                    <p className="text-xs font-medium text-gray-500">{f.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* Categories */}
            <section className="bg-gray-50/50">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <ScrollReveal direction="up">
                        <h2 className="mb-10 text-3xl font-black text-gray-900 flex items-center gap-3">
                            <span className="h-8 w-2 rounded-full bg-red-600"></span> Danh mục nổi bật
                        </h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                        {categories.map((cat: any, idx: number) => (
                            <ScrollReveal key={cat.id} delay={0.05 * idx} direction="up">
                                <Link
                                    href={`/books?category=${cat.slug}`}
                                    className="group flex flex-col items-center rounded-3xl bg-white p-6 shadow-sm border-2 border-transparent hover:shadow-xl hover:shadow-red-900/5 hover:border-red-100 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-b from-red-50/0 to-red-50/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden text-4xl relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                                        {(cat.icon?.startsWith("/") || cat.icon?.startsWith("http")) ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={cat.icon} alt={cat.name} className="h-full w-full object-contain drop-shadow-sm" />
                                        ) : (
                                            <span className="drop-shadow-sm">{cat.icon || "📚"}</span>
                                        )}
                                    </div>
                                    <span className="mt-4 text-sm font-extrabold text-gray-900 group-hover:text-red-600 transition-colors relative z-10 text-center">{cat.name}</span>
                                    <span className="mt-1 text-xs font-semibold text-gray-400 relative z-10 bg-gray-100 px-2.5 py-0.5 rounded-full">{cat._count?.books || 0} sách</span>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Book List Section */}
            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <ScrollReveal direction="up" className="flex items-center justify-between mb-10 border-b border-gray-100 pb-0 overflow-x-auto whitespace-nowrap scrollbar-hide">
                        <div className="flex gap-8">
                            <h2 className="text-xl font-black text-red-600 border-b-4 border-red-600 pb-3 -mb-[2px] cursor-pointer">Xu Hướng Theo Ngày</h2>
                            <Link href="/books?sort=newest" className="text-xl font-bold text-gray-400 hover:text-red-500 transition-colors pb-3">Sách HOT - Giảm Sốc</Link>
                            <Link href="/books?sort=popular" className="text-xl font-bold text-gray-400 hover:text-red-500 transition-colors pb-3">Bestseller Ngoại Văn</Link>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
                        {books.map((book: any, idx: number) => (
                            <ScrollReveal key={book.id} delay={0.05 * idx} direction="up">
                                <BookCard book={book} />
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal delay={0.2} className="mt-12 flex justify-center">
                        <Link href="/books" className="rounded-full bg-red-50 border-2 border-red-100 px-10 py-3 text-sm font-bold text-red-600 shadow-sm hover:bg-red-600 hover:text-white hover:border-red-600 hover:shadow-red-600/30 hover:-translate-y-1 transition-all duration-300">
                            Khám phá tất cả sách
                        </Link>
                    </ScrollReveal>
                </div>
            </section>

            {/* CTA */}
            <section className="relative overflow-hidden bg-gradient-to-r from-red-600 via-red-500 to-red-600">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/20 blur-3xl rounded-full" />
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-black/20 blur-3xl rounded-full" />

                <ScrollReveal direction="up" className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
                    <h2 className="text-3xl font-black text-white sm:text-4xl">Bắt đầu hành trình tri thức cùng Nhà Giang</h2>
                    <p className="mt-4 text-lg text-red-100 font-medium">Đăng ký thành viên ngay hôm nay để nhận voucher giảm 50% cho đơn hàng đầu tiên.</p>
                    <Link href="/register" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-extrabold text-red-600 hover:bg-gray-50 hover:scale-105 shadow-xl shadow-red-900/30 transition-all duration-300">
                        Đăng ký ngay <ArrowRight className="h-5 w-5" />
                    </Link>
                </ScrollReveal>
            </section>
        </div>
    );
}
