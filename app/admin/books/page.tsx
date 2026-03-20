// =============================================================
// ShopBook - Admin Books CRUD (Real DB)
// =============================================================

"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Edit2, Trash2, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export default function AdminBooksPage() {
    const [books, setBooks] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editBook, setEditBook] = useState<any>(null);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        title: "", slug: "", author: "", description: "", price: "",
        salePrice: "", isbn: "", publisher: "", pages: "", stock: "",
        featured: false, categoryId: "", image: "",
    });

    const loadBooks = () => {
        setLoading(true);
        const params = new URLSearchParams();
        params.set("limit", "100");
        params.set("t", Date.now().toString());
        if (search) params.set("search", search);
        fetch(`/api/books?${params}`)
            .then((r) => r.json())
            .then((d) => d.success && setBooks(d.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadBooks();
        fetch("/api/categories")
            .then((r) => r.json())
            .then((d) => d.success && setCategories(d.data))
            .catch(console.error);
    }, []);

    useEffect(() => {
        const t = setTimeout(loadBooks, 500);
        return () => clearTimeout(t);
    }, [search]);

    const openAdd = () => {
        setEditBook(null);
        setForm({ title: "", slug: "", author: "", description: "", price: "", salePrice: "", isbn: "", publisher: "", pages: "", stock: "", featured: false, categoryId: categories[0]?.id || "", image: "" });
        setShowModal(true);
    };

    const openEdit = (book: any) => {
        setEditBook(book);
        setForm({
            title: book.title, slug: book.slug, author: book.author,
            description: book.description || "", price: String(book.price),
            salePrice: book.salePrice ? String(book.salePrice) : "",
            isbn: book.isbn || "", publisher: book.publisher || "",
            pages: book.pages ? String(book.pages) : "",
            stock: String(book.stock), featured: book.featured,
            categoryId: book.categoryId, image: book.image || "",
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const body = {
                title: form.title,
                slug: form.slug || form.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, ""),
                author: form.author,
                description: form.description,
                price: parseFloat(form.price) || 0,
                salePrice: form.salePrice ? (parseFloat(form.salePrice) || null) : null,
                isbn: form.isbn || null,
                publisher: form.publisher || null,
                pages: form.pages ? (parseInt(form.pages) || null) : null,
                stock: parseInt(form.stock) || 0,
                featured: form.featured,
                categoryId: form.categoryId,
                image: form.image || null,
            };

            let res;
            if (editBook) {
                res = await fetch(`/api/books/${editBook.slug}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });
            } else {
                res = await fetch("/api/books", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });
            }

            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = await res.text();
                console.error("Non-JSON Response Server Error:", res.status, text);
                alert("Lỗi máy chủ (Không phải JSON): " + res.status);
                return;
            }

            const data = await res.json();
            if (!data.success) {
                alert("Lỗi: " + (data.error || "Không thể lưu sách"));
                return;
            }
            setShowModal(false);
            loadBooks();
        } catch (error) {
            console.error("Save error:", error);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (slug: string) => {
        if (!confirm("Bạn có chắc muốn xóa sách này?")) return;
        try {
            await fetch(`/api/books/${slug}`, { method: "DELETE" });
            loadBooks();
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-extrabold text-gray-900">Quản lý sách</h1>
                <Button onClick={openAdd} icon={<Plus className="h-4 w-4" />}>Thêm sách</Button>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Tìm kiếm sách..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-4 text-sm focus:border-red-500 focus:outline-none"
                />
            </div>

            {/* Table */}
            {loading ? (
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => <div key={i} className="h-16 rounded-xl bg-gray-100 animate-pulse" />)}
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left px-4 py-3 font-medium text-gray-500">Sách</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-500">Danh mục</th>
                                <th className="text-right px-4 py-3 font-medium text-gray-500">Giá</th>
                                <th className="text-center px-4 py-3 font-medium text-gray-500">Kho</th>
                                <th className="text-center px-4 py-3 font-medium text-gray-500">Đã bán</th>
                                <th className="text-center px-4 py-3 font-medium text-gray-500">Nổi bật</th>
                                <th className="text-center px-4 py-3 font-medium text-gray-500">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr key={book.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-red-50 text-xl">
                                                {(book.category?.icon?.startsWith("/") || book.category?.icon?.startsWith("http")) ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img src={book.category.icon} alt="icon" className="h-6 w-6 object-contain" />
                                                ) : (
                                                    book.category?.icon || "📖"
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 truncate max-w-[200px]">{book.title}</p>
                                                <p className="text-xs text-gray-400">{book.author}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">{book.category?.name || "—"}</td>
                                    <td className="px-4 py-3 text-right">
                                        <span className="font-medium text-red-600">{formatPrice(book.salePrice || book.price)}</span>
                                        {book.salePrice && <span className="block text-xs text-gray-400 line-through">{formatPrice(book.price)}</span>}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${book.stock > 10 ? "bg-green-100 text-green-700" : book.stock > 0 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                                            {book.stock}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center text-gray-600">{book.sold}</td>
                                    <td className="px-4 py-3 text-center">{book.featured ? "⭐" : "—"}</td>
                                    <td className="px-4 py-3 text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <button onClick={() => openEdit(book)} className="rounded-lg p-1.5 text-gray-400 hover:bg-blue-50 hover:text-blue-600">
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button onClick={() => handleDelete(book.slug)} className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-900">{editBook ? "Sửa sách" : "Thêm sách mới"}</h2>
                            <button onClick={() => setShowModal(false)} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh bìa sách</label>
                                <div className="flex items-center gap-4">
                                    <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 bg-contain bg-center bg-no-repeat" style={form.image ? { backgroundImage: `url(${form.image})` } : {}}>
                                        {!form.image && <span className="text-gray-400 text-xs">Trống</span>}
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;
                                            const formData = new FormData();
                                            formData.append("file", file);
                                            try {
                                                const res = await fetch("/api/upload", { method: "POST", body: formData });
                                                const data = await res.json();
                                                if (data.url) setForm({ ...form, image: data.url });
                                                else alert("Lỗi tải ảnh lên");
                                            } catch (err) {
                                                alert("Lỗi tải ảnh lên");
                                            }
                                        }}
                                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-red-500 focus:outline-none file:mr-4 file:rounded-full file:border-0 file:bg-red-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-red-700 hover:file:bg-red-100"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tên sách <span className="text-red-500">*</span></label>
                                <input placeholder="Nhập tên sách..." value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tác giả <span className="text-red-500">*</span></label>
                                <input placeholder="Nhập tên tác giả..." value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                                <textarea placeholder="Nhập mô tả sách..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Giá bìa (VNĐ) <span className="text-red-500">*</span></label>
                                    <input placeholder="VD: 100000" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Giá bán (Sau KM)</label>
                                    <input placeholder="VD: 80000" type="number" value={form.salePrice} onChange={(e) => setForm({ ...form, salePrice: e.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mã hàng (ISBN)</label>
                                    <input placeholder="Nhập mã hàng..." value={form.isbn} onChange={(e) => setForm({ ...form, isbn: e.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nhà xuất bản (NXB)</label>
                                    <input placeholder="Nhập nhà cung cấp/NXB..." value={form.publisher} onChange={(e) => setForm({ ...form, publisher: e.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng tồn kho</label>
                                    <input placeholder="VD: 100" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Số trang</label>
                                    <input placeholder="VD: 200" type="number" value={form.pages} onChange={(e) => setForm({ ...form, pages: e.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục sách <span className="text-red-500">*</span></label>
                                <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none bg-white">
                                    <option value="">Chọn danh mục</option>
                                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mt-2">
                                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="rounded border-gray-300 text-red-600 focus:ring-red-500 h-4 w-4" />
                                Đánh dấu là sản phẩm nổi bật
                            </label>
                            <div className="flex gap-3 pt-2">
                                <Button variant="outline" onClick={() => setShowModal(false)} className="flex-1">Hủy</Button>
                                <Button onClick={handleSave} loading={saving} icon={<Save className="h-4 w-4" />} className="flex-1">
                                    {editBook ? "Cập nhật" : "Thêm sách"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
