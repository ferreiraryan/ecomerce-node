import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Truck } from 'lucide-react';

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  user: { name: string; email: string };
  items: { id: string; quantity: number; product: { name: string } }[];
}

export function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await api.get('/orders/admin/all');
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id: string, newStatus: string) {
    try {
      await api.patch(`/orders/admin/${id}/status`, { status: newStatus });
      setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    } catch (error) {
      alert('Erro ao atualizar status');
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'SHIPPED': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'DELIVERED': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-slate-700 text-slate-300';
    }
  };

  if (loading) return <div className="p-8 text-slate-400">Carregando pedidos...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-50 mb-8 flex items-center gap-2">
          <Truck className="text-emerald-400" />
          Gerenciamento de Pedidos
        </h1>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 text-slate-400 text-sm uppercase">
                <th className="p-4 border-b border-slate-800">ID / Data</th>
                <th className="p-4 border-b border-slate-800">Cliente</th>
                <th className="p-4 border-b border-slate-800">Resumo</th>
                <th className="p-4 border-b border-slate-800">Total</th>
                <th className="p-4 border-b border-slate-800">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-800/30 transition">
                  <td className="p-4">
                    <span className="font-mono text-xs text-slate-500 block mb-1">#{order.id.slice(0, 8)}</span>
                    <span className="text-sm text-slate-300">
                      {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-slate-200">{order.user.name}</div>
                    <div className="text-xs text-slate-500">{order.user.email}</div>
                  </td>
                  <td className="p-4 text-sm text-slate-400">
                    {order.items.length} itens: <br />
                    <span className="text-slate-500 italic">
                      {order.items[0].product.name}
                      {order.items.length > 1 && ` +${order.items.length - 1} outros`}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-emerald-400">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.total)}
                  </td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`appearance-none cursor-pointer text-xs font-bold px-3 py-1 rounded-full border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${getStatusColor(order.status)}`}
                    >
                      <option value="PAID" className="bg-slate-900 text-yellow-400">Pago (Preparando)</option>
                      <option value="SHIPPED" className="bg-slate-900 text-blue-400">Enviado</option>
                      <option value="DELIVERED" className="bg-slate-900 text-emerald-400">Entregue</option>
                      <option value="CANCELED" className="bg-slate-900 text-red-400">Cancelado</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
