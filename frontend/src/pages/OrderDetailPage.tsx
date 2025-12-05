import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Package,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    id: string;
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

export function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await api.get(`/orders/${id}`);
        setOrder(response.data);
      } catch (err) {
        console.error(err);
        setError('Não foi possível carregar os detalhes do pedido.');
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'PAID':
        return { label: 'Pago & Confirmado', color: 'text-emerald-400', icon: CheckCircle, bg: 'bg-emerald-500/10 border-emerald-500/20' };
      case 'PENDING':
        return { label: 'Aguardando Pagamento', color: 'text-yellow-400', icon: Clock, bg: 'bg-yellow-500/10 border-yellow-500/20' };
      case 'CANCELED':
        return { label: 'Cancelado', color: 'text-red-400', icon: XCircle, bg: 'bg-red-500/10 border-red-500/20' };
      default:
        return { label: status, color: 'text-slate-400', icon: Package, bg: 'bg-slate-700' };
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">Carregando pedido...</div>;

  if (error || !order) return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-4">
      <p>{error || 'Pedido não encontrado'}</p>
      <Link to="/profile" className="text-emerald-400 hover:underline">Voltar para o Perfil</Link>
    </div>
  );

  const statusInfo = getStatusInfo(order.status);
  const StatusIcon = statusInfo.icon;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        <Link to="/profile" className="inline-flex items-center text-slate-400 hover:text-emerald-400 mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Voltar para Meus Pedidos
        </Link>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">

          <div className="border-b border-slate-800 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-800/30">
            <div>
              <h1 className="text-xl font-bold text-slate-50 flex items-center gap-2">
                Pedido <span className="text-slate-400 font-mono text-base">#{order.id.slice(0, 8)}</span>
              </h1>
              <div className="text-sm text-slate-400 mt-1 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(order.createdAt)}
              </div>
            </div>

            <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${statusInfo.bg}`}>
              <StatusIcon className={`w-5 h-5 ${statusInfo.color}`} />
              <span className={`font-bold ${statusInfo.color}`}>{statusInfo.label}</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">

            <section>
              <h2 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
                <Package className="text-emerald-400 w-5 h-5" />
                Itens do Pedido
              </h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-slate-950/50 border border-slate-800/50">
                    <div className="w-20 h-20 bg-slate-900 rounded-lg border border-slate-800 p-2 flex items-center justify-center shrink-0">
                      <img
                        src={item.product.imageUrl || 'https://placehold.co/100?text=Prod'}
                        alt={item.product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-slate-200 line-clamp-1">{item.product.name}</h3>
                        <p className="text-sm text-slate-400 mt-1">Quantidade: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-500">Unitário: {formatMoney(item.price)}</p>
                        <p className="font-bold text-emerald-400 text-lg">
                          {formatMoney(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-800">

              <section>
                <h2 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
                  <MapPin className="text-emerald-400 w-5 h-5" />
                  Endereço de Entrega
                </h2>
                <div className="bg-slate-950/30 p-4 rounded-xl border border-slate-800 text-slate-300 text-sm leading-relaxed">
                  {order.shippingAddress}
                </div>
              </section>

              <section className="bg-slate-950/50 p-6 rounded-xl border border-slate-800 flex flex-col justify-center">
                <div className="space-y-3">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span>{formatMoney(order.total)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Frete</span>
                    <span className="text-emerald-400 font-bold">Grátis</span>
                  </div>
                  <div className="h-px bg-slate-800 my-2"></div>
                  <div className="flex justify-between text-xl font-bold text-slate-50">
                    <span>Total Pago</span>
                    <span>{formatMoney(order.total)}</span>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
