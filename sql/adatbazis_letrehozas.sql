-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Nov 12. 23:40
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `test`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `csoportok`
--

CREATE TABLE `csoportok` (
  `id` int(11) NOT NULL,
  `nev` varchar(255) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `tag1id` int(11) NOT NULL,
  `tag2id` int(11) NOT NULL,
  `tag3id` int(11) NOT NULL,
  `leiras` varchar(255) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `evfolyam` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- A tábla adatainak kiíratása `csoportok`
--

INSERT INTO `csoportok` (`id`, `nev`, `tag1id`, `tag2id`, `tag3id`, `leiras`, `evfolyam`) VALUES
(1, 'tesztcsoport', 1, 8, 10, 'ez a csoport egy tesztcsoport', 0),
(4, 'asd', 31, 32, 33, 'asd', 5),
(5, 'sdf', 34, 35, 36, 'sdf', 5),
(6, 'yxc', 37, 38, 39, 'asdasd', 5);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `feladatok`
--

CREATE TABLE `feladatok` (
  `id` int(11) NOT NULL,
  `feladat` varchar(255) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `tanarid` int(11) NOT NULL,
  `evfolyam` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- A tábla adatainak kiíratása `feladatok`
--

INSERT INTO `feladatok` (`id`, `feladat`, `tanarid`, `evfolyam`) VALUES
(1, 'asd', 1, 11),
(2, 'alma körte szilva ananász', 12, 6),
(3, 'Szivattyú nyomás vízcső elágazás', 12, 6),
(4, 'Hegy csúcs hegycsúcs hegyvidék', 12, 7),
(5, 'Elektromosáram vezetés ellenállás elektromágnesesség', 12, 7),
(6, 'Fotó szín fényképezőgép képalkotás', 12, 7),
(7, 'Evolúció faj fejlődés genetika', 12, 6),
(8, 'Biológiai sejt öröklődés kiválasztódás', 12, 6),
(9, 'Hőmérséklet hőenergia fűtés termodinamika', 12, 7),
(10, 'Színtér szín festés művészet', 12, 5),
(11, 'Kémiai vegyület reakció anyagmennyiség', 12, 7),
(12, 'Kulináris főzés recept gasztronómia', 12, 6),
(13, 'Pszichológia érzelem gondolkodás észlelés', 12, 6),
(14, 'Geotermikus energia hőenergia földfelszín', 12, 6),
(15, 'zene zenekar hangszer Szimfonikus', 12, 6),
(16, 'Atmoszféra légkör szennyezés időjárás', 12, 6),
(17, 'Galaxis csillagrendszer térkép űrkutatás', 12, 6),
(18, 'Antarktisz jégkontinens éghajlat jeges-tenger', 12, 7),
(19, 'Szén-dioxid légkör fotoszintézis üvegházhatás', 12, 6),
(20, 'Hidrogén atommag proton energia', 12, 5),
(21, 'zöldség gyümölcs hús tejtermék', 12, 8),
(22, 'színész rendező producer forgatókönyv', 12, 8),
(23, 'laptop szoftver hardver processzor', 12, 5),
(24, 'város metró épület forgalom', 12, 7),
(25, 'csend hang zaj zenészet', 12, 8),
(26, 'robot mesterséges intelligencia automatizálás', 12, 6),
(27, 'étel recept főzés ízletes', 12, 8),
(28, 'színek festés paletta művészet', 12, 5),
(29, 'időjárás eső napfény hőmérséklet', 12, 7),
(30, 'ruha divat tervező öltözködés', 12, 6),
(31, 'óra perc másodperc időmérés', 12, 7),
(32, 'festmény művész színválasztás kompozíció', 12, 8),
(33, 'gép szerszám műhely technológia', 12, 7),
(34, 'év hónap nap időszámítás', 12, 5),
(35, 'ország kontinens város település', 12, 6),
(36, 'divat ruhaköltemény dizájn kifutó', 12, 5),
(37, 'növény virágzás gyökér levegő', 12, 7),
(38, 'építés épület tervezés konstrukció', 12, 7),
(39, 'évszak tavasz őszi időjárás', 12, 6),
(40, 'test izom csont vérkeringés', 12, 5),
(41, 'film színész karakter forgatókönyv', 12, 8);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `id` int(11) NOT NULL,
  `nev` varchar(50) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `jelszo` varchar(100) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `szerepkor` enum('Webmester','Versenyző','Tanár','Zsűritag') CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `evfolyam` int(11) NOT NULL,
  `osztalyjel` varchar(1) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kitoltesek`
--

CREATE TABLE `kitoltesek` (
  `id` int(11) NOT NULL,
  `versenyzoid` int(11) NOT NULL,
  `ido` date NOT NULL,
  `valaszok` varchar(255) NOT NULL,
  `pontszam` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `versenyek`
--

CREATE TABLE `versenyek` (
  `id` int(11) NOT NULL,
  `nev` varchar(255) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `leiras` varchar(255) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `evfolyam` int(11) NOT NULL,
  `kezdoidopont` date NOT NULL,
  `zaroidopont` date NOT NULL,
  `csoportidk` varchar(255) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- A tábla adatainak kiíratása `versenyek`
--

INSERT INTO `versenyek` (`id`, `nev`, `leiras`, `evfolyam`, `kezdoidopont`, `zaroidopont`, `csoportidk`) VALUES
(1, 'tesztverseny', 'tesztversenyleiras', 11, '2023-11-09', '2023-11-12', '[1, 2, 3]'),
(2, 'tesztverseny', 'tesztversenyleiras', 11, '2023-11-09', '2023-11-12', '[0, 1, 2]');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `weblapadatok`
--

CREATE TABLE `weblapadatok` (
  `id` int(11) NOT NULL,
  `nev` varchar(255) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `leiras` varchar(255) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `ikonbase64` longtext CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- A tábla adatainak kiíratása `weblapadatok`
--

INSERT INTO `weblapadatok` (`id`, `nev`, `leiras`, `ikonbase64`) VALUES
(0, 'Szerkeszthető Cím', 'Ez egy szerkeszthető bekezdés. <br> Kattintson rá, és módosítsa a szöveget!', '');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `csoportok`
--
ALTER TABLE `csoportok`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `feladatok`
--
ALTER TABLE `feladatok`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `kitoltesek`
--
ALTER TABLE `kitoltesek`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `versenyek`
--
ALTER TABLE `versenyek`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `csoportok`
--
ALTER TABLE `csoportok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `feladatok`
--
ALTER TABLE `feladatok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT a táblához `kitoltesek`
--
ALTER TABLE `kitoltesek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `versenyek`
--
ALTER TABLE `versenyek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
