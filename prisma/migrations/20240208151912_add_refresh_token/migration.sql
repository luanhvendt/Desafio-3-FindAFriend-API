-- CreateTable
CREATE TABLE "refreshToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "refreshToken" TEXT NOT NULL,
    "orgId" INTEGER NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "refreshToken_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "refreshToken_id_key" ON "refreshToken"("id");
