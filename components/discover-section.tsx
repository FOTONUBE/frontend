"use client";

import { motion } from "framer-motion";
import {
  BadgeDollarSign,
  Camera,
  CreditCard,
  ImageIcon,
  Lock,
  Share2,
} from "lucide-react";

export default function DiscoverSection() {
  const features = [
    {
      icon: Camera,
      title: "Fotos y ventas en línea",
      description:
        "Podrás crear un álbum en línea con todas las fotos de un evento, ya sea deportivo, corporativo o social y venderlas fácilmente desde FOTONUBE.",
    },
    {
      icon: Share2,
      title: "Multiplica ventas",
      description:
        "Los álbumes en línea de eventos que subes a FOTONUBE te permiten mostrar simultáneamente las fotos a múltiples potenciales compradores, dando lugar a una mayor cantidad de ventas proyectadas.",
    },
    {
      icon: ImageIcon,
      title: "Fotos escolares/deportivas",
      description:
        "Sube tus fotos escolares o de eventos deportivos a FOTONUBE, tus clientes podrán elegir las fotos en línea y pagar sus pedidos desde Mercado Pago.",
    },
    {
      icon: CreditCard,
      title: "Gestión de pedidos",
      description:
        "Con FOTONUBE puedes organizar los pedidos que recibes en tres posibles instancias, “Pendiente”, “En proceso” y “Entregado”.",
    },
    {
      icon: Lock,
      title: "Acceso restringido",
      description:
        "Al crear un álbum en FOTONUBE, puedes definir usuario y contraseña para restringir el acceso y asi proteger la privacidad de tus clientes.",
    },
    {
      icon: BadgeDollarSign,
      title: "Pago 100% en línea",
      description:
        "Las ventas de tus fotos pueden ser fácilmente pagadas por tus clientes, a través de Mercado Pago.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50" id="descubre-fotonube">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            DESCUBRE FOTONUBE
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conoce las funciones que ofrece FOTONUBE que cambiarán para siempre
            la forma de comercializar tu trabajo como fotógrafo.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4"
              >
                <feature.icon className="w-6 h-6 text-cyan-600" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
