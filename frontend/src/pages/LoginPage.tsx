import React, { useState } from 'react';

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
          <div>
            <label htmlFor="email" className='block text-sm font-medium text-gray-700'>
              Endereço de email:
            </label>
            <input type="email" id='email' name='email' required autoComplete='email' value={email} onChange={(e) => setEmail(e.target.value)} className='bg-fuchsia-50 mt-1 block rounded-lg font-light text-sm shadow-lg w-full px-3 py-2 border border-gray-200 focus:outline-none focus:ring-blue-300 focus:border-blue-500' />
          </div>
          <div>
            <label htmlFor="password" className='block text-sm font-medium text-gray-700'>
              Senha:
            </label>
            <input type="password" id='password' name='password' required autoComplete='password' value={password} onChange={(e) => setPassword(e.target.value)} className='bg-fuchsia-50 mt-1 mb-3 block rounded-lg font-light text-sm shadow-lg w-full px-3 py-2 border border-gray-200 focus:outline-none focus:ring-blue-300 focus:border-blue-500' />
          </div>
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
