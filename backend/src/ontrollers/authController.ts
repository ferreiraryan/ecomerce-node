import { Request, Response } from 'express';
import { createUserService } from '../services/userService';

export async function registerUser(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const user = await createUserService({ name, email, password });

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    return res.status(201).json(userResponse);
  } catch (error: any) {
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      return res.status(409).json({ message: 'Este e-mail já está em uso.' });
    }
    console.error(error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}
