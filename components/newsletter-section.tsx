"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export default function NewsletterSection() {
  return (
    <section className="py-20 bg-gray-900 text-white" id="newsletter">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-6">PRÓXIMO LANZAMIENTO</h2>
          <p className="text-lg text-gray-300 mb-8">
            Entérate primero del lanzamiento de FOTONUBE. Suscríbete a nuestro
            newsletter informativo.
          </p>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="email"
                placeholder="tucorreo@email.com"
                className="pl-10 bg-white text-gray-900 border-0 h-12"
              />
            </div>
            <Button
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 h-12 rounded-md font-semibold"
            >
              SUSCRIBIR
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
