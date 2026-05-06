/*
  Warnings:

  - You are about to drop the `_SnippetToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SnippetToTag" DROP CONSTRAINT "_SnippetToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_SnippetToTag" DROP CONSTRAINT "_SnippetToTag_B_fkey";

-- DropTable
DROP TABLE "_SnippetToTag";

-- CreateTable
CREATE TABLE "TagsOnSnippets" (
    "tagId" TEXT NOT NULL,
    "snippetId" TEXT NOT NULL,

    CONSTRAINT "TagsOnSnippets_pkey" PRIMARY KEY ("tagId","snippetId")
);

-- AddForeignKey
ALTER TABLE "TagsOnSnippets" ADD CONSTRAINT "TagsOnSnippets_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnSnippets" ADD CONSTRAINT "TagsOnSnippets_snippetId_fkey" FOREIGN KEY ("snippetId") REFERENCES "snippets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
