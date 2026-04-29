/*
  Warnings:

  - You are about to drop the column `language` on the `snippets` table. All the data in the column will be lost.
  - Made the column `languageId` on table `snippets` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "snippets" DROP COLUMN "language",
ALTER COLUMN "languageId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "snippets" ADD CONSTRAINT "snippets_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
