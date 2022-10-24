-- CreateTable
CREATE TABLE "IdIsInt" (
    "id" SERIAL NOT NULL,
    "value" TEXT,

    CONSTRAINT "IdIsInt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdIsUuid" (
    "id" UUID NOT NULL,
    "value" TEXT,

    CONSTRAINT "IdIsUuid_pkey" PRIMARY KEY ("id")
);
