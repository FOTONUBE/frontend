"use client";

import { useEffect } from "react";
import { usePhotographerStore } from "@/store/usePhotographerStore";
import { Card, CardContent } from "@/components/ui/card";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function PhotographerDashboard() {
  const { loading, error, orders, loadPhotographerOrders } =
    usePhotographerStore();

  useEffect(() => {
    if (orders.length === 0) loadPhotographerOrders();
  }, [orders.length, loadPhotographerOrders]);

  if (loading)
    return (
      <p className="p-6 text-center text-gray-500">Cargando dashboard...</p>
    );
  if (error) return <p className="p-6 text-center text-red-600">{error}</p>;

  // 🔹 Métricas rápidas
  const totalOrders = orders?.length ?? 0;
  const totalAlbums =
    orders?.reduce((acc, o) => (o.album ? acc + 1 : acc), 0) ?? 0; // si querés contar álbumes
  const totalSales =
    orders?.reduce((acc, o) => acc + Number(o.total ?? 0), 0) ?? 0;

  const pendingOrders = orders.filter(
    (o) => o.deliveryStatus === "pending"
  ).length;
  const inProgressOrders = orders.filter(
    (o) => o.deliveryStatus === "in_progress"
  ).length;
  const deliveredOrders = orders.filter(
    (o) => o.deliveryStatus === "delivered"
  ).length;

  const totalSalesFormatted = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(totalSales);

  // 🔹 Últimos pedidos (6) ordenados por fecha descendente
  const lastOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 6);

  // 🔹 Gráfico de torta pedidos por estado
  const ordersByStatusSeries = [
    pendingOrders,
    inProgressOrders,
    deliveredOrders,
  ];

  const ordersByStatusOptions: ApexOptions = {
    chart: { type: "donut", toolbar: { show: false } },
    labels: ["Pendiente", "En Progreso", "Entregado"],
    colors: ["#FACC15", "#22D3EE", "#22C55E"],
    legend: { position: "bottom" },
    dataLabels: { enabled: true },
  };

  return (
    <div className="px-6 space-y-8">
      <h1 className="text-3xl font-bold text-cyan-600">Panel principal</h1>

      {/* 🔹 Métricas rápidas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="text-center p-4 hover:shadow-xl transition-shadow duration-300">
          <CardContent>
            <p className="text-sm text-gray-500">Álbumes</p>
            <p className="text-xl font-bold">{totalAlbums}</p>
          </CardContent>
        </Card>
        <Card className="text-center p-4 hover:shadow-xl transition-shadow duration-300">
          <CardContent>
            <p className="text-sm text-gray-500">Total Pedidos</p>
            <p className="text-xl font-bold">{totalOrders}</p>
          </CardContent>
        </Card>
        <Card className="text-center p-4 hover:shadow-xl transition-shadow duration-300">
          <CardContent>
            <p className="text-sm text-gray-500">Pendientes</p>
            <p className="text-xl font-bold text-yellow-500">{pendingOrders}</p>
          </CardContent>
        </Card>
        <Card className="text-center p-4 hover:shadow-xl transition-shadow duration-300">
          <CardContent>
            <p className="text-sm text-gray-500">En Progreso</p>
            <p className="text-xl font-bold text-blue-500">
              {inProgressOrders}
            </p>
          </CardContent>
        </Card>
        <Card className="text-center p-4 hover:shadow-xl transition-shadow duration-300">
          <CardContent>
            <p className="text-sm text-gray-500">Entregados</p>
            <p className="text-xl font-bold text-green-500">
              {deliveredOrders}
            </p>
          </CardContent>
        </Card>
        <Card className="text-center p-4 hover:shadow-xl transition-shadow duration-300">
          <CardContent>
            <p className="text-sm text-gray-500">Ventas Totales</p>
            <p className="text-xl font-bold">{totalSalesFormatted}</p>
          </CardContent>
        </Card>
      </div>

      {/* 🔹 Gráfico de torta */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <Card className="p-4 hover:shadow-xl transition-shadow duration-300">
          <CardContent>
            <h2 className="text-lg font-semibold mb-2">Pedidos por estado</h2>
            <Chart
              options={ordersByStatusOptions}
              series={ordersByStatusSeries}
              type="donut"
              height={350}
            />
          </CardContent>
        </Card>
      </div>

      {/* 🔹 Últimos pedidos */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Últimos Pedidos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lastOrders.map((order) => {
            const statusLabel =
              order.deliveryStatus === "pending"
                ? "Pendiente"
                : order.deliveryStatus === "in_progress"
                ? "En Progreso"
                : "Entregado";

            return (
              <Link
                key={order.id}
                href={`/dashboard/fotografo/orders/${order.id}`}
              >
                <Card className="hover:shadow-2xl transition-all cursor-pointer border rounded overflow-hidden">
                  <CardContent>
                    <div className="flex items-center gap-3">
                      {order.items[0]?.photoUrl ? (
                        <img
                          src={order.items[0].photoUrl}
                          alt="Foto del pedido"
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                          Sin foto
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-semibold truncate">
                          {order.album?.title ?? "Sin título"}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          Total: ${order.total}
                        </p>
                        <span
                          className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                            order.deliveryStatus === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : order.deliveryStatus === "in_progress"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {statusLabel}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
