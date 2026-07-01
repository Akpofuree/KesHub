import Link from "next/link";
import ConditionBadge from "./ConditionBadge";
import ProductCardActions from "./ProductCardActions";

function formatPrice(amount) {
  return "₦" + amount.toLocaleString("en-NG");
}

export default function ProductCard({ product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow overflow-hidden relative">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">📦</div>
        )}
        
        <ProductCardActions productId={product.id} />

        {product.isSecondhand && product.condition && (
          <div className="absolute top-2 left-2">
            <ConditionBadge condition={product.condition} />
          </div>
        )}
        {!product.isSecondhand && (
          <div className="absolute top-2 left-2">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-800">Brand New</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{product.brand}</p>
        <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 line-clamp-2">{product.name}</h3>

        {/* Key spec summary */}
        <p className="text-xs text-gray-500 mb-3">
          {[product.storage, product.ram, product.color, product.simStatus === "UNLOCKED" ? "SIM Unlocked" : product.simStatus === "LOCKED" ? "SIM Locked" : null]
            .filter(Boolean)
            .join(" · ")}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-gray-900">{formatPrice(product.price)}</span>
          {product.comparePrice && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(product.comparePrice)}</span>
          )}
        </div>

        {/* Stock */}
        {product.stock === 0 && (
          <p className="text-xs text-red-500 mt-1">Out of stock</p>
        )}
      </div>
    </Link>
  );
}
