// types/order.ts
export interface Photo {
  id: string;
  url: string;
}

export interface OrderItem {
  id: string;
  size: string;
  quantity: number;
  unitPrice: string | number; // a veces viene como string, a veces como number
  subtotal: string | number;
  photo: Photo;
}

export interface AlbumPrice {
  size: string;
  price: number;
}

export interface Album {
  id: string;
  title: string;
  prices: AlbumPrice[];
  priceDigital: number;
  priceSchoolSports?: number;
  eventDate: string;
  description: string;
}

export type OrderStatus = "approved" | "pending" | "rejected";

export interface Order {
  id: string;
  album: Album;
  items: OrderItem[];
  total: string | number;
  status: OrderStatus;
  createdAt: string;
}
