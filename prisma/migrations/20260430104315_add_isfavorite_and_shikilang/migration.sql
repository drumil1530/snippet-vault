-- AlterTable
ALTER TABLE "languages" ADD COLUMN     "shikiLang" TEXT;

-- AlterTable
ALTER TABLE "snippets" ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false;
