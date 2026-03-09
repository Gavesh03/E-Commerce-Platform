-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 09, 2026 at 03:34 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lapzo_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `original_price` double DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `badge` varchar(255) DEFAULT NULL,
  `in_stock` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `category`, `brand`, `price`, `original_price`, `description`, `image_url`, `badge`, `in_stock`, `created_at`) VALUES
(1, 'MacBook Pro 16\" M3 Max', 'laptops', 'Apple', 729000, 879000, 'Display: 16.2-inch Liquid Retina XDR, 3456x2234 resolution, 1 billion colors, ProMotion up to 120Hz Platform & Chipset: Apple M3 Max, up to 16-core CPU, up to 40-core GPU, 128GB unified memory OS & Battery: macOS Sequoia, 100Wh battery, up to 22 hours video playback\nFeatures & Camera: Apple Intelligence, high-fidelity six-speaker audio, studio-quality three-mic array, 1080p FaceTime HD cameraThe most powerful MacBook Pro ever', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop', 'Sale', 0, '2026-01-20 05:11:00'),
(2, 'ASUS ROG Strix G16', 'laptops', 'ASUS', 485000, NULL, 'Intel Core i9 - 14900HX Processor\n1TB PCIe 4.0 NVMe M.2 SSD\n16GB DDR5 5600 RAM\n16\" QHD+ 240Hz G-Sync Display\n8GB  NVIDIA GeForce RTX 4070 Graphics\nBacklit Keyboard\nEclipse Gray\nWindows 11 Home.', 'images/products/laptops/asus-rog-strix-g16.jpg', 'New', 1, '2026-01-20 05:11:00'),
(3, 'Dell XPS 15 OLED', 'laptops', 'Dell', 625000, 695000, 'Display: 15.6-inch OLED touchscreen (3,456 x 2,160 pixels)\nCPU: Intel Core i7-11800H\nGPU: Nvidia GeForce RTX 3050 Ti\nRAM: 16 GB\nStorage: 512 GB SSD\nPorts: 3 Thunderbolt 4/USB-C ports, headphone jack, microSD card reader\nSize: 13.57 x 9.06 x 0.71 inches\nWeight: 4.2 pounds.', 'images/products/laptops/Dell-XPS-15-OLED.webp', 'Sale', 1, '2026-01-20 05:11:00'),
(4, 'Lenovo ThinkPad X1 Carbon', 'laptops', 'Lenovo', 545000, NULL, '1.7 GHz Intel Core Ultra 7 155U 12-Core\n16GB LPDDR5x | 1TB M.2 NVMe PCIe SSD\n14\" 1920 x 1200 IPS Display\nIntegrated Intel Graphics\nThunderbolt 4 (USB-C) | USB-A Gen 1\nWi-Fi 6E (802.1ax) | Bluetooth 5.3\nFHD Hybrid IR Webcam\nHDMI 2.1 | 3.5mm Combo Audio Jack\nFingerprint Sensor | TPM | Lock Slot\nWindows 11 Pro.', 'images/products/laptops/Lenovo-ThinkPad-X1-Carbon.webp', NULL, 1, '2026-01-20 05:11:00'),
(5, 'Custom Gaming PC RTX 4090', 'desktops', 'Custom Build', 1250000, NULL, 'Unleash ultimate gaming power with this custom-built PC featuring the NVIDIA RTX 4090 graphics card. Built with premium components including latest Intel i9 processor, 32GB DDR5 RAM, and liquid cooling. Dominate at 4K gaming with ray tracing enabled.', 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=400&fit=crop', 'Hot', 1, '2026-01-20 05:11:00'),
(6, 'Apple iMac 24\" M3', 'desktops', 'Apple', 525000, 575000, '256GB SSD storage\n8GB unified memory\nTwo Thunderbolt / USB-4 ports\nMagic Mouse\nMagic Keyboard\nBrilliant 4.5K Retina display\n1080p FaceTime HD camera.\nM3 chip 2023.Perfect for creative professionals, featuring vibrant colors, exceptional performance, and seamless integration with your Apple ecosystem. Available in multiple stunning colors.', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop', 'Sale', 1, '2026-01-20 05:11:00'),
(7, 'HP Pavilion Gaming Desktop', 'desktops', 'HP', 285000, NULL, 'HP Pavilion Gaming Desktop PC 11th Gen Intel Core i5 Processor (16GB/1TB SSD/NVIDIA GeForce RTX 3060Ti 8GB Graphics/Windows 11/MS Office/Shadow Black with Violet).Perfect entry point for gaming enthusiasts and content creators on a budget.', 'images/products/desktops/HP-Pavilion-Gaming-Desktop.webp', NULL, 0, '2026-01-20 05:11:00'),
(8, 'NVIDIA RTX 4080 Super', 'components', 'NVIDIA', 425000, NULL, 'Experience next-generation gaming with NVIDIA RTX 4080 Super. Featuring advanced ray tracing, DLSS 3, and incredible 4K gaming performance. Perfect for enthusiasts who demand the best graphics performance. Includes RGB lighting and premium cooling.', 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop', 'New', 1, '2026-01-20 05:11:00'),
(9, 'AMD Ryzen 9 7950X', 'components', 'AMD', 185000, 210000, 'Flagship AMD processor with 16 cores and 32 threads for ultimate multitasking and content creation. Exceptional performance for gaming, streaming, and professional workloads. Features advanced 5nm architecture and support for DDR5 and PCIe 5.0.', 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=400&fit=crop', 'Sale', 1, '2026-01-20 05:11:00'),
(10, 'Samsung 990 Pro 2TB SSD', 'components', 'Samsung', 85000, NULL, 'Blazing-fast PCIe 4.0 NVMe SSD with read speeds up to 7,450 MB/s. Perfect for gamers and professionals who need instant load times. Features advanced thermal control and Samsung\'s proven reliability. Ideal for your operating system and favorite games.', 'images/products/components/Samsung-990-Pro-2TB-SSD.webp', NULL, 1, '2026-01-20 05:11:00'),
(11, 'Logitech MX Master 3S', 'peripherals', 'Logitech', 32000, NULL, 'Premium wireless mouse designed for professionals and power users. Features ultra-precise 8K DPI sensor, customizable buttons, and exceptional ergonomics for all-day comfort. Quiet clicks and smooth scrolling with MagSpeed electromagnetic wheel.', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop', NULL, 1, '2026-01-20 05:11:00'),
(12, 'Keychron Q1 Pro Mechanical', 'peripherals', 'Keychron', 55000, 62000, 'Premium custom mechanical keyboard with hot-swappable switches and wireless connectivity. Featuring premium aluminum body, double-gasket design, and full customization options. Perfect for typing enthusiasts and professionals who demand the best.', 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=400&h=400&fit=crop', 'Sale', 1, '2026-01-20 05:11:00'),
(13, 'LG UltraGear 27\" Gaming Monitor', 'peripherals', 'LG', 125000, 145000, 'Immersive 27-inch gaming monitor with 240Hz refresh rate and 1ms response time. Features Nano IPS technology for vibrant colors, NVIDIA G-SYNC compatibility, and HDR10 support. Perfect for competitive gaming and content creation.', 'images/products/peripherals/LG-UltraGear-Gaming-Monitor.jpeg', 'Sale', 1, '2026-01-20 05:11:00'),
(14, 'Corsair K70 RGB Pro', 'peripherals', 'Corsair', 45000, NULL, 'Tournament-level mechanical gaming keyboard with CHERRY MX switches. Features per-key RGB lighting, dedicated media controls, and durable aluminum frame. Perfect for gamers who demand precision and style.', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop', 'Hot', 1, '2026-01-20 05:11:00'),
(15, 'Razer DeathAdder V3 Pro', 'peripherals', 'Razer', 28000, 32000, 'Legendary ergonomic gaming mouse with cutting-edge wireless technology. Features Focus Pro 30K optical sensor, 90-hour battery life, and ultra-lightweight design at just 63g. Perfect for FPS gamers and esports professionals.', 'images/products/peripherals/Razer-DeathAdder-V3-Pro.png', 'Sale', 1, '2026-01-20 05:11:00'),
(16, 'Lenovo LOQ Gaming 15ARP9 – Ryzen 5', 'laptops', 'Lenovo', 269000, 285000, '– AMD Ryzen 5 7235HS AI Processor\n– 512GB M.2 NVMe SSD\n– 12GB DDR5-4800 RAM\n– 15.6″ FHD (1920×1080) IPS 300nits Anti-glare Display\n– 100% sRGB, 144Hz, G-SYNC Display\n– 6GB NVIDIA GeForce RTX 3050 Graphics\n– White Backlit Keyboard\n– Windows 11 Home', 'images/products/laptops/loq.jpg', 'New', 1, '2026-01-23 05:17:13'),
(17, 'MSI Titan GT77 HX 13V', 'laptops', 'MSI', 1850000, 1950000, 'Intel Core i9-13980HX Processor (24 Cores)\n64GB DDR5 5600MHz RAM\n2TB NVMe PCIe Gen4 SSD\n17.3\" UHD 4K 144Hz Mini LED Display\nNVIDIA GeForce RTX 4090 16GB Graphics\nPer-Key RGB Mechanical Keyboard\nCooler Boost Titan Technology\nWindows 11 Pro', 'images/products/laptops/msi-titan-gt77.jpg', 'Hot', 1, '2026-01-23 05:42:37'),
(18, 'MSI Raider GE78 HX 13V', 'laptops', 'MSI', 1450000, NULL, 'Intel Core i9-13950HX Processor\n32GB DDR5 5600MHz RAM\n1TB NVMe PCIe Gen4 SSD\n17\" QHD+ 240Hz Display\nNVIDIA GeForce RTX 4080 12GB Graphics\nPer-Key RGB SteelSeries Keyboard\nMystic Light RGB Bar\nCooler Boost 5 Technology\nWindows 11 Home', 'images/products/laptops/MSI-Raider-GE78-HX-13V.png', 'New', 1, '2026-01-23 05:42:37'),
(19, 'MSI Stealth 16 Studio A13V', 'laptops', 'MSI', 1150000, 1250000, 'Intel Core i7-13700H Processor\n32GB DDR5 5200MHz RAM\n1TB NVMe SSD\n16\" QHD+ 240Hz Display\nNVIDIA GeForce RTX 4070 8GB Graphics\nUltra-Thin 19.95mm Design\nThunderbolt 4 Support\nStar Blue Aluminum Chassis\nWindows 11 Home', 'images/products/laptops/MSI-Stealth-16-Studio-A13V.jpg', 'Sale', 1, '2026-01-23 05:42:37'),
(20, 'MSI Cyborg 15 A12V', 'laptops', 'MSI', 385000, NULL, 'Intel Core i7-12650H Processor\n16GB DDR5 RAM\n512GB NVMe SSD\n15.6\" FHD 144Hz Display\nNVIDIA GeForce RTX 4050 6GB Graphics\nTranslucent Chassis Design\nRGB Backlit Keyboard\nCooler Boost 5 Technology\nWindows 11 Home', 'images/products/laptops/MSI-Cyborg-15-A12V.jpg', 'New', 1, '2026-01-23 05:42:37'),
(21, 'MSI Prestige 16 AI Studio B1V', 'laptops', 'MSI', 925000, 1025000, 'Intel Core Ultra 7 155H Processor\n32GB LPDDR5X RAM\n1TB NVMe SSD\n16\" QHD+ OLED Display\nNVIDIA GeForce RTX 4060 8GB Graphics\nAI-Powered Noise Cancellation\n100% DCI-P3 Color Gamut\nPremium Aluminum Build\nWindows 11 Pro', 'images/products/laptops/MSI-Prestige-16-AI-Studio-B1V.jpg', 'Sale', 1, '2026-01-23 05:42:37'),
(22, 'Lenovo Legion Pro 7i', 'laptops', 'Lenovo', 1375000, NULL, 'Intel Core i9-13900HX Processor\n32GB DDR5 5600MHz RAM\n1TB PCIe Gen4 SSD\n16\" WQXGA 240Hz G-SYNC Display\nNVIDIA GeForce RTX 4080 12GB Graphics\nLegion AI Engine 2.0\nRGB Per-Key Keyboard\nVapor Chamber Cooling\nWindows 11 Home', 'images/products/laptops/Lenovo-Legion-Pro-7i-Gen-8.jpg', 'Hot', 1, '2026-01-23 10:12:27'),
(23, 'Lenovo ThinkPad X1 Carbon Gen 11', 'laptops', 'Lenovo', 147990, 165000, 'Intel Core i7-1365U vPro Processor\n16GB LPDDR5 RAM\n512GB PCIe NVMe SSD\n14\" WUXGA IPS Display\nIntel Iris Xe Graphics\nCarbon Fiber & Magnesium Construction\nMIL-STD-810H Certified\nFingerprint Reader & IR Camera\nWindows 11 Pro', 'images/products/laptops/Lenovo-ThinkPad-X1-Carbon-Gen-11.webp', 'Sale', 1, '2026-01-23 10:12:27'),
(24, 'Lenovo Yoga 9i', 'laptops', 'Lenovo', 695000, NULL, 'Intel Core i7-1360P Processor\n16GB LPDDR5 RAM\n1TB PCIe SSD\n14\" 2.8K OLED Touch Display\nIntel Iris Xe Graphics\n360? Rotating Soundbar Hinge\nBowers & Wilkins Speakers\nActive Pen Included\nWindows 11 Home', 'images/products/laptops/Lenovo-Yoga-9- Gen-8.jpg', 'New', 1, '2026-01-23 10:12:27'),
(25, 'Lenovo IdeaPad Gaming 3', 'laptops', 'Lenovo', 325000, 375000, 'AMD Ryzen 5 7535HS Processor\n16GB DDR5 RAM\n512GB NVMe SSD\n15.6\" FHD 120Hz Display\nNVIDIA GeForce RTX 3050 4GB Graphics\nBlue Backlit Keyboard\nNahimic Audio\nRapid Charge Support\nWindows 11 Home', 'images/products/laptops/Lenovo-IdeaPad-Gaming-3.jpg', 'Sale', 1, '2026-01-23 10:12:27'),
(26, 'Lenovo ThinkPad P16s', 'laptops', 'Lenovo', 945000, NULL, 'Intel Core i7-1360P vPro Processor\n32GB DDR5 RAM\n1TB PCIe Gen4 SSD\n16\" WUXGA IPS Display\nNVIDIA RTX A500 4GB Graphics\nISV Certified Workstation\nMIL-STD-810H Tested\nBacklit Keyboard\nWindows 11 Pro', 'images/products/laptops/Lenovo-ThinkPad-P16s.jpg', 'New', 1, '2026-01-23 10:12:27'),
(27, 'HP Omen 17', 'laptops', 'HP', 1125000, 1225000, 'Intel Core i9-13900HX Processor\n32GB DDR5 5600MHz RAM\n1TB PCIe Gen4 NVMe SSD\n17.3\" QHD 165Hz Display\nNVIDIA GeForce RTX 4070 8GB Graphics\nOMEN Tempest Cooling\nRGB 4-Zone Keyboard\nBang & Olufsen Audio\nWindows 11 Home', 'images/products/laptops/HP-Omen-17.jpg', 'Sale', 1, '2026-01-23 10:33:55'),
(28, 'HP Spectre x360', 'laptops', 'HP', 148000, NULL, 'Intel Core i7-13700H Processor\n16GB LPDDR5 RAM\n1TB PCIe NVMe SSD\n16\" 3K+ OLED Touch Display\nIntel Arc A370M Graphics\n360? Convertible Design\nHP MPP 2.0 Tilt Pen Included\nNightfall Black Aluminum\nWindows 11 Home', 'images/products/laptops/HP-Spectre-x360.webp', 'New', 1, '2026-01-23 10:33:55'),
(29, 'HP Envy 16', 'laptops', 'HP', 302500, 320000, 'Intel Core i7-13700H Processor\n16GB DDR5 RAM\n512GB PCIe NVMe SSD\n16\" WUXGA IPS Display\nNVIDIA GeForce RTX 3050 6GB Graphics\nHP Enhanced Lighting Keyboard\nBang & Olufsen Audio\nNatural Silver Finish\nWindows 11 Home', 'images/products/laptops/HP-Envy-16.webp', 'Sale', 1, '2026-01-23 10:33:55'),
(30, 'HP Pavilion Plus', 'laptops', 'HP', 360000, NULL, 'Intel Core i7-1355U Processor\n16GB LPDDR5 RAM\n512GB PCIe SSD\n14\" 2.8K OLED Touch Display\nIntel Iris Xe Graphics\n90% Screen-to-Body Ratio\nBacklit Keyboard\nHP Wide Vision Camera\nWindows 11 Home', 'images/products/laptops/HP-Pavilion-Plus.png', 'New', 1, '2026-01-23 10:33:55'),
(31, 'HP ZBook Studio G10', 'laptops', 'HP', 1475000, 1575000, 'Intel Core i9-13900H vPro Processor\n64GB DDR5 RAM\n2TB PCIe Gen4 SSD\n16\" UHD+ DreamColor Display\nNVIDIA RTX 3500 Ada 12GB Graphics\nISV Certified\nMIL-STD-810H Tested\nVapor Chamber Cooling\nWindows 11 Pro', 'images/products/laptops/HP-ZBook-Studio-G10.jpg', 'Sale', 1, '2026-01-23 10:33:55'),
(32, 'ASUS ROG Strix SCAR 18', 'laptops', 'ASUS', 1375000, NULL, 'Intel Core i9-13980HX Processor\n32GB DDR5 5600MHz RAM\n2TB PCIe Gen4 SSD\n18\" QHD+ 240Hz Mini LED Display\nNVIDIA GeForce RTX 4090 16GB Graphics\nROG Intelligent Cooling\nPer-Key RGB Optical Keyboard\nDolby Atmos Audio\nWindows 11 Pro', 'images/products/laptops/ASUS-ROG-Strix-SCAR-18.jpg', 'Hot', 1, '2026-01-23 10:51:11'),
(33, 'ASUS ROG Zephyrus G14 (2023)', 'laptops', 'ASUS', 545000, 565000, 'AMD Ryzen 9 7940HS Processor\n16GB DDR5 RAM\n1TB PCIe Gen4 SSD\n14\" QHD+ 165Hz Display\nNVIDIA GeForce RTX 4060 8GB Graphics\nAniMe Matrix LED Display\nROG Nebula Display\nUltra-Compact 1.65kg Design\nWindows 11 Home', 'images/products/laptops/ASUS-ROG-Zephyrus-G14-(2023).png', 'Sale', 1, '2026-01-23 10:51:11'),
(34, 'ASUS Zenbook 14 OLED', 'laptops', 'ASUS', 315000, NULL, 'Intel Core Ultra 7 155H Processor\n16GB LPDDR5X RAM\n512GB PCIe Gen4 SSD\n14\" 2.8K OLED Display\nIntel Arc Graphics\n1.2kg Ultra-Portable Design\n75Wh Battery\nASUS NumberPad 2.0\nWindows 11 Home', 'images/products/laptops/ASUS-Zenbook-14-OLED.jpg', 'New', 1, '2026-01-23 10:51:11'),
(35, 'ASUS TUF Gaming A15', 'laptops', 'ASUS', 395000, 465000, 'AMD Ryzen 7 7735HS Processor\n16GB DDR5 RAM\n512GB NVMe SSD\n15.6\" FHD 144Hz Display\nNVIDIA GeForce RTX 4050 6GB Graphics\nMIL-STD-810H Military Standard\nRGB Backlit Keyboard\n90Wh Battery\nWindows 11 Home', 'images/products/laptops/ASUS-TUF-Gaming-A15.png', 'Sale', 1, '2026-01-23 10:51:11'),
(36, 'ASUS ProArt Studiobook 16 OLED', 'laptops', 'ASUS', 1785000, NULL, 'Intel Core i9-13980HX Processor\n64GB DDR5 RAM\n2TB PCIe Gen4 SSD\n16\" 4K OLED HDR Display\nNVIDIA GeForce RTX 4070 8GB Graphics\nASUS Dial Creative Control\n100% DCI-P3 Color Accuracy\nISV Certified\nWindows 11 Pro', 'images/products/laptops/ASUS-ProArt-Studiobook-16-OLED.webp', 'New', 1, '2026-01-23 10:51:11'),
(37, 'Acer Nitro 5', 'laptops', 'Acer', 450000, 465000, 'AMD Ryzen 7 5800H processor-\n8GB 3200MHz DDR4 RAM-\n1TB Nvme SSD-\nNvidia GeForce RTX 3060 6GB Graphics-\n15.6 FHD IPS Display 144Hz-\nWindows 10 Home-\n2Year-warranty', 'images/products/laptops/acer-nitro-5.webp', 'New', 1, '2026-01-23 12:30:16');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `full_name`, `created_at`) VALUES
(1, 'admin', 'admin@lapzo.lk', 'admin123', 'ADMIN', 'System Administrator', '2026-01-20 10:50:38'),
(2, 'john_doe', 'john@example.com', 'user123', 'USER', 'John Doe', '2026-01-20 10:50:38'),
(3, 'gavesh123', 'gaveshmithila4@gmail.com', '115264', 'USER', 'gavesh mithila', '2026-01-20 11:04:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
