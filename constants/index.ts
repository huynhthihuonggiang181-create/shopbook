// =============================================================
// ShopBook - Constants & Configuration
// =============================================================

export const SITE_CONFIG = {
    name: "ShopBook",
    description: "Hiệu sách trực tuyến hàng đầu Việt Nam - Hàng ngàn đầu sách với giá tốt nhất",
    url: process.env.NEXT_PUBLIC_APP_URL ||,
    logo: "/logo.svg",
    currency: "VND",
} as const;

// Navigation links
export const NAV_LINKS = [
    { label: "Trang chủ", href: "/" },
    { label: "Sách", href: "/books" },
    { label: "Danh mục", href: "/books?view=categories" },
] as const;

// Admin navigation
export const ADMIN_NAV_LINKS = [
    { label: "Dashboard", href: "/admin/dashboard", icon: "LayoutDashboard" },
    { label: "Quản lý sách", href: "/admin/books", icon: "BookOpen" },
    { label: "Đơn hàng", href: "/admin/orders", icon: "ShoppingCart" },
    { label: "Người dùng", href: "/admin/users", icon: "Users" },
] as const;

// Order status labels and colors
export const ORDER_STATUS_MAP: Record<string, { label: string; color: string }> = {
    PENDING: { label: "Chờ xử lý", color: "bg-yellow-100 text-yellow-800" },
    PAID: { label: "Đã thanh toán", color: "bg-blue-100 text-blue-800" },
    SHIPPED: { label: "Đang giao", color: "bg-purple-100 text-purple-800" },
    COMPLETED: { label: "Hoàn thành", color: "bg-green-100 text-green-800" },
    CANCELLED: { label: "Đã hủy", color: "bg-red-100 text-red-800" },
};

// Pagination defaults
export const PAGINATION = {
    defaultPage: 1,
    defaultLimit: 12,
    maxLimit: 100,
} as const;

export const PRICE_RANGES = [
    { label: "Dưới 50.000₫", value: "under-50k", min: 0, max: 50000 },
    { label: "50.000₫ - 100.000₫", value: "50k-100k", min: 50000, max: 100000 },
    { label: "100.000₫ - 200.000₫", value: "100k-200k", min: 100000, max: 200000 },
    { label: "200.000₫ - 500.000₫", value: "200k-500k", min: 200000, max: 500000 },
    { label: "Trên 500.000₫", value: "over-500k", min: 500000, max: Infinity },
] as const;

// Sort options
export const SORT_OPTIONS = [
    { label: "Mới nhất", value: "newest" },
    { label: "Giá: Thấp → Cao", value: "price-asc" },
    { label: "Giá: Cao → Thấp", value: "price-desc" },
    { label: "Bán chạy", value: "popular" },
    { label: "Đánh giá cao", value: "rating" },
] as const;

// ---- Mock Data for UI Development ----

export const MOCK_CATEGORIES = [
    { id: "1", name: "Văn học", slug: "van-hoc", description: "Tiểu thuyết, truyện ngắn, thơ", image: "/categories/literature.jpg", bookCount: 120, _count: { books: 120 } },
    { id: "2", name: "Kinh tế", slug: "kinh-te", description: "Kinh doanh, tài chính, marketing", image: "/categories/business.jpg", bookCount: 85, _count: { books: 85 } },
    { id: "3", name: "Kỹ năng sống", slug: "ky-nang-song", description: "Phát triển bản thân, tâm lý", image: "/categories/self-help.jpg", bookCount: 95, _count: { books: 95 } },
    { id: "4", name: "Công nghệ", slug: "cong-nghe", description: "Lập trình, AI, khoa học dữ liệu", image: "/categories/tech.jpg", bookCount: 60, _count: { books: 60 } },
    { id: "5", name: "Thiếu nhi", slug: "thieu-nhi", description: "Truyện cổ tích, sách giáo dục", image: "/categories/children.jpg", bookCount: 150, _count: { books: 150 } },
    { id: "6", name: "Lịch sử", slug: "lich-su", description: "Lịch sử Việt Nam và thế giới", image: "/categories/history.jpg", bookCount: 70, _count: { books: 70 } },
];

export const MOCK_BOOKS = [
    {
        id: "1", title: "Đắc Nhân Tâm", slug: "dac-nhan-tam", author: "Dale Carnegie",
        description: "Đắc nhân tâm là cuốn sách nổi tiếng nhất, bán chạy nhất và có tầm ảnh hưởng nhất của mọi thời đại. Tác phẩm đã được chuyển ngữ sang hầu hết các thứ tiếng trên thế giới và có mặt ở hàng trăm quốc gia.",
        price: 86000, salePrice: 68000, isbn: "978-604-0-12345-1", publisher: "NXB Tổng hợp",
        pages: 320, language: "Vietnamese", stock: 150, sold: 2500, rating: 4.8, ratingCount: 1200,
        featured: true, image: "/books/dac-nhan-tam.jpg", images: ["/books/dac-nhan-tam.jpg", "/books/dac-nhan-tam-2.jpg"],
        categoryId: "3", category: { id: "3", name: "Kỹ năng sống", slug: "ky-nang-song" },
    },
    {
        id: "2", title: "Nhà Giả Kim", slug: "nha-gia-kim", author: "Paulo Coelho",
        description: "Tất cả những trải nghiệm trong chuyến phiêu du theo đuổi vận mệnh của mình đã giúp Santiago thấu hiểu được ý nghĩa sâu xa nhất của hạnh phúc, hòa hợp với vũ trụ.",
        price: 79000, salePrice: null, isbn: "978-604-0-12345-2", publisher: "NXB Hội Nhà Văn",
        pages: 228, language: "Vietnamese", stock: 200, sold: 1800, rating: 4.7, ratingCount: 950,
        featured: true, image: "/books/nha-gia-kim.jpg", images: ["/books/nha-gia-kim.jpg"],
        categoryId: "1", category: { id: "1", name: "Văn học", slug: "van-hoc" },
    },
    {
        id: "3", title: "Sapiens: Lược Sử Loài Người", slug: "sapiens-luoc-su-loai-nguoi", author: "Yuval Noah Harari",
        description: "100.000 năm trước, ít nhất sáu loài người đã sinh sống trên Trái Đất. Ngày nay, chỉ còn một - Homo Sapiens. Điều gì đã xảy ra?",
        price: 199000, salePrice: 159000, isbn: "978-604-0-12345-3", publisher: "NXB Tri Thức",
        pages: 560, language: "Vietnamese", stock: 80, sold: 900, rating: 4.9, ratingCount: 650,
        featured: true, image: "/books/sapiens.jpg", images: ["/books/sapiens.jpg"],
        categoryId: "6", category: { id: "6", name: "Lịch sử", slug: "lich-su" },
    },
    {
        id: "4", title: "Tư Duy Nhanh và Chậm", slug: "tu-duy-nhanh-va-cham", author: "Daniel Kahneman",
        description: "Cuốn sách kinh điển về hai hệ thống tư duy trong tâm trí con người và cách chúng ảnh hưởng đến quyết định hàng ngày.",
        price: 249000, salePrice: 199000, isbn: "978-604-0-12345-4", publisher: "NXB Thế Giới",
        pages: 620, language: "Vietnamese", stock: 60, sold: 750, rating: 4.6, ratingCount: 420,
        featured: false, image: "/books/thinking-fast-slow.jpg", images: ["/books/thinking-fast-slow.jpg"],
        categoryId: "3", category: { id: "3", name: "Kỹ năng sống", slug: "ky-nang-song" },
    },
    {
        id: "5", title: "Clean Code", slug: "clean-code", author: "Robert C. Martin",
        description: "Hướng dẫn viết code sạch, dễ đọc, dễ bảo trì. Cuốn sách kinh điển dành cho mọi lập trình viên.",
        price: 350000, salePrice: 280000, isbn: "978-604-0-12345-5", publisher: "NXB Bách Khoa",
        pages: 464, language: "Vietnamese", stock: 45, sold: 600, rating: 4.8, ratingCount: 380,
        featured: true, image: "/books/clean-code.jpg", images: ["/books/clean-code.jpg"],
        categoryId: "4", category: { id: "4", name: "Công nghệ", slug: "cong-nghe" },
    },
    {
        id: "6", title: "Hoàng Tử Bé", slug: "hoang-tu-be", author: "Antoine de Saint-Exupéry",
        description: "Hoàng tử bé là tác phẩm nổi tiếng nhất của Antoine de Saint-Exupéry, viết về tình bạn và tình yêu.",
        price: 55000, salePrice: null, isbn: "978-604-0-12345-6", publisher: "NXB Kim Đồng",
        pages: 112, language: "Vietnamese", stock: 300, sold: 3200, rating: 4.9, ratingCount: 2100,
        featured: true, image: "/books/hoang-tu-be.jpg", images: ["/books/hoang-tu-be.jpg"],
        categoryId: "5", category: { id: "5", name: "Thiếu nhi", slug: "thieu-nhi" },
    },
    {
        id: "7", title: "Nghĩ Giàu Làm Giàu", slug: "nghi-giau-lam-giau", author: "Napoleon Hill",
        description: "Cuốn sách kinh điển về tư duy làm giàu, đúc kết 20 năm nghiên cứu hơn 500 triệu phú thành đạt.",
        price: 110000, salePrice: 88000, isbn: "978-604-0-12345-7", publisher: "NXB Tổng hợp",
        pages: 384, language: "Vietnamese", stock: 120, sold: 1500, rating: 4.5, ratingCount: 780,
        featured: false, image: "/books/nghi-giau-lam-giau.jpg", images: ["/books/nghi-giau-lam-giau.jpg"],
        categoryId: "2", category: { id: "2", name: "Kinh tế", slug: "kinh-te" },
    },
    {
        id: "8", title: "Tuổi Trẻ Đáng Giá Bao Nhiêu", slug: "tuoi-tre-dang-gia-bao-nhieu", author: "Rosie Nguyễn",
        description: "Bạn hối tiếc vì đã không làm gì cả trong suốt quãng thời gian tuổi trẻ? Cuốn sách này dành cho bạn.",
        price: 75000, salePrice: 60000, isbn: "978-604-0-12345-8", publisher: "NXB Hội Nhà Văn",
        pages: 256, language: "Vietnamese", stock: 180, sold: 2200, rating: 4.4, ratingCount: 1100,
        featured: true, image: "/books/tuoi-tre.jpg", images: ["/books/tuoi-tre.jpg"],
        categoryId: "3", category: { id: "3", name: "Kỹ năng sống", slug: "ky-nang-song" },
    },
];
