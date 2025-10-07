export interface AlbumResponse {
  id: string;
  name: string;
  clientEmail: string;
  clientPhoneNumber: string;
  createdAt: Date;
  isActiveFolder: boolean;
  description: string;
  photos: Photo[];
}

export interface Photo {
  id: string;
  url: string;
  sizeMb: number;
  publicId: string;
  urlWeb: string;
  urlThumbnail: string;
}
