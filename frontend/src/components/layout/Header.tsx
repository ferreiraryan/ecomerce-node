import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, Package, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export function Header() {
  const { user, signOut } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  const userInitials = user?.name
    ? user.name.charAt(0).toUpperCase()
    : 'U';

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-emerald-600 p-1.5 rounded-lg group-hover:bg-emerald-500 transition">
              <Package className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-slate-100 tracking-tight">
              Dev<span className="text-emerald-400">Store</span>
            </span>
          </Link>

          <div className="flex items-center gap-6">

            {user?.role === 'ADMIN' && (
              <Link
                to="/admin"
                className="text-slate-400 hover:text-emerald-400 text-sm font-medium flex items-center gap-1 transition-colors"
              >
                <ShieldCheck className="w-4 h-4" />
                Painel
              </Link>
            )}

            <Link to="/cart" className="relative text-slate-400 hover:text-emerald-400 transition-colors group">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-slate-900 group-hover:scale-110 transition-transform">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-4 pl-6 border-l border-slate-800">
                <Link to="/profile" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 font-bold group-hover:border-emerald-500 transition-colors">
                    {userInitials}
                  </div>
                  <div className="hidden md:block text-sm">
                    <p className="text-slate-200 font-medium group-hover:text-emerald-400 transition-colors">
                      {user.name?.split(' ')[0]}
                    </p>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-slate-500 hover:text-red-400 transition-colors"
                  title="Sair"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4 pl-6 border-l border-slate-800">
                <Link to="/login" className="text-slate-300 hover:text-white font-medium text-sm transition-colors">
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-emerald-900/20"
                >
                  Criar Conta
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
