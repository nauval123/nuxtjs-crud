import prisma from "~/lib/prisma";
import { CashdataFormat } from "~/types/cashDataFormat";

export default defineEventHandler(async (event) => {
  const { userId } = event.context.user;
  const cashId = parseInt(event.context.params!.id, 10);
  const body = await readBody(event);

  const cashToUpdate = await prisma.cash.findFirst({
    where: { id: cashId, userId },
  });

  if (!cashToUpdate) {
    throw createError({
      statusCode: 404,
      statusMessage: "Data tidak ditemukan atau Anda tidak punya akses",
    });
  }

  const updatedCash = await prisma.cash.update({
    where: {
      id: cashId,
    },
    data: {
      title: body.title,
      detail: body.detail,
      amount: body.amount,
      typeId: body.typeId,
    },
  });

  const data: CashdataFormat = {
    id: updatedCash.id.toString(),
    title: updatedCash.title,
    detail: updatedCash.detail ?? "",
    amount: updatedCash.amount,
    currency: updatedCash.currency,
    createdAt: updatedCash.createdAt,
    updatedAt: updatedCash.updatedAt,
  };

  return data;
});
