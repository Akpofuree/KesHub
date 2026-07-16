import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Store,
  ShoppingBag,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";

export default async function PublicStorePage({ params }) {
  const { username } = await params;

  const store = await prisma.store.findUnique({
    where: { username },
    include: {
      products: {
        where: { isActive: true },
        orderBy: { createdAt: "desc" },
      },
      user: true,
    },
  });

  if (!store) {
    notFound();
  }

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <Image
                src={store.logo}
                alt={store.name}
                width={96}
                height={96}
                className="h-20 w-20 rounded-2xl border border-slate-200 object-contain p-2"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
                  Verified Store
                </p>
                <h1 className="mt-2 text-3xl font-bold text-slate-900">
                  {store.name}
                </h1>
                <p className="mt-1 text-slate-500">@{store.username}</p>
                <p className="mt-4 max-w-2xl text-slate-600">
                  {store.description}
                </p>
              </div>
            </div>

            <div className="grid gap-3 text-sm text-slate-600 md:min-w-[280px]">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-emerald-600" />
                <span>{store.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-emerald-600" />
                <span>{store.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-emerald-600" />
                <span>{store.contact}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              <ShoppingBag size={16} />
              Browse shop
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <Store size={16} />
              Back home
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            Available products
          </h2>

          {store.products.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-16 text-center text-slate-500">
              No products are live yet.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {store.products.map((product, index) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="aspect-square bg-slate-50">
                    <Image
                      src={product.images?.[0]}
                      alt={product.name}
                      width={500}
                      height={500}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      {product.brand}
                    </p>
                    <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-slate-900">
                      {product.name}
                    </h3>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900">
                        {process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$"}
                        {product.price.toLocaleString()}
                      </span>
                      <ArrowRight size={16} className="text-emerald-600" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
