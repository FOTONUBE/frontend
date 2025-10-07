"use client";

import { uploadFile } from "@/actions/files/files.action";
import { useAuthStore } from "@/store/useAuthStore";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProfileScreen() {
  const { user, updateUser, loading } = useAuthStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setImage(user.image || "");
    }
  }, [user]);

  if (!user) {
    return <p className="text-center mt-10">Cargando usuario...</p>;
  }

  const handleSave = async () => {
    await updateUser({ name, phone, image });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const result = await uploadFile(file);

    if (result.success) {
      setImage(result.url);
      toast.success("Imagen subida correctamente");
    } else {
      console.error(result.error);
      toast.error("Error al subir la imagen");
    }

    setUploading(false);
  };

  console.log(user);

  const handleVincular = () => {
    const clientId = process.env.NEXT_PUBLIC_MP_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_MP_REDIRECT_URI;
    const url = `https://auth.mercadopago.com.ar/authorization?client_id=${clientId}&response_type=code&platform_id=mp&redirect_uri=${redirectUri}`;
    window.location.href = url;
  };

  const needsMpLink = !user.paymentAccounts?.some(
    (acc) => acc.provider === "mercadopago" && acc.accessToken
  );

  return (
    <div className="max-w-5xl mx-auto px-6 space-y-8">
      <h1 className="text-3xl font-extrabold text-center text-gray-800">
        Mi Perfil
      </h1>

      {/* Sección MercadoPago */}
      {needsMpLink ? (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Vincular cuenta de MercadoPago
          </h2>
          <p className="text-gray-600 mb-4">
            Para poder recibir pagos directamente, vincula tu cuenta de
            MercadoPago.
          </p>
          <button
            onClick={handleVincular}
            className="w-full bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition"
          >
            Vincular con MP
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center text-gray-700">
          <h2 className="text-xl font-semibold mb-2">
            Cuenta de MercadoPago vinculada
          </h2>
          <p>¡Ya podés recibir pagos directamente en tu cuenta!</p>
        </div>
      )}

      {/* Sección Datos Personales */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Datos Personales
        </h2>

        <div className="flex flex-col md:flex-row md:items-start md:gap-10">
          {/* Imagen */}
          <div className="w-1/3 flex flex-col items-center justify-center md:items-start">
            {image ? (
              <img
                src={image}
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover border-4 border-cyan-600 shadow-md"
              />
            ) : (
              <div className="w-36 h-36 rounded-full bg-gray-100 flex items-center justify-center border-4 border-cyan-600 text-gray-400 text-sm font-medium shadow-inner">
                Sin imagen
              </div>
            )}

            {/* Botón de subir imagen */}
            <label
              className={`mt-5 cursor-pointer bg-cyan-600 text-white px-5 py-2 rounded-lg 
                hover:bg-cyan-700 transition flex items-center gap-2 shadow 
                ${loading ? "opacity-50 pointer-events-none" : ""}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M4 12l4-4m0 0l4 4m-4-4v12"
                />
              </svg>
              {uploading ? "Subiendo..." : "Seleccionar imagen"}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {uploading && (
              <p className="text-gray-500 text-sm mt-2 text-center md:text-left">
                Subiendo imagen...
              </p>
            )}
          </div>

          {/* Nombre y Teléfono */}
          <div className="flex-1 flex flex-col justify-start gap-6 mt-6 md:mt-0">
            <div>
              <label className="font-semibold text-gray-700 mb-2 block">
                Nombre
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700 mb-2 block">
                Teléfono
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full mt-6 bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </div>
  );
}
