export interface AlbumPrice {
  size: string;
  price: number;
}

export interface AlbumData {
  title: string;
  userEvent: string;
  passwordEvent: string;
  prices: AlbumPrice[]; // reemplaza priceS, priceM, priceL
  priceDigital: number;
  priceSchoolSports: number;
  eventDate: string;
  clientEmail: string;
  clientPhoneNumber: string;
  description: string;
  isActiveFolder: boolean;
}
