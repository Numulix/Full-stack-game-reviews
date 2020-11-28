-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 18, 2020 at 08:15 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gamereviewdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `gamereviews`
--

CREATE TABLE `gamereviews` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `release_year` int(4) NOT NULL,
  `image` varchar(200) NOT NULL,
  `rating` decimal(2,1) NOT NULL,
  `review` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gamereviews`
--

INSERT INTO `gamereviews` (`id`, `name`, `release_year`, `image`, `rating`, `review`) VALUES
(1, 'The Witcher 3: Wild Hunt', 2015, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg', '9.6', 'Best action-crime story of the decade. Maybe of ever.\r\nMost people misunderstand that this is a RPG game, with all the tropes, whereas it is a number of crime stories, enhanced by the classical language of cRPG games: the fight, the adventure and the exploration.\r\nIt is truly superb.'),
(2, 'God of War', 2018, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.jpg', '9.5', 'The defining game of the generation. Brilliant story, amazing gameplay and beautiful lore.'),
(3, 'Persona 5', 2016, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r76.jpg', '9.4', 'I\'m not really into JRPG\'s\nI\'m not really into anime\nI\'m not really into dating sims\nI\'m not really into turn based combat\n\ndespite all that I\'m 100% into Persona 5, and it\'s my favorite game I played last year. That should give you an image of it\'s qualities. '),
(4, 'Paper Mario: The Thousand-Year Door', 2004, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co25us.jpg', '9.3', 'What a fantastic game on Gamecube. Top 3 of Mario franchise, has such a nice story and unique art style.'),
(5, 'Chrono Trigger', 1995, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2eqc.jpg', '9.1', ''),
(6, 'Genshin Impact', 2020, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1ltz.jpg', '6.1', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `gamereviews`
--
ALTER TABLE `gamereviews`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `gamereviews`
--
ALTER TABLE `gamereviews`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
