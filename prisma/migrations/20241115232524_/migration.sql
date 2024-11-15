/*
  Warnings:

  - You are about to drop the column `profileId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Profile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_profileId_fkey";

-- DropIndex
DROP INDEX "Profile_email_key";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "profileId";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "profileId";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "email";
