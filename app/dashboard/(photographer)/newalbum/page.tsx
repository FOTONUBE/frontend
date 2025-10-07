"use client";

import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { createAlbum } from "@/actions/album/album.action";
import { AlbumData } from "@/interfaces/album/create-album.interface";
import { useRouter } from "next/navigation";

export default function NewAlbumScreen() {
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

  const router = useRouter();

  const onSubmit = async (data: AlbumData) => {
    setLoading(true);
    setMessage(null);

    const result = await createAlbum(data);

    if (result.success) {
      setMessage("¡Álbum creado correctamente!");
      reset();
      setTimeout(() => setMessage(null), 5000);

      router.refresh(); // fuerza que el fetch se vuelva a ejecutar en la página
    } else {
      setMessage(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto pt-2 px-6">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
        Crear Nuevo Álbum
      </h1>

      {message && (
        <p className="mb-6 text-center text-red-600 font-medium">{message}</p>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white p-6 rounded-xl shadow-lg border border-gray-200"
      >
        {/* Título */}
        <div>
          <label className="font-semibold text-gray-700 mb-1 block">
            Nombre del evento
          </label>
          <input
            {...register("title", { required: "El título es obligatorio" })}
            placeholder="Ej: Fiesta de fin de curso"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-400 focus:outline-none"
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Usuario y contraseña */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-gray-700 mb-1 block">
              Usuario del evento
            </label>
            <input
              {...register("userEvent", { required: "Usuario obligatorio" })}
              placeholder="Usuario"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            />
            {errors.userEvent && (
              <p className="text-red-600 text-sm mt-1">
                {errors.userEvent.message}
              </p>
            )}
          </div>
          <div>
            <label className="font-semibold text-gray-700 mb-1 block">
              Contraseña del evento
            </label>
            <input
              type="password"
              {...register("passwordEvent", {
                required: "Contraseña obligatoria",
              })}
              placeholder="Contraseña"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            />
            {errors.passwordEvent && (
              <p className="text-red-600 text-sm mt-1">
                {errors.passwordEvent.message}
              </p>
            )}
          </div>
        </div>

        {/* Precios por tamaño */}
        <div>
          <label className="font-semibold text-gray-700 mb-2 block">
            Precios Copias Impresas
          </label>
          <div className="grid grid-cols-3 gap-4">
            {fields.map((field, index) => (
              <div key={field.id}>
                <label className="text-sm font-medium">{field.size}</label>
                <input
                  type="number"
                  {...register(`prices.${index}.price` as const, {
                    valueAsNumber: true,
                    required: "Precio obligatorio",
                    min: { value: 1, message: "Debe ser mayor o igual a 1" },
                  })}
                  placeholder="Precio"
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-400 focus:outline-none mt-1"
                />
                {errors.prices?.[index]?.price && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.prices[index]?.price?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Otros precios */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-gray-700 mb-1 block">
              Foto digital
            </label>
            <input
              type="number"
              {...register("priceDigital", {
                valueAsNumber: true,
                required: "Precio digital obligatorio",
                min: { value: 1, message: "Debe ser 1 o mayor" },
              })}
              placeholder="Precio digital"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            />
            {errors.priceDigital && (
              <p className="text-red-600 text-sm mt-1">
                {errors.priceDigital.message}
              </p>
            )}
          </div>
          <div>
            <label className="font-semibold text-gray-700 mb-1 block">
              Carpeta escolar/deportiva
            </label>
            <input
              type="number"
              {...register("priceSchoolSports", {
                valueAsNumber: true,
                required: "Precio carpeta obligatorio",
                min: { value: 1, message: "Debe ser 1 o mayor" },
              })}
              placeholder="Precio carpeta"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            />
            {errors.priceSchoolSports && (
              <p className="text-red-600 text-sm mt-1">
                {errors.priceSchoolSports.message}
              </p>
            )}
          </div>
        </div>

        {/* Fecha del evento */}
        <div>
          <label className="font-semibold text-gray-700 mb-1 block">
            Fecha del evento
          </label>
          <input
            type="date"
            {...register("eventDate", { required: "Fecha obligatoria" })}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-400 focus:outline-none"
          />
          {errors.eventDate && (
            <p className="text-red-600 text-sm mt-1">
              {errors.eventDate.message}
            </p>
          )}
        </div>

        {/* Cliente */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-gray-700 mb-1 block">
              Correo cliente
            </label>
            <input
              type="email"
              {...register("clientEmail", { required: "Correo obligatorio" })}
              placeholder="cliente@ejemplo.com"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            />
            {errors.clientEmail && (
              <p className="text-red-600 text-sm mt-1">
                {errors.clientEmail.message}
              </p>
            )}
          </div>
          <div>
            <label className="font-semibold text-gray-700 mb-1 block">
              Teléfono cliente
            </label>
            <input
              {...register("clientPhoneNumber", {
                required: "Teléfono obligatorio",
                pattern: {
                  value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/i,
                  message: "Número de teléfono inválido",
                },
              })}
              placeholder="+54911xxxxxxx"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            />
            {errors.clientPhoneNumber && (
              <p className="text-red-600 text-sm mt-1">
                {errors.clientPhoneNumber.message}
              </p>
            )}
          </div>
        </div>

        {/* Descripción */}
        <div>
          <label className="font-semibold text-gray-700 mb-1 block">
            Descripción del álbum
          </label>
          <textarea
            {...register("description", {
              required: "Descripción obligatoria",
              minLength: {
                value: 30,
                message: "La descripción debe tener al menos 30 caracteres",
              },
            })}
            placeholder="Breve descripción del evento"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-400 focus:outline-none"
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Carpeta activa */}
        <div>
          <label className="font-semibold text-gray-700 mb-1 block">
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
                    className="h-4 w-4 accent-cyan-500"
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
        </div>

        {/* Botones */}
        <div className="flex justify-center gap-6 pt-6">
          <button
            type="button"
            onClick={() => reset()}
            className="bg-gray-100 text-gray-800 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition"
          >
            REINICIAR
          </button>
          <button
            type="submit"
            className="bg-cyan-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "CREANDO..." : "CREAR ÁLBUM"}
          </button>
        </div>
      </form>
    </div>
  );
}
