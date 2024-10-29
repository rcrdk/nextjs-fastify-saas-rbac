/*
  Warnings:

  - Added the required column `payload` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tokens" ADD COLUMN     "payload" TEXT NOT NULL;
