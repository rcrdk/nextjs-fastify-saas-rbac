-- DropForeignKey
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_owner_id_fkey";

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
