export interface AdminOrderID {
  id: string;
  total: string;
  status: string;
  deliveryStatus: string;
  createdAt: Date;
  updatedAt: Date;
  buyer: Buyer;
  album: Album;
  items: Item[];
}

export interface Album {
  id: string;
  title: string;
  userEvent: string;
  passwordEventHash: string;
  prices: Price[];
  priceDigital: number;
  priceSchoolSports?: number;
  eventDate: Date;
  clientEmail: string;
  clientPhoneNumber: string;
  description: string;
  isActiveFolder: boolean;
  deletedAt: null;
  photographerId: string;
  photosCount: number;
  photographer: Buyer;
  createdAt: Date;
  updatedAt: Date;
}

export interface Buyer {
  id: string;
  email: string;
  password: string;
  provider: string;
  role: string;
  name: null | string;
  image: null | string;
  phone: null | string;
  passwordResetRequestedAt: Date | null;
  storageUsedMb: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Price {
  size: string;
  price: number;
}

export interface Item {
  id: string;
  originalPhotoId: string;
  photoUrl: string;
  photoThumbnailUrl: string;
  photoWebUrl: string;
  quantity: number;
  size: string;
  unitPrice: string;
  subtotal: string;
}

export interface Photo {
  id: string;
  url: string;
  sizeMb: number;
  publicId: string;
  urlWeb: string;
  urlThumbnail: string;
}
