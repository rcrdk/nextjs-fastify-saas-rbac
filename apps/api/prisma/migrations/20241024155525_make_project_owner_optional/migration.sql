-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_owner_id_fkey";

-- AlterTable
ALTER TABLE "projects" ALTER COLUMN "owner_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
