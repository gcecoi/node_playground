/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "UserInfo" (
    "user_id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "date_of_birthday" TIMESTAMP(3),
    "avatar" TEXT,

    PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo.email_unique" ON "UserInfo"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users.email_unique" ON "Users"("email");
