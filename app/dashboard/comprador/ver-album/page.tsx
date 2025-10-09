"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { AccessibleAlbum } from "@/interfaces/user/get-user.interface";
import Image from "next/image";

export default function BuyerAlbumsPage() {
  const { user } = useAuthStore();
  const [albums, setAlbums] = useState<AccessibleAlbum[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.accessibleAlbums) {
      setAlbums(user.accessibleAlbums);
    }
    setLoading(false);
  }, [user]);

  if (loading) return <p className="px-6">Cargando álbumes...</p>;
  if (!albums.length)
    return <p className="px-6">No tienes álbumes disponibles.</p>;

  return (
    <div className="lg:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {albums.map((album) => (
        <div
          key={album.id}
          className="flex flex-col sm:flex-row sm:justify-between border rounded-lg p-4 shadow hover:shadow-lg transition bg-white"
        >
          {/* Texto + botón */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg mb-2">Album: {album.title}</h3>
              <p className="text-gray-500 mb-4">
                Fecha: {new Date(album.eventDate).toLocaleDateString("es-AR")}
              </p>
            </div>

            <Link
              href={`/dashboard/comprador/ver-album/${album.id}`}
              className="hidden md:flex bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 text-center"
            >
              Ver Álbum
            </Link>
          </div>

          {/* Imagen */}
          {album.photos?.length > 0 && (
            <div className=" mt-2 md:mt-4 sm:mt-0 sm:ml-4 flex-shrink-0">
              <Image
                src={album.photos[0].url}
                alt={album.photos[0].url || "Foto del álbum"}
                width={300}
                height={200}
                className="rounded-tl-md rounded-tr-md md:rounded w-full sm:w-32 sm:h-32 object-cover"
              />

              <Link
                href={`/dashboard/ver-album/${album.id}`}
                className="flex md:hidden bg-cyan-600 text-white px-4 py-2 rounded-bl-md rounded-br-md hover:bg-cyan-700 justify-center"
              >
                Ver Álbum
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
