import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const insertForgetPasswordRecord = async (
  id: string,
  isactive: boolean,
  userId: number
) => {
  const res = prisma.forgotPasswordRequests.create({
    data: {
      id,
      isactive,
      userId,
    },
  });
  return res;
};

export const resetPassword = async (uuid: string, newPassword: string) => {
  await prisma.$transaction(async (tx) => {
    const resetEntry = await tx.forgotPasswordRequests.findFirst({
      where: {
        id: uuid,
        isactive: true,
      },
    });
    if (resetEntry?.userId === null || !resetEntry) {
      throw new Error("Invalid or expired reset request.");
    }
    await tx.user.update({
      where: {
        id: resetEntry.userId,
      },
      data: {
        password: newPassword,
      },
    });

    await tx.forgotPasswordRequests.update({
      where: {
        id: uuid,
      },
      data: {
        isactive: false,
      },
    });
  });
};
