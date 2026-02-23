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
      text: "Comisión por transacción 19.99%.",
      icon: Circle,
      color: "text-gray-400",
    },
    { text: "Soporte estándar", icon: Circle, color: "text-gray-400" },
  ],
  Pro: [
    {
      text: "Hasta 10 álbumes (máximo).",
      icon: Check,
      color: "text-cyan-600",
    },
    {
      text: "Hasta 400 fotos por álbum (máximo).",
      icon: Check,
      color: "text-cyan-600",
    },
    {
      text: "Hasta 20 GB de recursos en la nube.",
      icon: Check,
      color: "text-cyan-600",
    },
    {
      text: "Comisión reducida por transacción 9.99%.",
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
  const currentFeatures = planFeatures[activeSubscription.plan.name] || [];
  const proBenefits = planFeatures["Pro"];
  const DOLLAR_RATE = 1465;

  return (
    <div className="flex flex-col items-center px-4 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
        Suscríbete a FOTONUBE Pro según tus necesidades ☁️
      </h1>
      <p className="text-lg text-gray-600 mb-10 text-center max-w-2xl">
        Planes flexibles diseñados para potenciar tu negocio fotográfico.
      </p>

      {/* Plan actual */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-4xl p-8 rounded-xl shadow-xl flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8 mb-12 border-t-4 ${isUserPro
          ? "border-indigo-600 bg-gradient-to-r from-indigo-50 to-indigo-100"
          : "border-gray-300 bg-white"
          }`}
      >
        <div className="flex-1">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-indigo-600 rounded-full mb-2">
            Tu Plan Actual
          </span>
          <h2
            className={`text-3xl font-bold ${isUserPro ? "text-indigo-800" : "text-gray-800"
              }`}
          >
            {activeSubscription.plan.name}
          </h2>

          <p className="text-gray-500 mt-2">
            {isUserPro
              ? "Disfrutas de beneficios Pro y tu cuenta está activa."
              : "Estás en la versión gratuita. ¡Es hora de subir de nivel!"}
          </p>

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

      {/* Solo mostrar planes si NO es Pro */}
      {!isUserPro && (
        <>
          <div className="w-full max-w-4xl mb-16 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              ¡Es hora de suscribirte a{" "}
              <span className="text-indigo-600">FOTONUBE Pro</span>!
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

          {/* Planes Pro */}
          <div className="w-full max-w-6xl">
            <h3 className="text-4xl font-extrabold text-gray-900 mb-2 text-center">
              ESCOGE TU PLAN AHORA
            </h3>
            <p className="text-cyan-600 font-semibold mb-10 text-center">
              potencia tu negocio fotográfico
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans
                .filter((p) => p.name === "Pro")
                .sort((a, b) => a.durationMonths - b.durationMonths)
                .map((plan, index) => {
                  const usdLaunch = Math.round(plan.price / DOLLAR_RATE);
                  const usdRegular = Math.round(usdLaunch * 1.35);

                  return (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 + index * 0.1 }}
                      className="flex flex-col items-center justify-between border rounded-xl shadow-lg bg-white p-6 relative overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all"
                    >
                      <h3 className="text-cyan-700 font-extrabold text-xl mb-1">
                        FOTONUBE Pro
                      </h3>
                      <p className="font-bold text-gray-800 mb-4">
                        {plan.durationMonths}{" "}
                        {plan.durationMonths > 1 ? "MESES" : "MES"}
                      </p>

                      <p className="text-gray-500 mb-1 text-sm font-semibold">
                        Precio REGULAR
                      </p>
                      <p className="text-2xl text-gray-400 line-through mb-3">
                        U$S {usdRegular}
                      </p>

                      <div className="bg-lime-400 font-bold p-3 rounded-md text-gray-900 w-full text-center">
                        <p className="text-sm">
                          Precio LANZAMIENTO <br />
                          {/*   <span className="text-gray-800">
                            Hasta el <b>31/10/2025</b>
                          </span> */}
                        </p>
                        <p className="text-3xl mt-1">U$S {usdLaunch}</p>
                      </div>

                      <p className="text-xs text-gray-500 mt-2 text-center">
                        * Este valor será cobrado en pesos argentinos a través de Mercado Pago.
                      </p>

                      <button
                        onClick={async () => {
                          const order = await createOrder(plan.id);
                          if (order) await payOrder(order.id);
                        }}
                        className="mt-6 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg shadow-md w-full"
                      >
                        Suscribirme
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
        </>
      )}
    </div>
  );
}
