import { Request, Response } from 'express';
import { createUserService, loginUserService } from '../services/userService';



export async function getProfile(req: Request, res: Response) {
  // @ts-ignore
  const userId = req.user.id;


  return res.status(200).json({
    message: `Acesso autorizado! Você está na sua rota de perfil.`,
    userId: userId
  });
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    const { user, token } = await loginUserService({ email, password });

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return res.status(200).json({ user: userResponse, token });
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
}

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
