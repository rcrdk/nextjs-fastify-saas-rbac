/*
  Warnings:

  - A unique constraint covering the columns `[receipient,receipient_id]` on the table `avatars` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "avatars_receipient_receipient_id_key" ON "avatars"("receipient", "receipient_id");
