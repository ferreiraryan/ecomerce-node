import { Link } from "react-router-dom";
import type { Product } from "../types/Product";

interface ProductWithStock extends Product {
  produ?: number;
}

interface ProductCardProps {
  product: ProductWithStock;
}

function ProductCard({ product }: ProductCardProps) {
  const hasStock = (product.stock ?? 0) > 0;

  return (
    <Link
      to={`/product/${product.id}`}
      key={product.id}
      className={`
        border rounded-lg p-3 transition-all block relative group
        ${hasStock
          ? 'bg-slate-900 border-slate-800 shadow-sm hover:shadow-md hover:border-slate-700'
          : 'bg-slate-900/50 border-slate-800 opacity-50 grayscale cursor-default'
        }
      `}
    >
      {!hasStock && (
        <span className="absolute top-2 right-2 z-10 bg-slate-800 text-slate-200 text-[10px] font-bold px-2 py-1 rounded border border-slate-600">
          ESGOTADO
        </span>
      )}

      <div className="aspect-video bg-slate-800 rounded mb-2 overflow-hidden relative">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-slate-500">
            sem imagem
          </div>
        )}
      </div>

      <h2 className="font-semibold text-sm mb-1 line-clamp-2 text-slate-100">
        {product.name}
      </h2>

      <p className={`font-bold ${hasStock ? 'text-emerald-400' : 'text-slate-500'}`}>
        {product.price.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </p>
    </Link>
  );
}

export default ProductCard;
