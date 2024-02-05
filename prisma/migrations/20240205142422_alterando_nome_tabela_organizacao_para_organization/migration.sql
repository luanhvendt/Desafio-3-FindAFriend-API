/*
  Warnings:

  - You are about to drop the `organizacao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "organizacao";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "organization" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "organization_id_key" ON "organization"("id");

-- CreateIndex
CREATE UNIQUE INDEX "organization_email_key" ON "organization"("email");
