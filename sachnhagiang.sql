-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th3 02, 2026 lúc 02:26 AM
-- Phiên bản máy phục vụ: 10.11.11-MariaDB-cll-lve
-- Phiên bản PHP: 8.4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `userhob4kyy5_abc`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `addresses`
--

CREATE TABLE `addresses` (
  `id` varchar(191) NOT NULL,
  `user_id` varchar(191) NOT NULL,
  `full_name` varchar(191) NOT NULL,
  `phone` varchar(191) NOT NULL,
  `street` text NOT NULL,
  `ward` varchar(191) NOT NULL,
  `district` varchar(191) NOT NULL,
  `city` varchar(191) NOT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `books`
--

CREATE TABLE `books` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `author` varchar(191) NOT NULL,
  `description` longtext DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `sale_price` decimal(10,2) DEFAULT NULL,
  `isbn` varchar(191) DEFAULT NULL,
  `publisher` varchar(191) DEFAULT NULL,
  `published_at` datetime(3) DEFAULT NULL,
  `pages` int(11) DEFAULT NULL,
  `language` varchar(191) NOT NULL DEFAULT 'Vietnamese',
  `stock` int(11) NOT NULL DEFAULT 0,
  `sold` int(11) NOT NULL DEFAULT 0,
  `rating` double NOT NULL DEFAULT 0,
  `rating_count` int(11) NOT NULL DEFAULT 0,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `image` varchar(191) DEFAULT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `category_id` varchar(191) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `deleted_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `books`
--

INSERT INTO `books` (`id`, `title`, `slug`, `author`, `description`, `price`, `sale_price`, `isbn`, `publisher`, `published_at`, `pages`, `language`, `stock`, `sold`, `rating`, `rating_count`, `featured`, `image`, `images`, `category_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
('cmm80w3ux000180vuii8czhei', 'Lược Sử Nước Việt Bằng Tranh (Tái Bản 2024)', 'lc-s-nc-vit-bng-tranh-ti-bn-2024', 'Tạ Huy Long, Dương Trung Quốc, Hiếu Minh, Huyền Trang', 'Lược Sử Nước Việt Bằng Tranh\n\nDòng sử Việt trôi xuôi từ thượng nguồn lịch sử, thuở cha Lạc Long Quân kết duyên cùng mẹ Âu Cơ.\n\nTừ quá khứ xa xưa đẫm màu huyền tích, nước Việt đã trải qua xiết bao biến cố thăng trầm.\n\nNhững dấu chân cha ông từ ngày mở nước vẫn còn lưu lại trong thẳm sâu tâm hồn dân tộc.\n\nVà ta hãy tìm xem, những bóng dáng nào của ngày hôm qua vẫn còn thấp thoáng trong dòng chảy hôm nay…', 140000.00, 126000.00, '8935244874389', 'Kim Đồng', NULL, 96, 'Vietnamese', 10, 0, 0, 0, 0, '/uploads/1772386456115-l_ch_s_.webp', NULL, 'cmm80o496000080vu2pbm4uj9', '2026-03-01 17:27:28.887', '2026-03-01 17:34:17.281', NULL),
('cmm81dwjt0000fovui1lhw5w2', 'Kỉ Niệm 70 Năm Chiến Thắng Điện Biên Phủ - Chuyện Ở Đồi A1', 'k-nim-70-nm-chin-thng-in-bin-ph---chuyn--i-a1', 'Nguyễn Tân', 'Kỉ Niệm 70 Năm Chiến Thắng Điện Biên Phủ - Chuyện Ở Đồi A1\n\n“Người ta có thể đánh bại một quân đội chứ không thể đánh bại được một dân tộc.” - Tướng De Castries (Đờ Cát)\n\n“Tiếng sấm Điện Biên Phủ mãi mãi còn rền vang.\n\nViệt Nam – Hồ Chí Minh – Điện Biên Phủ!\n\nLoài người cùng reo vui với Việt Nam.\n\nViệt Nam – Hồ Chí Minh – Điện Biên Phủ!\n\nNhững tiếng nói khẳng định quyền sống, quyền làm người của mọi dân tộc.\n\nNhững tiếng đã đi vào ngôn ngữ của các dân tộc.\n\nNhững tiếng vang vang tự hào.”\n\n- Trích Điện Biên Phủ – Điểm hẹn lịch sử\n\nMỜI CÁC BẠN VÀ CÁC EM TÌM ĐỌC BỘ SÁCH KỈ NIỆM 70 NĂM CHIẾN THẮNG ĐIỆN BIÊN PHỦ\n\n- Điện Biên Phủ Của Chúng Em\n\n- Người Lính Điện Biên Kể Chuyện\n\n- Đại Tướng Võ Nguyên Giáp Thời Trẻ\n\n- Lá Cờ Chuẩn Đỏ Thắm\n\n- Chuyện Ở Đồi A1\n\n- Người Người Lớp Lớp\n\n- Người Thợ Chữa Đồng Hồ Tại Đường Hầm Số 1\n\n- 70 Câu Hỏi – Đáp Về Chiến Thắng Điện Biên Phủ\n\n- Mùa Ban Thay Áo\n\n- Những Kí Ức Điện Biên\n\n- Phía Núi Bên Kia\n\n- Phan Đình Giót\n\n- Bế Văn Đàn\n\n- Tô Vĩnh Diện\n\n- Kể Chuyện Điện Biên Phủ\n\n- Ký Họa Trong Chiến Hào – Nhật Ký Của Họa Sĩ Phạm Thanh Tâm', 40000.00, 36000.00, '8935352607817', 'Kim Đồng', NULL, 144, 'Vietnamese', 10, 0, 0, 0, 0, '/uploads/1772386795212-lich1.webp', NULL, 'cmm80o496000080vu2pbm4uj9', '2026-03-01 17:41:19.222', '2026-03-01 17:41:19.222', NULL),
('cmm825k4z0003fovue3dtymgw', 'Lĩnh Nam Chích Quái (Tái Bản 2019)', 'lnh-nam-chch-qui-ti-bn-2019', 'Trần Thế Pháp, Vũ Quỳnh, Kiều Phú, Đinh Gia Khánh, Nguyễn Ngọc San, Tạ Huy Long', '\"LĨNH NAM CHÍCH QUÁI” - VẺ ĐẸP CỦA MỘT DANH TÁC\n\nLĩnh Nam Chích Quái - tập truyện ghi lại những chuyện kỳ lạ ở nước Nam, là một danh tác văn học trung đại, một báu vật trong di sản văn hóa của ông cha.\n\nLĩnh Nam Chích Quái được Trần Thế Pháp viết bằng chữ Hán vào khoảng đời Trần, qua thời gian được sự nhuận sắc, chỉnh sửa, bồi đắp cuả nhiều thế hệ các nhà nho Việt Nam tiêu biểu như Vũ Quỳnh, Kiều Phú.\n\nỞ Lĩnh Nam Chích Quái, những truyện tích thần kì được góp nhặt và ghi chép lại thể hiện quan niệm của ông cha về lịch sử dân tộc, về phong tục tập quán, về cách đối nhân xử thế...\n\n ***\n\nẤn bản Lĩnh Nam Chích Quái của Nhà xuất bản Kim Đồng là ấn bản giữ lại gần như nguyên vẹn bản dịch của các học giả Đinh Gia Khánh và Nguyễn Ngọc San.\n\nBa mươi sáu truyện trong Lĩnh Nam Chích Quái gồm những truyện thần tích, thần phả từ thời Hồng Bàng cho đến đời Trần. Đó là truyện về Âu Cơ - Lạc Long Quân, truyện Cây Cau, truyện Núi Tản Viên… Đây cũng là ấn bản đầy đủ nhất về tư liệu, khảo cứu.\n\nBên cạnh ba mươi sáu truyện, cuốn sách còn tập hợp các tư liệu, khảo cứu quan trọng về cuốn sách, đó là bài tựa của Vũ Quỳnh, bài giới thiệu của các học giả Đinh Gia Khánh, Nguyễn Ngọc San. Các phần tư liệu được tập hợp cuối sách sẽ rất hữu ích cho các bạn tìm hiểu sâu thêm về danh tác này.\n\n ***\n\nĐặc biệt, với hơn 200 tranh minh họa của Họa sĩ Tạ Huy Long, ấn bản Lĩnh Nam Chích Quái của Nhà xuất bản Kim Đồng là ấn bản đầu tiên có tranh minh họa màu tuyệt đẹp, vén bức màn quá khứ để phát quang ánh sáng của viên ngọc minh châu quý giá này. \n\nHơn 200 bức tranh minh họa trong Lĩnh Nam Chích Quái được vẽ tay hoàn toàn, được thực hiện kì công, mô phỏng phong cách tranh khắc gỗ dân gian. Mỗi bức tranh gồm hai bản, một bản nét đen, và từ một đến hai bản màu.\n\nẤn bản Lĩnh Nam Chích Quái của Nhà xuất bản Kim Đồng là một kì công thực sự của họa sĩ Tạ Huy Long, thể hiện tâm huyết và tài năng độc đáo của anh.', 349998.00, 315000.00, NULL, NULL, NULL, NULL, 'Vietnamese', 10, 0, 0, 0, 0, '/uploads/1772388192389-lich2.webp', NULL, 'cmm80o496000080vu2pbm4uj9', '2026-03-01 18:02:49.482', '2026-03-01 18:04:28.074', NULL),
('cmm82a1kg0004fovub6p7f1gm', 'Lịch Sử Việt Nam Từ Nguồn Gốc Đến Thế Kỷ XIX (Bìa Mềm)', 'lch-s-vit-nam-t-ngun-gc-n-th-k-xix-ba-mm', 'Đào Duy Anh', 'Lịch Sử Việt Nam Từ Nguồn Gốc Đến Thế Kỷ XIX (Bìa Mềm)\n\n\"Đào Duy Anh (25/4/1904 - 1/4/1988) là nhà sử học, địa lý, từ điển học, ngôn ngữ học, nhà nghiên cứu văn hóa, tôn giáo, văn học dân gian nổi tiếng của Việt Nam. Ông được xem là người mở đầu cho nhiều ngành khoa học xã hội Việt Nam và là một trong số ít người Việt Nam được ghi tên vào bộ từ điển Larousse với tư cách là một nhà bách khoa toàn thư của thời hiện đại.\n\nĐặc biệt, ông là một nhà sử học lớn với những công trình nghiên cứu mang tính khai phá, đặt nền tảng cho sự hình thành nền sử học Việt Nam hiện đại. Theo đánh giá của GS-NGND Phan Huy Lê: “GS Đào Duy Anh là người thầy của những thế hệ sử gia đầu tiên được đào tạo từ nền đại học Việt Nam sau Cách mạng tháng Tám 1945”.\n\nCông trình Lịch sử Việt Nam từ nguồn gốc đến thế kỷ XIX thuộc cụm công trình lịch sử và văn hóa Việt Nam của Đào Duy Anh vinh dự được truy tặng Giải thưởng Hồ Chí Minh về khoa học xã hội năm 2000.\"', 150000.00, 120000.00, '8935236425926', 'NXB Dân Trí', NULL, 584, 'Vietnamese', 10, 0, 0, 0, 0, '/uploads/1772388377137-lich3.webp', NULL, 'cmm80o496000080vu2pbm4uj9', '2026-03-01 18:06:18.704', '2026-03-01 18:06:18.704', NULL),
('cmm82cgua0005fovu9cgcr1f7', 'Những Biểu Tượng Đặc Trưng Trong Văn Hóa Truyền Thống Việt Nam - Tập 2 - Các Vị Thần', 'nhng-biu-tng-c-trng-trong-vn-ha-truyn-thng-vit-nam---tp-2---cc-v-thn', 'Đinh Hồng Hải', 'Những Biểu Tượng Đặc Trưng Trong Văn Hóa Truyền Thống Việt Nam - Tập 2 - Các Vị Thần\n\nTiếp nối series Những biểu tượng đặc trưng trong văn hóa truyền thống Việt Nam, Tập 2: Các vị thần của tác giả Đinh Hồng Hải tiếp tục hành trình khám phá hệ thống biểu tượng phong phú trong văn hóa truyền thống Việt Nam. Nếu tập đầu tiên tập trung vào các nhóm biểu tượng phổ biến trong đời sống, thì ở tập này, tác giả đi sâu vào hệ thống các vị thần gắn liền với tín ngưỡng và phong tục của người Việt qua các thời kỳ.\n\nTập sách giới thiệu chi tiết về những vị thần quan trọng như Thần Đất, Thần Bếp, Thần Tài, Thánh Gióng, Di Lặc, Ông Trời, giúp độc giả hiểu rõ hơn về nguồn gốc, ý nghĩa cũng như sự biến đổi của các biểu tượng này trong bối cảnh lịch sử và văn hóa Việt Nam. Qua các chương sách, tác giả không chỉ khai thác các khía cạnh tín ngưỡng mà còn đặt những vị thần này trong sự đối sánh với văn hóa Trung Hoa và Ấn Độ, tạo nên một góc nhìn đa chiều và phong phú.\n\nĐiểm đặc biệt của tập sách là cách tiếp cận khoa học, kết hợp giữa phương pháp nghiên cứu biểu tượng học, lịch sử và nhân học, giúp người đọc dễ dàng nắm bắt được những ý nghĩa sâu xa ẩn sau từng biểu tượng. Tác giả cũng làm rõ quá trình tiếp biến văn hóa, sự giao thoa giữa các tôn giáo lớn và tín ngưỡng bản địa, từ đó chỉ ra sự thay đổi của các biểu tượng thần linh trong bối cảnh hiện đại.\n\nKhông chỉ là một tài liệu tham khảo hữu ích cho giới nghiên cứu, cuốn sách còn là cẩm nang quý giá dành cho những ai yêu mến và mong muốn tìm hiểu về nền văn hóa truyền thống Việt Nam. Với hệ thống hình ảnh minh họa sinh động, cùng cách trình bày mạch lạc, Những biểu tượng đặc trưng trong văn hóa truyền thống Việt Nam – Tập 2: Các vị thần hứa hẹn sẽ mang đến cho độc giả những khám phá thú vị và bổ ích.', 120000.00, 78500.00, '9786326064421', 'Văn Học', NULL, 228, 'Vietnamese', 10, 0, 0, 0, 0, '/uploads/1772388417448-lich4.jpg', NULL, 'cmm80o496000080vu2pbm4uj9', '2026-03-01 18:08:11.815', '2026-03-01 18:08:11.815', NULL),
('cmm82g8co0007fovuwx4wuy0f', 'Nếu Biết Trăm Năm Là Hữu Hạn - Ấn Bản Kỉ Niệm 10 Năm Xuất Bản (Tái Bản 2024)', 'nu-bit-trm-nm-l-hu-hn---n-bn-k-nim-10-nm-xut-bn-ti-bn-2024', 'Phạm Lữ Ân', 'NẾU BIẾT TRĂM NĂM LÀ HỮU HẠN - LÁ THƯ GỬI NHỮNG NGƯỜI TRẺ ĐANG LẠC LỐI\nBạn đã bao giờ tự hỏi: Nếu biết trước cuộc đời là hữu hạn, bạn sẽ sống khác đi chứ? \n\nChúng ta luôn nghĩ mình có nhiều thời gian, nhưng thực tế, mọi khoảnh khắc đều đang trôi qua mãi mãi.\n\nVỀ TÁC GIẢ: PHẠM LỮ ÂN\nLà bút danh của đôi vợ chồng nhà báo chuyên viết cho giới trẻ, là Đặng Nguyễn Đông Vy và Nguyễn Hoàng Mai, hai nhà văn nổi bật trong dòng sách truyền cảm hứng.\n\nNhững tác phẩm của họ không chỉ là lời kể, mà là những triết lý sống sâu sắc, giúp độc giả nhìn lại chính mình.\n\nNếu Biết Trăm Năm Là Hữu Hạn là một trong những cuốn sách được yêu thích nhất, giúp hàng ngàn người trẻ tìm lại ý nghĩa của cuộc sống.\n\nTÓM TẮT NỘI DUNG SÁCH\nNếu Biết Trăm Năm Là Hữu Hạn là tập hợp 40 bài viết nhẹ nhàng nhưng sâu sắc, giàu cảm xúc từ chuyên mục Cảm thức của Bán nguyệt san Sinh Viên Việt Nam. Cuốn sách dẫn dắt người đọc đi sâu vào những cảm nhận về cuộc đời, tình yêu, tình bạn và sự thành bại, đặt ra những câu hỏi mà ai cũng từng nghĩ đến nhưng ít ai dám đối diện:\n\nChúng ta đang sống hay chỉ đang tồn tại?\n\nHạnh phúc thực sự nằm ở đâu?\n\nĐiều gì sẽ khiến chúng ta không hối tiếc khi nhìn lại?\n\nVới giọng văn dung dị, thân mật, tác giả dễ dàng chạm đến trái tim người đọc, khiến ta như đang lắng nghe một người bạn tâm sự. Những câu chuyện giản dị nhưng chứa nhiều tầng cảm xúc: hoài niệm, sâu sắc, chân thành - gợi mở những suy ngẫm mới mẻ về giá trị của từng khoảnh khắc trong cuộc đời.\n\nCuốn sách không chỉ là một tác phẩm văn học mà còn là một lời nhắc nhở nhẹ nhàng: Thời gian là hữu hạn, hãy sống sao cho xứng đáng!\n\nVì sao bạn không nên bỏ lỡ cuốn sách này?\nNếu bạn từng trì hoãn hạnh phúc của mình cho một ngày \"đủ đầy\" trong tương lai.\n\nNếu bạn từng loay hoay giữa những lựa chọn, sợ hãi mình sẽ hối tiếc.\n\nNếu bạn muốn sống một cuộc đời mà không phải quay đầu nhìn lại với tiếc nuối.\n\nCuốn sách giúp bạn nhận ra điều gì?\nNếu Biết Trăm Năm Là Hữu Hạn là một lời nhắc nhở nhẹ nhàng nhưng đầy ám ảnh, giúp bạn nhận ra:\n\nHạnh phúc không nằm ở tương lai xa vời mà ngay trong hiện tại.\nCuộc sống hữu hạn, đừng chờ đến khi quá muộn mới nhận ra điều gì đáng giá.\nNhững gì nhỏ bé hôm nay có thể trở thành những kỷ niệm lớn nhất mai sau. ', 159000.00, 143000.00, '8932000134749', 'Thế Giới', NULL, 263, 'Vietnamese', 10, 0, 0, 0, 0, '/uploads/1772388594804-van1.webp', NULL, 'cmm82d5040006fovulypy2wf6', '2026-03-01 18:11:07.439', '2026-03-01 18:11:16.286', NULL),
('cmm82l6j70008fovu0a4wgxr4', 'Trường Ca Achilles', 'trng-ca-achilles', 'Madeline Miller', 'TRƯỜNG CA ACHILLES - MỘT BẢN TÌNH CA BI TRÁNG DƯỚI ÁNH HOÀNG HÔN HY LẠP\nLấy cảm hứng từ sử thi Iliad, Madeline Miller đã tái hiện một câu chuyện tình yêu đầy say đắm nhưng cũng nhuốm màu bi kịch giữa hai người anh hùng Hy Lạp trong tác phẩm đầu tay của mình – Trường Ca Achilles.\n\nVỀ TÁC GIẢ: Madeline Miller\nLà nhà văn người Mỹ, chuyên gia về văn học Hy Lạp cổ đại. \n\nBà từng giảng dạy về Iliad và Odyssey suốt hơn 10 năm trước khi viết Trường Ca Achilles. \n\nTrường Ca Achilles đã giúp bà giành Giải Orange Prize 2012 – giải thưởng danh giá dành cho tiểu thuyết xuất sắc nhất của nữ tác giả.\n\nCuốn sách sau đó được đề cử Women\'s Prize năm 2019, và cùng với Trường ca Achilles đã đánh dấu một sự nghiệp văn chương rực rỡ của Madeline Miller.\n\nVỀ DỊCH GIẢ: Jack Frogg \nMột dịch giả tài năng, sinh ra tại Hà Nội và hiện đang sinh sống tại Aix-en-Provence. Với niềm đam mê văn học và ngôn ngữ, anh đã chuyển ngữ thành công nhiều tác phẩm nổi tiếng.\n\nTiểu thuyết Trường Ca Achilles, đã mang đến một bản chuyển ngữ mượt mà, giàu cảm xúc, giúp độc giả Việt Nam cảm nhận trọn vẹn vẻ đẹp bi tráng vốn có. \n\nVới sự tinh tế trong cách dùng từ và khả năng nắm bắt tinh thần nguyên tác, bản dịch này không chỉ tái hiện một câu chuyện tình yêu đầy mê hoặc mà còn khắc họa rõ nét khí chất hào hùng của thời đại sử thi Hy Lạp.\n\nTÓM TẮT NỘI DUNG SÁCH\n\"Anh sẽ không bao giờ để họ làm tổn thương em.\"\n\nLấy cảm hứng từ Iliad, Trường Ca Achilles là câu chuyện về tình yêu, danh vọng và bi kịch giữa hai con người bị ràng buộc bởi số phận.\n\nPatroclus – chàng hoàng tử bị lưu đày, mang trong mình tâm hồn dịu dàng và khao khát yêu thương. Achilles – vị chiến binh huyền thoại, người được tiên tri sẽ trở thành anh hùng vĩ đại nhất Hy Lạp. Họ gặp nhau, gắn bó bên nhau, và tình yêu nảy nở giữa những ngày tuổi trẻ.\n\n\"Patroclus, em là ánh sáng của đời anh.\"\n\nThế nhưng, định mệnh không bao giờ ưu ái những kẻ yêu nhau. Khi chiến tranh thành Troy nổ ra, Achilles buộc phải lựa chọn giữa danh vọng bất tử và tình yêu duy nhất đời mình. Còn Patroclus, dù biết rõ cái chết đang chờ đợi, vẫn tình nguyện ở bên người mình yêu.\n\nDưới ngòi bút lãng mạn và đầy mê hoặc của Madeline Miller, Trường Ca Achilles không chỉ là một câu chuyện về chiến tranh và vinh quang, mà còn là một bản tình ca đầy khắc khoải, nơi tình yêu vĩnh cửu tỏa sáng ngay cả giữa bi kịch đẫm máu.\n\n\"Ngay cả khi cái chết chia cắt chúng ta, anh vẫn sẽ tìm em.\"\n\nQuyển sách mang đến điều gì?\nMột cách nhìn mới về huyền thoại Achilles – không chỉ là chiến binh vĩ đại mà còn là một con người với tình cảm sâu sắc.\n\nCâu chuyện tình yêu đầy đau đớn giữa Achilles và Patroclus, được viết bằng ngôn từ đầy mê hoặc.\n\nMột tiểu thuyết sử thi hiện đại, vừa bi tráng vừa lãng mạn, làm sống lại những huyền thoại cổ đại theo cách chân thực nhất.\n\nTại sao nên đọc & sở hữu \"Trường Ca Achilles\"?\nBest-seller quốc tế, được đánh giá cao bởi độc giả và giới phê bình.\n\nDành cho những ai yêu thích thần thoại Hy Lạp, sử thi và những câu chuyện cảm động về tình yêu, danh dự và số phận.\n\nMột tác phẩm kinh điển của thế kỷ 21, từng khiến hàng triệu độc giả trên thế giới rơi nước mắt.\n\n ', 156000.00, 132500.00, '8935244843545', 'NXB Kim Đồng', NULL, 444, 'Vietnamese', 10, 0, 0, 0, 0, '/uploads/1772388817171-van2.webp', NULL, 'cmm82d5040006fovulypy2wf6', '2026-03-01 18:14:58.361', '2026-03-01 18:14:58.361', NULL),
('cmm82njcl0009fovuabku1xpq', 'Hà Thanh Hải Yến - Ngang Qua Ngõ Nhỏ Bình An', 'h-thanh-hi-yn---ngang-qua-ng-nh-bnh-an', 'Quất Tử Bất Toan', '', 19600.00, 157000.00, '8936213491613', 'Dân Trí', NULL, 324, 'Vietnamese', 10, 0, 0, 0, 0, '/uploads/1772389493351-van3.webp', NULL, 'cmm82d5040006fovulypy2wf6', '2026-03-01 18:16:48.280', '2026-03-01 18:24:54.702', NULL),
('cmm82rq0b000afovu0tvf95hv', 'Trốn Lên Mái Nhà Để Khóc', 'trn-ln-mi-nh--khc', 'Lam', 'TRỐN LÊN MÁI NHÀ ĐỂ KHÓC - NƠI CẢM XÚC ĐƯỢC BUÔNG LỎNG, KÝ ỨC ĐƯỢC CẤT LỜI\n\"Có những ngày chẳng ai hiểu mình, chẳng ai cần mình, chẳng ai thương mình. Và những ngày đó, mái nhà là nơi duy nhất tôi thấy an toàn.\"\n\n\"Trốn Lên Mái Nhà Để Khóc\" không chỉ là câu chuyện của riêng tác giả, mà còn là những mảnh ghép ký ức của mỗi người. Một cuốn sách dành cho những trái tim nhạy cảm, cho những ai từng giấu nước mắt sau nụ cười, từng thu mình vào một góc chỉ để đối diện với chính mình.\n\n \n\nVỀ TÁC GIẢ: Lam\nTác giả trẻ, nổi bật với lối viết tinh tế, giàu cảm xúc.\n\nChuyên viết về tuổi thơ, ký ức, nỗi buồn và hành trình trưởng thành.\n\nNgôn từ nhẹ nhàng nhưng chạm sâu vào tâm hồn độc giả.\n\n\"Trốn Lên Mái Nhà Để Khóc\" là nơi để những tâm hồn lạc lõng tìm thấy sự đồng điệu.\n\nTóm tắt nội dung sách \nMái nhà – nơi cao nhất trong căn nhà nhưng lại là nơi sâu nhất trong tâm hồn một đứa trẻ. Ở đó, Lam đã lắng nghe nhịp thở của quá khứ, nơi có giọng nói của mẹ, bàn tay của bà, những ký ức đẹp đẽ xen lẫn những nỗi đau khó gọi tên.\n\n \n\n\"Lớn lên, tôi nhận ra mái nhà không phải nơi trú ẩn, mà là nơi để chuẩn bị cho những hành trình tiếp theo. Nhưng đôi khi, tôi vẫn muốn trốn lên đó, để được khóc mà không ai nhìn thấy.\"\n\nCuốn sách là những dòng tâm sự chân thật, một hành trình quay về thời thơ ấu để tìm kiếm chính mình.\n\nCuốn sách này mang đến cho bạn điều gì?\nSự đồng cảm sâu sắc – Nếu bạn từng cảm thấy cô đơn, lạc lõng giữa thế giới này, hãy để những trang sách an ủi tâm hồn bạn.\n\nLời thì thầm từ quá khứ – Những ký ức tưởng chừng bị lãng quên, nhưng lại là sợi dây giữ ta không lạc mất chính mình.\n\nGóc nhìn mới về gia đình & tình thân – Để bạn hiểu rằng, đôi khi ta phải rời đi để biết mình thuộc về đâu.\n\nTại sao bạn nên đọc \"Trốn Lên Mái Nhà Để Khóc\"?\nAi cũng cần một nơi để trốn, để khóc, để rồi đủ mạnh mẽ bước tiếp.\n\nCó những nỗi buồn không cần giải thích, chỉ cần một cuốn sách để cảm thấy không cô đơn.\n\nTrên hành trình trưởng thành, chúng ta đều cần một mái nhà trong tim để quay về.', 95000.00, 80500.00, '8935325015984', 'Dân Trí', NULL, 208, 'Vietnamese', 10, 0, 0, 0, 0, '/uploads/1772389114138-van5.webp', NULL, 'cmm82d5040006fovulypy2wf6', '2026-03-01 18:20:03.536', '2026-03-01 18:20:03.536', NULL),
('cmm82t3rt000bfovuahtci3ez', 'Lén Nhặt Chuyện Đời', 'ln-nht-chuyn-i', 'Mộc Trầm', '', 85000.00, 63500.00, '9786043651591', 'Thế Giới', NULL, 213, 'Vietnamese', 10, 0, 0, 0, 0, '/uploads/1772389208995-van4.webp', NULL, 'cmm82d5040006fovulypy2wf6', '2026-03-01 18:21:08.031', '2026-03-01 18:21:08.031', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart_items`
--

CREATE TABLE `cart_items` (
  `id` varchar(191) NOT NULL,
  `user_id` varchar(191) NOT NULL,
  `book_id` varchar(191) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(191) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  `icon` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image`, `created_at`, `updated_at`, `deleted_at`, `icon`) VALUES
('cmm80o496000080vu2pbm4uj9', 'Lịch Sử Việt Nam', 'lich-su-viet-nam', NULL, NULL, '2026-03-01 17:21:16.150', '2026-03-01 17:34:29.603', NULL, '/uploads/1772386467840-l_ch_s_.webp'),
('cmm82d5040006fovulypy2wf6', 'Văn Học', 'van-hoc', '', NULL, '2026-03-01 18:08:43.138', '2026-03-01 18:08:43.138', NULL, '/uploads/1772388515685-v_n_h_c.webp');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `flash_sales`
--

CREATE TABLE `flash_sales` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `start_date` datetime(3) NOT NULL,
  `end_date` datetime(3) NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'ACTIVE',
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `flash_sales`
--

INSERT INTO `flash_sales` (`id`, `name`, `start_date`, `end_date`, `status`, `created_at`, `updated_at`) VALUES
('cmm842m2m0000tgvuzg8xdjpo', 'Giờ Vàng Giảm Giá', '2026-03-01 18:55:00.000', '2026-03-02 18:55:00.000', 'ACTIVE', '2026-03-01 18:56:31.270', '2026-03-01 18:56:31.270');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `flash_sale_items`
--

CREATE TABLE `flash_sale_items` (
  `id` varchar(191) NOT NULL,
  `flash_sale_id` varchar(191) NOT NULL,
  `book_id` varchar(191) NOT NULL,
  `discount_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `flash_sale_items`
--

INSERT INTO `flash_sale_items` (`id`, `flash_sale_id`, `book_id`, `discount_price`) VALUES
('cmm842m2w0001tgvuh2j1xmxq', 'cmm842m2m0000tgvuzg8xdjpo', 'cmm82njcl0009fovuabku1xpq', 157000.00),
('cmm842m2w0002tgvuuucxjsxd', 'cmm842m2m0000tgvuzg8xdjpo', 'cmm82l6j70008fovu0a4wgxr4', 132500.00),
('cmm842m2w0003tgvudl4asc2i', 'cmm842m2m0000tgvuzg8xdjpo', 'cmm82t3rt000bfovuahtci3ez', 63500.00),
('cmm842m2w0004tgvuaflg7mcw', 'cmm842m2m0000tgvuzg8xdjpo', 'cmm82rq0b000afovu0tvf95hv', 80500.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notifications`
--

CREATE TABLE `notifications` (
  `id` varchar(191) NOT NULL,
  `user_id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `content` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` varchar(191) NOT NULL,
  `order_number` varchar(191) NOT NULL,
  `user_id` varchar(191) NOT NULL,
  `status` enum('PENDING','PAID','SHIPPED','COMPLETED','CANCELLED') NOT NULL DEFAULT 'PENDING',
  `subtotal` decimal(10,2) NOT NULL,
  `shipping_fee` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total` decimal(10,2) NOT NULL,
  `shipping_name` varchar(191) DEFAULT NULL,
  `shipping_phone` varchar(191) DEFAULT NULL,
  `shipping_address` text DEFAULT NULL,
  `note` text DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `deleted_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_items`
--

CREATE TABLE `order_items` (
  `id` varchar(191) NOT NULL,
  `order_id` varchar(191) NOT NULL,
  `book_id` varchar(191) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `payments`
--

CREATE TABLE `payments` (
  `id` varchar(191) NOT NULL,
  `order_id` varchar(191) NOT NULL,
  `stripe_payment_id` varchar(191) DEFAULT NULL,
  `method` varchar(191) NOT NULL DEFAULT 'stripe',
  `amount` decimal(10,2) NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'pending',
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reviews`
--

CREATE TABLE `reviews` (
  `id` varchar(191) NOT NULL,
  `user_id` varchar(191) NOT NULL,
  `book_id` varchar(191) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `deleted_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `settings`
--

CREATE TABLE `settings` (
  `key` varchar(191) NOT NULL,
  `value` longtext NOT NULL,
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `role` enum('USER','ADMIN') NOT NULL DEFAULT 'USER',
  `avatar` varchar(191) DEFAULT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  `vat_address` text DEFAULT NULL,
  `vat_email` varchar(191) DEFAULT NULL,
  `vat_name` varchar(191) DEFAULT NULL,
  `vat_tax_code` varchar(191) DEFAULT NULL,
  `vat_type` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `avatar`, `phone`, `address`, `created_at`, `updated_at`, `deleted_at`, `vat_address`, `vat_email`, `vat_name`, `vat_tax_code`, `vat_type`) VALUES
('cmm7suptl0000gsvumw2qj19q', 'Phạm Nguyễn Công Minh', 'congminhphamnguyen1@gmail.com', '$2b$12$7yHPl7AqHgxasPKJ7aLNne54ZQ72ux7ExMgL4aHvQG2cqTsl3mDni', 'ADMIN', NULL, '+84967319920', NULL, '2026-03-01 13:42:27.116', '2026-03-01 13:42:27.116', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `wishlist_items`
--

CREATE TABLE `wishlist_items` (
  `id` varchar(191) NOT NULL,
  `user_id` varchar(191) NOT NULL,
  `book_id` varchar(191) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `addresses_user_id_idx` (`user_id`);

--
-- Chỉ mục cho bảng `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `books_slug_key` (`slug`),
  ADD UNIQUE KEY `books_isbn_key` (`isbn`),
  ADD KEY `books_slug_idx` (`slug`),
  ADD KEY `books_category_id_idx` (`category_id`),
  ADD KEY `books_featured_idx` (`featured`),
  ADD KEY `books_price_idx` (`price`),
  ADD KEY `books_rating_idx` (`rating`),
  ADD KEY `books_title_idx` (`title`);

--
-- Chỉ mục cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cart_items_user_id_book_id_key` (`user_id`,`book_id`),
  ADD KEY `cart_items_user_id_idx` (`user_id`),
  ADD KEY `cart_items_book_id_fkey` (`book_id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_name_key` (`name`),
  ADD UNIQUE KEY `categories_slug_key` (`slug`),
  ADD KEY `categories_slug_idx` (`slug`);

--
-- Chỉ mục cho bảng `flash_sales`
--
ALTER TABLE `flash_sales`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `flash_sale_items`
--
ALTER TABLE `flash_sale_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `flash_sale_items_flash_sale_id_book_id_key` (`flash_sale_id`,`book_id`),
  ADD KEY `flash_sale_items_flash_sale_id_idx` (`flash_sale_id`),
  ADD KEY `flash_sale_items_book_id_idx` (`book_id`);

--
-- Chỉ mục cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_user_id_idx` (`user_id`),
  ADD KEY `notifications_is_read_idx` (`is_read`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orders_order_number_key` (`order_number`),
  ADD KEY `orders_user_id_idx` (`user_id`),
  ADD KEY `orders_status_idx` (`status`),
  ADD KEY `orders_order_number_idx` (`order_number`);

--
-- Chỉ mục cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_order_id_idx` (`order_id`),
  ADD KEY `order_items_book_id_idx` (`book_id`);

--
-- Chỉ mục cho bảng `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `payments_order_id_key` (`order_id`),
  ADD KEY `payments_stripe_payment_id_idx` (`stripe_payment_id`);

--
-- Chỉ mục cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reviews_user_id_book_id_key` (`user_id`,`book_id`),
  ADD KEY `reviews_book_id_idx` (`book_id`),
  ADD KEY `reviews_rating_idx` (`rating`);

--
-- Chỉ mục cho bảng `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`key`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_key` (`email`),
  ADD KEY `users_email_idx` (`email`),
  ADD KEY `users_role_idx` (`role`);

--
-- Chỉ mục cho bảng `wishlist_items`
--
ALTER TABLE `wishlist_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `wishlist_items_user_id_book_id_key` (`user_id`,`book_id`),
  ADD KEY `wishlist_items_user_id_idx` (`user_id`),
  ADD KEY `wishlist_items_book_id_idx` (`book_id`);

--
-- Ràng buộc đối với các bảng kết xuất
--

--
-- Ràng buộc cho bảng `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ràng buộc cho bảng `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ràng buộc cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_items_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ràng buộc cho bảng `flash_sale_items`
--
ALTER TABLE `flash_sale_items`
  ADD CONSTRAINT `flash_sale_items_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `flash_sale_items_flash_sale_id_fkey` FOREIGN KEY (`flash_sale_id`) REFERENCES `flash_sales` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ràng buộc cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Ràng buộc cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `order_items_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ràng buộc cho bảng `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON UPDATE CASCADE;

--
-- Ràng buộc cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reviews_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ràng buộc cho bảng `wishlist_items`
--
ALTER TABLE `wishlist_items`
  ADD CONSTRAINT `wishlist_items_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wishlist_items_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
