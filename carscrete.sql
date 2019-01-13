-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Янв 13 2019 г., 22:24
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

--
-- Дамп данных таблицы `cars`
--

INSERT INTO `cars` (`Id`, `Model`, `Photo`, `Passengers`, `Doors`, `Transmission`, `Fuel`, `Consumption`, `Description`, `Description_Eng`, `Price`, `Mark`, `BodyType`, `AC`, `ABS`, `AirBags`, `Contain`, `Groupe`, `MinAge`, `Radio`) VALUES
(4, 'VW Up', '../../assets/images/car.jpg', 5, 5, 'Automatic', 'Petrol', 5, 'Автомобиль с АКПП, 1,2 литра. Кондционер, радио-CD, расход топлива 5литров/100 км. В машину свободно входят четверо взрослых пассажира, 1 большая и 1 маленькая дорожные сумки', 'Eng description of the car.', 28, 0, 'Hatchback', b'1', b'1', b'1', '0/1/2/3/4', 'Economy', 23, b'1'),
(7, 'Toyota Yaris', '../../assets/images/toyota_yaris.jpg', 5, 5, 'Automatic', 'Petrol', 7, 'Автомобиль с АКПП, 1,2 литра, 80 лошадиных сил. Кондционер, радио-CD, расход топлива 7 литров/100 км. В машину свободно входят четыре взрослых пассажира, 2 большие дорожные сумки.', 'Eng description of the car.', 32, 0, 'Hatchback', b'0', b'1', b'1', '0/1/2/3/4', 'Economy', 23, b'1'),
(8, 'WV Golf Generation', '../../assets/images/VW_golf_generation.jpg', 5, 5, 'Automatic', 'Petrol', 8, 'Автомобиль с АКПП, 1.4 литра, 160 лошадинных сил. Климат контроль, радио-CD, расход топлива 8 литров/100 км. В машину свободно входят пять взрослых пассажиров, 2 большие и 2 маленькие дорожные сумки.', 'Eng description of the car.', 49, 0, 'Hatchback', b'1', b'1', b'1', '0/1/2/3/4', 'Full-Sized', 23, b'1'),
(9, 'VW Golf 7', '../../assets/images/VW_golf_7.jpg', 5, 5, 'Automatic', 'Deisel', 7, 'Автомобиль с АКПП, 1,4 литра, 120 лошадиных сил. Климат-контроль, радио-CD, расход топлива 6 литров/100 км. В машину свободно входят пять взрослых пассажиров, 2 большие и 2 маленькие дорожные сумки.', 'Eng description of the car.', 65, 0, 'Hatchback', b'0', b'1', b'1', '0/1/2/3/4', 'Full-Sized', 23, b'1'),
(10, 'Nissan Qashqai', '../../assets/images/nissan_quashqai.jpg', 5, 5, 'Automatic', 'Deisel', 9, 'Автомобиль с АКПП, 1,5 литра, 110 лошадиных сил. Кондционер, радио-CD, расход топлива 9 литров/100 км. В машину свободно входят пять взрослых пассажиров, 2 большие и 2 маленькие дорожные сумки.', 'Eng description of the car.', 79, 0, 'Crossover', b'1', b'1', b'1', '0/1/2/3/4', 'Full-Sized', 23, b'1'),
(14, 'WV Golf', '../../assets/images/VW_golf_7.jpg', 5, 5, 'Manual', 'Petrol', 7, 'Автомобиль с АКПП, 1,2 литра, 80 лошадиных сил. Кондционер, радио-CD, расход топлива 7 литров/100 км. В машину свободно входят четыре взрослых пассажира, 2 большие дорожные сумки.', 'Eng description of the car.', 35, 0, 'Hatchback', b'1', b'0', b'1', '0/1/2/3/4', 'Medium', 23, b'1'),
(15, 'Peugeot 207', '../../assets/images/peugeot-207.jpg', 5, 3, 'Automatic', 'Petrol', 8, 'Нет описания на сайте', 'Eng description of the car.', 85, 0, 'Cabriolet', b'0', b'1', b'1', '0/1/2/5/4', 'Compact', 23, b'1'),
(16, 'FIAT Doblo MTJDynamic', '../../assets/images/fiat_doblo.jpg', 9, 5, 'Manual', 'Deisel', 8, 'Крутой автобус для компании или для большой семьи', 'Eng description of the car.', 69, 0, 'Minivan', b'0', b'0', b'1', '0/1/2/3/6', 'Full-Sized', 23, b'1'),
(17, 'VW Beetle', '../../assets/images/vw_beetle.jpg', 5, 3, 'Automatic', 'Petrol', 6, 'Нет описания автомобиля.', 'Eng description of the car.', 120, 0, 'Cabriolet', b'1', b'1', b'1', '0/1/2/3/4', 'Compact', 23, b'1'),
(18, 'VW EOS Cabrio', '../../assets/images/vw_eos_cabrio.jpg', 5, 3, 'Automatic', 'Petrol', 7, 'Нет описания', 'Eng description of the car', 95, 0, 'Cabriolet', b'0', b'1', b'1', '0/1/3/3/4', 'Medium', 23, b'1'),
(19, 'Suzuky Jimny Cabrio', '../../assets/images/Suzuki_Jimny.jpg', 4, 3, 'Manual', 'Petrol', 8, 'Компактный трехдверный вседорожник Suzuki Jimny, 1,3-литра. 4 пассажира, 4 небольшие дорожные сумки. Верх открытый (легко закрывающийся при желании).', 'Eng description of the car.', 75, 0, 'Cabriolet', b'0', b'1', b'1', '0/1/2/3/4', 'Medium', 23, b'1'),
(20, 'FIAT Doblo 7 seats', '../../assets/images/h-fiat-doblo.png', 7, 5, 'Manual', 'Deisel', 7, 'Семиместный минивен, 1,4 литра, дизель. Специальные условия на длительную аренду.', 'Eng description of the car.', 69, 0, 'Minivan', b'1', b'0', b'1', '0/1/6/3/4', 'Full-Sized', 23, b'1'),
(21, 'VW Turan', '../../assets/images/VW_Turan.jpg', 7, 5, 'Automatic', 'Petrol', 9, '7-местный, пятидверный, с автоматической коробкой передач, дизельный - этот миниавтобус мы доставим в аэропорт или отель.', 'Eng description of the car.', 120, 0, 'Minivan', b'1', b'1', b'1', '0/1/2/3/5', 'Full-Sized', 23, b'1'),
(22, 'Hyundai i10', '../../assets/images/Hyundai_i10.jpg', 5, 5, 'Manual', 'Petrol', 5, 'Автомобиль с МКПП, кондционером, радио-CD, расход топлива 5 литров/100 км. В машину свободно входят четыре взрослых пассажира, 2 большие дорожные сумки.', 'Eng description of the car.', 22, 0, 'Hatchback', b'0', b'1', b'1', '0/1/2/3/4', 'Economy', 23, b'1');

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

--
-- Дамп данных таблицы `feedbacks`
--

INSERT INTO `feedbacks` (`Id`, `UserId`, `CarId`, `Mark`, `Text`, `CreateDate`, `Comfort`, `Drive`, `Look`) VALUES
(1, 8, 14, 4.33, 'Tation delenit percipitur at vix. Eam id posse dictas voluptua, veniam laoreet oportere no mea, quis regione suscipiantur mea an. Tation delenit percipitur at vix.\r\nEu cum iuvaret debitis voluptatibus, esse perfecto reformidans id has. Sea esse deserunt ei, no diam ubique euripidis has.\r\nOratio accumsan et mea. Per cu iracundia splendide. Nisl omittam complectitur pro an, quem omnes munere id vix. Eu cum iuvaret debitis voluptatibus, esse perfecto reformidans id has.', '2018-11-23 20:09:34', 5, 5, 3),
(60019, 8, 8, 4.33, 'Чумовое авто!', '2018-11-23 00:00:00', 3, 5, 5),
(60029, 8, 8, 4.33, 'Чумовое авто!', '2018-11-23 23:00:00', 3, 5, 5);

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
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`Id`, `Name`, `Email`, `CreateDate`, `ModifiedDate`, `Password`, `Phone`, `Photo`, `Lang`, `IsAdmin`) VALUES
(8, 'Ваня Номоконов (gmail)', 'nomokonov.vana@gmail.com', '2019-01-09 00:00:00', '2019-01-11 00:00:00', '123', '89151999845', '../../assets/images/myava.jpg', 'RU', b'0');

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
