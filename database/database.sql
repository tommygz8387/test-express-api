-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               5.7.33 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for express-api-jsm
CREATE DATABASE IF NOT EXISTS `express-api-jsm` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `express-api-jsm`;

-- Dumping structure for table express-api-jsm.sequelizemeta
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table express-api-jsm.sequelizemeta: ~3 rows (approximately)
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
REPLACE INTO `sequelizemeta` (`name`) VALUES
	('20230727000147-create-t_level-table.js'),
	('20230727001517-create-t_department-table.js'),
	('20240428071731-create-users-table.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;

-- Dumping structure for table express-api-jsm.t_department
CREATE TABLE IF NOT EXISTS `t_department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `departmentName` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `departmentName` (`departmentName`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- Dumping data for table express-api-jsm.t_department: ~8 rows (approximately)
/*!40000 ALTER TABLE `t_department` DISABLE KEYS */;
REPLACE INTO `t_department` (`id`, `departmentName`, `createdAt`, `updatedAt`) VALUES
	(1, 'Marketing', '2023-07-27 08:47:44', '2023-07-27 08:47:44'),
	(2, 'Logistic', '2023-07-27 08:47:44', '2023-07-27 08:47:44'),
	(3, 'Finance', '2023-07-27 08:47:44', '2023-07-27 08:47:44'),
	(4, 'Human Resource', '2023-07-27 08:47:44', '2023-07-27 09:37:57'),
	(5, 'IT', '2023-07-27 08:47:44', '2023-07-27 08:47:44'),
	(6, 'PR', '2023-07-27 08:47:44', '2023-07-27 08:47:44'),
	(7, 'Legal', '2023-07-27 08:47:44', '2023-07-27 08:47:44'),
	(8, 'Accounting', '2023-07-27 09:35:27', '2023-07-27 09:35:27');
/*!40000 ALTER TABLE `t_department` ENABLE KEYS */;

-- Dumping structure for table express-api-jsm.t_level
CREATE TABLE IF NOT EXISTS `t_level` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `levelName` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `levelName` (`levelName`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table express-api-jsm.t_level: ~5 rows (approximately)
/*!40000 ALTER TABLE `t_level` DISABLE KEYS */;
REPLACE INTO `t_level` (`id`, `levelName`, `createdAt`, `updatedAt`) VALUES
	(1, 'Users', '2023-07-27 08:47:44', '2023-07-27 12:37:12'),
	(2, 'Superuser', '2023-07-27 08:47:44', '2023-07-27 08:47:44'),
	(3, 'Admin', '2023-07-27 08:47:44', '2023-07-27 08:47:44'),
	(4, 'Staff', '2023-07-27 08:52:01', '2023-07-27 09:11:59'),
	(5, 'Oprator', '2023-07-27 12:34:49', '2023-07-27 12:34:49');
/*!40000 ALTER TABLE `t_level` ENABLE KEYS */;

-- Dumping structure for table express-api-jsm.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) NOT NULL,
  `nip` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `no_tlp` varchar(255) NOT NULL,
  `levelID` int(11) DEFAULT NULL,
  `departmentID` int(11) DEFAULT NULL,
  `refresh_token` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `levelID` (`levelID`),
  KEY `departmentID` (`departmentID`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`levelID`) REFERENCES `t_level` (`id`) ON DELETE CASCADE,
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`departmentID`) REFERENCES `t_department` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table express-api-jsm.users: ~3 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
REPLACE INTO `users` (`id`, `nama`, `nip`, `email`, `password`, `alamat`, `no_tlp`, `levelID`, `departmentID`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
	(2, 'anabul', '423443221', 'add@mail.com', '$2b$10$Kq7Mxlmix0DvrAUax.l0l./Pllu2jaYlPDE6xxng0rjnBbqmX5gZ.', 'asddffsd', '081208193', 3, 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiYWRkQG1haWwuY29tIiwiaWF0IjoxNjkwNDYwNzY1LCJleHAiOjE2OTA1NDcxNjV9.mg02yEUS7YZ3p6aSRd-L5ZCpUa2GHLhimiz3pyRzGMQ', '2023-07-27 08:49:44', '2023-07-27 12:26:05'),
	(3, 'amano', '234552343', 'a@mail.com', '$2b$10$26kTgS5p.N.8sMne1gOQduXDF7QaVAB8sIYdhZBd2q4TAUSSKTx1y', 'fefdvsaea', '0813423141', 3, 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTY5MDQ2MDYyNSwiZXhwIjoxNjkwNTQ3MDI1fQ.nWPVioqvWx-s_DmKUYfvBuKM8mCnQ_oM3gWGi-ikyS4', '2023-07-27 12:20:23', '2023-07-27 12:27:16'),
	(4, 'anaba', '32123123', 'an@mail.com', '$2b$10$0AgbpveH881RHP6kirMt3uv2JV9bNQ/sFSu7MLZTgs3cpwvo6I53W', 'sddfsd', '08271266', 1, 6, NULL, '2023-07-27 12:27:24', '2023-07-27 12:27:24');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
