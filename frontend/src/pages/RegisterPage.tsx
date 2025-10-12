import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { registerUser } from '../services/authService';

import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.');
      setIsLoading(false);
      return;
    }

    try {
      await registerUser({ name, email, password });

      alert('Cadastro realizado com sucesso! Você será redirecionado para o login.');
      navigate('/login');

    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message);
      } else {
        setError('Ocorreu um erro inesperado. Tente novamente.');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <main className='bg-fuchsia-50 min-h-screen flex items-center justify-center'>
      <div className='bg-cyan-200 rounded-2xl p-8 w-full max-w-md shadow-lg'>
        <h1 className='text-2xl font-bold text-center text-gray-800 mb-6'>Registre-se:</h1>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <Input
            label="Nome"
            id="name"
            type="text"
            name="name"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Endereço de Email"
            id="email"
            type="email"
            name="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Senha"
            id="password"
            type="password"
            name="password"
            required
            autoComplete="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div>
            <Button type="submit">
              Registrar
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}


export default RegisterPage;
