export interface AlbumAccessById {
  id: string;
  title: string;
  eventDate: Date;
  prices: Price[];
  priceDigital: number;
  priceSchoolSports: number;
  photos: Photo[];
  photographer: string;
}

export interface Photo {
  id: string;
  url: string;
  urlWeb: string;
  urlThumbnail: string;
}

export interface Price {
  size: string;
  price: number;
}
