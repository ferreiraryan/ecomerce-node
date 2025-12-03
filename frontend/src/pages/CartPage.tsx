import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, total, removeItem, addItem, decreaseItem } = useCart();

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-slate-900 p-6 rounded-full mb-4 shadow-lg shadow-emerald-900/10">
          <ShoppingBag className="w-12 h-12 text-slate-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-100 mb-2">Seu carrinho está vazio</h1>
        <p className="text-slate-400 mb-8 max-w-md">
          Parece que você ainda não adicionou nenhum produto. Explore nossa loja e encontre as melhores ofertas!
        </p>
        <Link
          to="/"
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg shadow-emerald-500/20"
        >
          Ir às compras
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold">Meu Carrinho</h1>
          <span className="text-slate-500 text-sm ml-auto font-medium">
            {items.length} {items.length === 1 ? 'item' : 'itens'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const product = item.product;
              const imgUrl = (product as any).imageUrl || product.imageUrl;

              return (
                <div
                  key={product.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center sm:items-stretch shadow-sm hover:border-slate-700 transition-colors"
                >
                  <div className="w-24 h-24 bg-white rounded-xl overflow-hidden flex-shrink-0 p-2">
                    {imgUrl ? (
                      <img src={imgUrl} alt={product.name} className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 text-xs">Sem foto</div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between text-center sm:text-left">
                    <div>
                      <h3 className="font-bold text-lg text-slate-100">{product.name}</h3>
                      <p className="text-sm text-slate-400 line-clamp-1">{product.description}</p>
                    </div>
                    <div className="mt-2 text-emerald-400 font-bold">
                      {formatMoney(product.price)}
                    </div>
                  </div>

                  {/* Controles (Quantidade e Remover) */}
                  <div className="flex flex-col items-center sm:items-end justify-between gap-4">
                    <button
                      onClick={() => removeItem(product.id)}
                      className="text-slate-500 hover:text-red-400 transition-colors p-1"
                      title="Remover item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="flex items-center bg-slate-950 rounded-lg border border-slate-800 p-1">
                      <button
                        onClick={() => decreaseItem(product.id)}
                        className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                      <button
                        onClick={() => addItem(product)}
                        className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sticky top-24 shadow-xl">
              <h2 className="text-xl font-bold mb-6 border-b border-slate-800 pb-4">Resumo do Pedido</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>{formatMoney(total)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Frete</span>
                  <span className="text-emerald-400 text-sm font-medium">Grátis</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold text-white border-t border-slate-800 pt-4 mb-8">
                <span>Total</span>
                <span>{formatMoney(total)}</span>
              </div>

              <button
                onClick={() => alert("Checkout ainda não implementado!")}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-900/20 active:scale-95"
              >
                Finalizar Compra
              </button>

              <Link to="/" className="block text-center text-slate-500 hover:text-slate-300 text-sm mt-4">
                Continuar comprando
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
