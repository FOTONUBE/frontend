export interface OrdersStats {
  totalOrders: number;
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
  cancelledCount: number;
  delivery: {
    pending: number;
    in_progress: number;
    delivered: number;
  };
  income: {
    approved: number; // sumatoria de órdenes aprobadas
    pending: number; // sumatoria de órdenes pendientes de pago
    total: number; // opcional: suma de ambos
  };
}

export interface AlbumsStats {
  totalAlbums: number;
  activeAlbums?: number;
  albumsWithOrders: number;
}

export interface UsersStats {
  totalUsers: number;
  photographers: number;
  buyers: number;
}

export interface AdminDashboardStats {
  orders: OrdersStats;
  albums: AlbumsStats;
  users: UsersStats;
}
