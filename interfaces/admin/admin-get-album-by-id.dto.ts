export interface AdminAlbumByIdDto {
  id: string;
  title: string;
  description: string;
  eventDate: Date;
  prices: { size: string; price: number }[];
  clientEmail: string;
  clientPhoneNumber: string;
  portada?: string;
  totalOrders: number;
  orders: {
    id: string;
    status:
      | "pending"
      | "approved"
      | "authorized"
      | "in_process"
      | "in_mediation"
      | "rejected"
      | "cancelled"
      | "refunded"
      | "charged_back";
    deliveryStatus: "pending" | "in_progress" | "delivered";
    total: number;
    createdAt: Date;
  }[];
}
