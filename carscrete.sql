-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Дек 29 2018 г., 21:51
-- Версия сервера: 10.1.32-MariaDB
-- Версия PHP: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `carscrete`
--

-- --------------------------------------------------------

--
-- Структура таблицы `books`
--

CREATE TABLE `books` (
  `Id` bigint(20) NOT NULL,
  `UserId` bigint(20) NOT NULL,
  `CarId` bigint(20) NOT NULL,
  `DateStart` datetime NOT NULL,
  `DateFinish` datetime NOT NULL,
  `Price` float NOT NULL,
  `Sum` float NOT NULL,
  `Place` varchar(255) NOT NULL,
  `CreateDate` datetime NOT NULL,
  `SalesId` bigint(20) NOT NULL,
  `ExtraDateStart` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `cars`
--

CREATE TABLE `cars` (
  `Id` bigint(20) NOT NULL,
  `Model` varchar(255) NOT NULL,
  `Photo` varchar(255) NOT NULL,
  `Passengers` int(11) NOT NULL,
  `Doors` int(11) NOT NULL,
  `Transmission` varchar(25) NOT NULL,
  `Fuel` varchar(25) NOT NULL,
  `Consumption` int(11) NOT NULL,
  `Description` text NOT NULL,
  `Description_Eng` text NOT NULL,
  `Price` float NOT NULL,
  `Mark` float NOT NULL DEFAULT '0',
  `BodyType` varchar(25) NOT NULL,
  `AC` bit(1) NOT NULL DEFAULT b'0',
  `ABS` bit(1) NOT NULL,
  `AirBags` bit(1) NOT NULL,
  `Contain` varchar(255) NOT NULL,
  `Groupe` varchar(25) NOT NULL,
  `MinAge` int(11) NOT NULL,
  `Radio` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `comments`
--

CREATE TABLE `comments` (
  `Id` bigint(20) NOT NULL,
  `UserId` bigint(20) NOT NULL,
  `FeedBackId` bigint(20) NOT NULL,
  `Text` text NOT NULL,
  `CreateDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `feedbacks`
--

CREATE TABLE `feedbacks` (
  `Id` bigint(20) NOT NULL,
  `UserId` bigint(20) NOT NULL,
  `CarId` bigint(20) NOT NULL,
  `Mark` float NOT NULL,
  `Text` text NOT NULL,
  `CreateDate` datetime NOT NULL,
  `Comfort` tinyint(4) NOT NULL,
  `Drive` tinyint(4) NOT NULL,
  `Look` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `likes`
--

CREATE TABLE `likes` (
  `Id` bigint(20) NOT NULL,
  `FeedbackId` bigint(20) NOT NULL,
  `CommentId` bigint(20) NOT NULL,
  `UserId` bigint(20) NOT NULL,
  `IsLike` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `messages`
--

CREATE TABLE `messages` (
  `Id` bigint(20) NOT NULL,
  `UserId` bigint(20) NOT NULL,
  `TopicId` bigint(20) NOT NULL,
  `CreateDate` datetime NOT NULL,
  `Text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `photos`
--

CREATE TABLE `photos` (
  `Id` bigint(20) NOT NULL,
  `CarId` bigint(20) NOT NULL,
  `Path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `sales`
--

CREATE TABLE `sales` (
  `Id` bigint(20) NOT NULL,
  `CarId` bigint(20) NOT NULL,
  `Type` tinyint(4) NOT NULL,
  `DateStart` datetime NOT NULL,
  `DateFinish` datetime NOT NULL,
  `NewPrice` float NOT NULL,
  `Discount` float NOT NULL,
  `DaysNumber` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `topics`
--

CREATE TABLE `topics` (
  `Id` bigint(20) NOT NULL,
  `UserId` bigint(20) NOT NULL,
  `UserReciverId` bigint(20) NOT NULL,
  `ModifyDate` datetime NOT NULL,
  `Seen` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `Id` bigint(20) NOT NULL,
  `Name` varchar(128) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `CreateDate` datetime NOT NULL,
  `ModifiedDate` datetime NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Phone` varchar(255) DEFAULT NULL,
  `Photo` varchar(255) DEFAULT NULL,
  `Lang` varchar(25) DEFAULT NULL,
  `IsAdmin` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `UserId` (`UserId`,`CarId`),
  ADD KEY `CarId` (`CarId`),
  ADD KEY `SalesId` (`SalesId`);

--
-- Индексы таблицы `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`Id`);

--
-- Индексы таблицы `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `UserId` (`UserId`,`FeedBackId`),
  ADD KEY `FeedBackId` (`FeedBackId`);

--
-- Индексы таблицы `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `UserId` (`UserId`,`CarId`),
  ADD KEY `CarId` (`CarId`);

--
-- Индексы таблицы `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `FeedbackId` (`FeedbackId`,`CommentId`,`UserId`),
  ADD KEY `CommentId` (`CommentId`),
  ADD KEY `UserId` (`UserId`);

--
-- Индексы таблицы `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `UserId` (`UserId`,`TopicId`),
  ADD KEY `TopicId` (`TopicId`);

--
-- Индексы таблицы `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `CarId` (`CarId`);

--
-- Индексы таблицы `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `CarId` (`CarId`);

--
-- Индексы таблицы `topics`
--
ALTER TABLE `topics`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `UserId` (`UserId`,`UserReciverId`),
  ADD KEY `UserReciverId` (`UserReciverId`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`);

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`),
  ADD CONSTRAINT `books_ibfk_2` FOREIGN KEY (`CarId`) REFERENCES `cars` (`Id`),
  ADD CONSTRAINT `books_ibfk_3` FOREIGN KEY (`SalesId`) REFERENCES `sales` (`Id`);

--
-- Ограничения внешнего ключа таблицы `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`FeedBackId`) REFERENCES `feedbacks` (`Id`);

--
-- Ограничения внешнего ключа таблицы `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD CONSTRAINT `feedbacks_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`),
  ADD CONSTRAINT `feedbacks_ibfk_2` FOREIGN KEY (`CarId`) REFERENCES `cars` (`Id`);

--
-- Ограничения внешнего ключа таблицы `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`FeedbackId`) REFERENCES `feedbacks` (`Id`),
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`CommentId`) REFERENCES `comments` (`Id`),
  ADD CONSTRAINT `likes_ibfk_3` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`);

--
-- Ограничения внешнего ключа таблицы `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`TopicId`) REFERENCES `topics` (`Id`);

--
-- Ограничения внешнего ключа таблицы `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`CarId`) REFERENCES `cars` (`Id`);

--
-- Ограничения внешнего ключа таблицы `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`CarId`) REFERENCES `cars` (`Id`);

--
-- Ограничения внешнего ключа таблицы `topics`
--
ALTER TABLE `topics`
  ADD CONSTRAINT `topics_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`),
  ADD CONSTRAINT `topics_ibfk_2` FOREIGN KEY (`UserReciverId`) REFERENCES `users` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
