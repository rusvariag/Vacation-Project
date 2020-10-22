CREATE DATABASE `project_3`;

CREATE TABLE IF NOT EXISTS users(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `username` VARCHAR(100) NOT NULL UNIQUE,
    `password` CHAR(128) NOT NULL,
    `isAdmin` BOOLEAN DEFAULT false
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS vacations(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `destination` VARCHAR(100) NOT NULL,
    `from_date` DATE NOT NULL,
    `to_date` DATE NOT NULL,
    `price` DECIMAL(8,2) NOT NULL,
    `description` TEXT,
    `picture` VARCHAR(2083)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS follows (
    `user_id` INT,
    `vacation_id` INT,
    PRIMARY KEY (`user_id`, `vacation_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`vacation_id`) REFERENCES `vacations`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS system_logs (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user` VARCHAR(100) NOT NULL,
    `timestamp` DATETIME NOT NULL,
    `message` TEXT
) ENGINE=InnoDB;