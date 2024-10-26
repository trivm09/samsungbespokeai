/*
  Warnings:

  - The `journey1` column on the `Customer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `journey2` column on the `Customer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `journey3` column on the `Customer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `journey4` column on the `Customer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `gift1` column on the `Customer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `gift2` column on the `Customer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `name` on table `Customer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "email" SET DEFAULT '',
DROP COLUMN "journey1",
ADD COLUMN     "journey1" BOOLEAN,
DROP COLUMN "journey2",
ADD COLUMN     "journey2" BOOLEAN,
DROP COLUMN "journey3",
ADD COLUMN     "journey3" BOOLEAN,
DROP COLUMN "journey4",
ADD COLUMN     "journey4" BOOLEAN,
DROP COLUMN "gift1",
ADD COLUMN     "gift1" BOOLEAN,
DROP COLUMN "gift2",
ADD COLUMN     "gift2" BOOLEAN;
