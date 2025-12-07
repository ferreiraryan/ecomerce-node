import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import {
  User,
  Package,
  Calendar,
  LogOut,
  ShoppingBag,
  ChevronRight,
  MapPin,
  Truck,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    name: string;
    imageUrl?: string;
  };
}

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  shippingAddress: string;
  items: OrderItem[];
}

export function ProfilePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchOrders() {
    try {
      const response = await api.get('/orders/myorders');
      setOrders(response.data);
    } catch (error) {
      console.error('Erro ao buscar pedidos', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'PENDING':
        return { label: 'Aguardando Pagamento', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20', icon: Clock };
      case 'PAID':
        return { label: 'Pago (Preparando)', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', icon: CheckCircle };
      case 'SHIPPED':
        return { label: 'Enviado / Em Trânsito', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', icon: Truck };
      case 'DELIVERED':
        return { label: 'Entregue', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20', icon: Package };
      case 'CANCELED':
        return { label: 'Cancelado', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', icon: XCircle };
      default:
        return { label: status, color: 'text-slate-400', bg: 'bg-slate-700', icon: Package };
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">Carregando perfil...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-50 flex items-center gap-3">
            <User className="text-emerald-400 w-8 h-8" />
            Meu Perfil
          </h1>
          {/* Botão para atualizar a lista manualmente */}
          <button onClick={fetchOrders} className="text-sm text-emerald-400 hover:underline">
            Atualizar Lista
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-1">
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl sticky top-24">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-4 border-2 border-emerald-500/30 text-emerald-400 text-3xl font-bold">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <h2 className="text-xl font-bold text-slate-50">{user?.name || 'Usuário'}</h2>
                <p className="text-slate-400 text-sm">{user?.email}</p>
                <div className="mt-2 px-3 py-1 bg-emerald-500/10 rounded-full text-xs font-medium text-emerald-400 border border-emerald-500/20">
                  Membro Verificado
                </div>
              </div>

              <div className="border-t border-slate-800 pt-6 space-y-3">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-900/20 hover:text-red-400 text-slate-300 py-3 rounded-xl transition-all group"
                >
                  <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Sair da Conta
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-slate-200 flex items-center gap-2 mb-4">
              <Package className="text-emerald-400" />
              Histórico de Pedidos
            </h3>

            {orders.length === 0 ? (
              <div className="bg-slate-900 rounded-2xl p-10 border border-slate-800 text-center flex flex-col items-center">
                <ShoppingBag className="w-16 h-16 text-slate-700 mb-4" />
                <h3 className="text-lg font-bold text-slate-200">Nenhum pedido ainda</h3>
                <p className="text-slate-400 mb-6">Você ainda não fez compras conosco.</p>
                <button
                  onClick={() => navigate('/')}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-bold transition"
                >
                  Começar a Comprar
                </button>
              </div>
            ) : (
              orders.map((order) => {
                const statusInfo = getStatusConfig(order.status);
                const StatusIcon = statusInfo.icon;

                return (
                  <div key={order.id} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-lg transition-all hover:border-slate-700">

                    <div className="bg-slate-800/50 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800">
                      <div>
                        <div className="text-sm text-slate-400 mb-1 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(order.createdAt)}
                        </div>
                        <div className="text-xs text-slate-500 font-mono">
                          ID: {order.id.slice(0, 8)}...
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${statusInfo.bg} ${statusInfo.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusInfo.label}
                        </span>
                        <span className="text-xl font-bold text-slate-50">
                          {formatMoney(order.total)}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-6">
                      <div className="mb-4 flex items-start gap-2 text-sm text-slate-400 bg-slate-950/50 p-3 rounded-lg border border-slate-800/50">
                        <MapPin className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />
                        <span className="line-clamp-1">{order.shippingAddress}</span>
                      </div>

                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-slate-950 rounded-lg border border-slate-800 p-1 flex items-center justify-center shrink-0">
                              <img
                                src={item.product.imageUrl || 'https://placehold.co/100?text=Prod'}
                                alt={item.product.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-slate-200 line-clamp-1">{item.product.name}</h4>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-sm text-slate-400">Qtd: {item.quantity}</span>
                                <span className="text-sm font-medium text-emerald-400">
                                  {formatMoney(item.price)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-950/30 p-3 flex justify-center border-t border-slate-800 hover:bg-slate-800/30 transition-colors cursor-pointer">
                      <Link
                        to={`/order/${order.id}`}
                        className="text-sm text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors w-full justify-center"
                      >
                        Ver detalhes completos <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
