// interfaces/admin/photographer.interface.ts
export interface AdminPhotographer {
  id: string;
  name: string;
  email: string;
  image: string | null;
  totalOrders: number;
  pendingOrders: number;
  approvedOrders: number;
}
