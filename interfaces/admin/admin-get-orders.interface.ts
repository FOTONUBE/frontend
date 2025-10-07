export interface AdminOrderItem {
  id: string;
  photo: {
    id: string;
    url: string;
    title?: string;
  };
  quantity: number;
  price: number;
}

export interface AdminOrder {
  id: string;
  buyer: {
    id: string;
    email: string;
    name?: string;
  };
  album: {
    id: string;
    title: string;
    photographer: {
      id: string;
      name?: string;
      email: string;
    };
  };
  items: AdminOrderItem[];
  total: number;
  status: "pending" | "approved" | "rejected" | "cancelled";
  deliveryStatus: "pending" | "in_progress" | "delivered";
  createdAt: string;
}

export interface AdminOrdersResponse {
  orders: AdminOrder[];
  total: number;
  page: number;
  limit: number;
}
