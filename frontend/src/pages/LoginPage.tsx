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
        <form action="">
          <div>
            <label htmlFor="email" className='block text-sm font-medium text-gray-700'>
              Endereço de email:
            </label>
            <input type="email" id='email' name='email' required autoComplete='email' value={email} onChange={(e) => setEmail(e.target.value)} className='bg-fuchsia-50 rounded-lg shadow-lg w-full px-3 border border-gray-200 focus:outline-none focus:ring-blue-300 focus:border-blue-500' />
          </div>
          <div>
            <button type='submit'>
              Entrar
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}


export default LoginPage;
