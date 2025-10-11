"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/store/useAuthStore";
import { AccessibleAlbum } from "@/interfaces/user/get-user.interface";

const ITEMS_PER_PAGE = 8;

export default function BuyerAlbumsPage() {
  const { user } = useAuthStore();
  const [albums, setAlbums] = useState<AccessibleAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (user?.accessibleAlbums) {
      setAlbums(user.accessibleAlbums);
    }
    setLoading(false);
  }, [user]);

  const paginatedAlbums = albums.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = albums.length > paginatedAlbums.length;

  if (loading) return <p className="px-6">Cargando álbumes...</p>;
  if (!albums.length)
    return <p className="px-6">No tienes álbumes disponibles.</p>;

  return (
    <div className="px-4 lg:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedAlbums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="bg-cyan-600 text-white px-5 py-2 rounded-lg hover:bg-cyan-700 transition"
          >
            Cargar más
          </button>
        </div>
      )}
    </div>
  );
}

function AlbumCard({ album }: { album: AccessibleAlbum }) {
  const date = new Date(album.eventDate).toLocaleDateString("es-AR");
  const image = album.photos?.[0]?.url;

  return (
    <div className="border rounded-xl shadow-sm hover:shadow-lg transition bg-white overflow-hidden">
      {image && (
        <Image
          src={image}
          alt={album.title}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-lg">Album: {album.title}</h3>
          <p className="text-gray-500 text-sm mb-4">Fecha: {date}</p>
        </div>
        <Link
          href={`/dashboard/comprador/ver-album/${album.id}`}
          className="bg-cyan-600 text-white px-4 py-2 rounded-md text-center hover:bg-cyan-700 transition"
        >
          Ver Álbum
        </Link>
      </div>
    </div>
  );
}
