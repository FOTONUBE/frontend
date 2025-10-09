export interface GetUserResponse {
  id: string;
  email: string;
  role: string;
  name: null;
  image: null;
  phone: null;
  hasCompletedProfile: boolean;
  accessibleAlbums: AccessibleAlbum[];
  orders: any[];
  paymentAccounts: PaymentAccount[];
}

export interface AccessibleAlbum {
  id: string;
  title: string;
  description: string;
  prices: Price[];
  priceDigital: number;
  priceSchoolSports: number;
  eventDate: Date;
  photos: Photo[];
}

export interface Photo {
  id: string;
  url: string;
}

export interface Price {
  size: string;
  price: number;
}

export interface PaymentAccount {
  id: string;
  provider: string; // ej: "mercadopago"
  providerUserId: string;
  accessToken?: string; // puede estar ausente si no está vinculado
  refreshToken?: string;
  tokenExpiresAt?: string; // fecha en ISO
  createdAt: string; // fecha en ISO
  updatedAt: string; // fecha en ISO
}
