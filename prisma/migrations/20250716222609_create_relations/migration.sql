/*
  Warnings:

  - Added the required column `userId` to the `attractions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `flights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `hotels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "attractions" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "flights" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "hotels" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "attractions" ADD CONSTRAINT "attractions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flights" ADD CONSTRAINT "flights_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotels" ADD CONSTRAINT "hotels_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
