import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(3, 'O nome precisa ter no mínimo 3 caracteres.'),
    email: z.string().email('Formato de e-mail inválido.'),
    password: z.string().min(6, 'A senha precisa ter no mínimo 6 caracteres.'),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Formato de e-mail inválido.'),
    password: z.string().min(1, 'A senha é obrigatória.'),
  }),
});
