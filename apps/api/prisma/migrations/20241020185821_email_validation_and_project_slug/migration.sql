/*
  Warnings:

  - A unique constraint covering the columns `[organization_id,slug]` on the table `projects` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "TokenType" ADD VALUE 'EMAIL_VALIDATION';

-- DropIndex
DROP INDEX "projects_slug_key";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "email_validated_at" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "projects_organization_id_slug_key" ON "projects"("organization_id", "slug");
