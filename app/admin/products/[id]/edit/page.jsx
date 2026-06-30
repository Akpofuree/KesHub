import { prisma } from "@/lib/prisma";
import EditProductClient from "./EditProductClient";

export default async function EditProductPage({ params }) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  return <EditProductClient product={product} />;
}
