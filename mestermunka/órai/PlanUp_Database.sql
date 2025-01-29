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
('Budapest Walking Tour', 'Explore the historic streets of Budapest on a guided walking tour.', 'half_day', 'paid', 'Budapest'),
('Gödöllő Castle Visit', 'Discover the rich history of Gödöllő Royal Palace.', 'whole_day', 'paid', 'Gödöllő'),
('Danube River Cruise', 'Enjoy a scenic cruise on the Danube River.', 'half_day', 'paid', 'Visegrád'),
('Esztergom Basilica Tour', 'Visit Hungary’s largest church in Esztergom.', 'whole_day', 'free', 'Esztergom'),
('Hiking in Börzsöny', 'Experience the beauty of nature with a hike in the Börzsöny Mountains.', 'whole_day', 'free', 'Börzsöny Mountains'),
('Vác Wine Tasting', 'Sample local wines in the charming town of Vác.', 'half_day', 'paid', 'Vác'),
('Szentendre Art Walk', 'Discover galleries and museums in the artistic town of Szentendre.', 'half_day', 'paid', 'Szentendre'),
('Cycling Along the Danube', 'Enjoy a refreshing bike ride along the Danube River.', 'half_day', 'free', 'Danube Bike Trail'),
('Pilis Adventure Park', 'Have fun with zip lines, rope courses, and more.', 'whole_day', 'paid', 'Pilisszentkereszt'),
('Cultural Festival in Ráckeve', 'Experience traditional Hungarian music, dance, and cuisine.', 'weekend', 'free', 'Ráckeve');
