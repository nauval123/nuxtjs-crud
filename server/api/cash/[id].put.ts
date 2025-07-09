import prisma from "~/lib/prisma";
import { getServerSession } from "#auth";
import { CashdataFormat } from "~/types/cashDataFormat";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const session = await getServerSession(event);
  if (!session) {
    throw createError({ statusCode: 401, statusMessage: "Unauthenticated" });
  }

  const userId = (session.user as any).id;

  const body = await readBody(event);
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "id cash tidak ditemukan!",
    });
  }

  const cashId = parseInt(id, 10);
  try {
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
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: error ?? "Gagal memperbarui data.",
    });
  }
});
