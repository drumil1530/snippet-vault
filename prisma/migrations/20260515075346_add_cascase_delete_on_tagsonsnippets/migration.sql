-- DropForeignKey
ALTER TABLE "tags-on-snippets" DROP CONSTRAINT "tags-on-snippets_snippetId_fkey";

-- DropForeignKey
ALTER TABLE "tags-on-snippets" DROP CONSTRAINT "tags-on-snippets_tagId_fkey";

-- AddForeignKey
ALTER TABLE "tags-on-snippets" ADD CONSTRAINT "tags-on-snippets_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags-on-snippets" ADD CONSTRAINT "tags-on-snippets_snippetId_fkey" FOREIGN KEY ("snippetId") REFERENCES "snippets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
