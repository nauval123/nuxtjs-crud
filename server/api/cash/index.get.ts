import prisma from "~/lib/prisma";
import { getServerSession } from "#auth";
import { CashdataFormat } from "~/types/cashDataFormat";

export default defineEventHandler(async (event) => {
  const { userIdData } = event.context.user;

  const session = await getServerSession(event);
  if (!session) {
    throw createError({ statusCode: 401, statusMessage: "Unauthenticated" });
  }
  try {
    const cashes = await prisma.cash.findMany({
      where: {
        // userId: 1,
        userId: userIdData,
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

    return {
      status: "success",
      data: formatData,
    };
  } catch (error) {}
});
