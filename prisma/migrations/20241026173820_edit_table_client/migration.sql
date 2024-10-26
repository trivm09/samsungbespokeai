/*
  Warnings:

  - You are about to drop the column `clients` on the `Client` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resolve` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "clients",
ADD COLUMN     "clientId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "resolve" TEXT NOT NULL;
