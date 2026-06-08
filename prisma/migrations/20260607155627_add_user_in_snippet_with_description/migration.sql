/*
  Warnings:

  - Added the required column `userId` to the `snippets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "snippets" ADD COLUMN     "description" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "snippets" ADD CONSTRAINT "snippets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
