import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ConditionBadge from "@/components/shop/ConditionBadge";
import AddToCartButton from "@/components/shop/AddToCartButton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const WHATSAPP_NUMBER = "234XXXXXXXXXX"; // replace with owner's number

function buildWhatsAppLink(name, price) {
  const msg = encodeURIComponent(
    `Hello KESHUB 👋\n\nI'm interested in:\n*${name}*\nPrice: ₦${price.toLocaleString()}\n\nIs this still available?` 
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

export default async function ProductDetailPage({ params }) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!product) notFound();

  const specs = [
    product.storage && ["Storage", product.storage],
    product.ram && ["RAM", product.ram],
    product.color && ["Color", product.color],
    product.network && ["Network", product.network],
    product.simStatus && ["SIM", product.simStatus === "UNLOCKED" ? "SIM Unlocked" : "SIM Locked"],
    product.batteryHealth && ["Battery", product.batteryHealth],
    product.processor && ["Processor", product.processor],
    product.screenSize && ["Screen", product.screenSize],
    product.storageType && ["Storage Type", product.storageType],
    product.os && ["OS", product.os],
    product.graphics && ["Graphics", product.graphics],
    product.laptopBattery && ["Battery", product.laptopBattery],
  ].filter(Boolean);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 mb-6 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
      >
        <ArrowLeft size={16} />
        Back to shop
      </Link>
      <div className="grid md:grid-cols-2 gap-10">

        {/* Image Gallery */}
        <div>
          <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-3">
            <img src={product.images?.[0] || "/placeholder.jpg"} alt={product.name}
              className="w-full h-full object-cover" />
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-2">
              {product.images.slice(1).map((img, i) => (
                <div key={i} className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <p className="text-sm text-gray-400 uppercase tracking-wide mb-1">{product.brand}</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>

          <div className="flex items-center gap-3 mb-4">
            <ConditionBadge condition={product.condition} />
            <span className={`text-sm font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>

          <div className="mb-6">
            <span className="text-3xl font-bold text-gray-900">
              ₦{product.price.toLocaleString("en-NG")}
            </span>
            {product.comparePrice && (
              <span className="ml-3 text-lg text-gray-400 line-through">
                ₦{product.comparePrice.toLocaleString("en-NG")}
              </span>
            )}
          </div>

          {/* Specs Table */}
          {specs.length > 0 && (
            <div className="mb-6 border border-gray-100 rounded-xl overflow-hidden">
              {specs.map(([label, value]) => (
                <div key={label} className="flex border-b border-gray-100 last:border-0">
                  <span className="w-32 px-4 py-2.5 text-sm text-gray-500 bg-gray-50 shrink-0">{label}</span>
                  <span className="px-4 py-2.5 text-sm text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            <AddToCartButton productId={product.id} disabled={product.stock === 0} />
            <a
              href={buildWhatsAppLink(product.name, product.price)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition"
            >
              <span>💬</span> Order via WhatsApp
            </a>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h2 className="font-semibold text-gray-900 mb-2">Description</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
