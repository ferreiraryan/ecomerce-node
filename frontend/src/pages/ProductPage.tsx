import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, ShoppingCart, Trash2 } from "lucide-react";

import { api } from "../services/api";
import type { Product } from "../types/Product";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function ProductPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const { addItem, removeItem, items } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const isInCart = items.some((item) => item.product.id === product?.id);

  async function loadProduct() {
    try {
      setLoading(true);
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.error("Erro ao carregar produto:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProduct();
  }, [id]);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">Carregando...</div>;
  }

  if (!product) return null;

  const productImage = (product as any).imageUrl || product.imageUrl;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        <Link to="/" className="inline-flex items-center text-slate-400 hover:text-emerald-400 mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Voltar para a loja
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-2xl flex items-center justify-center aspect-square overflow-hidden">
            {productImage ? (
              <img src={productImage} alt={product.name} className="w-full h-full object-contain" />
            ) : (
              <span className="text-slate-600">Sem imagem</span>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-4">{product.name}</h1>
            <div className="text-3xl font-bold text-emerald-400 mb-6">{formatPrice(product.price)}</div>
            <p className="text-slate-300 leading-relaxed text-lg mb-8">{product.description}</p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-800">
              {user ? (
                isInCart ? (
                  <button
                    onClick={() => removeItem(product.id)}
                    className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-900/20 active:scale-95"
                  >
                    <Trash2 className="w-5 h-5" />
                    Remover do Carrinho
                  </button>
                ) : (
                  <button
                    onClick={() => addItem(product)}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/20 active:scale-95"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Adicionar ao Carrinho
                  </button>
                )
              ) : (
                <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
                  <Link to="/login" className="text-emerald-400 font-bold hover:underline">
                    Entre na sua conta
                  </Link>
                  <span className="text-slate-400"> para comprar.</span>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
