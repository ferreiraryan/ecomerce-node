import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string | null;
  description?: string | null;
};

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (!product) return <div>Produto não encontrado.</div>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="aspect-video bg-slate-100 rounded overflow-hidden mb-3">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-slate-500">
              sem imagem
            </div>
          )}
        </div>
      </div>

      <div>
        <h1 className="text-xl font-semibold mb-2">{product.name}</h1>
        <p className="text-2xl font-bold text-green-700 mb-4">
          {product.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
        {product.description && (
          <p className="text-sm text-slate-700 mb-4">{product.description}</p>
        )}
        <button className="bg-slate-900 text-white px-4 py-2 rounded">
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}

export default ProductPage;

