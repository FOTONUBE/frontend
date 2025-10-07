"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RegisterPage() {
  const [role, setRole] = useState<"photographer" | "buyer">("photographer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { register, user } = useAuthStore();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = await register(email, password, role);
    if (!ok) {
      alert("Hubo un error al registrarse");
      return;
    }

    router.push("/dashboard");
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Imagen de fondo con movimiento suave */}
      <div className="absolute inset-0">
        <img
          src="https://fotonube.com/websim/images/fondo-imagen-FOTONUBE-eventos.jpg"
          alt="Fondo Fotonube"
          className="w-full h-full object-cover animate-float-bg"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Contenido centrado */}
      <div className="z-10 bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">REGISTRARSE</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex justify-center gap-4 mb-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name="role"
                value="photographer"
                checked={role === "photographer"}
                onChange={() => setRole("photographer")}
              />
              SOY FOTÓGRAFO
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name="role"
                value="buyer"
                checked={role === "buyer"}
                onChange={() => setRole("buyer")}
              />
              QUIERO COMPRAR FOTOS
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="w-full mt-1 px-3 py-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Contraseña</label>
            <input
              type="password"
              className="w-full mt-1 px-3 py-2 border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            REGISTRARSE
          </button>
        </form>
      </div>
    </div>
  );
}
