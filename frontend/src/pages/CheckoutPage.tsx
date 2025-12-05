import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from "../context/CartContext";
import { api } from "../services/api";
import { MapPin, ShoppingBag, ArrowLeft } from 'lucide-react'; // Adicionei ícones para combinar

export function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    street: '',
    number: '',
    city: '',
    state: '',
    zip: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const fullAddress = `${address.street}, ${address.number} - ${address.city}/${address.state} (${address.zip})`;

  const handleFinishOrder = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const formattedItems = items.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      }));

      await api.post('/orders', {
        items: formattedItems,
        shippingAddress: fullAddress
      });

      alert('Pedido realizado com sucesso!');
      clearCart();
      navigate('/profile');

    } catch (error) {
      console.error(error);
      alert('Erro ao finalizar compra. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Estado Vazio (Dark Mode)
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100">
        <ShoppingBag className="w-16 h-16 text-slate-700 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Seu carrinho está vazio.</h2>
        <button
          onClick={() => navigate('/')}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold transition shadow-lg shadow-emerald-900/20 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para a Loja
        </button>
      </div>
    );
  }

  // Estilos comuns para inputs no tema dark
  const inputClassName = "w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-500 transition-all";
  const labelClassName = "block text-sm font-medium text-slate-300 mb-2";

  return (
    <main className="bg-slate-950 min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-slate-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

        {/* LADO ESQUERDO: ENDEREÇO */}
        <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-800">
          <h2 className="text-2xl font-bold mb-8 text-slate-50 flex items-center gap-3">
            <MapPin className="text-emerald-400" />
            Endereço de Entrega
          </h2>

          <form id="checkout-form" onSubmit={handleFinishOrder} className="space-y-5">
            <div>
              <label className={labelClassName}>Rua / Avenida</label>
              <input
                type="text"
                required
                placeholder="Ex: Av. Paulista"
                className={inputClassName}
                value={address.street}
                onChange={e => setAddress({ ...address, street: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className={labelClassName}>Número</label>
                <input
                  type="text"
                  required
                  placeholder="123"
                  className={inputClassName}
                  value={address.number}
                  onChange={e => setAddress({ ...address, number: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClassName}>CEP</label>
                <input
                  type="text"
                  required
                  placeholder="00000-000"
                  className={inputClassName}
                  value={address.zip}
                  onChange={e => setAddress({ ...address, zip: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className={labelClassName}>Cidade</label>
                <input
                  type="text"
                  required
                  className={inputClassName}
                  value={address.city}
                  onChange={e => setAddress({ ...address, city: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClassName}>Estado</label>
                <input
                  type="text"
                  required
                  maxLength={2}
                  placeholder="UF"
                  className={`${inputClassName} uppercase`}
                  value={address.state}
                  onChange={e => setAddress({ ...address, state: e.target.value })}
                />
              </div>
            </div>
          </form>
        </div>

        {/* LADO DIREITO: RESUMO E PAGAMENTO */}
        <div className="h-fit space-y-6">
          <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-800">
            <h2 className="text-2xl font-bold mb-6 text-slate-50 flex items-center gap-3">
              <ShoppingBag className="text-emerald-400" />
              Resumo do Pedido
            </h2>

            <div className="space-y-4 mb-8 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between items-center text-sm border-b border-slate-800 pb-4 last:border-0">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-slate-200 text-lg">{item.product.name}</span>
                    <span className="text-slate-400">Qtd: {item.quantity}</span>
                  </div>
                  <span className="font-bold text-emerald-400 text-lg">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-6 space-y-3">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Frete</span>
                <span className="text-emerald-400 font-bold">Grátis</span>
              </div>
              <div className="flex justify-between text-2xl font-bold text-slate-50 pt-4">
                <span>Total</span>
                <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              disabled={isProcessing}
              className={`w-full mt-8 py-4 px-6 rounded-xl text-white font-bold text-lg transition-all shadow-lg active:scale-95
                ${isProcessing
                  ? 'bg-slate-700 cursor-not-allowed text-slate-400'
                  : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/20'}`}
            >
              {isProcessing ? 'Processando...' : 'Finalizar Compra'}
            </button>

            <p className="text-xs text-slate-500 text-center mt-4">
              Ambiente de teste. Nenhuma cobrança real será feita.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
