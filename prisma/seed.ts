// file: prisma/seed.ts

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// Inisialisasi Prisma Client
const prisma = new PrismaClient();

async function main() {
  console.log("seeding...");

  const password = "jangandicuri123";
  const passwordua = "123123";
  const hashedPassworddua = await bcrypt.hash(passwordua, 10);
  const hashedPassword = await bcrypt.hash(password, 10);

  const cashinType = await prisma.typecash.upsert({
    where: { type: "cash-in" },
    update: {},
    create: {
      type: "cash-in",
    },
  });

  const cashoutType = await prisma.typecash.upsert({
    where: { type: "cash-out" },
    update: {},
    create: {
      type: "cash-out",
    },
  });

  console.log(`CashType: ${cashinType.type}, ${cashoutType.type}`);

  const userSeed = await prisma.users.upsert({
    where: { email: "cupacup@gmail" },
    update: {},
    create: {
      email: "cupacup@gmail",
      username: "Admin Utama",
      password: hashedPassword,
    },
  });

  const user2Seed = await prisma.users.upsert({
    where: { email: "cup@gmail" },
    update: {},
    create: {
      email: "cup@gmail",
      username: "test 2",
      password: hashedPassworddua,
    },
  });

  const cashInSeeder = await prisma.cash.upsert({
    where: {
      // @ts-ignore
      title_userId: {
        title: "Gaji Pertama",
        userId: userSeed.id,
      },
    },
    update: {},
    create: {
      title: "Gaji Pertama",
      detail: "Gaji bulan Juli",
      amount: 50000,
      currency: "idr",
      typeId: cashinType.id,
      userId: userSeed.id,
    },
  });

  console.log(`User default berhasil dibuat/ditemukan: ${userSeed.email}`);
  console.log("Proses seeding selesai.");
}

// Jalankan fungsi main dan pastikan koneksi prisma ditutup
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
