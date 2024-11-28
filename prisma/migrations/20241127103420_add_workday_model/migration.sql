-- CreateTable
CREATE TABLE "Workday" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "billable" DOUBLE PRECISION NOT NULL,
    "notBillable" DOUBLE PRECISION NOT NULL,
    "absent" DOUBLE PRECISION NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Workday_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Workday" ADD CONSTRAINT "Workday_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
