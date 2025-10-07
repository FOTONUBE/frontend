"use client";

import { roleRoutes } from "@/lib/roleRoutes";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const router = useRouter();
  const { login, status, requestPasswordReset, loading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = await login(email, password);
    if (!ok) return;

    const currentUser = useAuthStore.getState().user;
    const route =
      roleRoutes[currentUser?.role || "DEFAULT"] || roleRoutes.DEFAULT;

    router.push(route);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    await requestPasswordReset(forgotEmail);

    setShowForgotModal(false);

    setForgotEmail("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://fotonube.com/websim/images/fondo-imagen-FOTONUBE-eventos.jpg"
          alt="Fondo Fotonube"
          className="w-full h-full object-cover animate-float-bg"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="z-10 bg-white rounded-xl shadow-lg p-8 w-full max-w-md animate-fade-in-up">
        <h2 className="text-2xl font-bold text-center mb-6">INICIAR SESIÓN</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="w-full mt-1 px-3 py-2 border rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === "checking"}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Contraseña</label>
            <input
              type="password"
              className="w-full mt-1 px-3 py-2 border rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={status === "checking"}
            />
          </div>

          <button
            type="submit"
            disabled={status === "checking"}
            className={`w-full py-2 rounded-md font-semibold transition
              ${
                status === "checking"
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
          >
            {status === "checking" ? "Iniciando sesión..." : "ACCEDER"}
          </button>
        </form>

        {/* Link Olvidaste tu contraseña */}
        <div className="text-center mt-4">
          <button
            onClick={() => setShowForgotModal(true)}
            className="text-blue-600 hover:underline text-sm"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </div>

      {/* Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-20">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Recuperar contraseña</h3>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Tu correo registrado"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded-md"
                  onClick={() => setShowForgotModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 rounded-md text-white ${
                    loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading ? "Enviando..." : "Enviar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
