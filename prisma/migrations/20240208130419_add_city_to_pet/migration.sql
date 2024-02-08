/*
  Warnings:

  - Added the required column `city` to the `pet` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "energy" TEXT NOT NULL,
    "independence" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "photos" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    "organization_id" INTEGER NOT NULL,
    CONSTRAINT "pet_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_pet" ("about", "age", "createdAt", "deletedAt", "energy", "environment", "id", "independence", "name", "organization_id", "photos", "requirements", "size", "updatedAt") SELECT "about", "age", "createdAt", "deletedAt", "energy", "environment", "id", "independence", "name", "organization_id", "photos", "requirements", "size", "updatedAt" FROM "pet";
DROP TABLE "pet";
ALTER TABLE "new_pet" RENAME TO "pet";
CREATE UNIQUE INDEX "pet_id_key" ON "pet"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
