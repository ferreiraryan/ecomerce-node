import { Link } from "react-router-dom";
import type { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/product/${product.id}`}
      key={product.id}
      className="border rounded-lg p-3 bg-slate-900 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="aspect-video bg-slate-100 rounded mb-2 overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.imageUrl}
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
  );
}

export default ProductCard;
