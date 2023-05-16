-- DropForeignKey
ALTER TABLE `car` DROP FOREIGN KEY `Car_premiumSellerId_fkey`;

-- AlterTable
ALTER TABLE `car` MODIFY `premiumSellerId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_premiumSellerId_fkey` FOREIGN KEY (`premiumSellerId`) REFERENCES `PremiumSeller`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
