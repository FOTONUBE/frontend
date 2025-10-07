"use client";

import { useEffect } from "react";
import {
  Loader2,
  Users,
  Album,
  ShoppingCart,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useAdminDashboardStore } from "@/store/admin/useAdminDashboardStore";

type MetricCardProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: number | string;
  iconColor?: string;
};

const MetricCard = ({
  icon: Icon,
  label,
  value,
  iconColor = "text-cyan-600",
}: MetricCardProps) => (
  <div className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition">
    <div
      className={`p-3 rounded-lg ${iconColor} bg-opacity-10 flex items-center justify-center`}
    >
      <Icon className={`w-6 h-6 ${iconColor}`} />
    </div>
    <div className="flex flex-col">
      <span className="text-gray-500 text-sm font-medium uppercase">
        {label}
      </span>
      <span className="text-xl font-bold text-gray-900 mt-1">{value}</span>
    </div>
  </div>
);

type SectionProps = {
  title: string;
  mainCard: MetricCardProps;
  subCards: MetricCardProps[];
};

const Section = ({ title, mainCard, subCards }: SectionProps) => (
  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
    <MetricCard {...mainCard} />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {subCards.map((card, i) => (
        <MetricCard key={i} {...card} />
      ))}
    </div>
  </div>
);

export default function AdminDashboardPage() {
  const { stats, loading, fetchStats } = useAdminDashboardStore();

  useEffect(() => {
    if (!stats) {
      fetchStats();
    }
  }, [fetchStats, stats]);

  if (loading || !stats)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-12 h-12 text-cyan-600" />
      </div>
    );

  const COLORS = {
    primary: "text-cyan-600",
    yellow: "text-yellow-500",
    blue: "text-blue-500",
    green: "text-green-600",
    red: "text-red-600",
    purple: "text-purple-500",
    indigo: "text-indigo-500",
  };

  return (
    <div className="min-h-screen space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Panel de Administración
      </h1>

      <div className="grid grid-cols-1 gap-6">
        {/* Ingresos */}
        <Section
          title="Ingresos"
          mainCard={{
            icon: DollarSign,
            label: "Ingresos Totales",
            value: `$${stats.orders.income.total}`,
            iconColor: COLORS.primary,
          }}
          subCards={[
            {
              icon: DollarSign,
              label: "Pendiente",
              value: `$${stats.orders.income.pending}`,
              iconColor: COLORS.yellow,
            },
            {
              icon: DollarSign,
              label: "Aprobado",
              value: `$${stats.orders.income.approved}`,
              iconColor: COLORS.green,
            },
            {
              icon: DollarSign,
              label: "Cancelado",
              value: "$0",
              iconColor: COLORS.red,
            },
          ]}
        />

        {/* Órdenes */}
        <Section
          title="Órdenes"
          mainCard={{
            icon: ShoppingCart,
            label: "Total Órdenes",
            value: stats.orders.totalOrders,
            iconColor: COLORS.primary,
          }}
          subCards={[
            {
              icon: Clock,
              label: "Pendientes",
              value: stats.orders.pendingCount,
              iconColor: COLORS.yellow,
            },
            {
              icon: CheckCircle,
              label: "Aprobadas",
              value: stats.orders.approvedCount,
              iconColor: COLORS.green,
            },
            {
              icon: XCircle,
              label: "Canceladas/Rechazadas",
              value: stats.orders.rejectedCount + stats.orders.cancelledCount,
              iconColor: COLORS.red,
            },
          ]}
        />

        {/* Usuarios y Álbumes */}
        <Section
          title="Usuarios y Álbumes"
          mainCard={{
            icon: Users,
            label: "Usuarios Totales",
            value: stats.users.totalUsers,
            iconColor: COLORS.indigo,
          }}
          subCards={[
            {
              icon: Users,
              label: "Fotógrafos",
              value: stats.users.photographers,
              iconColor: COLORS.blue,
            },
            {
              icon: Users,
              label: "Compradores",
              value: stats.users.buyers,
              iconColor: COLORS.green,
            },
            {
              icon: Album,
              label: "Álbumes con Órdenes",
              value: stats.albums.albumsWithOrders,
              iconColor: COLORS.purple,
            },
          ]}
        />
      </div>
    </div>
  );
}
