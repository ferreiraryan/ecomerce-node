import prisma from '../config/prisma';
import bcrypt from 'bcryptjs';
import { User } from '@prisma/client';

type CreateUserDTO = Pick<User, 'name' | 'email' | 'password'>;

export async function createUserService({ name, email, password }: CreateUserDTO) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return user;
}
