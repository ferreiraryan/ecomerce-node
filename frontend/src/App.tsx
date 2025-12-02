import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
// import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
// import ProfilePage from './pages/ProfilePage';
// import CartPage from './pages/CartPage';

function App() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="font-bold text-lg">
            Ecomerce-Node
          </Link>

          <nav className="flex gap-4 items-center text-sm">
            <Link to="/cart">Carrinho</Link>

            {user ? (
              <>
                <Link to="/profile">Olá, {user.name}</Link>
                <button
                  onClick={logout}
                  className="border border-white/30 px-2 py-1 rounded text-xs"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Entrar</Link>
                <Link
                  to="/register"
                  className="bg-white text-slate-900 px-3 py-1 rounded text-xs font-medium"
                >
                  Criar conta
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

