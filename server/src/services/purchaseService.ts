import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface OrderTypes {
  paymentId: string;
  orderId: string;
  status: string;
  userId: number;
}

/*----------------------Get last transaction for verification--------------------- */

export const fetchFirstRecentTransaction = async (id: number) => {
  const response: any = await prisma.order.findFirst({
    where: {
      userId: id,
      status: "SUCCESSFUL",
    },
    orderBy: { createdAt: "desc" },
    select: { status: true },
  });
  return response.status;
};
/*----------------------createOrder with database--------------------- */
export const createOrder = async (orderData: OrderTypes) => {
  const response = await prisma.order.create({
    data: {
      paymentId: orderData.paymentId,
      orderId: orderData.orderId,
      status: orderData.status,
      userId: orderData.userId,
    },
  });
  return response;
};
/*----------------------update order with payment id--------------------- */

export const updateOrder = async (
  orderId: string,
  paymentId: string,
  status: string
) => {
  const response = await prisma.order.update({
    where: {
      orderId,
    },
    data: {
      paymentId,
      status,
    },
  });
  return response;
};
