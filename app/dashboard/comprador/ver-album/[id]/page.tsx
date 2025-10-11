"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Loader2,
} from "lucide-react";
import { useBuyerStore } from "@/store/useBuyerStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";

type Photo = { id: string; url: string; urlThumbnail?: string };

const PHOTOS_PER_PAGE = 20;

export default function AlbumGalleryPage() {
  const { id } = useParams() as { id: string };
  const { currentAlbum, fetchAlbumById, loading, error } = useBuyerStore();
  const { user } = useAuthStore();
  const { addItem } = useCartStore();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [cartModalPhoto, setCartModalPhoto] = useState<Photo | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (id) fetchAlbumById(id);
  }, [id, fetchAlbumById]);

  const photos = currentAlbum?.photos || [];

  // Calcular el rango de fotos a mostrar
  const startIndex = (page - 1) * PHOTOS_PER_PAGE;
  const endIndex = startIndex + PHOTOS_PER_PAGE;
  const displayedPhotos = photos.slice(startIndex, endIndex);

  const totalPages = Math.ceil(photos.length / PHOTOS_PER_PAGE);

  const openModal = (index: number) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);
  const prevPhoto = () => setSelectedIndex((i) => (i! > 0 ? i! - 1 : i!));
  const nextPhoto = () =>
    setSelectedIndex((i) => (i! < photos.length - 1 ? i! + 1 : i!));

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
      toast.error("Selecciona un tamaño para continuar");
      return;
    }

    let priceItem = 0;

    // 🔹 Detectar tipo de tamaño y asignar precio correcto
    if (selectedSize === "Digital") {
      priceItem = currentAlbum.priceDigital ?? 0;
    } else if (
      selectedSize === "SchoolSports" ||
      selectedSize === "Escolar" // por si lo nombrás distinto visualmente
    ) {
      priceItem = currentAlbum.priceSchoolSports ?? 0;
    } else {
      priceItem =
        currentAlbum.prices.find((p) => p.size === selectedSize)?.price ?? 0;
    }

    if (priceItem <= 0) {
      toast.error("No se encontró un precio válido para este tamaño");
      return;
    }

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

  // ====== Loading state ======
  if (loading)
    return (
      <div className="w-full h-screen px-6 py-10 flex flex-col items-center justify-center text-gray-500">
        <Loader2 className="animate-spin mb-3 text-cyan-600" size={28} />
        Cargando álbum...
      </div>
    );

  if (error) return <p className="text-red-600 px-6">{error}</p>;
  if (!currentAlbum) return <p className="px-6">Álbum no encontrado</p>;

  return (
    <div className="sm:px-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-cyan-600">
            Evento: {currentAlbum.title}
          </h1>
          <p className="text-gray-500">
            Fotógrafo: {currentAlbum.photographer}
          </p>
          <p className="text-gray-500">
            Fecha:{" "}
            {new Date(currentAlbum.eventDate).toLocaleDateString("es-AR")}
          </p>
        </div>
        <p className="text-lg text-cyan-600">
          Bienvenido,{" "}
          <span className="font-semibold">{user?.name || "Comprador"}</span>
        </p>
      </header>

      {/* Galería */}
      <section className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {displayedPhotos.map((photo, index) => (
          <div
            key={photo.id}
            className="relative rounded-lg overflow-hidden shadow-sm group cursor-pointer hover:shadow-md transition"
            onClick={() => openModal(startIndex + index)}
          >
            {/* Imagen */}
            <div className="relative w-full aspect-square">
              <Image
                src={photo.urlThumbnail || photo.url}
                alt={`Foto ${photo.id}`}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-105"
                unoptimized
              />
            </div>

            {/* Botón agregar */}
            <div className="absolute inset-x-0 bottom-0 p-2 sm:p-1 flex justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openCartModal(photo);
                }}
                className="w-full sm:w-auto bg-white/90 text-cyan-600 px-3 py-2 rounded-md text-sm font-semibold flex items-center justify-center gap-2 shadow-md
                     sm:opacity-0 sm:group-hover:opacity-100
                     transition
                     hover:bg-cyan-50"
              >
                <ShoppingCart size={16} /> Agregar
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded-lg border ${
              page === 1
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : "text-cyan-600 border-cyan-600 hover:bg-cyan-50"
            }`}
          >
            <ChevronLeft className="inline-block mr-1" size={18} />
            Anterior
          </button>

          <span className="text-gray-600">
            Página {page} de {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-lg border ${
              page === totalPages
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : "text-cyan-600 border-cyan-600 hover:bg-cyan-50"
            }`}
          >
            Siguiente
            <ChevronRight className="inline-block ml-1" size={18} />
          </button>
        </div>
      )}

      {/* Modales (imagen y carrito) */}
      {selectedIndex !== null && (
        <CarouselModal
          photo={photos[selectedIndex]}
          onPrev={prevPhoto}
          onNext={nextPhoto}
          onClose={closeModal}
          hasPrev={selectedIndex > 0}
          hasNext={selectedIndex < photos.length - 1}
        />
      )}

      {cartModalPhoto && (
        <CartModal
          photo={cartModalPhoto}
          currentAlbum={currentAlbum}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          quantity={quantity}
          setQuantity={setQuantity}
          onClose={closeCartModal}
          onConfirm={confirmAddToCart}
        />
      )}
    </div>
  );
}

// ================= COMPONENTES AUXILIARES =================

function CarouselModal({
  photo,
  onPrev,
  onNext,
  onClose,
  hasPrev,
  hasNext,
}: any) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative max-w-4xl w-full z-10">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white z-20 p-1"
        >
          <X size={28} />
        </button>
        <div className="relative w-full h-[75vh] flex items-center justify-center">
          {hasPrev && (
            <button
              onClick={onPrev}
              className="absolute left-2 text-white z-20 p-1"
            >
              <ChevronLeft size={36} />
            </button>
          )}
          <Image
            src={photo.urlThumbnail || photo.url}
            alt="Foto"
            fill
            className="object-contain rounded"
            unoptimized
          />
          {hasNext && (
            <button
              onClick={onNext}
              className="absolute right-2 text-white z-20 p-1"
            >
              <ChevronRight size={36} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function CartModal({
  photo,
  currentAlbum,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  onClose,
  onConfirm,
}: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6">
      {/* Fondo oscuro */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Contenedor modal */}
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md sm:max-w-lg md:max-w-2xl p-4 sm:p-6 flex flex-col md:flex-row gap-4 sm:gap-6 z-10">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        {/* Imagen */}
        <div className="relative w-full md:w-1/2 h-32 sm:h-64 md:h-auto rounded-lg overflow-hidden">
          <Image
            src={photo.urlThumbnail || photo.url}
            alt="Foto seleccionada"
            fill
            className="object-cover rounded-lg"
            unoptimized
          />
        </div>

        {/* Controles */}
        <div className="flex-1 flex flex-col justify-between space-y-2">
          <h2 className="text-base sm:text-xl font-semibold text-cyan-600">
            Agregar al carrito
          </h2>

          {/* Tamaños */}
          <div>
            <p className="font-medium mb-2">Selecciona el tamaño:</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {currentAlbum.prices.map((p: any) => (
                <label
                  key={p.size}
                  className={`flex flex-col items-start border rounded-lg px-2 py-1 cursor-pointer transition text-sm sm:text-base ${
                    selectedSize === p.size
                      ? "bg-cyan-50 border-cyan-500"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="size"
                      value={p.size}
                      checked={selectedSize === p.size}
                      onChange={() => setSelectedSize(p.size)}
                    />
                    <p className="text-xs">{p.size}</p>
                  </div>
                  <span className="text-cyan-600 font-semibold mt-1">
                    ${p.price}
                  </span>
                </label>
              ))}

              {["Digital", "SchoolSports"].map((opt) => (
                <label
                  key={opt}
                  className={`flex flex-col items-start border rounded-lg px-2 py-1 cursor-pointer transition text-sm sm:text-base ${
                    selectedSize === opt
                      ? "bg-cyan-50 border-cyan-500"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="size"
                      value={opt}
                      checked={selectedSize === opt}
                      onChange={() => setSelectedSize(opt)}
                    />
                    <span>{opt === "Digital" ? "Digital" : "Escolar"}</span>
                  </div>
                  <span className="text-cyan-600 font-semibold mt-1">
                    $
                    {opt === "Digital"
                      ? currentAlbum.priceDigital
                      : currentAlbum.priceSchoolSports}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Cantidad */}
          <div className="flex items-center gap-2 sm:gap-4">
            <p className="font-medium">Cantidad:</p>
            <div className="flex border rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q: number) => Math.max(1, q - 1))}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 hover:bg-gray-200"
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
                className="w-10 text-center outline-none sm:w-12"
              />
              <button
                onClick={() => setQuantity((q: number) => q + 1)}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          {/* Botones Confirmar y Cancelar en un solo div */}
          <div className="flex gap-2 mt-2">
            <button
              onClick={onConfirm}
              className="w-2/3 bg-cyan-600 text-white font-semibold py-1 rounded-lg hover:bg-cyan-700 transition"
            >
              Confirmar
            </button>
            <button
              onClick={onClose}
              className="w-1/3 border border-gray-300 text-gray-700 font-semibold py-1 rounded-lg hover:bg-gray-100 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
