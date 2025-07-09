import { getServerSession } from "#auth";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  console.log("kepanggil post dongs");
  const session = await getServerSession(event);
  if (!session) {
    throw createError({ statusCode: 401, statusMessage: "Unauthenticated" });
  }

  const userId = (session.user as any).id;
  const typeId = 3;
  const currency = "idr";
  const body = await readBody(event);
  console.log("ini body");
  console.log(body);
  const { title, detail, amount } = body;
  if (!title || !amount) {
    throw createError({
      statusCode: 400,
      statusMessage: "bad data",
      message: "Data tidak lengkap",
    });
  }
  try {
    const newCash = await prisma.cash.create({
      data: {
        title,
        detail,
        amount,
        typeId,
        currency,
        userId,
      },
    });
    console.log("newcash");
    console.log(newCash);
    return {
      ...newCash,
      id: newCash.id.toString(),
      typeId: newCash.typeId.toString(),
      userId: newCash.userId.toString(),
    };
  } catch (error) {
    console.error("error API:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Gagal menambahkan data",
    });
  }
});
