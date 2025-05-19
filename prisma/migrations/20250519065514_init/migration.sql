/*
  Warnings:

  - You are about to drop the column `createdAt` on the `member` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `member` table. All the data in the column will be lost.
  - The primary key for the `store` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `member_id` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `store_id` on the `store` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[memberId]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberId` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `member` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `store` DROP PRIMARY KEY,
    DROP COLUMN `member_id`,
    DROP COLUMN `store_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `memberId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Store_memberId_key` ON `Store`(`memberId`);

-- AddForeignKey
ALTER TABLE `Store` ADD CONSTRAINT `Store_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
