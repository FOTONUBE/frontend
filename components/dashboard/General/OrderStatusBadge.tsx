"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import * as LucideIcons from "lucide-react";
import { format } from "date-fns";

type OrderCardProps = {
  id: string;
  albumTitle: string;
  deliveryStatus: string;
  paymentStatus: string;
  total: number;
  itemsCount: number;
  createdAt: string;
};

export function OrderStatusBadges({
  id,
  albumTitle,
  deliveryStatus,
  paymentStatus,
  total,
  itemsCount,
  createdAt,
}: OrderCardProps) {
  const deliveryMap: Record<
    string,
    { label: string; color: string; icon: React.ReactNode }
  > = {
    pending: {
      label: "Pendiente",
      color: "bg-yellow-100 text-yellow-700",
      icon: <LucideIcons.Truck />,
    },
    in_progress: {
      label: "En progreso",
      color: "bg-blue-100 text-blue-700",
      icon: <LucideIcons.Loader2 />,
    },
    delivered: {
      label: "Entregado",
      color: "bg-green-100 text-green-700",
      icon: <LucideIcons.CheckCircle />,
    },
  };

  const paymentMap: Record<
    string,
    { label: string; color: string; icon: React.ReactNode }
  > = {
    pending: {
      label: "Pendiente",
      color: "bg-yellow-100 text-yellow-700",
      icon: <LucideIcons.CreditCard />,
    },
    approved: {
      label: "Aprobado",
      color: "bg-green-100 text-green-700",
      icon: <LucideIcons.Check />,
    },
    rejected: {
      label: "Rechazado",
      color: "bg-red-100 text-red-700",
      icon: <LucideIcons.X />,
    },
    cancelled: {
      label: "Cancelado",
      color: "bg-gray-200 text-gray-800",
      icon: <LucideIcons.XCircle />,
    },
    refunded: {
      label: "Reembolsado",
      color: "bg-purple-100 text-purple-700",
      icon: <LucideIcons.RefreshCw />,
    },
  };

  const delivery = deliveryMap[deliveryStatus] ?? {
    label: "Desconocido",
    color: "bg-gray-100 text-gray-700",
    icon: <LucideIcons.AlertCircle />,
  };
  const payment = paymentMap[paymentStatus] ?? {
    label: "Desconocido",
    color: "bg-gray-100 text-gray-700",
    icon: <LucideIcons.AlertCircle />,
  };

  const totalFormatted = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(total);

  return (
    <Link href={`/dashboard/orders/${id}`}>
      <div className="cursor-pointer border rounded-lg p-4 hover:shadow-xl transition-all bg-white flex flex-col gap-2">
        {/* Header: ID y fecha */}
        <div className="flex justify-between items-center text-xs text-gray-400 font-mono">
          <span>Pedido #{id.slice(0, 6)}</span>
          <span>{format(new Date(createdAt), "dd/MM/yyyy")}</span>
        </div>

        {/* Álbum y items */}
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg truncate">{albumTitle}</h3>
          <span className="text-sm text-gray-500">{itemsCount} ítem(s)</span>
        </div>

        {/* Badges */}
        <div className="flex gap-2 flex-wrap mt-2">
          <Badge className={`flex items-center gap-1 ${delivery.color}`}>
            {delivery.icon} {delivery.label} (Entrega)
          </Badge>
          <Badge className={`flex items-center gap-1 ${payment.color}`}>
            {payment.icon} {payment.label} (Pago)
          </Badge>
        </div>

        {/* Total */}
        <p className="mt-2 font-medium text-cyan-600">
          Total: {totalFormatted}
        </p>
      </div>
    </Link>
  );
}
