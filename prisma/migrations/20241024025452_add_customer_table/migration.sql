-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "otp" TEXT,
    "journey1" TEXT,
    "journey2" TEXT,
    "journey3" TEXT,
    "journey4" TEXT,
    "gift1" TEXT,
    "gift2" TEXT,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);
