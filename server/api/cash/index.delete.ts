import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { userId } = event.context.user;
  const cashId = parseInt(event.context.params!.id, 10);

  try {
    await prisma.cash.delete({
      where: {
        id: cashId,
        userId: userId,
      },
    });
    return { statusCode: 200, message: "Data berhasil dihapus" };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "failed to delete",
    });
  }
});
