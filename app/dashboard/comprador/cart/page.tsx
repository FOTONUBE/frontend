import { CartSummary, CartTable } from "@/components/dashboard/Cart";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Tu carrito</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Tabla de productos */}
          <div className="flex-1 ">
            <CartTable />
          </div>

          {/* Resumen del carrito */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-sm sticky top-0">
              <CartSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
