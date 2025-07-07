import { getServerSession } from "#auth";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError({ statusCode: 401, statusMessage: "Unauthenticated" });
  }

  const { userId } = event.context.user;

  const body = await readBody(event);
  const { title, detail, amount, typeId } = body;

  if (!title || !amount || !typeId) {
    throw createError({ statusCode: 400, statusMessage: "Data tidak lengkap" });
  }

  const newCash = await prisma.cash.create({
    data: {
      title,
      detail,
      amount,
      typeId,
      userId,
    },
  });

  return newCash;
});
