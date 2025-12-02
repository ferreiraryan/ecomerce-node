import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string | null;
  description?: string | null;
};

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/products')
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Carregando produtos...</div>;
  }

  if (!products.length) {
    return <div>Nenhum produto encontrado.</div>;
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {products.map((product) => (
        <Link
          to={`/product/${product.id}`}
          key={product.id}
          className="border rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="aspect-video bg-slate-100 rounded mb-2 overflow-hidden">
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
          <h2 className="font-semibold text-sm mb-1 line-clamp-2">
            {product.name}
          </h2>
          <p className="font-bold text-green-700">
            {product.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default HomePage;

