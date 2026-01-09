/*
  Warnings:

  - You are about to alter the column `title` on the `todos` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "todos" ADD COLUMN     "description" VARCHAR(100),
ALTER COLUMN "title" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "createdAt" SET DEFAULT now();
