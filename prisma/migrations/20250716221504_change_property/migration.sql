/*
  Warnings:

  - You are about to drop the column `price` on the `hotels` table. All the data in the column will be lost.
  - Added the required column `pricePerNight` to the `hotels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hotels" DROP COLUMN "price",
ADD COLUMN     "pricePerNight" DOUBLE PRECISION NOT NULL;
