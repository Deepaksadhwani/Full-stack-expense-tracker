-- CreateTable
CREATE TABLE "DownloadHistory" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "DownloadHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DownloadHistory" ADD CONSTRAINT "DownloadHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
