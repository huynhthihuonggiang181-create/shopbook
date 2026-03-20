// =============================================================
// ShopBook - Database Seed Script
// =============================================================

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from "bcryptjs";

async function main() {
    const url = process.env.DATABASE_URL || "";
    const parsed = new URL(url);

    const adapter = new PrismaMariaDb({
        host: parsed.hostname,
        port: parseInt(parsed.port || "3306"),
        user: decodeURIComponent(parsed.username),
        password: decodeURIComponent(parsed.password),
        database: parsed.pathname.slice(1),
        connectionLimit: 5,
    });

    const prisma = new PrismaClient({ adapter });

    console.log("🌱 Seeding database...");

    // --- Admin user ---
    const adminPwd = await bcrypt.hash("admin123", 12);
    const admin = await prisma.user.upsert({
        where: { email: "admin@shopbook.vn" },
        update: {},
        create: {
            name: "Admin ShopBook",
            email: "admin@shopbook.vn",
            password: adminPwd,
            role: "ADMIN",
            phone: "+84900000000",
        },
    });
    console.log("✅ Admin user:", admin.email);

    // --- Categories ---
    const categoriesData = [
        { name: "Văn học", slug: "van-hoc", description: "Tiểu thuyết, truyện ngắn, thơ" },
        { name: "Kinh tế", slug: "kinh-te", description: "Kinh doanh, tài chính, marketing" },
        { name: "Kỹ năng sống", slug: "ky-nang-song", description: "Phát triển bản thân, tâm lý" },
        { name: "Công nghệ", slug: "cong-nghe", description: "Lập trình, AI, khoa học dữ liệu" },
        { name: "Thiếu nhi", slug: "thieu-nhi", description: "Truyện cổ tích, sách giáo dục" },
        { name: "Lịch sử", slug: "lich-su", description: "Lịch sử Việt Nam và thế giới" },
    ];

    const categories: Record<string, string> = {};
    for (const cat of categoriesData) {
        const c = await prisma.category.upsert({
            where: { slug: cat.slug },
            update: { name: cat.name, description: cat.description },
            create: cat,
        });
        categories[cat.slug] = c.id;
        console.log(`✅ Category: ${cat.name}`);
    }

    // --- Books ---
    const booksData = [
        {
            title: "Đắc Nhân Tâm",
            slug: "dac-nhan-tam",
            author: "Dale Carnegie",
            description: "Đắc nhân tâm là cuốn sách nổi tiếng nhất, bán chạy nhất và có tầm ảnh hưởng nhất của mọi thời đại. Tác phẩm đã được chuyển ngữ sang hầu hết các thứ tiếng trên thế giới và có mặt ở hàng trăm quốc gia.",
            price: 86000,
            salePrice: 68000,
            isbn: "978-604-0-12345-1",
            publisher: "NXB Tổng hợp",
            pages: 320,
            stock: 150,
            sold: 2500,
            rating: 4.8,
            ratingCount: 1200,
            featured: true,
            image: "/books/dac-nhan-tam.jpg",
            categorySlug: "ky-nang-song",
        },
        {
            title: "Nhà Giả Kim",
            slug: "nha-gia-kim",
            author: "Paulo Coelho",
            description: "Tất cả những trải nghiệm trong chuyến phiêu du theo đuổi vận mệnh của mình đã giúp Santiago thấu hiểu được ý nghĩa sâu xa nhất của hạnh phúc, hòa hợp với vũ trụ.",
            price: 79000,
            salePrice: null,
            isbn: "978-604-0-12345-2",
            publisher: "NXB Hội Nhà Văn",
            pages: 228,
            stock: 200,
            sold: 1800,
            rating: 4.7,
            ratingCount: 950,
            featured: true,
            image: "/books/nha-gia-kim.jpg",
            categorySlug: "van-hoc",
        },
        {
            title: "Sapiens: Lược Sử Loài Người",
            slug: "sapiens-luoc-su-loai-nguoi",
            author: "Yuval Noah Harari",
            description: "100.000 năm trước, ít nhất sáu loài người đã sinh sống trên Trái Đất. Ngày nay, chỉ còn một - Homo Sapiens. Điều gì đã xảy ra?",
            price: 199000,
            salePrice: 159000,
            isbn: "978-604-0-12345-3",
            publisher: "NXB Tri Thức",
            pages: 560,
            stock: 80,
            sold: 900,
            rating: 4.9,
            ratingCount: 650,
            featured: true,
            image: "/books/sapiens.jpg",
            categorySlug: "lich-su",
        },
        {
            title: "Tư Duy Nhanh và Chậm",
            slug: "tu-duy-nhanh-va-cham",
            author: "Daniel Kahneman",
            description: "Cuốn sách kinh điển về hai hệ thống tư duy trong tâm trí con người và cách chúng ảnh hưởng đến quyết định hàng ngày.",
            price: 249000,
            salePrice: 199000,
            isbn: "978-604-0-12345-4",
            publisher: "NXB Thế Giới",
            pages: 620,
            stock: 60,
            sold: 750,
            rating: 4.6,
            ratingCount: 420,
            featured: false,
            image: "/books/thinking-fast-slow.jpg",
            categorySlug: "ky-nang-song",
        },
        {
            title: "Clean Code",
            slug: "clean-code",
            author: "Robert C. Martin",
            description: "Hướng dẫn viết code sạch, dễ đọc, dễ bảo trì. Cuốn sách kinh điển dành cho mọi lập trình viên.",
            price: 350000,
            salePrice: 280000,
            isbn: "978-604-0-12345-5",
            publisher: "NXB Bách Khoa",
            pages: 464,
            stock: 45,
            sold: 600,
            rating: 4.8,
            ratingCount: 380,
            featured: true,
            image: "/books/clean-code.jpg",
            categorySlug: "cong-nghe",
        },
        {
            title: "Hoàng Tử Bé",
            slug: "hoang-tu-be",
            author: "Antoine de Saint-Exupéry",
            description: "Hoàng tử bé là tác phẩm nổi tiếng nhất của Antoine de Saint-Exupéry, viết về tình bạn và tình yêu.",
            price: 55000,
            salePrice: null,
            isbn: "978-604-0-12345-6",
            publisher: "NXB Kim Đồng",
            pages: 112,
            stock: 300,
            sold: 3200,
            rating: 4.9,
            ratingCount: 2100,
            featured: true,
            image: "/books/hoang-tu-be.jpg",
            categorySlug: "thieu-nhi",
        },
        {
            title: "Nghĩ Giàu Làm Giàu",
            slug: "nghi-giau-lam-giau",
            author: "Napoleon Hill",
            description: "Cuốn sách kinh điển về tư duy làm giàu, đúc kết 20 năm nghiên cứu hơn 500 triệu phú thành đạt.",
            price: 110000,
            salePrice: 88000,
            isbn: "978-604-0-12345-7",
            publisher: "NXB Tổng hợp",
            pages: 384,
            stock: 120,
            sold: 1500,
            rating: 4.5,
            ratingCount: 780,
            featured: false,
            image: "/books/nghi-giau-lam-giau.jpg",
            categorySlug: "kinh-te",
        },
        {
            title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
            slug: "tuoi-tre-dang-gia-bao-nhieu",
            author: "Rosie Nguyễn",
            description: "Bạn hối tiếc vì đã không làm gì cả trong suốt quãng thời gian tuổi trẻ? Cuốn sách này dành cho bạn.",
            price: 75000,
            salePrice: 60000,
            isbn: "978-604-0-12345-8",
            publisher: "NXB Hội Nhà Văn",
            pages: 256,
            stock: 180,
            sold: 2200,
            rating: 4.4,
            ratingCount: 1100,
            featured: true,
            image: "/books/tuoi-tre.jpg",
            categorySlug: "ky-nang-song",
        },
    ];

    for (const bookData of booksData) {
        const { categorySlug, ...data } = bookData;
        await prisma.book.upsert({
            where: { slug: data.slug },
            update: {
                ...data,
                salePrice: data.salePrice ?? undefined,
                categoryId: categories[categorySlug],
            },
            create: {
                ...data,
                salePrice: data.salePrice ?? undefined,
                categoryId: categories[categorySlug],
            },
        });
        console.log(`✅ Book: ${data.title}`);
    }

    console.log("\n🎉 Seed completed successfully!");
    process.exit(0);
}

main().catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
});
