// =============================================================
// ShopBook - Admin Categories CRUD (Real DB)
// =============================================================

"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Edit2, Trash2, X, Save, Image as ImageIcon, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const generateSlug = (str: string) => {
    return str
        .toLowerCase()
        .normalize('NFD') // Change diacritics
        .replace(/[\u0300-\u036f]/g, '') // Remove them
        .replace(/đ/g, 'd').replace(/Đ/g, 'D') // Handle d
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/-+/g, '-') // Replace multiple - with single -
        .replace(/^-+|-+$/g, ''); // Trim -
};

function renderCategoryIcon(icon: string | null | undefined, className = "") {
    if (!icon) return <span className={className}>📚</span>;
    if (icon.startsWith("/") || icon.startsWith("http")) {
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={icon} alt="Icon" className={`object-contain ${className}`} />;
    }
    return <span className={className}>{icon}</span>;
}

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editCategory, setEditCategory] = useState<any>(null);
    const [saving, setSaving] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    const [form, setForm] = useState({
        name: "", slug: "", description: "", icon: "📚", image: ""
    });

    const loadCategories = () => {
        setLoading(true);
        fetch(`/api/categories?t=${Date.now()}`)
            .then((r) => r.json())
            .then((d) => {
                if (d.success) {
                    let filtered = d.data;
                    if (search) {
                        filtered = filtered.filter((c: any) => c.name.toLowerCase().includes(search.toLowerCase()));
                    }
                    setCategories(filtered);
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        loadCategories();
    }, [search]);

    const openAdd = () => {
        setEditCategory(null);
        setForm({ name: "", slug: "", description: "", icon: "📚", image: "" });
        setShowModal(true);
    };

    const openEdit = (category: any) => {
        setEditCategory(category);
        setForm({
            name: category.name,
            slug: category.slug,
            description: category.description || "",
            icon: category.icon || "📚",
            image: category.image || "",
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const body = {
                name: form.name,
                slug: form.slug || generateSlug(form.name),
                description: form.description || null,
                icon: form.icon || "📚",
                image: form.image || null,
            };

            let res;
            if (editCategory) {
                res = await fetch(`/api/categories/${editCategory.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });
            } else {
                res = await fetch("/api/categories", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });
            }
            const data = await res.json();
            if (!data.success) {
                alert("Lỗi: " + (data.error || "Không thể lưu danh mục"));
                return;
            }
            setShowModal(false);
            loadCategories();
        } catch (error) {
            console.error("Save error:", error);
        } finally {
            setSaving(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", { method: "POST", body: formData });
            const data = await res.json();
            if (data.success) {
                setForm(f => ({ ...f, icon: data.url }));
            } else {
                alert(data.error || "Upload thất bại");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Lỗi kết nối khi upload");
        } finally {
            setUploadingImage(false);
        }
    };

    const handleDelete = async (id: string, count: number) => {
        if (count > 0) {
            if (!confirm(`CẢNH BÁO: Danh mục này đang chứa ${count} quyển sách!\nNếu bạn xóa danh mục này, TẤT CẢ sách thuộc danh mục này cũng sẽ bị ẩn đi.\n\nBạn có CHẮC CHẮN muốn tiếp tục xóa không?`)) {
                return;
            }
        } else {
            if (!confirm("Bạn có chắc muốn xóa danh mục này không?")) return;
        }

        try {
            await fetch(`/api/categories/${id}`, { method: "DELETE" });
            loadCategories();
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-extrabold text-gray-900">Quản lý danh mục</h1>
                <Button onClick={openAdd} icon={<Plus className="h-4 w-4" />}>Thêm danh mục</Button>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Tìm kiếm danh mục..."
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
                                <th className="text-left px-4 py-3 font-medium text-gray-500">Danh mục</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-500">Mô tả</th>
                                <th className="text-center px-4 py-3 font-medium text-gray-500">Số lượng sách</th>
                                <th className="text-center px-4 py-3 font-medium text-gray-500">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 overflow-hidden items-center justify-center rounded-xl bg-red-50 text-xl">
                                                {renderCategoryIcon(category.icon, "h-6 w-6")}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{category.name}</p>
                                                <p className="text-xs text-gray-400">/{category.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-500 truncate max-w-[200px]">
                                        {category.description || "—"}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                                            {category._count?.books || 0} sách
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <button onClick={() => openEdit(category)} className="rounded-lg p-2 text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category.id, category._count?.books || 0)}
                                                className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                                                title={category._count?.books > 0 ? "Xóa danh mục (cảnh báo: sẽ xóa luôn sách)" : "Xóa danh mục"}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {categories.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                                        Không tìm thấy danh mục nào.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-gray-100 p-5">
                            <h2 className="text-lg font-bold text-gray-900">{editCategory ? "Sửa danh mục" : "Thêm danh mục mới"}</h2>
                            <button onClick={() => setShowModal(false)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="p-5 space-y-4">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">Icon / Emoji / Ảnh</label>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-red-50 text-2xl border border-red-100">
                                        {renderCategoryIcon(form.icon, "h-8 w-8")}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <input
                                            placeholder="Nhập Emoji (Win + .) hoặc URL ảnh"
                                            value={form.icon}
                                            onChange={(e) => setForm({ ...form, icon: e.target.value })}
                                            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none"
                                        />
                                        <div className="flex items-center gap-2">
                                            <label className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium transition-colors ${uploadingImage ? "bg-gray-100 text-gray-400" : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>
                                                {uploadingImage ? <span className="animate-pulse">Đang tải...</span> : <><Upload className="h-3.5 w-3.5" /> Tải ảnh lên</>}
                                                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploadingImage} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">Tên danh mục <span className="text-red-500">*</span></label>
                                <input
                                    placeholder="Ví dụ: Công nghệ"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">Đường dẫn tĩnh (Slug)</label>
                                <input
                                    placeholder={form.name ? generateSlug(form.name) : "ví-dụ-đường-dẫn (để trống sẽ tự tạo)"}
                                    value={form.slug}
                                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none placeholder-gray-400"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">Mô tả</label>
                                <textarea
                                    placeholder="Thông tin thêm..."
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    rows={3}
                                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none resize-none"
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button variant="outline" onClick={() => setShowModal(false)} className="flex-1 py-5 rounded-xl border-gray-200">
                                    Hủy bỏ
                                </Button>
                                <Button onClick={handleSave} loading={saving} icon={<Save className="h-4 w-4" />} className="flex-1 py-5 rounded-xl">
                                    {editCategory ? "Cập nhật" : "Tạo danh mục"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
