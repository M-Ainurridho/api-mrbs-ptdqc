-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 24, 2024 at 09:54 AM
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
  `daysOfWeek` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `title`, `description`, `startRecur`, `endRecur`, `startTime`, `endTime`, `resourceId`, `userId`, `recurring`, `repeat`, `daysOfWeek`, `createdAt`, `updatedAt`) VALUES
('eGw5diJ--PlxIy5R', 'Testing', '', '2024-12-24', '2024-12-24', '10:00:00', '11:30:00', 'L8F39ESHi7U2udlV', 'bZ3PiLcJQ8ZuAxTU', 0, 'none', '', '2024-12-24 14:27:46', '2024-12-24 14:27:46'),
('lza6tlJGHv_vukp3', 'Meeting Harian', '', '2025-02-01', '2025-02-08', '13:00:00', '15:00:00', 'f3s_uFNJOqYC9OPb', 'bZ3PiLcJQ8ZuAxTU', 1, 'daily', '1,2,3,4,5', '2024-12-24 14:32:21', '2024-12-24 14:32:21'),
('pWBxwZQT1vR0Jf3g', 'Meeting Mingguan', 'Rapat meeting setiap hari rabu dan kamis', '2025-01-01', '2025-01-31', '09:00:00', '11:00:00', 'f3s_uFNJOqYC9OPb', 'bZ3PiLcJQ8ZuAxTU', 1, 'weekly', '3,4', '2024-12-24 14:31:37', '2024-12-24 14:31:37');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` char(16) NOT NULL,
  `role` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role`) VALUES
('utyvhljgkiutnvmk', 'member'),
('yrufjdhtqoplgjky', 'admin');

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
('3HkcAmb8wGYsXSV4', '1', 'ptdqc@ptdqc.com', '$2b$10$f9Jw/LkPbJ83lBMAZS.sCetUtWsqGmdRCmN631Kzem39iTkdsmuXC', 'yrufjdhtqoplgjky', '2024-12-22 22:44:00', '2024-12-22 22:44:00'),
('bZ3PiLcJQ8ZuAxTU', 'andreas', 'adreas@ptdqc.comn', '$2b$10$BqJQ/mgilkZfyEkvDNUCGOi2Vp1oRh9jyBHURejoTALXAXGgLOU5u', 'utyvhljgkiutnvmk', '2024-12-23 10:16:03', '2024-12-23 10:16:03'),
('porykboiWKHbl496', 'ridho', 'ridho@ptdqc.com', '$2b$10$dBR.hcshBDFrnt8cY9SFkOHyPLZhdBkPLlyyXiDNY1D3IXdCh8D76', 'utyvhljgkiutnvmk', '2024-12-23 10:14:36', '2024-12-23 10:14:36');

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
