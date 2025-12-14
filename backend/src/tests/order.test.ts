import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as orderService from '../services/orderService';
import prisma from '../config/prisma';

vi.mock('../config/prisma', () => ({
  default: {
    $transaction: vi.fn((callback) => callback(prisma)), // Simula a transação
    product: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    order: {
      create: vi.fn(),
    },
  },
}));

describe('Serviço de Pedidos (OrderService)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Deve calcular o total corretamente e criar o pedido', async () => {
    const userId = 'user-123';
    const shippingAddress = 'Rua Teste, 123';
    const items = [
      { productId: 'prod-1', quantity: 2 }, // 2 * 100 = 200
      { productId: 'prod-2', quantity: 1 }  // 1 * 50 = 50
    ];                                      // Total esperado = 250

    const mockProduct1 = { id: 'prod-1', name: 'Prod 1', price: 100, stock: 10 };
    const mockProduct2 = { id: 'prod-2', name: 'Prod 2', price: 50, stock: 5 };

    (prisma.product.findUnique as any).mockImplementation(({ where }: any) => {
      if (where.id === 'prod-1') return Promise.resolve(mockProduct1);
      if (where.id === 'prod-2') return Promise.resolve(mockProduct2);
      return Promise.resolve(null);
    });

    (prisma.order.create as any).mockResolvedValue({
      id: 'order-123',
      total: 250,
      userId,
      items: []
    });

    const order = await orderService.createOrderService({ userId, items, shippingAddress });


    expect(order).toHaveProperty('id');

    expect(prisma.order.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        total: 250
      })
    }));

    expect(prisma.product.update).toHaveBeenCalledTimes(2);

    expect(prisma.product.update).toHaveBeenCalledWith(expect.objectContaining({
      where: { id: 'prod-1' },
      data: { stock: { decrement: 2 } }
    }));
  });

  it('Deve lançar erro se o produto não existir', async () => {
    (prisma.product.findUnique as any).mockResolvedValue(null);

    await expect(orderService.createOrderService({
      userId: 'user-123',
      shippingAddress: 'Rua X',
      items: [{ productId: 'ghost-id', quantity: 1 }]
    })).rejects.toThrow(/não encontrado/); // Espera que o erro contenha essa frase
  });

  it('Deve lançar erro se não houver estoque suficiente', async () => {
    (prisma.product.findUnique as any).mockResolvedValue({
      id: 'prod-1',
      name: 'Prod Sem Estoque',
      price: 100,
      stock: 1
    });

    await expect(orderService.createOrderService({
      userId: 'user-123',
      shippingAddress: 'Rua X',
      items: [{ productId: 'prod-1', quantity: 2 }]
    })).rejects.toThrow(/sem estoque suficiente/);
  });

});
