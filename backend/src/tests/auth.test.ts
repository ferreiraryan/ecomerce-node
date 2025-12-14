import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app';
import prisma from '../config/prisma';
import bcrypt from 'bcryptjs';

vi.mock('../config/prisma', () => ({
  default: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn().mockResolvedValue('hashed_password_123'),
    compare: vi.fn(),
  },
}));

vi.mock('jsonwebtoken', () => ({
  default: {
    sign: vi.fn().mockReturnValue('mock_jwt_token'),
  },
}));

describe('Fluxo de Autenticação', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Deve registar um novo utilizador com sucesso', async () => {
    (prisma.user.findUnique as any).mockResolvedValue(null);

    (prisma.user.create as any).mockResolvedValue({
      id: 'user-123',
      name: 'Ryan',
      email: 'ryan@test.com',
      role: 'USER',
    });

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Ryan Teste',
        email: 'ryan@test.com',
        password: 'senhafutebol123'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe('ryan@test.com');
    expect(res.body).not.toHaveProperty('password');
  });

  it('Não deve permitir registar email duplicado', async () => {
    (prisma.user.findUnique as any).mockResolvedValue({ id: 'existing-id' });

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Ryan Clone',
        email: 'ryan@test.com',
        password: 'senha'
      });

    expect(res.status).toBeGreaterThanOrEqual(400);
  });

  it('Deve fazer login e retornar um Token', async () => {
    (prisma.user.findUnique as any).mockResolvedValue({
      id: 'user-123',
      email: 'ryan@test.com',
      password: 'hashed_password_no_banco', // Senha encriptada
      role: 'USER'
    });

    (bcrypt.compare as any).mockResolvedValue(true);

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'ryan@test.com',
        password: 'senha_correta'
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.token).toBe('mock_jwt_token');
  });

  it('Deve rejeitar login com senha incorreta', async () => {
    (prisma.user.findUnique as any).mockResolvedValue({
      id: 'user-123',
      password: 'hashed_password',
    });

    (bcrypt.compare as any).mockResolvedValue(false);

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'ryan@test.com',
        password: 'senha_errada'
      });

    expect(res.status).toBe(401);
  });
});
