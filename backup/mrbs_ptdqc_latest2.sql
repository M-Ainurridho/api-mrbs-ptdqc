-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 29, 2024 at 04:27 PM
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
-- Database: `mrbs_ptdqc`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` char(16) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `startRecur` date NOT NULL,
  `endRecur` date NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `resourceId` char(16) NOT NULL,
  `userId` char(16) NOT NULL,
  `recurring` tinyint(1) NOT NULL,
  `repeat` varchar(10) NOT NULL,
  `daysOfWeek` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `title`, `description`, `startRecur`, `endRecur`, `startTime`, `endTime`, `resourceId`, `userId`, `recurring`, `repeat`, `daysOfWeek`, `createdAt`, `updatedAt`) VALUES
('34tRWa71TkDvcbtx', 'Rapat Lomba 17 Agustus', '', '2025-07-07', '2025-07-17', '10:00:00', '11:00:00', 'fawNKKaPd0b1qdpy', 'porykboiWKHbl496', 1, 'daily', '1,2,3,4,5', '2024-12-27 09:40:47', '2024-12-27 09:40:47'),
('8UErBWr1VHebXaoz', 'Pemasangan Kabel Jaringan', '', '2025-03-06', '2025-03-22', '09:00:00', '11:00:00', 'L8F39ESHi7U2udlV', 'porykboiWKHbl496', 1, 'daily', '1,2,3,4,5', '2024-12-26 21:42:39', '2024-12-26 21:42:39'),
('BfF0SDH1EAbljNiu', 'Rapat Agung', '', '2024-12-27', '2024-12-27', '12:00:00', '15:00:00', 'L8F39ESHi7U2udlV', 'porykboiWKHbl496', 0, 'none', '', '2024-12-27 09:48:33', '2024-12-27 09:48:33'),
('CDqFwHVQrXtWJ8Mr', 'Santunan Anak Yatim', '', '2025-03-13', '2025-03-13', '09:00:00', '11:00:00', 'u3jRALvh99Tm3tFe', 'porykboiWKHbl496', 0, 'none', '', '2024-12-27 09:47:36', '2024-12-27 09:47:36'),
('cG7PXTmHCk2WzSuP', 'Kegiatan Buka Puasa Bersama', '', '2025-02-26', '2025-02-26', '09:00:00', '10:30:00', 'FvG6DqnSEmBOgx6k', 'porykboiWKHbl496', 0, 'none', '', '2024-12-27 09:46:59', '2024-12-27 09:46:59'),
('eGw5diJ--PlxIy5R', 'Testing', '', '2024-12-24', '2024-12-24', '10:00:00', '11:30:00', 'L8F39ESHi7U2udlV', 'bZ3PiLcJQ8ZuAxTU', 0, 'none', '', '2024-12-24 14:27:46', '2024-12-24 14:27:46'),
('IbZvrNCWOqOyw-Vn', 'Change Event', 'Ini adalah salah satu contoh event mingguan', '2024-12-31', '2025-01-02', '14:00:00', '16:00:00', 'FvG6DqnSEmBOgx6k', 'porykboiWKHbl496', 1, 'weekly', '2,3', '2024-12-29 08:18:48', '2024-12-29 08:51:58'),
('j7XkqalREmlKsbP0', 'Pembuatan Gedung untuk Penampungan Galon', '', '2025-02-20', '2025-02-20', '10:00:00', '12:00:00', 'f3s_uFNJOqYC9OPb', 'porykboiWKHbl496', 0, 'none', '', '2024-12-27 09:46:11', '2024-12-27 09:46:11'),
('Jr7O6X0VoOPEOR3p', 'Coba', '', '2024-12-28', '2025-01-10', '10:00:00', '13:00:00', 'fawNKKaPd0b1qdpy', 'porykboiWKHbl496', 1, 'weekly', '3,5', '2024-12-28 15:17:44', '2024-12-29 07:54:13'),
('JXLWGTv7PSAfDmiJ', 'Rapat Bersama', '', '2024-12-27', '2024-12-27', '12:00:00', '14:00:00', 'L8F39ESHi7U2udlV', 'porykboiWKHbl496', 0, 'none', '', '2024-12-27 09:49:39', '2024-12-27 09:49:39'),
('lza6tlJGHv_vukp3', 'Meeting Harian', '', '2025-02-01', '2025-02-08', '13:00:00', '15:00:00', 'f3s_uFNJOqYC9OPb', 'bZ3PiLcJQ8ZuAxTU', 1, 'daily', '1,2,3,4,5', '2024-12-24 14:32:21', '2024-12-24 14:32:21'),
('Pe0iq15YcDaPI3hF', 'Pembangunan Gedung Baru', '', '2025-01-04', '2025-01-04', '13:00:00', '14:30:00', 'L8F39ESHi7U2udlV', 'porykboiWKHbl496', 0, 'none', '', '2024-12-26 21:41:58', '2024-12-26 21:41:58'),
('pWBxwZQT1vR0Jf3g', 'Meeting Mingguan', 'Rapat meeting setiap hari rabu dan kamis', '2025-01-01', '2025-01-31', '09:00:00', '11:00:00', 'f3s_uFNJOqYC9OPb', 'bZ3PiLcJQ8ZuAxTU', 1, 'weekly', '3,4', '2024-12-24 14:31:37', '2024-12-24 14:31:37'),
('TV5NTaG34Mqbl629', 'Ada aja event', '', '2024-12-29', '2025-01-03', '13:00:00', '15:00:00', 'u3jRALvh99Tm3tFe', 'porykboiWKHbl496', 1, 'daily', '1,2,3,4,5', '2024-12-29 09:28:18', '2024-12-29 09:31:36'),
('WXMOBUyWhqe8iV61', 'testimoni', '', '2025-01-03', '2025-01-08', '08:30:00', '10:00:00', 'fawNKKaPd0b1qdpy', 'porykboiWKHbl496', 1, 'daily', '1,2,3,4,5', '2024-12-28 10:40:28', '2024-12-28 19:59:31'),
('zWdpf5L5gWqiaslI', 'Minum Air Secara Teratur', '', '2024-12-31', '2025-01-30', '15:00:00', '16:00:00', 'L8F39ESHi7U2udlV', 'porykboiWKHbl496', 1, 'weekly', '1,5', '2024-12-28 10:41:55', '2024-12-29 07:57:15'),
('_hu39Vs9mRhi4kr8', 'Ganti Proyektor Baru', '', '2024-12-28', '2024-12-28', '15:00:00', '16:00:00', 'f3s_uFNJOqYC9OPb', 'porykboiWKHbl496', 0, 'none', '', '2024-12-26 22:46:05', '2024-12-26 22:46:05');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` char(16) NOT NULL,
  `role` varchar(15) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role`, `createdAt`, `updatedAt`) VALUES
('eHTlz78vpmyE7Lb6', 'member', '2024-12-26 14:29:02', '2024-12-26 14:29:02'),
('pce4_1zCJh2qPQFt', 'admin', '2024-12-26 14:28:15', '2024-12-26 14:28:15');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` char(16) NOT NULL,
  `title` varchar(15) NOT NULL,
  `room` varchar(15) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `title`, `room`, `createdAt`, `updatedAt`) VALUES
('3nPQ5_4y7MFuPlzD', 'DC Lt. 1B ', 'DC Lt. 1B ', '2024-12-24 14:05:52', '2024-12-24 14:05:52'),
('f3s_uFNJOqYC9OPb', 'DC Lt. 1C ', 'DC Lt. 1C ', '2024-12-24 14:05:59', '2024-12-24 14:05:59'),
('fawNKKaPd0b1qdpy', 'GPC Lt. 1', 'GPC Lt. 1', '2024-12-24 15:42:02', '2024-12-24 15:42:02'),
('FvG6DqnSEmBOgx6k', 'DC Lt. 1D ', 'DC Lt. 1D ', '2024-12-24 14:06:04', '2024-12-24 14:06:04'),
('L8F39ESHi7U2udlV', 'DC Lt. 1A', 'DC Lt. 1A', '2024-12-24 14:05:37', '2024-12-24 14:05:37'),
('u3jRALvh99Tm3tFe', 'DC Lt. 2', 'DC Lt. 2', '2024-12-24 14:06:10', '2024-12-24 14:06:10');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(16) NOT NULL,
  `username` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `roleId` char(16) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `roleId`, `createdAt`, `updatedAt`) VALUES
('3HkcAmb8wGYsXSV4', 'admin', 'admin@ptdqc.com', '$2b$10$f9Jw/LkPbJ83lBMAZS.sCetUtWsqGmdRCmN631Kzem39iTkdsmuXC', 'pce4_1zCJh2qPQFt', '2024-12-22 22:44:00', '2024-12-22 22:44:00'),
('62lzJ1TIDoX5vEfb', 'anto', 'anto@ptdqc.com', '$2b$10$XnLhrC8bVsQm1n9GUfURvOUNcjpA5qcc3TINvsEaCQbPRiFmao/t6', 'pce4_1zCJh2qPQFt', '2024-12-27 10:05:43', '2024-12-27 10:05:43'),
('bZ3PiLcJQ8ZuAxTU', 'andreas', 'andreas@ptdqc.com', '$2b$10$BqJQ/mgilkZfyEkvDNUCGOi2Vp1oRh9jyBHURejoTALXAXGgLOU5u', 'pce4_1zCJh2qPQFt', '2024-12-23 10:16:03', '2024-12-29 14:41:07'),
('porykboiWKHbl496', 'ridho', 'ridho@ptdqc.com', '$2b$10$dBR.hcshBDFrnt8cY9SFkOHyPLZhdBkPLlyyXiDNY1D3IXdCh8D76', 'eHTlz78vpmyE7Lb6', '2024-12-23 10:14:36', '2024-12-23 10:14:36'),
('wEGPE0hpJ_FatoOM', 'zacky', 'zacky@ptdqc.com', '$2b$10$Fk/K89E8KV9EqdvKnZWw.ufRZUlRe6eLV7xx39HClwAwpbgV8VOt.', 'eHTlz78vpmyE7Lb6', '2024-12-27 20:35:21', '2024-12-27 20:35:21'),
('YQeN3db_6qIEWqjT', 'yonnatan', 'yonn@ptdqc.com', '$2b$10$ApAbWfHtrfqdN9s2iuP6e.vt0.e2Myrv6xM0xmD47blq/O5OZA.iO', 'pce4_1zCJh2qPQFt', '2024-12-29 13:11:26', '2024-12-29 14:15:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
