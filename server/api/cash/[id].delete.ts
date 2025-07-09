import { getServerSession } from "#auth";
import { Prisma } from "~/generated/prisma";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const cashId = getRouterParam(event, "id");

  const session = await getServerSession(event);
  if (!session) {
    throw createError({ statusCode: 401, statusMessage: "Unauthenticated" });
  }

  const userId = (session.user as any).id;
  console.log("ini data yang akan dihapus" + JSON.stringify(cashId));
  try {
    if (!cashId) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Cash ID Dibutuhkan!",
      });
    }

    await prisma.cash.delete({
      where: {
        id: Number(cashId),
        userId: userId,
      },
    });
    return { statusCode: 200, message: "Data berhasil dihapus" };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw createError({
          statusCode: 404,
          statusMessage: "Not Found",
          message: "Data tidak ditemukan atau Anda tidak memiliki akses.",
        });
      }
    }

    throw createError({
      statusCode: 500,
      statusMessage: "internal server error",
      message: "gagal menghaspu data!",
    });
  }
});
