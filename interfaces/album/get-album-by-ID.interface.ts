export interface AlbumIDResponse {
  id: string;
  title: string;
  userEvent: string;
  passwordEventHash: string;
  prices: Price[];
  priceDigital: number;
  priceSchoolSports: number;
  eventDate: string; // Backend devuelve string ISO
  clientEmail: string;
  clientPhoneNumber: string;
  description: string;
  isActiveFolder: boolean;
  deletedAt: string | null;
  photographerId: string;
  photographer: Photographer;
  photos: Photo[];
  orders: Order[];
  createdAt: string;
  updatedAt: string;
}

export interface Photo {
  id: string;
  url: string;
  sizeMb: number;
  publicId: string;
  urlWeb: string;
  urlThumbnail: string;
}

export interface Price {
  size: string;
  price: number;
}

export interface Photographer {
  id: string;
  email: string;
  password: string;
  provider: string;
  role: string;
  name: string;
  image: string | null;
  phone: string | null;
  passwordResetRequestedAt: string | null;
  storageUsedMb: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  buyer: User;
  album: Partial<AlbumIDResponse>; // Evitamos recursión infinita
  items: OrderItem[];
  total: string;
  status: string;
  deliveryStatus: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  size: string;
  quantity: number;
  unitPrice: string;
  subtotal: string;
}

export interface User {
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
