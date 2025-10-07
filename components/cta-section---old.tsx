"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-teal-500 to-cyan-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6">
            Publica y vende tus fotos en línea
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Cambia para siempre la forma de mostrar y vender tu trabajo como
            fotógrafo.
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a href="#newsletter">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-teal-600 hover:bg-gray-100 border-white px-8 py-3 rounded-full text-lg font-semibold"
              >
                SUSCRIBIR NEWSLETTER
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
