"use client";

export default function HowToBuyPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Cómo Comprar Fotos en FotoNube
      </h2>
      <ol className="list-decimal pl-6 space-y-3">
        <li>Accede al álbum usando el usuario y contraseña proporcionados.</li>
        <li>
          Explora las fotos disponibles y selecciona las que quieras comprar.
        </li>
        <li>Elige el formato (digital, impreso o pack escolar/deportivo).</li>
        <li>
          Agrega las fotos al carrito y finaliza la compra usando el medio de
          pago deseado.
        </li>
        <li>
          Recibirás tus fotos por correo o podrás descargarlas desde la
          plataforma.
        </li>
      </ol>
    </div>
  );
}
