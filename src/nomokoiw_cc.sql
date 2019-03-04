-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Мар 04 2019 г., 21:47
-- Версия сервера: 5.7.21-20-beget-5.7.21-20-1-log
-- Версия PHP: 5.6.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `nomokoiw_cc`
--

-- --------------------------------------------------------

--
-- Структура таблицы `books`
--
-- Создание: Фев 27 2019 г., 17:14
-- Последнее обновление: Фев 27 2019 г., 17:15
--

DROP TABLE IF EXISTS `books`;
CREATE TABLE `books` (
  `Id` bigint(20) NOT NULL,
  `UserId` bigint(20) NOT NULL,
  `CarId` bigint(20) NOT NULL,
  `DateStart` datetime NOT NULL,
  `DateFinish` datetime NOT NULL,
  `Price` float NOT NULL,
  `Sum` float NOT NULL,
  `Place` varchar(255) NOT NULL,
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `SalesId` bigint(20) NOT NULL,
  `PlaceOff` varchar(255) DEFAULT NULL,
  `Tel` varchar(200) DEFAULT NULL,
  `Coment` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `books`
--

INSERT INTO `books` (`Id`, `UserId`, `CarId`, `DateStart`, `DateFinish`, `Price`, `Sum`, `Place`, `CreateDate`, `SalesId`, `PlaceOff`, `Tel`, `Coment`) VALUES
(22, 8, 7, '2019-03-20 14:00:00', '2019-03-29 18:00:00', 40, 360, 'Аэропорт Ираклиона', '2019-02-27 20:15:10', 0, 'Андреа Папандреу', '89151999845', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `cars`
--
-- Создание: Фев 14 2019 г., 15:56
-- Последнее обновление: Мар 04 2019 г., 18:45
--

DROP TABLE IF EXISTS `cars`;
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
  `SPrice` float DEFAULT NULL,
  `Mark` float NOT NULL DEFAULT '0',
  `BodyType` varchar(25) NOT NULL,
  `AC` bit(1) NOT NULL DEFAULT b'0',
  `ABS` bit(1) NOT NULL DEFAULT b'0',
  `AirBags` bit(1) NOT NULL DEFAULT b'0',
  `Contain` varchar(255) DEFAULT NULL,
  `Groupe` varchar(25) NOT NULL,
  `MinAge` int(11) NOT NULL,
  `Radio` bit(1) NOT NULL DEFAULT b'0',
  `WPrice` float DEFAULT NULL,
  `Power` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `cars`
--

INSERT INTO `cars` (`Id`, `Model`, `Photo`, `Passengers`, `Doors`, `Transmission`, `Fuel`, `Consumption`, `Description`, `Description_Eng`, `SPrice`, `Mark`, `BodyType`, `AC`, `ABS`, `AirBags`, `Contain`, `Groupe`, `MinAge`, `Radio`, `WPrice`, `Power`) VALUES
(4, 'VW Up', '../../assets/images/VWup.jpg', 4, 3, 'MT', 'Petrol', 5, 'Автомобиль с МКПП. Рабочий объем двигателя 1.0 литр. Кондционер, радио-CD, расход топлива 5л/100 км. В машину свободно входят четверо взрослых пассажира, 1 большая и 1 маленькая дорожные сумки', 'Eng description of the car.', 35, 0, 'Hatchback', b'1', b'1', b'1', '0/1/2/3/4', 'Economy', 23, b'1', 35, NULL),
(7, 'Toyota Yaris', '../../assets/images/toyota_yaris.jpg', 5, 5, 'AT', 'Petrol', 5, 'Автомобиль с вариатором, 1,3 литра, 99 лошадиных сил. Кондционер, радио-CD, расход топлива 5.3 литров/100 км. В машину свободно входят четыре взрослых пассажира, 2 большие дорожные сумки.', 'Eng description of the car.', 40, 0, 'Hatchback', b'0', b'1', b'1', '0/1/2/3/4', 'Economy', 23, b'1', 31, NULL),
(8, 'VW Golf', '../../assets/images/golf.jpg', 5, 5, 'MT', 'Petrol', 8, 'Автомобиль с МКПП, 1.4 литра, 160 лошадинных сил. Климат контроль, радио-CD, расход топлива 8 литров/100 км. В машину свободно входят пять взрослых пассажиров, 2 большие и 2 маленькие дорожные сумки.', 'Eng description of the car.', 50, 0, 'Hatchback', b'1', b'1', b'1', '0/1/2/3/4', 'Full-Sized', 23, b'1', 37, NULL),
(9, 'VW Golf', '../../assets/images/Golf_AMT.jpg', 5, 5, 'AT', 'Petrol', 7, 'Автомобиль с АКПП, 1,4 литра, 120 лошадиных сил. Климат-контроль, радио-CD, расход топлива 6 литров/100 км. В машину свободно входят пять взрослых пассажиров, 2 большие и 2 маленькие дорожные сумки.', 'Eng description of the car.', 65, 0, 'Hatchback', b'0', b'1', b'1', '0/1/2/3/4', 'Full-Sized', 23, b'1', 60, NULL),
(10, 'Nissan Micra', '../../assets/images/Micra.jpg', 5, 5, 'AT', 'Deisel', 9, 'Автомобиль с АКПП, 1,5 литра, 110 лошадиных сил. Кондционер, радио-CD, расход топлива 9 литров/100 км. В машину свободно входят пять взрослых пассажиров, 2 большие и 2 маленькие дорожные сумки.', 'Eng description of the car.', 35, 0, 'Crossover', b'1', b'1', b'1', '0/1/2/3/4', 'Full-Sized', 23, b'1', 28, NULL),
(20, 'VW CADDY 7 PAX', '../../assets/images/Caddy.jpg', 7, 5, 'MT', 'Petrol', 7, 'Семиместный минивен, 1,4 литра, дизель. Специальные условия на длительную аренду.', 'Eng description of the car.', 60, 0, 'Minivan', b'1', b'0', b'1', '0/1/6/3/4', 'Full-Sized', 23, b'1', 55, NULL),
(22, 'Hyundai i10', '../../assets/images/Hi10.jpg', 5, 5, 'MT', 'Petrol', 5, 'Автомобиль с МКПП, кондционером, радио-CD, расход топлива 5 литров/100 км. В машину свободно входят четыре взрослых пассажира, 2 большие дорожные сумки.', 'Eng description of the car.', 35, 0, 'Hatchback', b'0', b'1', b'1', '0/1/2/3/4', 'Economy', 23, b'1', 28, NULL),
(23, 'Chevrolet Matiz', '../../assets/images/Matiz.jpg', 4, 5, 'MT', 'petrol', 4, 'русское описание', 'Eng description of the car', 30, 0, 'Hatchback', b'1', b'0', b'1', '', 'Economy', 23, b'1', 25, NULL),
(24, 'Chevrolet Spark', '../../assets/images/Spark.jpg', 5, 5, 'MT', 'Petrol', 4, 'русское описание', 'Eng description of the car.', 35, 0, 'Hatchback', b'1', b'1', b'1', '', 'Economy', 23, b'1', 28, NULL),
(25, 'VW Polo', '../../assets/images/PoloMan.jpg', 5, 5, 'MT', 'Petrol', 8, 'русское описание', 'Eng description of the car.', 40, 0, 'Hatchback', b'1', b'1', b'1', '', 'Full-Sized', 23, b'1', 31, NULL),
(26, 'Hyunday i20', '../../assets/images/Hi20.jpg', 5, 5, 'MT', 'Petrol', 5, 'русское описание', 'Eng description of the car.', 40, 0, 'Hatchback', b'1', b'1', b'1', '', 'Economy', 23, b'1', 31, NULL),
(27, 'VW Polo Diesel', '../../assets/images/PoloDiesel.jpg', 5, 5, 'MT', 'Deisel', 7, 'русское описание', 'Eng description of the car.', 40, 0, 'Hatchback', b'1', b'1', b'1', '', 'Full-Sized', 23, b'1', 34, NULL),
(28, 'VW Polo', '../../assets/images/PoloAT.jpg', 5, 5, 'AT', 'Petrol', 8, 'русское описание', 'Eng description of the car.', 45, 0, 'Hatchback', b'1', b'1', b'1', '', 'Full-Sized', 23, b'1', 40, NULL),
(81, '111', '222', 333, 444, 'AT', 'Deisel', 222, '222dwdw', 'wwdwd', 222, 0, 'Wagon', b'1', b'0', b'1', NULL, '333', 332, b'0', 333, 333);

-- --------------------------------------------------------

--
-- Структура таблицы `comments`
--
-- Создание: Фев 11 2019 г., 09:21
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `Id` bigint(20) NOT NULL,
  `UserId` bigint(20) NOT NULL,
  `FeedBackId` bigint(20) NOT NULL,
  `Text` text NOT NULL,
  `CreateDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `comments`
--

INSERT INTO `comments` (`Id`, `UserId`, `FeedBackId`, `Text`, `CreateDate`) VALUES
(1, 8, 60030, 'qq', '2019-02-17 19:28:10'),
(4, 24, 60030, 'fjjfjfjfjfj', '2019-02-17 19:38:41'),
(5, 24, 60030, 'lololo', '2019-02-17 19:40:44'),
(6, 24, 60030, 'ewqeqeq', '2019-02-17 20:07:40'),
(7, 8, 60030, 'eee', '2019-02-19 10:08:30'),
(8, 17, 60030, 'qq', '2019-02-19 10:08:46');

-- --------------------------------------------------------

--
-- Структура таблицы `feedbacks`
--
-- Создание: Фев 19 2019 г., 14:00
-- Последнее обновление: Фев 26 2019 г., 09:19
--

DROP TABLE IF EXISTS `feedbacks`;
CREATE TABLE `feedbacks` (
  `Id` bigint(20) NOT NULL,
  `UserId` bigint(20) NOT NULL,
  `CarId` bigint(20) NOT NULL,
  `Mark` float NOT NULL,
  `Text` text NOT NULL,
  `CreatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Comfort` tinyint(4) NOT NULL,
  `Drive` tinyint(4) NOT NULL,
  `Look` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `feedbacks`
--

INSERT INTO `feedbacks` (`Id`, `UserId`, `CarId`, `Mark`, `Text`, `CreatedDate`, `Comfort`, `Drive`, `Look`) VALUES
(60030, 8, 26, 4, 'Отличное авто', '2019-02-17 07:13:00', 4, 4, 4),
(60036, 8, 7, 4.66667, 'Четкий автомобиль.', '2019-02-19 17:35:22', 4, 5, 5),
(60037, 8, 7, 5, 'КАЙФОВО ПОКАТАЛИСЬ, ВАСЯ', '2019-02-26 12:19:59', 5, 5, 5);

-- --------------------------------------------------------

--
-- Структура таблицы `likes`
--
-- Создание: Фев 11 2019 г., 10:05
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE `likes` (
  `Id` int(20) NOT NULL,
  `UserId` bigint(20) NOT NULL,
  `IsLike` bit(1) NOT NULL,
  `OwnerId` int(20) NOT NULL,
  `Type` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `likes`
--

INSERT INTO `likes` (`Id`, `UserId`, `IsLike`, `OwnerId`, `Type`) VALUES
(7, 24, b'0', 6, 2),
(8, 8, b'1', 5, 2),
(9, 17, b'1', 60030, 1),
(10, 8, b'1', 60036, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `messages`
--
-- Создание: Фев 11 2019 г., 09:20
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `Id` bigint(20) NOT NULL,
  `UserId` bigint(20) NOT NULL,
  `TopicId` bigint(20) NOT NULL,
  `CreateDate` datetime NOT NULL,
  `Text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `messages`
--

INSERT INTO `messages` (`Id`, `UserId`, `TopicId`, `CreateDate`, `Text`) VALUES
(7, 8, 12, '2019-02-19 11:41:56', 'kfdjkdjdkfjdf'),
(8, 8, 12, '2019-02-19 11:43:30', 'uuu'),
(9, 8, 12, '2019-02-19 11:44:23', '222'),
(14, 8, 12, '2019-02-19 11:55:56', '222'),
(15, 17, 12, '2019-02-19 11:56:13', 'qq');

-- --------------------------------------------------------

--
-- Структура таблицы `photos`
--
-- Создание: Фев 11 2019 г., 09:25
--

DROP TABLE IF EXISTS `photos`;
CREATE TABLE `photos` (
  `Id` bigint(20) NOT NULL,
  `CarId` bigint(20) NOT NULL,
  `Path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `sales`
--
-- Создание: Фев 11 2019 г., 09:25
--

DROP TABLE IF EXISTS `sales`;
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
-- Структура таблицы `summer_prices`
--
-- Создание: Фев 12 2019 г., 06:38
-- Последнее обновление: Фев 28 2019 г., 12:23
--

DROP TABLE IF EXISTS `summer_prices`;
CREATE TABLE `summer_prices` (
  `Id` int(20) NOT NULL,
  `OneDayPrice` float DEFAULT NULL,
  `TwoDaysPrice` float DEFAULT NULL,
  `ThreeDaysPrice` float DEFAULT NULL,
  `FourDaysPrice` float DEFAULT NULL,
  `FiveDaysPrice` float DEFAULT NULL,
  `SixDaysPrice` float DEFAULT NULL,
  `SevenDaysPrice` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `summer_prices`
--

INSERT INTO `summer_prices` (`Id`, `OneDayPrice`, `TwoDaysPrice`, `ThreeDaysPrice`, `FourDaysPrice`, `FiveDaysPrice`, `SixDaysPrice`, `SevenDaysPrice`) VALUES
(4, 60, 114, 159, 190, 235, 272, 305),
(7, 74, 130, 167, 188, 225, 258, 287),
(8, 90, 172, 195, 212, 255, 294, 329),
(9, 120, 210, 280, 360, 420, 450, 470),
(10, 60, 114, 138, 176, 210, 230, 255),
(20, 110, 196, 240, 280, 350, 390, 455),
(22, 60, 114, 138, 176, 210, 230, 255),
(23, 57, 108, 136, 160, 195, 222, 245),
(24, 60, 114, 138, 176, 210, 230, 255),
(25, 74, 130, 167, 188, 225, 258, 287),
(26, 74, 130, 167, 188, 225, 258, 287),
(27, 79, 150, 176, 200, 240, 276, 308),
(28, 67, 130, 189, 224, 250, 288, 329),
(81, 11111, 11111, 11111, 11111, 11111, 11111, 11111);

-- --------------------------------------------------------

--
-- Структура таблицы `topics`
--
-- Создание: Фев 11 2019 г., 09:20
--

DROP TABLE IF EXISTS `topics`;
CREATE TABLE `topics` (
  `Id` bigint(20) NOT NULL,
  `UserId` bigint(20) NOT NULL,
  `UserReciverId` bigint(20) NOT NULL,
  `ModifyDate` datetime NOT NULL,
  `Seen` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `topics`
--

INSERT INTO `topics` (`Id`, `UserId`, `UserReciverId`, `ModifyDate`, `Seen`) VALUES
(12, 8, 17, '2019-02-19 11:38:56', b'0');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--
-- Создание: Фев 12 2019 г., 06:15
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `Id` bigint(20) NOT NULL,
  `Name` varchar(128) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `CreatedDate` datetime NOT NULL,
  `ModifiedDate` datetime NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Phone` varchar(255) DEFAULT NULL,
  `Photo` varchar(255) DEFAULT NULL,
  `Lang` varchar(25) DEFAULT NULL,
  `IsAdmin` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`Id`, `Name`, `Email`, `CreatedDate`, `ModifiedDate`, `Password`, `Phone`, `Photo`, `Lang`, `IsAdmin`) VALUES
(8, 'Ваня Номоконов (gmail)', 'nomokonov.vana@gmail.com', '2019-01-09 00:00:00', '2019-01-11 00:00:00', '123', '89151999845', '../../assets/images/myava.jpg', 'RU', b'1'),
(17, 'Иван', 'i.a.volik@gmail.com', '2019-02-12 09:24:11', '2019-02-12 09:24:11', 'QaZmLp1098', '89670654854', '../../assets/images/default_user_photo.jpg', 'RU', b'1'),
(24, 'Andrew', 'andres.ledachev@mail.ru', '2019-02-17 19:18:06', '2019-02-17 19:18:06', '123321', '89169362676', '../../assets/images/default_user_photo.jpg', 'RU', b'1'),
(25, 'admin', 'admin@testmakerfree.com', '2019-02-17 22:12:39', '2019-02-17 22:12:39', 'Az2We2S21p', '34443332211', '../../assets/images/default_user_photo.jpg', NULL, b'0');

-- --------------------------------------------------------

--
-- Структура таблицы `winter_prices`
--
-- Создание: Фев 12 2019 г., 06:39
-- Последнее обновление: Фев 28 2019 г., 12:23
--

DROP TABLE IF EXISTS `winter_prices`;
CREATE TABLE `winter_prices` (
  `Id` int(20) NOT NULL,
  `OneDayPrice` float DEFAULT NULL,
  `TwoDaysPrice` float DEFAULT NULL,
  `ThreeDaysPrice` float DEFAULT NULL,
  `FourDaysPrice` float DEFAULT NULL,
  `FiveDaysPrice` float DEFAULT NULL,
  `SixDaysPrice` float DEFAULT NULL,
  `SevenDaysPrice` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `winter_prices`
--

INSERT INTO `winter_prices` (`Id`, `OneDayPrice`, `TwoDaysPrice`, `ThreeDaysPrice`, `FourDaysPrice`, `FiveDaysPrice`, `SixDaysPrice`, `SevenDaysPrice`) VALUES
(4, 57, 110, 159, 169, 200, 228, 266),
(7, 53, 102, 147, 158, 175, 198, 210),
(8, 69, 124, 175, 190, 225, 256, 283),
(9, 120, 210, 290, 360, 400, 440, 455),
(10, 50, 96, 138, 146, 150, 180, 196),
(20, 110, 196, 220, 280, 310, 360, 410),
(22, 50, 96, 138, 146, 150, 180, 196),
(23, 47, 90, 119, 130, 145, 162, 175),
(24, 50, 96, 138, 146, 150, 180, 196),
(25, 53, 102, 147, 158, 175, 198, 210),
(26, 53, 102, 147, 158, 175, 198, 210),
(27, 56, 108, 156, 170, 190, 216, 238),
(28, 67, 130, 189, 214, 230, 258, 287),
(81, 11111, 11111, 11111, 11111, 11111, 11111, 11111);

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
  ADD UNIQUE KEY `OwnerId` (`OwnerId`,`Type`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `OwnerId_2` (`OwnerId`,`Type`);

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
-- Индексы таблицы `summer_prices`
--
ALTER TABLE `summer_prices`
  ADD PRIMARY KEY (`Id`);

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
-- Индексы таблицы `winter_prices`
--
ALTER TABLE `winter_prices`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `books`
--
ALTER TABLE `books`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT для таблицы `cars`
--
ALTER TABLE `cars`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT для таблицы `comments`
--
ALTER TABLE `comments`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60038;

--
-- AUTO_INCREMENT для таблицы `likes`
--
ALTER TABLE `likes`
  MODIFY `Id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `messages`
--
ALTER TABLE `messages`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `photos`
--
ALTER TABLE `photos`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `sales`
--
ALTER TABLE `sales`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `summer_prices`
--
ALTER TABLE `summer_prices`
  MODIFY `Id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT для таблицы `topics`
--
ALTER TABLE `topics`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT для таблицы `winter_prices`
--
ALTER TABLE `winter_prices`
  MODIFY `Id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`CarId`) REFERENCES `cars` (`Id`),
  ADD CONSTRAINT `books_user_fk` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`);

--
-- Ограничения внешнего ключа таблицы `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`FeedBackId`) REFERENCES `feedbacks` (`Id`),
  ADD CONSTRAINT `comments_user_fk` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`);

--
-- Ограничения внешнего ключа таблицы `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD CONSTRAINT `feedbacks_ibfk_1` FOREIGN KEY (`CarId`) REFERENCES `cars` (`Id`),
  ADD CONSTRAINT `feedbacks_user_fk` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`);

--
-- Ограничения внешнего ключа таблицы `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_user_fk` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`);

--
-- Ограничения внешнего ключа таблицы `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`TopicId`) REFERENCES `topics` (`Id`),
  ADD CONSTRAINT `messages_user_fk` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`);

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
  ADD CONSTRAINT `topics_fk` FOREIGN KEY (`UserReciverId`) REFERENCES `users` (`Id`),
  ADD CONSTRAINT `topics_users_fk` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
