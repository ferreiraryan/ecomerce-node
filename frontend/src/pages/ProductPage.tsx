import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Product } from "../types/Product";

// Ícones (se você não tiver o lucide-react instalado, pode remover ou trocar por texto/svg)
// npm install lucide-react
import { ArrowLeft, ShoppingCart } from "lucide-react";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

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

  // Função auxiliar para formatar preço
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // State de carregamento bonito
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400">
        <p>Produto não encontrado.</p>
        <Link to="/" className="text-emerald-500 hover:underline mt-4">Voltar para a loja</Link>
      </div>
    );
  }

  // Fallback para garantir que a imagem apareça independente do nome da propriedade no backend
  // O TypeScript pode reclamar se 'imageUrl' não estiver no type Product, mas o JS vai aceitar.
  const productImage = (product as any).imageUrl || product.imageUrl;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Botão Voltar */}
        <Link
          to="/"
          className="inline-flex items-center text-slate-400 hover:text-emerald-400 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Voltar para a loja
        </Link>

        {/* Layout de Duas Colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">

          {/* Coluna da Esquerda: Imagem */}
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-2xl flex items-center justify-center aspect-square overflow-hidden relative group">
            {productImage ? (
              <img
                src={productImage}
                alt={product.name}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="flex flex-col items-center text-slate-600">
                <span className="text-6xl mb-2">📷</span>
                <span className="text-sm">Sem imagem disponível</span>
              </div>
            )}
          </div>

          {/* Coluna da Direita: Detalhes */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-4">
              {product.name}
            </h1>

            <div className="text-3xl font-bold text-emerald-400 mb-6">
              {formatPrice(product.price)}
            </div>

            <div className="prose prose-invert prose-slate mb-8">
              <p className="text-slate-300 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* Ações */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-800">
              <button
                onClick={() => alert(`Adicionado ao carrinho: ${product.name}`)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/20 active:scale-95"
              >
                <ShoppingCart className="w-5 h-5" />
                Adicionar ao Carrinho
              </button>

              {/* Botão Secundário (Opcional, ex: Favoritar) */}
              {/* <button className="p-4 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 transition-colors">
                <Heart className="w-6 h-6" />
              </button> */}
            </div>

            {/* Selos de Confiança (Decorativo) */}
            <div className="mt-8 flex gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <span>🛡️</span> Compra Segura
              </div>
              <div className="flex items-center gap-1">
                <span>🚚</span> Frete Grátis
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductPage;
