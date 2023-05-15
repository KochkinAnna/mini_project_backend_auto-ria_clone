-- file: prisma/migrations/<timestamp>_restore_manager_table/up.sql
-- Тут <timestamp> - це мітка часу, додана до імені файлу міграції.

-- CreateTable
CREATE TABLE `manager` (
                           `id` INT NOT NULL AUTO_INCREMENT,
                           `managerId` INT UNIQUE NOT NULL,
                           PRIMARY KEY (`id`),
                           FOREIGN KEY (`managerId`) REFERENCES `user`(`id`) ON DELETE CASCADE
);