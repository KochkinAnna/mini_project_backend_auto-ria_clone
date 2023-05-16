/*
  Warnings:

  - You are about to drop the column `createdAt` on the `manager` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `manager` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `manager` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `user` MODIFY `updatedAt` DATETIME(3) NULL;
