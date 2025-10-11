"use client";

import { uploadFile } from "@/actions/files/files.action";
import MpLinkModal from "@/components/dashboard/Profile/MpLinkModal";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProfileScreen() {
  const { user, updateUser, loading } = useAuthStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showMpModal, setShowMpModal] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setImage(user.image || "");
    }
  }, [user]);

  if (!user)
    return (
      <p className="text-center mt-10 text-gray-500">Cargando usuario...</p>
    );

  const handleSave = async () => {
    await updateUser({ name, phone, image });
    toast.success("Perfil actualizado correctamente");
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
      toast.error(result.error);
    }
    setUploading(false);
  };

  const isPhotographer = user.role === "photographer";
  const needsMpLink =
    isPhotographer &&
    !user.paymentAccounts?.some(
      (acc) => acc.provider === "mercadopago" && acc.accessToken
    );

  const handleVincular = () => {
    setShowMpModal(true); // solo abrir
  };

  const closeMpModal = () => {
    setShowMpModal(false); // cerrar
  };

  const confirmMpLink = () => {
    const clientId = process.env.NEXT_PUBLIC_MP_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_MP_REDIRECT_URI;
    const url = `https://auth.mercadopago.com.ar/authorization?client_id=${clientId}&response_type=code&platform_id=mp&redirect_uri=${redirectUri}`;
    window.location.href = url;
  };

  return (
    <div className="md:max-w-5xl md:mx-auto md:px-4 space-y-8">
      <h1 className="text-3xl font-extrabold text-center text-cyan-600">
        Mi Perfil
      </h1>

      {/* Bloque MercadoPago */}
      {isPhotographer && needsMpLink && (
        <div className="p-6 rounded-2xl shadow-lg border bg-white border-gray-200">
          <h2 className="text-xl font-semibold mb-2">
            Vincular cuenta de MercadoPago
          </h2>
          <p className="text-gray-600 mb-4">
            Para recibir pagos directamente, vincula tu cuenta de MercadoPago.
            Luego de la vinculación exitosa, deberás volver a iniciar sesión en
            FotoNube.
          </p>
          <button
            onClick={handleVincular}
            className="w-full bg-cyan-600 text-white px-6 py-3 rounded-xl hover:bg-cyan-700 transition"
          >
            Vincular con MP
          </button>

          {showMpModal && (
            <MpLinkModal onConfirm={confirmMpLink} onCancel={closeMpModal} />
          )}
        </div>
      )}

      {/* Bloque Datos Personales */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Datos Personales</h2>
        <div className="flex flex-col md:flex-row md:gap-10">
          {/* Imagen */}
          <div className="flex flex-col items-center justify-between md:items-start w-full md:w-1/3">
            <div className="w-36 h-36 rounded-full border-4 border-cyan-600 shadow-md overflow-hidden">
              {image ? (
                <img
                  src={image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-medium">
                  Sin imagen
                </div>
              )}
            </div>
            <label
              className={`mt-5 cursor-pointer bg-cyan-600 text-white px-5 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-cyan-700 transition shadow ${
                loading ? "opacity-50 pointer-events-none" : ""
              }`}
            >
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

          {/* Formulario */}
          <div className="flex-1 flex flex-col gap-6 mt-6 md:mt-0">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre completo"
              className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Teléfono"
              className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full mt-4 bg-cyan-600 text-white px-6 py-3 rounded-xl hover:bg-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      </div>

      {/* Bloque Seguridad */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Seguridad</h2>
        <input
          type="password"
          placeholder="Nueva contraseña (próximamente)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none mb-3"
          disabled
        />
        <input
          type="password"
          placeholder="Confirmar nueva contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none mb-3"
          disabled
        />
        <button
          className="w-full bg-gray-400 text-white px-6 py-3 rounded-xl cursor-not-allowed"
          disabled
        >
          Cambiar contraseña
        </button>
        <p className="text-gray-500 text-sm mt-2">Funcionalidad próximamente</p>
      </div>
    </div>
  );
}
