export interface AdminUsersResponse {
  id: string;
  email: string;
  role: string;
  name: string | null;
  image: string | null;
  phone: string | null;
  storageUsedMb: number;
  isActive: boolean;
  albums: Album[];
  orders: Order[];
  subscriptions: Subscription[];
  paymentAccounts: PaymentAccount[];
}

export interface Album {
  id: string;
  title: string;
  userEvent: string;
  passwordEventHash: string;
  prices: Price[];
  priceDigital: number;
  priceSchoolSports: number;
  eventDate: string;
  clientEmail: string;
  clientPhoneNumber: string;
  description: string;
  isActiveFolder: boolean;
  deletedAt: string | null;
  photographerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Price {
  size: string;
  price: number;
}

export interface Order {
  id: string;
  buyer: Buyer;
  album: Album;
  items: Item[];
  total: string;
  status: string;
  deliveryStatus: string;
  createdAt: string;
  updatedAt: string;
}

export interface Buyer {
  id: string;
  email: string;
  password: string;
  provider: string;
  role: string;
  name: string | null;
  image: string | null;
  phone: string | null;
  passwordResetRequestedAt: string | null;
  storageUsedMb: number;
  createdAt: string;
  updatedAt: string;
}

export interface Item {
  id: string;
  size: string;
  quantity: number;
  unitPrice: string;
  subtotal: string;
}

export interface Subscription {
  id: string;
  type: string;
  startDate: string;
  endDate: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentAccount {
  id: string;
  provider: string;
  providerUserId: string;
  accessToken: string;
  refreshToken: string;
  tokenExpiresAt: string;
  createdAt: string;
  updatedAt: string;
}
