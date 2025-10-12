import api from './api';
import { User } from '../types/User';

type RegisterDTO = Pick<User, 'name' | 'email' | 'password'>;

export const registerUser = async (data: RegisterDTO) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};


