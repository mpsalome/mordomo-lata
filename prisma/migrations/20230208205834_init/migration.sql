-- CreateTable
CREATE TABLE "Command" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "uses" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Command_name_key" ON "Command"("name");
