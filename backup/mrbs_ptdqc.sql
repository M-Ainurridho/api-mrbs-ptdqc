-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 23, 2024 at 12:47 AM
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
CREATE DATABASE IF NOT EXISTS `mrbs_ptdqc` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `mrbs_ptdqc`;

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
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
  `daysOfWeek` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `title`, `description`, `startRecur`, `endRecur`, `startTime`, `endTime`, `resourceId`, `userId`, `recurring`, `daysOfWeek`, `createdAt`, `updatedAt`) VALUES
('FnPn7WnhZAk0TLR5', 'Coba Aja dah', '', '2024-12-22', '2024-12-31', '09:30:00', '12:00:00', 'f', 'dafjhhslf', 1, '1', '2024-12-22 20:24:52', '2024-12-22 20:24:52'),
('ri2ieWGy32npCEFe', 'Testing', '', '2024-12-22', '2024-12-27', '11:30:00', '15:30:00', 'a', 'dafjhhslf', 1, '1,3,4', '2024-12-22 20:08:33', '2024-12-22 20:08:33'),
('SF_Rj8nGCAqJxLde', 'Coba COba', '', '2024-12-22', '2024-12-22', '16:00:00', '17:00:00', 'a', 'dafjhhslf', 0, '', '2024-12-22 20:24:13', '2024-12-22 20:24:13'),
('W1teZ2ZiuGD3TtRN', 'Rapat Pleno', 'Sidang Rapat Pleno yang akan diadakan segera', '2024-12-22', '2025-01-31', '09:00:00', '11:30:00', 'd', 'dafjhhslf', 1, '3,4', '2024-12-22 20:30:18', '2024-12-22 20:30:18'),
('WyXJvtkmd6nOI2Ap', 'Testing', '', '2024-12-22', '2024-12-22', '13:00:00', '15:30:00', 'a', 'dafjhhslf', 0, '', '2024-12-22 20:21:03', '2024-12-22 20:21:03');

-- --------------------------------------------------------

--
-- Table structure for table `days_of_week`
--

DROP TABLE IF EXISTS `days_of_week`;
CREATE TABLE `days_of_week` (
  `id` char(16) NOT NULL,
  `bookingId` char(16) NOT NULL,
  `day` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
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

DROP TABLE IF EXISTS `rooms`;
CREATE TABLE `rooms` (
  `id` char(16) NOT NULL,
  `title` varchar(15) NOT NULL,
  `room` varchar(15) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
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
('EBqC3I0jijX6a3Vz', '1', 'ptdqc@ptdqc.com', '$2b$10$z52PuRD.ufSgGnS2q01iB.39WkAohBL.wPJ7dRy882mEZP6Iz7PeS', 'yrufjdhtqoplgjky', '2024-12-22 22:46:46', '2024-12-22 22:46:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `days_of_week`
--
ALTER TABLE `days_of_week`
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
