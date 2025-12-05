import { type FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn({ email, password });
      navigate('/');
    } catch (err: any) {
      setError(
        err?.response?.data?.message || 'Erro ao fazer login. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-700 rounded-2xl shadow-lg p-8">

        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-slate-50 mb-2">Bem-vindo de volta</h1>
          <p className="text-sm text-slate-400">Insira suas credenciais para entrar.</p>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-900/40 border border-red-500 px-3 py-2 text-sm text-red-200 text-center">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all placeholder-slate-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all placeholder-slate-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-slate-950 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-lg shadow-emerald-500/20"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          Não tem conta?{' '}
          <Link to="/register" className="font-medium text-emerald-400 hover:text-emerald-300 hover:underline transition-colors">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
