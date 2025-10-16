"use client";

import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { createAlbum } from "@/actions/album/album.action";
import { AlbumData } from "@/interfaces/album/create-album.interface";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { useAlbumStore } from "@/store/useAlbumStore";

export default function NewAlbumScreen() {
  const { user } = useAuthStore();
  const { getAlbums } = useAlbumStore();
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AlbumData>({
    defaultValues: {
      title: "",
      userEvent: "",
      passwordEvent: "",
      prices: [
        { size: "S", price: 0 },
        { size: "M", price: 0 },
        { size: "L", price: 0 },
      ],
      priceDigital: 0,
      priceSchoolSports: 0,
      eventDate: "",
      clientEmail: "",
      clientPhoneNumber: "",
      description: "",
      isActiveFolder: true,
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "prices",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (data: AlbumData) => {
    setLoading(true);
    setMessage(null);

    const result = await createAlbum(data);

    if (result.success) {
      toast.success("¡Álbum creado correctamente!");
      getAlbums();

      setTimeout(() => {
        router.push("/dashboard/fotografo/albums");
      }, 1500);
    } else {
      toast.error(result.error || "Error al crear el álbum");
      setMessage(result.error);
    }

    setLoading(false);
  };

  const hasLinkedMp = user?.paymentAccounts?.some(
    (acc) => acc.provider === "mercadopago"
  );

  if (!user) {
    return (
      <div className="flex h-screen justify-center items-center">
        <p className="text-gray-600 animate-pulse">Cargando usuario...</p>
      </div>
    );
  }

  if (!hasLinkedMp) {
    return (
      <div className="flex flex-col justify-center items-center h-4/5 text-center px-6">
        <h1 className="text-3xl font-semibold mb-4 text-gray-800">
          Vinculá tu cuenta de MercadoPago
        </h1>
        <p className="text-gray-600 max-w-md mb-6 leading-relaxed">
          Para poder crear álbumes y recibir pagos de tus clientes, primero
          necesitás vincular tu cuenta de MercadoPago.
        </p>
        <button
          onClick={() => router.push("/dashboard/profile")}
          className="bg-cyan-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-cyan-700 transition-transform hover:scale-105 shadow-md"
        >
          Ir a mi perfil
        </button>
      </div>
    );
  }

  return (
    <div className="md:px-8 lg:px-16 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Nuevo Álbum
      </h1>

      {message && (
        <div
          className={`mb-6 text-center rounded-lg py-3 px-4 ${
            message.includes("correctamente")
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Bloque: Datos del evento */}
        <section className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-6">
          <div>
            <label className="font-semibold text-gray-700 mb-2 block">
              Nombre del evento
            </label>
            <input
              {...register("title", { required: "El título es obligatorio" })}
              placeholder="Ej: Casamiento de Ana y Marcos"
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 bg-gray-50 focus:outline-none"
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="font-semibold text-gray-700 mb-2 block">
                Usuario del evento
              </label>
              <input
                {...register("userEvent", { required: "Usuario obligatorio" })}
                placeholder="Ej: cliente2025"
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 bg-gray-50"
              />
              {errors.userEvent && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.userEvent.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-semibold text-gray-700 mb-2 block">
                Contraseña del evento
              </label>
              <input
                type="password"
                {...register("passwordEvent", {
                  required: "Contraseña obligatoria",
                })}
                placeholder="••••••"
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 bg-gray-50"
              />
              {errors.passwordEvent && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.passwordEvent.message}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Bloque: Precios */}
        <section className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Precios de copias impresas
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex flex-col items-center bg-gray-50 p-4 rounded-xl border border-gray-200"
              >
                <label className="font-medium text-gray-700 mb-2">
                  {field.size}
                </label>
                <input
                  type="number"
                  {...register(`prices.${index}.price` as const, {
                    valueAsNumber: true,
                    required: "Precio obligatorio",
                    min: { value: 1, message: "Debe ser mayor o igual a 1" },
                  })}
                  placeholder="$"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                />
                {errors.prices?.[index]?.price && (
                  <p className="text-red-600 text-xs mt-1 text-center">
                    {errors.prices[index]?.price?.message}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 mt-6">
            <div>
              <label className="font-semibold text-gray-700 mb-2 block">
                Foto digital
              </label>
              <input
                type="number"
                {...register("priceDigital", {
                  valueAsNumber: true,
                  required: "Precio digital obligatorio",
                  min: { value: 1, message: "Debe ser 1 o mayor" },
                })}
                placeholder="Ej: 500"
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 bg-gray-50"
              />
              {errors.priceDigital && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.priceDigital.message}
                </p>
              )}
            </div>
            {/*             <div>
              <label className="font-semibold text-gray-700 mb-2 block">
                Carpeta escolar / deportiva
              </label>
              <input
                type="number"
                {...register("priceSchoolSports", {
                  valueAsNumber: true,
                  required: "Precio obligatorio",
                  min: { value: 1, message: "Debe ser 1 o mayor" },
                })}
                placeholder="Ej: 1500"
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 bg-gray-50"
              />
              {errors.priceSchoolSports && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.priceSchoolSports.message}
                </p>
              )}
            </div> */}
          </div>
        </section>

        {/* Bloque: Fecha y cliente */}
        <section className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-6">
          <div>
            <label className="font-semibold text-gray-700 mb-2 block">
              Fecha del evento
            </label>
            <input
              type="date"
              {...register("eventDate", { required: "Fecha obligatoria" })}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 bg-gray-50"
            />
            {errors.eventDate && (
              <p className="text-red-600 text-sm mt-1">
                {errors.eventDate.message}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="font-semibold text-gray-700 mb-2 block">
                Correo del cliente
              </label>
              <input
                type="email"
                {...register("clientEmail", { required: "Correo obligatorio" })}
                placeholder="cliente@ejemplo.com"
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 bg-gray-50"
              />
              {errors.clientEmail && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.clientEmail.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-semibold text-gray-700 mb-2 block">
                Teléfono del cliente
              </label>
              <input
                {...register("clientPhoneNumber", {
                  required: "Teléfono obligatorio",
                })}
                placeholder="+54911xxxxxxx"
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 bg-gray-50"
              />
              {errors.clientPhoneNumber && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.clientPhoneNumber.message}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Bloque: Descripción */}
        <section className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-4">
          <label className="font-semibold text-gray-700 mb-2 block">
            Descripción del álbum
          </label>
          <textarea
            {...register("description", {
              required: "Descripción obligatoria",
              minLength: {
                value: 30,
                message: "Debe tener al menos 30 caracteres",
              },
            })}
            placeholder="Contanos detalles del evento..."
            className="w-full p-3 border border-gray-200 rounded-xl h-32 focus:ring-2 focus:ring-cyan-500 bg-gray-50"
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </section>

        {/* Bloque: Carpeta activa */}
        <section className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-4">
          <label className="font-semibold text-gray-700 mb-2 block">
            Carpeta activa
          </label>
          <Controller
            control={control}
            name="isActiveFolder"
            render={({ field }) => (
              <div className="flex gap-6 mt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={field.value === true}
                    onChange={() => field.onChange(true)}
                    className="h-4 w-4 accent-cyan-600"
                  />
                  Activar
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={field.value === false}
                    onChange={() => field.onChange(false)}
                    className="h-4 w-4 accent-gray-400"
                  />
                  Desactivar
                </label>
              </div>
            )}
          />
        </section>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
          <button
            type="button"
            onClick={() => reset()}
            className="bg-gray-100 text-gray-800 font-medium px-6 py-3 rounded-xl hover:bg-gray-200 transition-transform hover:scale-105"
          >
            Reiniciar
          </button>
          <button
            type="submit"
            className="bg-cyan-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-cyan-700 transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear Álbum"}
          </button>
        </div>
      </form>
    </div>
  );
}
