/*
  Warnings:

  - Changed the type of `departure_date` on the `flights` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `arrival_date` on the `flights` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `check_in` on the `hotels` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `check_out` on the `hotels` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "flights" DROP COLUMN "departure_date",
ADD COLUMN     "departure_date" TIMESTAMP(3) NOT NULL,
DROP COLUMN "arrival_date",
ADD COLUMN     "arrival_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "hotels" DROP COLUMN "check_in",
ADD COLUMN     "check_in" TIMESTAMP(3) NOT NULL,
DROP COLUMN "check_out",
ADD COLUMN     "check_out" TIMESTAMP(3) NOT NULL;
