import React, { useState } from 'react';
import { Input } from '../components/common/Input'

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    console.log('Enviando dados para a API:', { email, password });

    await new Promise(resolve => setTimeout(resolve, 1500));

    alert('Login bem-sucedido! (Simulação)');
    setIsLoading(false);
  };

  return (
    <main className='bg-fuchsia-50 min-h-screen flex items-center justify-center'>
      <div className='bg-cyan-200 rounded-2xl p-8 w-full max-w-md shadow-lg'>
        <h1 className='text-2xl font-bold text-center text-gray-800 mb-6'>Login:</h1>
        <form onSubmit={handleSubmit} className='space-y-6'>
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
            <button type='submit' className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}


export default LoginPage;
