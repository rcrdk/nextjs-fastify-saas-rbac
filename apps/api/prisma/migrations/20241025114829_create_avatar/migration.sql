-- CreateEnum
CREATE TYPE "AvatarReceipient" AS ENUM ('USER', 'ORGANIZATION', 'PROJECT');

-- CreateTable
CREATE TABLE "avatars" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "receipient" "AvatarReceipient" NOT NULL,
    "receipient_id" TEXT,

    CONSTRAINT "avatars_pkey" PRIMARY KEY ("id")
);
