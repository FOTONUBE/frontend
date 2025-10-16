"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export const HeroMasterclass = () => {
  return (
    <section className="mt-6 relative w-full h-screen flex items-center justify-center px-4">
      {/* Contenedor interno */}
      <motion.a
        href="#contacto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="hidden md:flex relative w-[95%] h-[85%] rounded overflow-hidden shadow-2xl bg-black"
      >
        {/* Imagen adaptada */}
        <Image
          src="/carousel/master-class.jpg"
          alt="Masterclass"
          fill
          priority
          className="object-contain"
        />
      </motion.a>

      {/* Mobile */}
      <motion.a
        href="#contacto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex md:hidden relative w-full h-[85%] rounded overflow-hidden shadow-2xl bg-black"
      >
        {/* Imagen adaptada */}
        <Image
          src="/carousel/master-class-mobile.jpg"
          alt="Masterclass"
          fill
          priority
          className="object-contain"
        />
      </motion.a>
    </section>
  );
};
