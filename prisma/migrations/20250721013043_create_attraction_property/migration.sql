/*
  Warnings:

  - Added the required column `visit_date` to the `attractions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "attractions" ADD COLUMN     "visit_date" TIMESTAMP(3) NOT NULL;
