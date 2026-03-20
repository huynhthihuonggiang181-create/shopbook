"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Save, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export default function AdminFlashSalesPage() {
    const [sales, setSales] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<any>(null);
    const [saving, setSaving] = useState(false);

    // Books logic for adding items
    const [books, setBooks] = useState<any[]>([]);
    const [searchBook, setSearchBook] = useState("");
    const [selectedBooks, setSelectedBooks] = useState<any[]>([]); // { bookId, discountPrice, book: {...} }

    const [form, setForm] = useState({
        name: "",
        startDate: "",
        endDate: "",
        status: "ACTIVE"
    });

    const loadSales = () => {
        setLoading(true);
        fetch(`/api/flash-sales?t=${Date.now()}`)
            .then(r => r.json())
            .then(d => {
                if (d.success) setSales(d.data);
            })
            .finally(() => setLoading(false));
    };

    const loadBooks = () => {
        fetch("/api/books?limit=100")
            .then(r => r.json())
            .then(d => {
                if (d.success) setBooks(d.data);
            });
    };

    useEffect(() => {
        loadSales();
        loadBooks();
    }, []);

    const toDateTimeLocal = (isoString: string) => {
        if (!isoString) return "";
        const date = new Date(isoString);
        return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    };

    const openAdd = () => {
        setEditing(null);
        setForm({
            name: "Giờ Vàng Giảm Giá",
            startDate: toDateTimeLocal(new Date().toISOString()),
            endDate: toDateTimeLocal(new Date(Date.now() + 24 * 3600 * 1000).toISOString()),
            status: "ACTIVE"
        });
        setSelectedBooks([]);
        setShowModal(true);
    };

    const openEdit = async (id: string) => {
        const res = await fetch(`/api/flash-sales/${id}`);
        const data = await res.json();
        if (data.success) {
            const sale = data.data;
            setEditing(sale);
            setForm({
                name: sale.name,
                startDate: toDateTimeLocal(sale.startDate),
                endDate: toDateTimeLocal(sale.endDate),
                status: sale.status
            });
            setSelectedBooks(sale.items.map((item: any) => ({
                bookId: item.bookId,
                discountPrice: item.discountPrice,
                book: item.book
            })));
            setShowModal(true);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const payload = {
                ...form,
                startDate: new Date(form.startDate).toISOString(),
                endDate: new Date(form.endDate).toISOString(),
                items: selectedBooks.map(b => ({
                    bookId: b.bookId,
                    discountPrice: parseFloat(b.discountPrice)
                }))
            };

            const url = editing ? `/api/flash-sales/${editing.id}` : "/api/flash-sales";
            const method = editing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (data.success) {
                setShowModal(false);
                loadSales();
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error(error);
            alert("Đã xảy ra lỗi khi lưu");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Chắc chắn xóa Flash Sale này? Sẽ không thể khôi phục!")) return;
        setLoading(true);
        try {
            await fetch(`/api/flash-sales/${id}`, { method: "DELETE" });
            loadSales();
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    // Derived states
    const filteredBooks = books.filter(b => b.title.toLowerCase().includes(searchBook.toLowerCase()) && !selectedBooks.some(sb => sb.bookId === b.id)).slice(0, 5);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
                        <Zap className="h-6 w-6 text-red-600" /> Quản lý Flash Sale
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">Thiết lập thời gian và giảm giá SỐC cho sản phẩm chạy trên màn hình Trang chủ.</p>
                </div>
                <Button onClick={openAdd} icon={<Plus className="h-4 w-4" />}>Tạo Flash Sale</Button>
            </div>

            {loading ? (
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => <div key={i} className="h-20 rounded-xl bg-gray-100 animate-pulse" />)}
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left px-4 py-3 font-medium text-gray-500">Chiến dịch</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-500">Thời gian</th>
                                <th className="text-center px-4 py-3 font-medium text-gray-500">Số SP</th>
                                <th className="text-center px-4 py-3 font-medium text-gray-500">Trạng thái</th>
                                <th className="text-center px-4 py-3 font-medium text-gray-500">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.map((sale) => (
                                <tr key={sale.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                                    <td className="px-4 py-4 font-bold text-red-600">{sale.name}</td>
                                    <td className="px-4 py-4 text-gray-600">
                                        <div className="text-xs">{new Date(sale.startDate).toLocaleString("vi-VN")}</div>
                                        <div className="text-xs text-red-500">đến {new Date(sale.endDate).toLocaleString("vi-VN")}</div>
                                    </td>
                                    <td className="px-4 py-4 text-center font-medium bg-red-50/50">{sale._count?.items || 0} sách</td>
                                    <td className="px-4 py-4 text-center">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${sale.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                                            {sale.status === "ACTIVE" ? "ĐANG BẬT" : "TẠM DỪNG"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <button onClick={() => openEdit(sale.id)} className="rounded-lg p-2 text-gray-400 hover:bg-blue-50 hover:text-blue-600">
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button onClick={() => handleDelete(sale.id)} className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {sales.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-gray-400">Chưa có chương trình Flash Sale nào</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-white shadow-2xl overflow-hidden">
                        <div className="flex items-center justify-between p-5 border-b border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <Zap className="h-5 w-5 text-red-600" /> {editing ? "Sửa Flash Sale" : "Tạo Flash Sale mới"}
                            </h2>
                            <button onClick={() => setShowModal(false)} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="p-5 flex-1 overflow-y-auto bg-gray-50/50">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Left column: Settings */}
                                <div className="space-y-4 md:col-span-1">
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
                                        <h3 className="font-bold text-gray-900 border-b pb-2">Thông tin chung</h3>
                                        <div>
                                            <label className="text-xs font-semibold text-gray-600 mb-1 block">Tên chương trình</label>
                                            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-red-500 focus:outline-none" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-gray-600 mb-1 block">Bắt đầu từ</label>
                                            <input type="datetime-local" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-red-500 focus:outline-none" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-gray-600 mb-1 block">Kéo dài đến</label>
                                            <input type="datetime-local" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-red-500 focus:outline-none bg-red-50" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-gray-600 mb-1 block">Trạng thái (Hiển thị ngay)</label>
                                            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-bold text-gray-900 focus:border-red-500 focus:outline-none">
                                                <option value="ACTIVE">⚡ ĐANG BẬT</option>
                                                <option value="DRAFT">⏸ TẠM DỪNG</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Right column: Products */}
                                <div className="md:col-span-2 space-y-4">
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                        <h3 className="font-bold text-gray-900 border-b pb-2 flex justify-between items-center mb-4">
                                            <span>Sách tham gia ({selectedBooks.length})</span>
                                        </h3>

                                        {/* Product Search Box */}
                                        <div className="relative mb-4 z-[60]">
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    value={searchBook}
                                                    onChange={e => setSearchBook(e.target.value)}
                                                    placeholder="Tìm sách để thêm vào Flash Sale..."
                                                    className="w-full rounded-lg bg-gray-50 border border-gray-200 py-2.5 pl-9 pr-4 text-sm focus:bg-white focus:border-red-500 focus:outline-none"
                                                />
                                            </div>
                                            {searchBook && filteredBooks.length > 0 && (
                                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-[99] overflow-hidden">
                                                    {filteredBooks.map(b => (
                                                        <div key={b.id} onClick={() => {
                                                            setSelectedBooks([{ bookId: b.id, book: b, discountPrice: b.salePrice || b.price }, ...selectedBooks]);
                                                            setSearchBook("");
                                                        }} className="flex items-center gap-3 p-3 hover:bg-red-50 cursor-pointer border-b last:border-0 border-gray-100 transition-colors">
                                                            <div className="flex h-12 w-10 flex-shrink-0 items-center justify-center rounded-md bg-gray-100 overflow-hidden shadow-sm">
                                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                {b.image ? <img src={b.image} alt={b.title} className="h-full w-full object-cover" /> : "📖"}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-bold text-gray-900 truncate">{b.title}</p>
                                                                <p className="text-xs text-red-600 font-semibold mt-0.5">Giá bán: {formatPrice(b.price)}</p>
                                                            </div>
                                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
                                                                <Plus className="h-4 w-4" />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Selected Products Table */}
                                        <div className="border border-gray-100 rounded-xl overflow-hidden">
                                            <table className="w-full text-sm">
                                                <thead className="bg-gray-50 text-xs">
                                                    <tr>
                                                        <th className="text-left px-3 py-2 font-semibold text-gray-600">Tên sách</th>
                                                        <th className="text-right px-3 py-2 font-semibold text-gray-600">Giá gốc</th>
                                                        <th className="text-right px-3 py-2 font-semibold text-red-600">GIÁ FLASH SALE ⚡</th>
                                                        <th className="text-center px-3 py-2 font-semibold text-gray-600 w-10"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {selectedBooks.map((sb, idx) => (
                                                        <tr key={sb.bookId} className="border-t border-gray-50">
                                                            <td className="px-3 py-2">
                                                                <div className="font-medium text-gray-900 truncate max-w-[200px]" title={sb.book.title}>{sb.book.title}</div>
                                                            </td>
                                                            <td className="px-3 py-2 text-right text-gray-500 line-through text-xs">
                                                                {formatPrice(sb.book.price)}
                                                            </td>
                                                            <td className="px-3 py-2">
                                                                <input
                                                                    type="number"
                                                                    value={sb.discountPrice}
                                                                    onChange={(e) => {
                                                                        const newBooks = [...selectedBooks];
                                                                        newBooks[idx].discountPrice = e.target.value;
                                                                        setSelectedBooks(newBooks);
                                                                    }}
                                                                    className="w-full rounded border border-red-200 px-2 py-1.5 text-right font-bold text-red-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none"
                                                                />
                                                            </td>
                                                            <td className="px-3 py-2 text-center">
                                                                <button onClick={() => setSelectedBooks(selectedBooks.filter(b => b.bookId !== sb.bookId))} className="text-gray-400 hover:text-red-600 p-1">
                                                                    <Trash2 className="h-4 w-4" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {selectedBooks.length === 0 && (
                                                        <tr>
                                                            <td colSpan={4} className="px-3 py-8 text-center text-gray-400">
                                                                Chưa có sách nào trong chương trình.<br />Tìm và chọn sách ở ô bên trên.
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-100 flex gap-3 justify-end bg-gray-50">
                            <Button variant="outline" onClick={() => setShowModal(false)}>Hủy bỏ</Button>
                            <Button onClick={handleSave} loading={saving} icon={<Save className="h-4 w-4" />}>
                                {editing ? "Lưu chương trình" : "Tạo chương trình"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
