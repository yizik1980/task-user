-- Create Database
CREATE DATABASE PohlimDB;
GO

USE PohlimDB;
GO

-- Create Users Table
CREATE TABLE Users (
    id INT PRIMARY KEY IDENTITY(1,1),
    email NVARCHAR(255) NOT NULL UNIQUE,
    username NVARCHAR(100) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    firstName NVARCHAR(100),
    lastName NVARCHAR(100),
    phone NVARCHAR(20),
    address NVARCHAR(500),
    city NVARCHAR(100),
    country NVARCHAR(100),
    postalCode NVARCHAR(20),
    role NVARCHAR(50) DEFAULT 'user',
    isActive BIT DEFAULT 1,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);
GO

-- Create Index on email and username for faster lookups
CREATE INDEX IX_Users_Email ON Users(email);
CREATE INDEX IX_Users_Username ON Users(username);
GO

-- Insert Sample Users
INSERT INTO Users (email, username, password, firstName, lastName, phone, address, city, country, postalCode, role, isActive)
VALUES 
    ('john.doe@example.com', 'johndoe', 'hashed_password_1', 'John', 'Doe', '+1234567890', '123 Main St', 'New York', 'USA', '10001', 'admin', 1),
    ('jane.smith@example.com', 'janesmith', 'hashed_password_2', 'Jane', 'Smith', '+0987654321', '456 Oak Ave', 'Los Angeles', 'USA', '90001', 'user', 1),
    ('mike.johnson@example.com', 'mikejohnson', 'hashed_password_3', 'Mike', 'Johnson', '+1122334455', '789 Pine Rd', 'Chicago', 'USA', '60601', 'user', 1),
    ('sarah.williams@example.com', 'sarahwilliams', 'hashed_password_4', 'Sarah', 'Williams', '+5566778899', '321 Elm St', 'Houston', 'USA', '77001', 'user', 1),
    ('david.brown@example.com', 'davidbrown', 'hashed_password_5', 'David', 'Brown', '+9988776655', '654 Maple Dr', 'Phoenix', 'USA', '85001', 'user', 0);
GO

-- Select all users to verify
SELECT * FROM Users;
GO
