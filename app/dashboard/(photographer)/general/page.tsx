"use client";

import { OrderStatusBadges } from "@/components/dashboard/General/OrderStatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { useAlbumStore } from "@/store/useAlbumStore";
import { usePhotographerStore } from "@/store/usePhotographerStore";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function PhotographerDashboard() {
  const { loading, error, orders, loadPhotographerOrders } =
    usePhotographerStore();
  const { albums, getAlbums } = useAlbumStore();

  useEffect(() => {
    if (orders.length === 0) loadPhotographerOrders();
    if (albums.length === 0) getAlbums();
  }, [orders.length, albums.length, loadPhotographerOrders, getAlbums]);

  if (loading)
    return (
      <p className="p-6 text-center text-gray-500">Cargando dashboard...</p>
    );
  if (error) return <p className="p-6 text-center text-red-600">{error}</p>;

  const totalOrders = orders?.length ?? 0;
  const totalAlbums = albums?.length ?? 0;
  const totalSales =
    orders?.reduce((acc, o) => acc + Number(o.total ?? 0), 0) ?? 0;

  const pendingOrders =
    orders?.filter((o) => o.deliveryStatus === "pending").length ?? 0;
  const inProgressOrders =
    orders?.filter((o) => o.deliveryStatus === "in_progress").length ?? 0;
  const deliveredOrders =
    orders?.filter((o) => o.deliveryStatus === "delivered").length ?? 0;

  const totalSalesFormatted = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(totalSales);

  // Datos gráficos
  const ordersByStatusOptions = {
    chart: {
      id: "orders-status",
      toolbar: { show: false },
      animations: { enabled: true },
    },
    plotOptions: {
      bar: { distributed: true, borderRadius: 6, horizontal: false },
    },
    dataLabels: { enabled: false },
    xaxis: { categories: ["Pendientes", "En Progreso", "Entregados"] },
    colors: ["#FACC15", "#22D3EE", "#22C55E"],
  };
  const ordersByStatusSeries = [
    {
      name: "Pedidos",
      data: [pendingOrders, inProgressOrders, deliveredOrders],
    },
  ];

  const albumSalesOptions = {
    chart: {
      id: "album-sales",
      toolbar: { show: false },
      animations: { enabled: true },
    },
    plotOptions: { bar: { borderRadius: 6 } },
    dataLabels: { enabled: false },
    xaxis: { categories: albums.map((a) => a.name) },
    colors: ["#3B82F6"],
  };
  const albumSalesSeries = [
    {
      name: "Pedidos",
      data: albums.map(
        (a) => orders.filter((o) => o.album?.id === a.id).length
      ),
    },
  ];

  return (
    <div className="px-6 space-y-8">
      <h1 className="text-3xl font-bold">Panel principal</h1>

      {/* Métricas rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="text-center p-4 hover:shadow-xl transition-shadow duration-300">
          <CardContent>
            <p className="text-sm text-gray-500">Álbumes</p>
            <p className="text-xl font-bold">{totalAlbums}</p>
          </CardContent>
        </Card>
        <Card className="text-center p-4 hover:shadow-xl transition-shadow duration-300">
          <CardContent>
            <p className="text-sm text-gray-500">Pedidos</p>
            <p className="text-xl font-bold">{totalOrders}</p>
          </CardContent>
        </Card>
        <Card className="text-center p-4 hover:shadow-xl transition-shadow duration-300">
          <CardContent>
            <p className="text-sm text-gray-500">Ventas Totales</p>
            <p className="text-xl font-bold">{totalSalesFormatted}</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4 hover:shadow-xl transition-shadow duration-300">
          <Card className="p-4 hover:shadow-xl transition-shadow duration-300">
            <CardContent>
              <h2 className="text-lg font-semibold mb-2">Pedidos por estado</h2>
              <Chart
                options={{
                  chart: { type: "donut" },
                  labels: ["Pendientes", "En Progreso", "Entregados"],
                  colors: ["#FACC15", "#22D3EE", "#22C55E"],
                  legend: { position: "bottom" },
                  dataLabels: { enabled: true },
                }}
                series={[pendingOrders, inProgressOrders, deliveredOrders]}
                type="donut"
                height={300}
              />
            </CardContent>
          </Card>
        </Card>

        <Card className="p-4 hover:shadow-xl transition-shadow duration-300">
          <CardContent>
            <h2 className="text-lg font-semibold mb-2">Pedidos por álbum</h2>
            <Chart
              options={{
                chart: { type: "donut" },
                labels: albums.map((a) => a.name),
                colors: ["#3B82F6", "#22D3EE", "#F472B6", "#F59E0B", "#10B981"],
                legend: { position: "bottom" },
                dataLabels: { enabled: true },
                tooltip: {
                  y: { formatter: (val: number) => `${val} pedidos` },
                },
              }}
              series={albums.map(
                (a) => orders.filter((o) => o.album?.id === a.id).length
              )}
              type="donut"
              height={320}
            />
          </CardContent>
        </Card>
      </div>

      {/* Últimos Álbumes */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Últimos Álbumes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {albums.slice(-4).map((album) => (
            <Link key={album.id} href={`/dashboard/albums/${album.id}`}>
              <Card className="hover:shadow-2xl transition-all cursor-pointer border rounded overflow-hidden">
                <CardContent>
                  <p className="font-semibold truncate">{album.name}</p>
                  <p className="text-sm text-gray-500">
                    Fotos: {album.photos.length}
                  </p>
                  <p className="text-sm text-gray-500">
                    Pedidos:{" "}
                    {orders.filter((o) => o.album?.id === album.id).length}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Últimos Pedidos */}
      {/*   <div>
        <h2 className="text-lg font-semibold mb-4">Últimos Pedidos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.slice(-6).map((order) => (
            <OrderStatusBadges
              key={order.id}
              id={order.id}
              albumTitle={order.album?.title ?? "Sin título"}
              deliveryStatus={order.deliveryStatus}
              paymentStatus={order.status}
              total={order.total}
              itemsCount={order.items.length}
              createdAt={order.createdAt}
            />
          ))}
        </div>
      </div> */}
    </div>
  );
}
