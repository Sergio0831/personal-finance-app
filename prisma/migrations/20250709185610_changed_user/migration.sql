/*
  Warnings:

  - You are about to drop the column `balance` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `expenses` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `income` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "balance",
DROP COLUMN "expenses",
DROP COLUMN "income";
