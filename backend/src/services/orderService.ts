import prisma from '../config/prisma';

interface CartItemDTO {
  productId: string;
  quantity: number;
}

export const createOrderService = async (userId: string, items: CartItemDTO[]) => {
  const productIds = items.map(item => item.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  const productMap = new Map(products.map(p => [p.id, p]));

  let total = 0;
  const orderItemsData = items.map(item => {
    const product = productMap.get(item.productId);
    if (!product) {
      throw new Error(`Produto com ID ${item.productId} não encontrado.`);
    }
    total += product.price * item.quantity;
    return {
      productId: item.productId,
      quantity: item.quantity,
      price: product.price,
    };
  });

  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        userId,
        total,
      },
    });

    await tx.orderItem.createMany({
      data: orderItemsData.map(item => ({
        ...item,
        orderId: newOrder.id,
      })),
    });

    return newOrder;
  });

  return order;
};

export const getOrdersByUserService = (userId: string) => {
  return prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
};
