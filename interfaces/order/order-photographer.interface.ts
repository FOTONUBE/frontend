export type DeliveryStatus = "pending" | "in_progress" | "delivered";

export type OrderStatus =
  | "pending"
  | "approved"
  | "authorized"
  | "in_process"
  | "in_mediation"
  | "rejected"
  | "cancelled"
  | "refunded"
  | "charged_back";

export interface PhotographerOrderItem {
  id: string;
  size: string;
  quantity: number;
  unitPrice: string | number;
  subtotal: string | number;
  photoUrl: string;
  photoWebUrl: string;
  photoThumbnailUrl: string;
  originalPhotoId: string;
}

export interface PhotographerOrder {
  id: string;
  createdAt: string;
  status: OrderStatus; // 💸 estado de pago
  deliveryStatus: DeliveryStatus; // 📦 estado de entrega
  total: number;

  buyer: {
    id: string;
    name: string;
    email: string;
  };

  album: {
    id: string;
    title: string;
    createdAt: string;
    photographerId: string;
  };

  items: PhotographerOrderItem[];
}
