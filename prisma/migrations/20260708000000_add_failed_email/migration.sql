-- CreateTable
CREATE TABLE "FailedEmail" (
    "id" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FailedEmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FailedEmail_recipient_idx" ON "FailedEmail"("recipient");

-- CreateIndex
CREATE INDEX "FailedEmail_createdAt_idx" ON "FailedEmail"("createdAt");
