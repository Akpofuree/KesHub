import { prisma } from "@/lib/prisma";
import {
  CircleDollarSignIcon,
  ShoppingBasketIcon,
  PackageIcon,
  AlertTriangleIcon,
} from "lucide-react";
import { auth, currentUser } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminDashboard() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="text-center py-20 text-slate-500">
        Please sign in to access this page.
      </div>
    );
  }

  const clerkUser = await currentUser();
  const isOrgAdmin = clerkUser?.organizationMemberships?.some(
    (org) => org.role === "org:admin" || org.role === "org:owner",
  );
  const hasAdminRole = clerkUser?.unsafeMetadata?.role === "ADMIN";

  if (!isOrgAdmin && !hasAdminRole) {
    return (
      <div className="text-center py-20 text-slate-500">
        <p className="text-lg mb-4">
          You don't have permission to access this page.
        </p>
        <a href="/" className="text-emerald-600 hover:underline">
          Return to homepage
        </a>
      </div>
    );
  }

  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "?";

  const [total, outOfStock, featured, recent] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { stock: 0 } }),
    prisma.product.count({ where: { isFeatured: true } }),
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const dashboardCardsData = [
    { title: "Total Products", value: total, icon: ShoppingBasketIcon },
    { title: "Out of Stock", value: outOfStock, icon: AlertTriangleIcon },
    { title: "Featured Products", value: featured, icon: PackageIcon },
    {
      title: "Total Revenue",
      value: currency + "0",
      icon: CircleDollarSignIcon,
    },
  ];

  return (
    <div className="text-slate-500">
      <h1 className="text-2xl">
        Admin <span className="text-slate-800 font-medium">Dashboard</span>
      </h1>

      {/* Cards */}
      <div className="flex flex-wrap gap-5 my-10 mt-4">
        {dashboardCardsData.map((card, index) => (
          <div
            key={index}
            className="flex items-center gap-10 border border-slate-200 p-3 px-6 rounded-lg"
          >
            <div className="flex flex-col gap-3 text-xs">
              <p>{card.title}</p>
              <b className="text-2xl font-medium text-slate-700">
                {card.value}
              </b>
            </div>
            <card.icon
              size={50}
              className="w-11 h-11 p-2.5 text-slate-400 bg-slate-100 rounded-full"
            />
          </div>
        ))}
      </div>

      {/* Recent Products */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Recent Products</h2>
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Category</th>
                <th className="text-left p-3">Price</th>
                <th className="text-left p-3">Stock</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((product) => (
                <tr key={product.id} className="border-t border-slate-100">
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3">
                    {currency}
                    {product.price.toLocaleString("en-NG")}
                  </td>
                  <td className="p-3">{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
