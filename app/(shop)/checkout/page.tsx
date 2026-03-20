// =============================================================
// ShopBook - Checkout Page (Red Theme)
// =============================================================

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, CreditCard, Check, ArrowRight, ArrowLeft, ShoppingBag, PartyPopper } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

const checkoutSchema = z.object({
    shippingName: z.string().min(2, "Vui lòng nhập họ tên"),
    shippingPhone: z.string().min(10, "Số điện thoại không hợp lệ"),
    shippingAddress: z.string().min(10, "Vui lòng nhập địa chỉ đầy đủ"),
    note: z.string().optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

const STEPS = [
    { id: 1, label: "Thông tin", icon: MapPin },
    { id: 2, label: "Thanh toán", icon: CreditCard },
    { id: 3, label: "Hoàn thành", icon: Check },
];

export default function CheckoutPage() {
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const { items, total, clearCart } = useCartStore();
    const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({ resolver: zodResolver(checkoutSchema) });

    const shippingFee = total() > 200000 ? 0 : 30000;
    const grandTotal = total() + shippingFee;

    const handleOrder = async (data: CheckoutForm) => {
        if (step === 1) { setStep(2); return; }
        setIsProcessing(true);
        try {
            await new Promise((r) => setTimeout(r, 2000));
            clearCart();
            setStep(3);
        } catch (error) {
            console.error("Checkout error:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
                {/* Step Indicator */}
                <div className="mb-8 flex items-center justify-center gap-4">
                    {STEPS.map((s, i) => (
                        <div key={s.id} className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <motion.div
                                    animate={{ backgroundColor: step >= s.id ? "#dc2626" : "#e5e7eb", scale: step === s.id ? 1.1 : 1 }}
                                    className="flex h-10 w-10 items-center justify-center rounded-full text-white"
                                >
                                    <s.icon className={`h-5 w-5 ${step >= s.id ? "text-white" : "text-gray-400"}`} />
                                </motion.div>
                                <span className={`hidden text-sm font-medium sm:block ${step >= s.id ? "text-red-600" : "text-gray-400"}`}>{s.label}</span>
                            </div>
                            {i < STEPS.length - 1 && <div className={`h-0.5 w-12 transition-colors ${step > s.id ? "bg-red-500" : "bg-gray-200"}`} />}
                        </div>
                    ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="rounded-2xl bg-white p-6 shadow-sm">
                                    <h2 className="text-lg font-bold text-gray-900">Thông tin giao hàng</h2>
                                    <form onSubmit={handleSubmit(handleOrder)} className="mt-4 space-y-4">
                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-gray-700">Họ tên</label>
                                            <input {...register("shippingName")} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20" placeholder="Nguyễn Văn A" />
                                            {errors.shippingName && <p className="mt-1 text-xs text-red-500">{errors.shippingName.message}</p>}
                                        </div>
                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-gray-700">Số điện thoại</label>
                                            <input {...register("shippingPhone")} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20" placeholder="0123 456 789" />
                                            {errors.shippingPhone && <p className="mt-1 text-xs text-red-500">{errors.shippingPhone.message}</p>}
                                        </div>
                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-gray-700">Địa chỉ</label>
                                            <textarea {...register("shippingAddress")} rows={3} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20" placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành" />
                                            {errors.shippingAddress && <p className="mt-1 text-xs text-red-500">{errors.shippingAddress.message}</p>}
                                        </div>
                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-gray-700">Ghi chú</label>
                                            <input {...register("note")} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20" placeholder="Giao giờ hành chính..." />
                                        </div>
                                        <Button type="submit" className="w-full" size="lg">Tiếp tục <ArrowRight className="h-4 w-4" /></Button>
                                    </form>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="rounded-2xl bg-white p-6 shadow-sm">
                                    <h2 className="text-lg font-bold text-gray-900">Phương thức thanh toán</h2>
                                    <div className="mt-4 space-y-3">
                                        <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-red-500 bg-red-50 p-4">
                                            <input type="radio" name="payment" defaultChecked className="text-red-600" />
                                            <CreditCard className="h-5 w-5 text-red-600" />
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">Stripe (Thẻ tín dụng)</p>
                                                <p className="text-xs text-gray-500">Visa, Mastercard, JCB</p>
                                            </div>
                                        </label>
                                        <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-gray-200 p-4 hover:border-gray-300">
                                            <input type="radio" name="payment" className="text-red-600" />
                                            <ShoppingBag className="h-5 w-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">Thanh toán khi nhận hàng (COD)</p>
                                                <p className="text-xs text-gray-500">Phí COD: 15.000₫</p>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="mt-6 flex gap-3">
                                        <Button variant="outline" onClick={() => setStep(1)} className="flex-1"><ArrowLeft className="h-4 w-4" /> Quay lại</Button>
                                        <Button onClick={() => handleOrder({} as CheckoutForm)} loading={isProcessing} className="flex-1">Đặt hàng <ArrowRight className="h-4 w-4" /></Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl bg-white p-8 text-center shadow-sm">
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, delay: 0.2 }} className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500">
                                        <PartyPopper className="h-10 w-10 text-white" />
                                    </motion.div>
                                    <h2 className="mt-6 text-2xl font-bold text-gray-900">Đặt hàng thành công! 🎉</h2>
                                    <p className="mt-2 text-sm text-gray-500">Cảm ơn bạn đã mua hàng tại ShopBook.</p>
                                    <Button className="mt-6" size="lg" onClick={() => (window.location.href = "/books")}>Tiếp tục mua sắm</Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {step < 3 && (
                        <div className="rounded-2xl bg-white p-6 shadow-sm h-fit">
                            <h3 className="text-sm font-bold text-gray-900">Đơn hàng</h3>
                            <div className="mt-4 space-y-3">
                                {items.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between text-sm">
                                        <div className="flex-1"><p className="font-medium text-gray-900 line-clamp-1">{item.book.title}</p><p className="text-xs text-gray-400">x{item.quantity}</p></div>
                                        <span className="font-medium text-gray-700">{formatPrice((item.book.salePrice || item.book.price) * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 space-y-2 border-t pt-4">
                                <div className="flex justify-between text-sm"><span className="text-gray-500">Tạm tính</span><span>{formatPrice(total())}</span></div>
                                <div className="flex justify-between text-sm"><span className="text-gray-500">Vận chuyển</span><span className={shippingFee === 0 ? "text-emerald-600 font-medium" : ""}>{shippingFee === 0 ? "Miễn phí" : formatPrice(shippingFee)}</span></div>
                                <div className="flex justify-between border-t pt-2"><span className="font-bold">Tổng</span><span className="text-lg font-extrabold text-red-600">{formatPrice(grandTotal)}</span></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
