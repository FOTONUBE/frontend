"use client";

import { motion } from "framer-motion";
import { Upload, Settings, DollarSign, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: Upload,
      title: "Sube tus fotos",
      description:
        "Crea fácilmente tus álbumes de fotos desde tu laptop. Organiza y categoriza tus álbumes de manera intuitiva.",
      color: "from-cyan-500 to-blue-600",
    },
    {
      number: "02",
      icon: Settings,
      title: "Configura tu galería",
      description:
        "Personaliza precios, descripciones y crea usuarios con contraseña para acceder a tus álbumes de fotos. Crea una experiencia única para tus clientes.",
      color: "from-blue-500 to-purple-600",
    },
    {
      number: "03",
      icon: Users,
      title: "Comparte con clientes",
      description:
        "Tus clientes podrán registrarse a FOTONUBE y acceder a los álbumes de fotos mediante el usuario y contraseña que les enviaste.",
      color: "from-purple-500 to-pink-600",
    },
    {
      number: "04",
      icon: DollarSign,
      title: "Recibe pagos",
      description:
        "Tus clientes compran fotos, de forma segura, directamente desde la plataforma. Tu recibes pagos seguros y automáticos por cada venta.",
      color: "from-pink-500 to-red-600",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-cyan-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold mb-4"
          >
            ¿Cómo funciona?
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Monetiza tu pasión por la
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
              {" "}
              fotografía
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            En solo 4 pasos simples, transforma tu trabajo fotográfico en una
            fuente de ingresos constante
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <CardContent className="p-8 relative">
                  {/* Background Gradient */}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${step.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}
                  ></div>

                  {/* Step Number */}
                  <div className="flex flex-col items-center space-y-6 md:flex-row lg:items-start lg:gap-10">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}
                    >
                      {step.number}
                    </motion.div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="w-8 h-8 text-gray-700"
                        >
                          <step.icon className="w-full h-full" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {step.title}
                        </h3>
                      </div>

                      <p className="text-gray-600 leading-relaxed text-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Arrow for connection (except last item) */}
                  {index < steps.length - 1 && (
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                      className="absolute bottom left-1/2 transform -translate-x-1/2 lg:hidden"
                    >
                      <div className="w-8 h-8 bg-gray-200 rounded-full shadow-lg flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-cyan-500 rotate-90" />
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>

              {/* Desktop Arrow */}
              {index % 2 === 0 && index < steps.length - 1 && (
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2"
                >
                  <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-cyan-500" />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                ¿Quieres llevar tu negocio fotográfico al siguiente nivel?
              </h3>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
                Sumate a la{" "}
                <span className="font-bold">
                  MASTERCLASS GRATUITA DE LANZAMIENTO
                </span>{" "}
                este <span className="font-bold">viernes 17 de octubre</span>
                <br />
                <span className="text-base text-gray-500">
                  13:00 hs. ARG-URU / 14:00 hs. USA / 18:00 hs. ESP
                </span>
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href="#contacto">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl"
                  >
                    SUSCRÍBETE AHORA
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        {/*    <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                ¿Listo para empezar a generar ingresos?
              </h3>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Únete a miles de fotógrafos que ya están monetizando su trabajo
                con FOTONUBE
              </p>

              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/register"
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg"
                  >
                    Comenzar Gratis
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href="https://www.youtube.com/@fotonubeARG"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-gray-300 text-gray-700 hover:border-cyan-500 hover:text-cyan-600 px-8 py-4 rounded-full text-lg font-semibold bg-transparent"
                    >
                      Ver Demo
                    </Button>
                  </a>
                </motion.div>
              </div>

              <p className="text-sm text-gray-500 mt-4">
                Sin tarjeta de crédito • Configuración en 5 minutos • Soporte
                24/7
              </p>
            </motion.div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
