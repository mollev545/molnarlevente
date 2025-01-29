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
('Budai Vár felfedezése', 'Séta a történelmi Budai Várnegyedben.', '2 óra', 'ingyenes', 'Budai Vár'),
('Látogatás a Parlamentnél', 'Magyarország ikonikus épületének meglátogatása.', '1.5 óra', '3000 Ft-tól', 'Parlament'),
('Duna-parti séta', 'Romantikus séta Budapest híres rakpartján.', '1 óra', 'ingyenes', 'Duna-part'),
('Gellért-hegy és Citadella', 'Kilátás Budapest legszebb pontjáról.', '1.5 óra', 'ingyenes', 'Gellért-hegy'),
('Margitsziget', 'Pihenés és kikapcsolódás Budapest legnagyobb zöld szigetén.', '3 óra', 'ingyenes', 'Margitsziget'),
('Széchenyi Gyógyfürdő', 'Fürdőzés Budapest egyik leghíresebb termálfürdőjében.', '4 óra', '7500 Ft-tól', 'Széchenyi Fürdő'),
('Városliget és Hősök tere', 'Történelmi szobrok és kellemes séta.', '1.5 óra', 'ingyenes', 'Hősök tere'),
('Szent István-bazilika', 'Látogatás Magyarország egyik legnagyobb templomában.', '1 óra', 'ingyenes', 'Szent István Bazilika'),
('Rudas Gyógyfürdő', 'Török stílusú fürdő híres termálvizeiről.', '3 óra', '6500 Ft-tól', 'Rudas Fürdő'),
('Fővárosi Állat- és Növénykert', 'Állatok és növények megtekintése a Városligetben.', '3 óra', '4500 Ft', 'Fővárosi Állatkert'),
('Tropicarium', 'Tengeri akvárium és esőerdő egzotikus állatokkal.', '2 óra', '3000 Ft', 'Tropicarium'),
('Magyar Nemzeti Múzeum', 'A magyar történelem és kultúra bemutatása.', '2.5 óra', '3500 Ft', 'Magyar Nemzeti Múzeum'),
('Vásárlás a Váci utcában', 'Séta Budapest híres bevásárlóutcáján.', '1 óra', 'ingyenes', 'Váci utca'),
('Gozsdu Udvar', 'Bárok, éttermek és galériák a belváros szívében.', '2 óra', 'ingyenes', 'Gozsdu Udvar'),
('Római-part', 'Pihenés és gasztronómiai élmények a Duna-parton.', '3 óra', 'ingyenes', 'Római-part'),
('Budapest Eye', 'Óriáskerék a belvárosban lenyűgöző kilátással.', '30 perc', '3500 Ft', 'Budapest Eye'),
('Flippermúzeum', 'Régi és új flippergépek kipróbálása.', '2 óra', '3000 Ft', 'Flippermúzeum'),
('Szimpla Kert', 'Budapest egyik leghíresebb romkocsmája.', '2 óra', 'ingyenes', 'Szimpla Kert'),
('Aquaworld', 'Vízi élménypark és fürdő egész évben.', '4 óra', '8500 Ft-tól', 'Aquaworld'),
('Budapest Zoo Café', 'Kávézás egzotikus állatok társaságában.', '1.5 óra', 'ingyenes', 'Zoo Café');