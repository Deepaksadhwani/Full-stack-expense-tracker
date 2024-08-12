-- CreateTable
CREATE TABLE "ForgotPasswordRequests" (
    "id" TEXT NOT NULL,
    "isactive" BOOLEAN NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "ForgotPasswordRequests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ForgotPasswordRequests" ADD CONSTRAINT "ForgotPasswordRequests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
