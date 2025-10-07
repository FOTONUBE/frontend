export interface AdminPhotographerByIdResponse {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  isActive: boolean;

  totalOrders: number;
  pendingOrders: number;
  approvedOrders: number;
  rejectedOrders: number;

  albums: {
    id: string;
    title: string;
    description: string;
    totalOrders: number;
    coverUrl?: string;
  }[];
}
