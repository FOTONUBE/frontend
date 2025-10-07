"use client";

import { motion } from "framer-motion";
import {
  Camera,
  Facebook,
  Instagram,
  Youtube,
  Mail,
  MapPin,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const navigationLinks = [
    { text: "Inicio", href: "#" },
    { text: "Sobre FOTONUBE", href: "#descubre-fotonube" },
    { text: "Testimonios", href: "#testimonials" },
    { text: "Preguntas Frecuentes", href: "#faqs" },
    { text: "Contacto", href: "#" },
  ];

  const contactInfo = [
    { icon: Mail, text: "hola@fotonube.com" },
    { icon: MapPin, text: "Buenos Aires, Argentina" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/FOTONUBE" },
    { icon: Youtube, href: "https://www.youtube.com/@fotonubeARG" },
    { icon: Instagram, href: "https://www.instagram.com/fotonubeok" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-8" id="footer">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              {/*    <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">FOTONUBE</span> */}
              <Image
                src="/logoFooter.png"
                alt="FOTONUBE Logo"
                width={150}
                height={50}
                className="object-contain"
              />
            </div>
            <p className="text-gray-400 text-base leading-relaxed">
              FOTONUBE es una plataforma ecommerce diseñada especialmente para
              publicar, vender y cobrar en línea la venta de fotos.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">NAVEGAR</h3>
            <ul className="space-y-2">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.text}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">CONTACTANOS</h3>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <item.icon className="w-4 h-4 text-cyan-500" />
                  <span className="text-gray-400 text-sm">{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">SÍGUENOS</h3>
            <p className="text-gray-400 text-sm mb-4">
              Mantente al día con las últimas actualizaciones y consejos para
              fotógrafos.
            </p>
            <div className="flex space-x-3 md:space-x-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center border-t border-gray-800 mt-12 pt-8 text-center md:text-left gap-4"
        >
          <p className="text-gray-400 text-xs">
            © Copyright FOTONUBE. All Rights Reserved.
          </p>

          <div className="flex items-center justify-center space-x-4 text-xs">
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Términos del servicio
            </a>
            <span className="w-px h-4 bg-gray-500" />
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Política de privacidad
            </a>
          </div>

          <p className="text-gray-500 text-xs">
            Desarrollado por{" "}
            <a
              href="https://www.paltani.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-500 hover:underline"
            >
              Paltani
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
