-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "date_of_birthday" TIMESTAMP(3) NOT NULL,
    "avatar" TEXT NOT NULL,

    PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
