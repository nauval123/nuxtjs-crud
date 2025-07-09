import prisma from "~/lib/prisma";
import { getServerSession } from "#auth";
import { CashdataFormat } from "~/types/cashDataFormat";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  console.log("ini data season");
  console.log(session);
  if (!session || !session.user) {
    throw createError({ statusCode: 401, statusMessage: "Unauthenticated" });
  }
  const userId = (session.user as any).id;

  try {
    const cashes = await prisma.cash.findMany({
      where: {
        userId: userId,
      },
      include: {
        type: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formatData: CashdataFormat[] = cashes.map((cash) => {
      return {
        id: cash.id.toString(),
        title: cash.title,
        detail: cash.detail ?? "",
        amount: cash.amount,
        currency: cash.currency,
        createdAt: cash.createdAt,
        updatedAt: cash.updatedAt,
      };
    });

    return formatData;
  } catch (error) {
    console.error("error API:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Gagal mengambil data.",
    });
  }
});
