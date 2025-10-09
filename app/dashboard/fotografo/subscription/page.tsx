"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import { Check, Circle, Calendar } from "lucide-react";
import { motion } from "framer-motion";

// 📌 Centralizamos features de cada plan
const planFeatures: Record<
  string,
  { text: string; icon: any; color: string }[]
> = {
  Free: [
    { text: "1 álbum activo.", icon: Circle, color: "text-gray-400" },
    {
      text: "200 fotos por álbum (máximo).",
      icon: Circle,
      color: "text-gray-400",
    },
    {
      text: "1 GB de recursos en la nube.",
      icon: Circle,
      color: "text-gray-400",
    },
    {
      text: "Comisión por transacción 14.99%.",
      icon: Circle,
      color: "text-gray-400",
    },
    { text: "Soporte estándar", icon: Circle, color: "text-gray-400" },
  ],
  Pro: [
    {
      text: "Hasta 10 álbumes activos (máximo).",
      icon: Check,
      color: "text-cyan-600",
    },
    {
      text: "400 fotos por álbum activo (máximo).",
      icon: Check,
      color: "text-cyan-600",
    },
    {
      text: "20 GB de recursos en la nube.",
      icon: Check,
      color: "text-cyan-600",
    },
    {
      text: "Comisión reducida al 4.99% por venta.",
      icon: Check,
      color: "text-cyan-600",
    },
    {
      text: "Soporte prioritario (respuesta en menos de 12hs).",
      icon: Check,
      color: "text-cyan-600",
    },
  ],
};

export default function SubscriptionScreen() {
  const {
    plans,
    activeSubscription,
    loadPlans,
    loadActiveSubscription,
    createOrder,
    payOrder,
  } = useSubscriptionStore();

  useEffect(() => {
    loadPlans();
    loadActiveSubscription();
  }, []);

  if (!plans.length) return <p>Cargando planes...</p>;
  if (!activeSubscription) return <p>Cargando suscripción...</p>;

  const isUserPro = activeSubscription.plan.name === "Pro";

  const allProPlans = plans.filter((p) => p.name === "Pro");
  const availableProPlans = allProPlans.filter(
    (p) => p.durationMonths > activeSubscription.plan.durationMonths
  );
  const sortedProPlans = availableProPlans.sort((a, b) => b.price - a.price);

  // Features del plan actual
  const currentFeatures = planFeatures[activeSubscription.plan.name] || [];

  // Beneficios Pro solo para la sección intermedia
  const proBenefits = planFeatures["Pro"];

  return (
    <div className="flex flex-col items-center px-4 min-h-screen">
      {/* Encabezado */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
        Suscríbete a FOTONUBE Pro según tus necesidades ☁️
      </h1>
      <p className="text-lg text-gray-600 mb-10 text-center max-w-2xl">
        Planes flexibles diseñados para potenciar tu negocio fotográfico.
      </p>

      {/* Suscripción Actual */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-4xl p-8 rounded-xl shadow-xl flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8 mb-12 border-t-4 ${
          isUserPro
            ? "border-indigo-600 bg-gradient-to-r from-indigo-50 to-indigo-100"
            : "border-gray-300 bg-white"
        }`}
      >
        <div className="flex-1">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-indigo-600 rounded-full mb-2">
            Tu Plan Actual
          </span>
          <h2
            className={`text-3xl font-bold ${
              isUserPro ? "text-indigo-800" : "text-gray-800"
            }`}
          >
            {activeSubscription.plan.name}
          </h2>

          {/* Estado */}
          {activeSubscription.endDate ? (
            <p className="text-sm font-medium text-indigo-700 mt-1">
              Suscripción activa
            </p>
          ) : (
            <p className="text-sm font-medium text-gray-500 mt-1">
              Plan activo indefinidamente
            </p>
          )}

          <p className="text-gray-500 mt-2">
            {isUserPro
              ? "Disfrutas de beneficios Pro y tu cuenta está activa."
              : "Estás en la versión gratuita. ¡Es hora de subir de nivel!"}
          </p>

          {/* Features del plan actual */}
          <div className="mt-4 grid grid-cols-2 gap-y-3 gap-x-6 text-gray-700 text-sm">
            {currentFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <feature.icon className={`w-4 h-4 ${feature.color}`} />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col text-sm text-gray-600 space-y-3 p-4 bg-indigo-50 rounded-lg">
          <div className="flex justify-between items-center w-full gap-2">
            <Calendar className="w-4 h-4 text-indigo-500 mr-1" />
            <span className="font-medium text-gray-700">Inicio:</span>
            <span className="font-semibold text-indigo-700">
              {new Date(activeSubscription.startDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between items-center w-full">
            <Calendar className="w-4 h-4 text-indigo-500 mr-1" />
            <span className="font-medium text-gray-700">Vence:</span>
            <span className="font-semibold text-indigo-700">
              {activeSubscription.endDate
                ? new Date(activeSubscription.endDate).toLocaleDateString()
                : "Indefinido"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Beneficios Pro */}
      {!isUserPro && (
        <div className="w-full max-w-4xl mb-16 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            ¡Es hora de suscribirte a{" "}
            <span className="text-indigo-600">FotoNube Pro</span>!
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Escoge el plan que mejor se adapte a tus necesidades y desbloquea
            todo el potencial de tu negocio fotográfico 🚀
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {proBenefits.map((benefit, i) => (
              <div key={i} className="flex items-start space-x-3">
                <Check className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-gray-700 text-base">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Planes Pro */}
      {sortedProPlans.length > 0 && (
        <div className="w-full max-w-5xl">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Mejora tu Plan Pro
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProPlans.map((plan, index) => {
              const isRecommended = index === 0;

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 + index * 0.1 }}
                  className={`flex flex-col justify-between p-6 rounded-xl shadow-lg transition-all duration-300 border relative
                    ${
                      isRecommended
                        ? "bg-white border-cyan-600 ring-4 ring-cyan-100 scale-[1.05] hover:scale-[1.07] shadow-xl"
                        : "bg-white border-gray-100 scale-[0.95] hover:scale-[0.97] shadow-md"
                    }`}
                >
                  {isRecommended && (
                    <motion.span
                      initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className="absolute top-0 right-0 bg-cyan-600 text-white text-xs font-bold py-1 px-4 rounded-bl-lg rounded-tr-xl uppercase tracking-wider shadow-lg"
                    >
                      Mejor Valor
                    </motion.span>
                  )}

                  <div className="h-full flex flex-col justify-between">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      FOTONUBE Pro ({plan.durationMonths} meses)
                    </h4>
                    <p className="text-gray-500 mb-4">{plan.description}</p>
                    <p className="text-4xl font-extrabold text-blue-600 mb-2 bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
                      ${plan.price}
                    </p>
                    <p className="text-sm font-medium text-gray-500 mb-4">
                      Pago único
                      {/*  por {plan.durationMonths}{" "}
                      {plan.durationMonths > 1 ? "meses" : "mes"} */}
                    </p>
                  </div>

                  <button
                    onClick={async () => {
                      const order = await createOrder(plan.id);
                      if (order) await payOrder(order.id);
                    }}
                    className={`mt-6 py-3 w-full rounded-lg font-bold transition-colors ${
                      isRecommended
                        ? "bg-cyan-600 text-white hover:bg-cyan-700 shadow-md shadow-cyan-200"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                  >
                    Mejorar a este Plan
                  </button>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 flex justify-center items-center text-gray-500 text-xs space-x-3">
            <span>Pago 100% seguro con</span>
            <Image
              src="/mercadopagoIcon.webp"
              alt="Mercado Pago"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span>y las principales tarjetas de crédito.</span>
          </div>
        </div>
      )}
    </div>
  );
}
