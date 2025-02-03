-- Database: PlanUp
 
-- Drop database if it exists and create a new one
DROP DATABASE IF EXISTS PlanUp;
CREATE DATABASE PlanUp;
USE PlanUp;
 
-- Users table: stores user information
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
 
-- Programs table: stores program details
CREATE TABLE Programs (
    ProgramID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Description TEXT,
    Duration ENUM('whole_day', 'half_day', 'weekend') NOT NULL,
    Cost ENUM('free', 'paid') NOT NULL,
    Location VARCHAR(255),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
 
-- UserPreferences table: stores user preferences for filtering programs
CREATE TABLE UserPreferences (
    PreferenceID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    DurationFilter ENUM('whole_day', 'half_day', 'weekend') DEFAULT NULL,
    CostFilter ENUM('free', 'paid') DEFAULT NULL,
    LocationFilter VARCHAR(255) DEFAULT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
 
-- SwipeActions table: records swipe actions of users on programs
CREATE TABLE SwipeActions (
    SwipeID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    ProgramID INT NOT NULL,
    Action ENUM('like', 'dislike') NOT NULL,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ProgramID) REFERENCES Programs(ProgramID)
);
 
-- Rooms table: stores room codes for shared program selection
CREATE TABLE Rooms (
    RoomID INT AUTO_INCREMENT PRIMARY KEY,
    RoomCode VARCHAR(10) UNIQUE NOT NULL,
    CreatedByUserID INT NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (CreatedByUserID) REFERENCES Users(UserID)
);
 
-- RoomParticipants table: links users to rooms
CREATE TABLE RoomParticipants (
    ParticipantID INT AUTO_INCREMENT PRIMARY KEY,
    RoomID INT NOT NULL,
    UserID INT NOT NULL,
    FOREIGN KEY (RoomID) REFERENCES Rooms(RoomID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
 
-- UserLikes table: records likes by users on programs
CREATE TABLE UserLikes (
    LikeID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    ProgramID INT NOT NULL,
    LikedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ProgramID) REFERENCES Programs(ProgramID)
);
 
INSERT INTO Users (Username, PasswordHash, Email)
VALUES ('testuser', 'hashedpassword', 'test@example.com');
 
INSERT INTO Programs (Name, Description, Duration, Cost, Location)
VALUES ('Sample Program', 'This is a test program.', 'whole_day', 'free', 'Test Location');
 
 
-- Insert sample data into Programs table
INSERT INTO Programs (Name, Description, Duration, Cost, Location) VALUES 
('Duna hajókirándulás', 'Városnéző hajóút Budapest látványosságai mentén.', 'half_day', 'paid', 'Vigadó téri hajóállomás'),
('Hop-On Hop-Off buszos városnézés', 'Fedezd fel Budapest nevezetességeit kényelmes busszal.', 'whole_day', 'paid', 'Clark Ádám tér'),
('Szent István Bazilika látogatás', 'Fedezd fel Budapest legnagyobb templomát és a kupolát.', 'half_day', 'free', 'Szent István Bazilika'),
('Romkocsmatúra', 'Ismerd meg Budapest híres romkocsmáit egy vezetett túrán.', 'half_day', 'paid', 'Szimpla Kert'),
('Termálfürdő élmény', 'Pihenj Budapest híres termálfürdőiben, például a Széchenyiben.', 'whole_day', 'paid', 'Széchenyi Fürdő'),
('Parlament látogatás', 'Fedezd fel a magyar Parlament csodás épületét.', 'half_day', 'paid', 'Országház'),
('Gellért-hegyi kilátótúra', 'Túrázz fel a Gellért-hegyre és élvezd a panorámát.', 'half_day', 'free', 'Gellért-hegy'),
('Margitszigeti piknik', 'Piknikezz és sétálj a Margitszigeten.', 'whole_day', 'free', 'Margitsziget'),
('Borkóstoló', 'Kóstold meg Magyarország híres borait egy borkóstoló eseményen.', 'half_day', 'paid', 'Rizmájer Sörház'),
('Múzeumlátogatás', 'Fedezd fel Budapest történelmét és művészetét egy múzeumban.', 'half_day', 'paid', 'Magyar Nemzeti Múzeum'),
('Éjszakai városnéző séta', 'Fedezd fel Budapest fényeit egy esti sétán.', 'half_day', 'free', 'Váci utca'),
('Gasztrotúra', 'Ismerd meg a magyar konyha különlegességeit.', 'half_day', 'paid', 'Nagy Vásárcsarnok'),
('Escape Room élmény', 'Próbáld ki Budapest legizgalmasabb szabadulószobáit.', 'half_day', 'paid', 'Mystique Room'),
('Jazz koncert', 'Élvezd a budapesti jazz klubok élőzenés előadásait.', 'half_day', 'paid', 'Opus Jazz Club'),
('Folyami vacsorás hajózás', 'Élvezd a dunai hajózást egy elegáns vacsorával.', 'half_day', 'paid', 'Duna Corso hajóállomás'),
('Kalandpark és kötélpálya', 'Próbáld ki Budapest egyik kalandparkját.', 'half_day', 'paid', 'Challengeland Kalandpálya'),
('Street Art túra', 'Ismerd meg Budapest utcai művészetét egy vezetett túrán.', 'half_day', 'free', 'VIII. kerület - Corvin negyed'),
('Bringatúra Budapesten', 'Fedezd fel a várost biciklivel egy csoportos túrán.', 'whole_day', 'paid', 'Margitsziget - bringakölcsönző'),
('Óriáskerék élmény', 'Csodáld meg Budapest látképét az óriáskerékről.', 'half_day', 'paid', 'Budapest Eye - Erzsébet tér'),
('Hajnali fotótúra', 'Fényképezd le Budapest legszebb helyeit a napfelkeltében.', 'half_day', 'free', 'Halászbástya'),
('Futóverseny a Városligetben', 'Vegyél részt egy budapesti amatőr futóversenyen.', 'half_day', 'free', 'Városliget'),
('Sétahajózás pezsgővel', 'Lélegzetelállító kilátás pezsgővel egybekötve a Dunán.', 'half_day', 'paid', 'Vigadó tér'),
('Kirándulás a Normafára', 'Túrázz fel a Normafára és élvezd a természetet.', 'whole_day', 'free', 'Normafa'),
('Opera előadás', 'Élvezd a budapesti operaház egyik klasszikus előadását.', 'half_day', 'paid', 'Magyar Állami Operaház'),
('Sörkóstoló', 'Kóstold meg a magyar kézműves söröket egy vezetett sörkóstolón.', 'half_day', 'paid', 'First Craft Beer Bár'),
('Vízi biciklizés a Városligeti tónál', 'Kölcsönözz egy vízibiciklit és fedezd fel a Városligeti tavat.', 'half_day', 'paid', 'Városligeti Tó'),
('Karaoke est', 'Énekelj barátaiddal egy budapesti karaoke bárban.', 'half_day', 'paid', 'Blue Bird Karaoke'),
('Extrém kalandpark', 'Próbáld ki az extrém kötélpályát és mászófalakat.', 'half_day', 'paid', 'Római Kalandpark'),
('Lovaskocsikázás a Margitszigeten', 'Élvezd a természetet egy lovaskocsi túrán.', 'half_day', 'paid', 'Margitsziget - Lovaskocsi állomás'),
('Duna-parti street food fesztivál', 'Kóstolj meg különböző nemzetek street food fogásait.', 'weekend', 'paid', 'Bálna Budapest'),
('Táncóra egy profi oktatóval', 'Tanulj meg latin vagy társastáncot egy professzionális tanártól.', 'half_day', 'paid', 'Salsa Diabolica Tánciskola'),
('Szabadulószoba horror tematikával', 'Tedd próbára a bátorságodat egy horror szabadulószobában.', 'half_day', 'paid', 'Neverland Szabadulószoba'),
('Kézműves workshop', 'Készítsd el saját ékszeredet vagy dísztárgyadat egy workshopon.', 'half_day', 'paid', 'Paloma Budapest'),
('Szabadtéri jóga a Városligetben', 'Lazíts és töltekezz fel szabadtéri jógaórán.', 'weekend', 'free', 'Városliget'),
('Duna-parti sétatúra', 'Fedezd fel a budapesti rakpart történelmét egy vezetett sétán.', 'weekend', 'free', 'Duna-part'),
('Margitszigeti futóverseny', 'Csatlakozz egy ingyenes közösségi futáshoz a Margitszigeten.', 'weekend', 'free', 'Margitsziget'),
('Szabadtéri filmvetítés', 'Élvezd az esti filmvetítéseket Budapest különböző pontjain.', 'weekend', 'free', 'Városligeti Mozi'),
('Gellért-hegyi napfelkelte túra', 'Csodáld meg a napfelkeltét a város felett.', 'weekend', 'free', 'Gellért-hegy'),
('Ingyenes múzeumi nap', 'Fedezd fel Budapest múzeumait a havonta egyszer ingyenes napokon.', 'weekend', 'free', 'Ludwig Múzeum'),
('Szabadtéri koncertek', 'Élvezd a város különböző pontjain megrendezett ingyenes koncerteket.', 'weekend', 'free', 'Kobuci Kert'),
('Bringás túra a Budai-hegységben', 'Ingyenes szervezett kerékpártúra a Budai-hegységben.', 'weekend', 'free', 'Normafa'),
('Utcazenei fesztivál', 'Hallgasd Budapest legjobb utcazenészeit ingyenes fesztiválokon.', 'weekend', 'free', 'Gozsdu Udvar'),
('Természetjárás a Róka-hegyen', 'Kirándulj a Róka-hegyre és fedezd fel Budapest rejtett természeti szépségeit.', 'weekend', 'free', 'Róka-hegy'),
('Ingyenes városnéző séta', 'Csatlakozz egy ingyenes idegenvezetéses városnézéshez.', 'weekend', 'free', 'Váci utca'),
('Kulturális fesztivál a Várkert Bazárban', 'Élvezd a színes kulturális eseményeket Budapest egyik legszebb helyszínén.', 'weekend', 'free', 'Várkert Bazár'),
('Ingyenes sportnap a Városligetben', 'Vegyél részt ingyenes edzéseken és sportprogramokon.', 'weekend', 'free', 'Városliget'),
('Gourmet Street Food Nap', 'Próbáld ki a legjobb street food ételeket ingyenes kóstolókkal.', 'weekend', 'free', 'Bálna Budapest'),
('Kézműves vásár', 'Fedezd fel Budapest helyi kézműveseinek termékeit.', 'weekend', 'free', 'Fény Utcai Piac'),
('Nyílt nap az Operában', 'Tekints be a Magyar Állami Operaház kulisszatitkaiba ingyenesen.', 'weekend', 'free', 'Magyar Állami Operaház'),
('Történelmi séta Budapesten', 'Vezetett túra Budapest történelmi emlékhelyein.', 'weekend', 'free', 'Budai Vár'),
('Ingyenes kiállítás a Millenárison', 'Fedezd fel az aktuális művészeti kiállításokat.', 'weekend', 'free', 'Millenáris Park'),
('Dunakorzó esti séta', 'Csodáld meg a Duna-part fényeit egy kellemes esti sétán.', 'weekend', 'free', 'Dunakorzó');