"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { subscribeToMasterclass } from "@/actions/subscribe/subscribe.action";
import { toast } from "sonner";

export default function ContactSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await subscribeToMasterclass(email);

    if (result.success) {
      toast.success("¡Gracias! Te suscribiste correctamente.");

      setEmail("");
    } else {
      toast.error("Error: " + result.error);
    }

    setLoading(false);
  };

  return (
    <section className="py-20 bg-gray-900 text-white" id="contacto">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* Título */}
          <h2 className="text-4xl font-bold mb-6">
            Súmate a la comunidad FOTONUBE
          </h2>

          {/* Bajada */}
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Suscríbete a nuestro newsletter informativo y recibe novedades sobre próximas actualizaciones de <span className="font-semibold">FOTONUBE</span>.
          </p>

          {/* Formulario */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="email"
                placeholder="tucorreo@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white text-gray-900 border-0 h-12"
              />
            </div>
            <Button
              size="lg"
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 h-12 rounded-md font-semibold"
              disabled={loading}
            >
              {loading ? "Enviando..." : "SUSCRÍBETE AHORA"}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
