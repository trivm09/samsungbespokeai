/*
  Warnings:

  - The `otp` column on the `Customer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "otp",
ADD COLUMN     "otp" INTEGER DEFAULT 9999;
