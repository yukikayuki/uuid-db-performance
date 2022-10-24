import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";

const prisma = new PrismaClient();

async function main() {
  console.log("SETUP");

  const limit = 1000;
  console.time("int");
  for (let i = 0; i < limit; i++) {
    console.time(`int: ${i}`);
    await insertBatchInt();
    console.timeEnd(`int: ${i}`);
  }
  console.timeEnd("int");

  console.time("uuid");
  for (let i = 0; i < limit; i++) {
    console.time(`uuid: ${i}`);
    await insertBatchUuid();
    console.timeEnd(`uuid: ${i}`);
  }
  console.timeEnd("uuid");

  console.log("END SETUP");
  await benchmark_uuid_v4();
  await idIsUuid();

  console.time("int");
  for (let i = 0; i < limit; i++) {
    await benchmark_uuid_v4();
  }
  console.timeEnd("int");

  console.time("uuid");
  for (let i = 0; i < limit; i++) {
    await idIsUuid();
  }
  console.timeEnd("uuid");
}

async function benchmark_uuid_v4() {
  await prisma.idIsInt.create({
    data: {
      value: "insert",
    },
  });
}

async function idIsUuid() {
  await prisma.idIsUuid.create({
    data: {
      value: "insert",
    },
  });
}

async function insertBatchInt() {
  const data: { value: string }[] = [];
  for (let i = 0; i < 1000; i++) {
    v4(); // js実行時間を揃えるため
    data.push({ value: String(i) });
  }

  await prisma.idIsInt.createMany({
    data,
  });
}

async function insertBatchUuid() {
  const data: { value: string; id: string }[] = [];
  for (let i = 0; i < 1000; i++) {
    data.push({ value: String(i), id: v4() });
  }

  await prisma.idIsUuid.createMany({
    data,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
