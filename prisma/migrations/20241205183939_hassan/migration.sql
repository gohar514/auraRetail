/*
  Warnings:

  - You are about to drop the column `area` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `secondName` on the `Order` table. All the data in the column will be lost.
  - Added the required column `FullName` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "area",
DROP COLUMN "firstName",
DROP COLUMN "secondName",
ADD COLUMN     "FullName" TEXT NOT NULL;
