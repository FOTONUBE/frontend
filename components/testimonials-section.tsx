"use client";

import { useEffect, useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Martín",
    role: "Fotografía de casamientos",
    text: "Les envio a los novios el usuario y contraseña para ver sus fotos, y ellos pasan el acceso a sus amigos y familiares, que también me compran fotos.",
    rating: 5,
  },
  {
    name: "Maria Elena",
    role: "Fotos de colegio",
    text: "Con FOTONUBE organizo muy fácilmente la venta de fotos de colegios, que luego cobro en línea y recibo los pedidos por correo electrónico.",
    rating: 5,
  },
  {
    name: "Javier",
    role: "Fotografía deportiva",
    text: "Cubro eventos deportivos náuticos, principalmente en la categoría Optimist, durante la competencia entrego flyers a los padres para que compren fotos de sus hijos en FOTONUBE. ¡La venta es un éxito!",
    rating: 5,
  },
  {
    name: "Federico",
    role: "Fotoperiodismo",
    text: "Cubro marchas y protestas en CABA, finalizado mi trabajo creo álbumes con el material y se los envío directamente a las agencias de noticias.",
    rating: 5,
  },
];

export default function InfiniteAutoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = 1; // píxeles por tick
    const interval = 50; // milisegundos

    const id = setInterval(() => {
      if (track.scrollLeft >= track.scrollWidth / 2) {
        track.scrollLeft = 0;
      } else {
        track.scrollLeft += speed;
      }
    }, interval);

    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative w-full md:w-10/12 mx-auto py-16 bg-white overflow-hidden"
      id="testimonials"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
          Testimonios
        </h2>

        <div className="relative">
          <div className="absolute left-0 top-0 w-2 md:w-16 h-full bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 w-2 md:w-16 h-full bg-gradient-to-l from-white to-transparent z-10" />

          <div ref={trackRef} className="flex gap-6 overflow-hidden">
            {[...testimonials, ...testimonials].map((item, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[90%] sm:w-[50%] lg:w-[40%]"
              >
                <div className="w-full h-[480px] md:h-[460px] lg:h-[450px] bg-gray-50 p-6 rounded-lg shadow text-center mx-2 flex flex-col justify-between items-center">
                  {/* Avatar con inicial */}
                  <div className="flex justify-center mb-4">
                    <div className="w-24 h-24 flex items-center justify-center rounded-full bg-cyan-100 text-cyan-700 text-2xl font-bold">
                      {item.name?.[0] || "?"}
                    </div>
                  </div>

                  {/* Testimonio */}
                  <p className="italic text-gray-700 mb-4 text-sm md:text-base">
                    "{item.text}"
                  </p>

                  {/* Rating */}
                  <div className="flex justify-center mb-2 space-x-1">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Nombre y rol */}
                  <h4 className="font-bold text-gray-900">{item.name}</h4>
                  <p className="text-sm text-cyan-600">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
