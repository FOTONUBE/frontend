"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { X, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useBuyerStore } from "@/store/useBuyerStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";

// Tipo de foto para el modal
type Photo = {
  id: string;
  url: string;
  urlThumbnail?: string;
};

export default function AlbumGalleryPage() {
  const { id } = useParams() as { id: string };
  const { currentAlbum, fetchAlbumById, loading, error } = useBuyerStore();
  const { user } = useAuthStore();
  const { addItem } = useCartStore();

  // Estado para carousel
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  // Estado para modal de carrito
  const [cartModalPhoto, setCartModalPhoto] = useState<Photo | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) fetchAlbumById(id);
  }, [id, fetchAlbumById]);

  // Funciones carousel
  const openModal = (index: number) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);
  const prevPhoto = () =>
    selectedIndex !== null && setSelectedIndex((i) => (i! > 0 ? i! - 1 : i!));
  const nextPhoto = () =>
    selectedIndex !== null &&
    setSelectedIndex((i) =>
      i! < (currentAlbum?.photos?.length || 0) - 1 ? i! + 1 : i!
    );

  // Funciones modal carrito
  const openCartModal = (photo: Photo) => {
    setCartModalPhoto(photo);
    setSelectedSize(null);
    setQuantity(1);
  };
  const closeCartModal = () => {
    setCartModalPhoto(null);
    setSelectedSize(null);
    setQuantity(1);
  };

  const confirmAddToCart = () => {
    if (!cartModalPhoto || !selectedSize || !currentAlbum) {
      toast.error("Selecciona un tamaño");
      return;
    }

    const priceItem =
      currentAlbum.prices.find((p) => p.size === selectedSize)?.price ??
      (selectedSize === "Digital"
        ? currentAlbum.priceDigital
        : selectedSize === "SchoolSports"
        ? currentAlbum.priceSchoolSports
        : 0);

    addItem({
      photoId: cartModalPhoto.id,
      albumId: currentAlbum.id,
      title: `${currentAlbum.title} — ${selectedSize}`,
      image: cartModalPhoto.urlThumbnail || cartModalPhoto.url,
      size: selectedSize,
      unitPrice: priceItem,
      quantity,
    });

    toast.success("Foto agregada al carrito");
    closeCartModal();
  };

  // Mientras carga
  if (loading)
    return (
      <div className="px-6 space-y-6">
        <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="relative w-full h-36 rounded-lg bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </div>
    );

  if (error) return <p className="text-red-600 px-6">{error}</p>;
  if (!currentAlbum) return <p className="px-6">Álbum no encontrado</p>;

  const photos = currentAlbum.photos || [];

  return (
    <div className="px-6 space-y-6 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold text-cyan-600">
            Evento: {currentAlbum.title}
          </h1>
          <p className="text-gray-500">
            Fotógrafo: {currentAlbum.photographer}
          </p>
          <p className="text-gray-500">
            Fecha del evento:{" "}
            {new Date(currentAlbum.eventDate).toLocaleDateString("es-AR")}
          </p>
        </div>
        <div>
          <p className="text-xl text-cyan-600">
            Bienvenido: {user?.name || "Comprador"}
          </p>
        </div>
      </div>

      {/* Grid de miniaturas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="relative w-full h-36 rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => openModal(index)}
          >
            <Image
              src={photo.urlThumbnail || photo.url}
              alt={`Foto ${photo.id}`}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
              unoptimized
            />
            {/* Botón Agregar */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                openCartModal(photo);
              }}
              className="absolute bottom-2 right-0 bg-white/90 text-cyan-600 font-semibold px-3 py-1 rounded-tl-sm rounded-bl-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition text-sm"
            >
              <ShoppingCart size={16} />
              Agregar
            </button>
          </div>
        ))}
      </div>

      {/* Modal carousel */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div className="relative max-w-3xl w-full z-10">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white z-20 p-1"
            >
              <X size={24} />
            </button>
            <div className="relative w-full h-[70vh] flex items-center justify-center">
              {selectedIndex! > 0 && (
                <button
                  onClick={prevPhoto}
                  className="absolute left-2 text-white z-20 p-1"
                >
                  <ChevronLeft size={32} />
                </button>
              )}
              <Image
                src={
                  photos[selectedIndex].urlThumbnail ||
                  photos[selectedIndex].url
                }
                alt={`Foto ${photos[selectedIndex].id}`}
                fill
                style={{ objectFit: "contain" }}
                className="rounded"
                unoptimized
              />
              {selectedIndex! < photos.length - 1 && (
                <button
                  onClick={nextPhoto}
                  className="absolute right-2 text-white z-20 p-1"
                >
                  <ChevronRight size={32} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal agregar al carrito */}
      {cartModalPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Fondo */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeCartModal}
          />
          <div className="relative bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 z-10 flex flex-col md:flex-row gap-6">
            {/* Botón cerrar */}
            <button
              onClick={closeCartModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            {/* Imagen */}
            <div className="relative w-full md:w-1/2 h-64 md:h-auto rounded-lg overflow-hidden">
              <Image
                src={cartModalPhoto.urlThumbnail || cartModalPhoto.url}
                alt="Foto seleccionada"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
                unoptimized
              />
            </div>

            {/* Contenido */}
            <div className="flex-1 flex flex-col space-y-4">
              <h2 className="text-xl font-bold text-cyan-600">
                Agregar foto al carrito
              </h2>

              {/* Selección de tamaño */}
              <div>
                <p className="font-medium mb-2">Selecciona el tamaño:</p>
                <div className="space-y-2">
                  {currentAlbum.prices.map((p) => (
                    <label
                      key={p.size}
                      className="flex items-center justify-between border rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        name="size"
                        value={p.size}
                        checked={selectedSize === p.size}
                        onChange={() => setSelectedSize(p.size)}
                      />
                      <span>{p.size}</span>
                      <span className="text-cyan-600 font-semibold">
                        ${p.price}
                      </span>
                    </label>
                  ))}
                  <label className="flex items-center justify-between border rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="size"
                      value="Digital"
                      checked={selectedSize === "Digital"}
                      onChange={() => setSelectedSize("Digital")}
                    />
                    <span>Digital</span>
                    <span className="text-cyan-600 font-semibold">
                      ${currentAlbum.priceDigital}
                    </span>
                  </label>
                  <label className="flex items-center justify-between border rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="size"
                      value="SchoolSports"
                      checked={selectedSize === "SchoolSports"}
                      onChange={() => setSelectedSize("SchoolSports")}
                    />
                    <span>School Sports</span>
                    <span className="text-cyan-600 font-semibold">
                      ${currentAlbum.priceSchoolSports}
                    </span>
                  </label>
                </div>
              </div>

              {/* Cantidad */}
              <div className="flex items-center gap-4">
                <p className="font-medium">Cantidad:</p>
                <div className="flex border rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-6 h-6 bg-gray-100 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (!isNaN(val) && val >= 1) setQuantity(val);
                    }}
                    className="w-6 h-6 text-center outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-6 h-6 bg-gray-100 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Botón confirmar */}
              <button
                onClick={confirmAddToCart}
                className="w-full bg-cyan-600 text-white font-semibold py-2 rounded-lg hover:bg-cyan-700 transition"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
