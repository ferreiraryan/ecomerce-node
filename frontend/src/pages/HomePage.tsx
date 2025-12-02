import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Product } from '../types/Product';
import ProductCard from '../components/ProductCard';



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
    <div className="grid gap-4 grid-cols-1 p-3 sm:grid-cols-2 md:grid-cols-3">
      {products.map((product) => (
        ProductCard({ product })
      ))}
    </div>
  );
}

export default HomePage;

