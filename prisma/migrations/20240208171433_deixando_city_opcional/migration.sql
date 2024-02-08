-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_organization" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "city" TEXT,
    "adress" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME
);
INSERT INTO "new_organization" ("adress", "cep", "city", "createdAt", "deletedAt", "email", "id", "name", "password", "updatedAt", "whatsapp") SELECT "adress", "cep", "city", "createdAt", "deletedAt", "email", "id", "name", "password", "updatedAt", "whatsapp" FROM "organization";
DROP TABLE "organization";
ALTER TABLE "new_organization" RENAME TO "organization";
CREATE UNIQUE INDEX "organization_id_key" ON "organization"("id");
CREATE UNIQUE INDEX "organization_email_key" ON "organization"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
