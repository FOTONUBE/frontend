"use client";

import { motion } from "framer-motion";
import { ShoppingCart, School, Users } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: ShoppingCart,
      title: "Vende tus fotos en línea",
      description:
        "Con FOTONUBE puedes publicar y vender tus fotografías, no importa si eres un fotógrafo aficionado, o tienes un gran estudio de fotografía.",
    },
    {
      icon: Users,
      title: "Multiplica tus ventas de fotos",
      description:
        "Los álbumes de FOTONUBE te permiten mostrar simultáneamente tus fotos a múltiples potenciales compradores, dando lugar a una mayor cantidad de ventas proyectadas.",
    },
    {
      icon: School,
      title: "Fotos escolares",
      description:
        "Con la función “Carpetas escolares/deportivas” deja atrás el viejo sistema de pago en efectivo por sobre, tus clientes podrán elegir y pagar en línea sus pedidos de fotos.",
    },
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>
              <div className="lg:h-72 px-10 py-8 bg-gray-800 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
