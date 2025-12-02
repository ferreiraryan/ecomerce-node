import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';

function App() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600">
        <div className="animate-pulse">Carregando aplicação...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="font-bold text-xl tracking-tight hover:text-blue-400 transition-colors">
            Ecomerce-Node
          </Link>

          <nav className="flex gap-4 items-center text-sm font-medium">
            <Link to="/cart" className="hover:text-blue-300 transition-colors">
              Carrinho
            </Link>

            {user ? (
              <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
                <Link to="/profile" className="hover:text-blue-300 transition-colors">
                  Olá, {user.name.split(' ')[0]}
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-md text-xs transition-all"
                >
                  Sair
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
                <Link to="/login" className="hover:text-blue-300 transition-colors">
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs transition-colors shadow-sm"
                >
                  Criar conta
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product/:id" element={<ProductPage />} />



        </Routes>
      </main>
    </div>
  );
}

export default App;
