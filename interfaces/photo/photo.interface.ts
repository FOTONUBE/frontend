export interface PhotoResponse {
  id: string; // UUID de la foto
  url: string;
  sizeMb: number;
  publicId: string; // Cloudinary public_id
  urlWeb: string; // versión optimizada web
  urlThumbnail: string; // miniatura
}
