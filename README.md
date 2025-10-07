# FotoNube

FotoNube es una aplicación web desarrollada con Next.js y Tailwind CSS que permite a los usuarios almacenar, organizar y compartir sus fotografías en la nube de manera sencilla y segura.

## Características

- **Almacenamiento en la nube:** Guarda tus fotos de forma segura y accede a ellas desde cualquier dispositivo.
- **Organización eficiente:** Crea álbumes, etiquetas y busca tus fotos fácilmente.
- **Compartir:** Comparte tus álbumes o fotos individuales con amigos y familiares mediante enlaces seguros.
- **Interfaz moderna:** Diseño responsivo y atractivo gracias a Tailwind CSS.
- **Autenticación:** Acceso seguro mediante autenticación de usuarios.
- **Notificaciones:** Recibe notificaciones sobre actividades importantes en tu cuenta.

## Estructura del Proyecto

```
├── app/                # Páginas principales y layout de la app
├── components/         # Componentes reutilizables de la interfaz
│   └── ui/             # Componentes UI específicos
├── hooks/              # Custom hooks de React
├── lib/                # Lógica de negocio y utilidades
├── public/             # Archivos públicos (imágenes, favicon, etc.)
├── styles/             # Archivos de estilos globales
├── package.json        # Dependencias y scripts del proyecto
├── tailwind.config.ts  # Configuración de Tailwind CSS
├── tsconfig.json       # Configuración de TypeScript
```

## Instalación

1. Clona el repositorio:

   ```sh
   git clone https://github.com/tu-usuario/Next-FotoNube.git
   cd Next-FotoNube
   ```

2. Instala las dependencias:

   ```sh
   pnpm install
   ```

3. Inicia el servidor de desarrollo:

   ```sh
   pnpm dev
   ```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts Disponibles

- `pnpm dev` — Inicia el servidor de desarrollo.
- `pnpm build` — Genera la versión de producción.
- `pnpm start` — Inicia la app en modo producción.

## Tecnologías Utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Contribuciones

¡Las contribuciones son bienvenidas! Por favor, abre un issue o un pull request para sugerir mejoras o reportar errores.

## Licencia

Este proyecto está bajo la licencia MIT.

---

Desarrollado con ❤️ por el Mauri 😘
