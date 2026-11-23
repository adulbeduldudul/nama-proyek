-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'OWNER');

-- CreateEnum
CREATE TYPE "GoatStatus" AS ENUM ('AVAILABLE', 'SOLD', 'TRANSFERRED', 'DECEASED', 'OTHER_OUT');

-- CreateEnum
CREATE TYPE "StockMovementType" AS ENUM ('IN', 'OUT', 'CORRECTION');

-- CreateEnum
CREATE TYPE "StockExitReason" AS ENUM ('SOLD', 'TRANSFERRED', 'DECEASED', 'CORRECTION', 'OTHER');

-- CreateEnum
CREATE TYPE "FeedRecordType" AS ENUM ('PURCHASE', 'USAGE');

-- CreateEnum
CREATE TYPE "FeedAllocationType" AS ENUM ('GOAT', 'GROUP', 'SHOWROOM');

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'STOCK_IN', 'STOCK_OUT', 'WEIGH_IN', 'FEED_RECORD', 'CORRECTION', 'LOGIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'ADMIN',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoatType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GoatType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Goat" (
    "id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "sex" TEXT,
    "status" "GoatStatus" NOT NULL DEFAULT 'AVAILABLE',
    "arrivalAt" TIMESTAMP(3) NOT NULL,
    "initialWeightKg" DECIMAL(7,2) NOT NULL,
    "currentWeightKg" DECIMAL(7,2),
    "currentWeighedAt" TIMESTAMP(3),
    "source" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "archivedAt" TIMESTAMP(3),

    CONSTRAINT "Goat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoatPhoto" (
    "id" TEXT NOT NULL,
    "goatId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "storageKey" TEXT,
    "caption" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "takenAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GoatPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockMovement" (
    "id" TEXT NOT NULL,
    "goatId" TEXT NOT NULL,
    "recordedById" TEXT NOT NULL,
    "type" "StockMovementType" NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "reason" "StockExitReason",
    "source" TEXT,
    "recipient" TEXT,
    "weightKg" DECIMAL(7,2),
    "photoUrl" TEXT,
    "photoStorageKey" TEXT,
    "exemptionReason" TEXT,
    "notes" TEXT,
    "correctsMovementId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StockMovement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeightRecord" (
    "id" TEXT NOT NULL,
    "goatId" TEXT NOT NULL,
    "recordedById" TEXT NOT NULL,
    "weighedAt" TIMESTAMP(3) NOT NULL,
    "weightKg" DECIMAL(7,2) NOT NULL,
    "photoUrl" TEXT,
    "photoStorageKey" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WeightRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedRecord" (
    "id" TEXT NOT NULL,
    "recordedById" TEXT NOT NULL,
    "type" "FeedRecordType" NOT NULL,
    "feedName" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "quantity" DECIMAL(10,3) NOT NULL,
    "unit" TEXT NOT NULL,
    "cost" DECIMAL(14,2),
    "allocationType" "FeedAllocationType" NOT NULL,
    "groupName" TEXT,
    "receiptPhotoUrl" TEXT,
    "receiptStorageKey" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeedRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedAllocation" (
    "id" TEXT NOT NULL,
    "feedRecordId" TEXT NOT NULL,
    "goatId" TEXT NOT NULL,
    "quantity" DECIMAL(10,3),

    CONSTRAINT "FeedAllocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockReconciliation" (
    "id" TEXT NOT NULL,
    "performedById" TEXT NOT NULL,
    "checkedAt" TIMESTAMP(3) NOT NULL,
    "expectedCount" INTEGER NOT NULL,
    "actualCount" INTEGER NOT NULL,
    "difference" INTEGER NOT NULL,
    "notes" TEXT,
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StockReconciliation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "action" "AuditAction" NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "summary" TEXT NOT NULL,
    "before" JSONB,
    "after" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_isActive_idx" ON "User"("role", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "GoatType_name_key" ON "GoatType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Goat_tag_key" ON "Goat"("tag");

-- CreateIndex
CREATE INDEX "Goat_status_typeId_idx" ON "Goat"("status", "typeId");

-- CreateIndex
CREATE INDEX "Goat_arrivalAt_idx" ON "Goat"("arrivalAt");

-- CreateIndex
CREATE INDEX "Goat_currentWeightKg_idx" ON "Goat"("currentWeightKg");

-- CreateIndex
CREATE INDEX "Goat_tag_idx" ON "Goat"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "GoatPhoto_storageKey_key" ON "GoatPhoto"("storageKey");

-- CreateIndex
CREATE INDEX "GoatPhoto_goatId_isPrimary_idx" ON "GoatPhoto"("goatId", "isPrimary");

-- CreateIndex
CREATE UNIQUE INDEX "StockMovement_photoStorageKey_key" ON "StockMovement"("photoStorageKey");

-- CreateIndex
CREATE UNIQUE INDEX "StockMovement_correctsMovementId_key" ON "StockMovement"("correctsMovementId");

-- CreateIndex
CREATE INDEX "StockMovement_goatId_occurredAt_idx" ON "StockMovement"("goatId", "occurredAt");

-- CreateIndex
CREATE INDEX "StockMovement_type_occurredAt_idx" ON "StockMovement"("type", "occurredAt");

-- CreateIndex
CREATE INDEX "StockMovement_recordedById_createdAt_idx" ON "StockMovement"("recordedById", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "WeightRecord_photoStorageKey_key" ON "WeightRecord"("photoStorageKey");

-- CreateIndex
CREATE INDEX "WeightRecord_goatId_weighedAt_idx" ON "WeightRecord"("goatId", "weighedAt");

-- CreateIndex
CREATE INDEX "WeightRecord_recordedById_createdAt_idx" ON "WeightRecord"("recordedById", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "FeedRecord_receiptStorageKey_key" ON "FeedRecord"("receiptStorageKey");

-- CreateIndex
CREATE INDEX "FeedRecord_occurredAt_feedName_idx" ON "FeedRecord"("occurredAt", "feedName");

-- CreateIndex
CREATE INDEX "FeedRecord_type_occurredAt_idx" ON "FeedRecord"("type", "occurredAt");

-- CreateIndex
CREATE INDEX "FeedRecord_allocationType_occurredAt_idx" ON "FeedRecord"("allocationType", "occurredAt");

-- CreateIndex
CREATE INDEX "FeedAllocation_goatId_feedRecordId_idx" ON "FeedAllocation"("goatId", "feedRecordId");

-- CreateIndex
CREATE UNIQUE INDEX "FeedAllocation_feedRecordId_goatId_key" ON "FeedAllocation"("feedRecordId", "goatId");

-- CreateIndex
CREATE INDEX "StockReconciliation_checkedAt_idx" ON "StockReconciliation"("checkedAt");

-- CreateIndex
CREATE INDEX "StockReconciliation_resolvedAt_checkedAt_idx" ON "StockReconciliation"("resolvedAt", "checkedAt");

-- CreateIndex
CREATE INDEX "AuditLog_entityType_entityId_createdAt_idx" ON "AuditLog"("entityType", "entityId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_userId_createdAt_idx" ON "AuditLog"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_action_createdAt_idx" ON "AuditLog"("action", "createdAt");

-- AddForeignKey
ALTER TABLE "Goat" ADD CONSTRAINT "Goat_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "GoatType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoatPhoto" ADD CONSTRAINT "GoatPhoto_goatId_fkey" FOREIGN KEY ("goatId") REFERENCES "Goat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_goatId_fkey" FOREIGN KEY ("goatId") REFERENCES "Goat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_recordedById_fkey" FOREIGN KEY ("recordedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_correctsMovementId_fkey" FOREIGN KEY ("correctsMovementId") REFERENCES "StockMovement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeightRecord" ADD CONSTRAINT "WeightRecord_goatId_fkey" FOREIGN KEY ("goatId") REFERENCES "Goat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeightRecord" ADD CONSTRAINT "WeightRecord_recordedById_fkey" FOREIGN KEY ("recordedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedRecord" ADD CONSTRAINT "FeedRecord_recordedById_fkey" FOREIGN KEY ("recordedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedAllocation" ADD CONSTRAINT "FeedAllocation_feedRecordId_fkey" FOREIGN KEY ("feedRecordId") REFERENCES "FeedRecord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedAllocation" ADD CONSTRAINT "FeedAllocation_goatId_fkey" FOREIGN KEY ("goatId") REFERENCES "Goat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockReconciliation" ADD CONSTRAINT "StockReconciliation_performedById_fkey" FOREIGN KEY ("performedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
