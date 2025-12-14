import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import app from '../app';
import prisma from '../config/prisma';

vi.mock('../config/prisma', () => ({
  default: {
    category: {
      findMany: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe('Rotas de Categorias', () => {

  it('Deve listar todas as categorias com sucesso', async () => {
    const mockCategories = [
      { id: '1', name: 'Eletrónica', createdAt: new Date() },
      { id: '2', name: 'Livros', createdAt: new Date() }
    ];

    (prisma.category.findMany as any).mockResolvedValue(mockCategories);

    const response = await request(app).get('/api/categories');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].name).toBe('Eletrónica');
  });


  it('Deve falhar ao criar categoria sem token (Acesso Negado)', async () => {
    const response = await request(app)
      .post('/api/categories')
      .send({ name: 'Nova Categoria' });


    expect(response.status).toBe(401);
  });


  it('Deve falhar ao apagar categoria sem token', async () => {
    const response = await request(app).delete('/api/categories/123');
    expect(response.status).toBe(401);
  });

});
