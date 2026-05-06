/*
  Warnings:

  - You are about to drop the `TagsOnSnippets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TagsOnSnippets" DROP CONSTRAINT "TagsOnSnippets_snippetId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnSnippets" DROP CONSTRAINT "TagsOnSnippets_tagId_fkey";

-- DropTable
DROP TABLE "TagsOnSnippets";

-- CreateTable
CREATE TABLE "tags-on-snippets" (
    "tagId" TEXT NOT NULL,
    "snippetId" TEXT NOT NULL,

    CONSTRAINT "tags-on-snippets_pkey" PRIMARY KEY ("tagId","snippetId")
);

-- AddForeignKey
ALTER TABLE "tags-on-snippets" ADD CONSTRAINT "tags-on-snippets_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags-on-snippets" ADD CONSTRAINT "tags-on-snippets_snippetId_fkey" FOREIGN KEY ("snippetId") REFERENCES "snippets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
