"use client";
import { useAlbumStore } from "@/store/useAlbumStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AlbumScreen() {
  const { albums, getAlbums, removeAlbum, loading, error } = useAlbumStore();
  const router = useRouter();

  // Estado para modal de confirmación
  const [albumToDelete, setAlbumToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (albums.length === 0) {
      getAlbums();
    }
  }, []);

  const handleAction = (action: string, albumId: string) => {
    switch (action) {
      case "ver":
        router.push(`/dashboard/fotografo/albums/${albumId}`);
        break;
      /*       case "modificar":
        router.push(`/dashboard/albums/${albumId}/edit`);
        break; */
      case "pedidos":
        router.push(`/dashboard/fotografo/albums/${albumId}/orders`);
        break;
      case "eliminar":
        setAlbumToDelete(albumId); // Abrimos modal
        break;
    }
  };

  const confirmDelete = async () => {
    if (!albumToDelete) return;

    await removeAlbum(albumToDelete);

    setAlbumToDelete(null); // Cerrar modal
  };

  if (loading) return <p className="p-6">Cargando...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!loading && albums.length === 0)
    return (
      <p className="p-6 text-center text-gray-500 text-lg">
        Aún no tienes álbumes creados.
      </p>
    );

  return (
    <div className="min-h-screen px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
          Mis Álbumes
        </h1>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Álbum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {albums.map((album) => (
                <tr key={album.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-16 relative">
                        <Image
                          src={
                            album.photos?.[0]?.url ||
                            "https://community.mp3tag.de/uploads/default/original/2X/a/acf3edeb055e7b77114f9e393d1edeeda37e50c9.png"
                          }
                          alt={`Portada de ${album.name}`}
                          fill
                          style={{ objectFit: "cover" }}
                          className="rounded-lg"
                          unoptimized
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-base font-medium text-gray-900 truncate max-w-xs">
                          {album.name}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {album.clientPhoneNumber}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {album.clientEmail}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(album.createdAt).toLocaleDateString("es-AR")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleAction("ver", album.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Ver/Editar
                      </button>
                      {/*                       <button
                        onClick={() => handleAction("modificar", album.id)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Modificar
                      </button> */}
                      <button
                        onClick={() => handleAction("pedidos", album.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Pedidos
                      </button>
                      {/*      <button
                        onClick={() => handleAction("eliminar", album.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Eliminar
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal de confirmación */}
        {albumToDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                ¿Seguro que deseas eliminar este álbum?
              </h2>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setAlbumToDelete(null)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  No
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Sí, eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
