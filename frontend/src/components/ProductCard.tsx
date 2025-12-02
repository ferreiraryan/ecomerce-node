import type { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300 group">
      <div className="h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-bold text-slate-100 truncate">
          {product.name}
        </h2>

        <p className="text-slate-400 text-sm line-clamp-2 min-h-[40px]">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-700/50">
          <span className="font-bold text-xl text-emerald-400">
            {/* Formatação correta para Reais */}
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
          </span>

          <button className="bg-emerald-500 text-slate-950 font-semibold px-4 py-2 rounded-lg hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20">
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
