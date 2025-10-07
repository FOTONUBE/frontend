import { CartSummary, CartTable } from "@/components/dashboard/Cart";

export default function CartPage() {
  return (
    <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-2">Tu carrito</h1>
        <CartTable />
      </div>
      <div className="w-full lg:w-1/3">
        <div className="sticky top-6">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
