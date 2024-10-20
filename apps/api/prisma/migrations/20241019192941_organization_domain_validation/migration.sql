-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "domain_validated_at" TIMESTAMP(3),
ADD COLUMN     "domain_validation_id" TEXT;
