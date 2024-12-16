import React, { useState } from "react";

const CookieModal = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-gray-100/95 shadow-xl w-[380px] p-6">
        {/* Imagen en la parte alta */}
        <div className="flex justify-center mb-4">
          <img src="/src/assets/Coockies-img.png" className="w-auto" alt="Cookies" />
        </div>

        {/* Separar SVG y botón de configuración */}
        <div className="flex items-center justify-between mb-4">
          {/* SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.46 283.46" className="w-6 h-6">
            <rect width="283.46" height="283.46" fill="#ff7900" />
            <path
              d="M111.2 256a23.23 23.23 0 0 1-13 3.92c-7.36 0-11.71-4.9-11.71-11.46 0-8.83 8.12-13.51 24.85-15.4v-2.19c0-2.87-2.18-4.53-6.2-4.53a11.76 11.76 0 0 0-9.61 4.53l-7-4q5.52-7.71 16.82-7.7c10.28 0 16 4.45 16 11.7v28.6h-9.2zm-14.55-8.3c0 2.65 1.67 5.13 4.68 5.13 3.27 0 6.44-1.36 9.62-4.16v-9.34c-9.7 1.23-14.3 3.72-14.3 8.39zM129.54 221.07l8.59-1.19.94 4.68c4.85-3.55 8.7-5.44 13.55-5.44 8.12 0 12.3 4.31 12.3 12.84v27.47h-10.37v-25.66c0-4.83-1.26-7-5-7-3.1 0-6.19 1.43-9.71 4.38v28.3h-10.3zM233.69 260.18c-11.63 0-18.57-7.47-18.57-20.45s7-20.61 18.4-20.61 18.15 7.25 18.15 20.08c0 .68-.08 1.36-.08 2h-26.27c.08 7.47 3.18 11.24 9.29 11.24 3.93 0 6.52-1.58 8.95-5l7.61 4.22c-3.35 5.58-9.37 8.52-17.48 8.52zm7.78-25.66c0-5.28-3-8.38-7.95-8.38-4.68 0-7.61 3-8 8.38zM34.89 260.61c-10.27 0-19.52-6.54-19.52-20.82S24.62 219 34.89 219s19.52 6.55 19.52 20.82-9.26 20.79-19.52 20.79zm0-32.86c-7.75 0-9.19 7-9.19 12s1.44 12.05 9.19 12.05 9.19-7 9.19-12.05-1.44-12-9.19-12zM61.53 220h9.87v4.64a15.29 15.29 0 0 1 10.87-5.45 8.6 8.6 0 0 1 1.34.07V229h-.5c-4.52 0-9.46.7-11 4.21v26.24H61.53zM190.34 251c7.88-.06 8.54-8.07 8.54-13.31 0-6.16-3-11.18-8.61-11.18-3.73 0-7.89 2.72-7.89 11.61 0 4.88.34 12.93 7.96 12.88zm18.52-31.12v37.35c0 6.6-.5 17.45-19.31 17.57-7.75 0-14.94-3.05-16.38-9.83l10.25-1.65c.43 1.94 1.61 3.88 7.42 3.88 5.39 0 8-2.58 8-8.75v-4.59l-.14-.14c-1.65 2.94-4.16 5.74-10.19 5.74-9.19 0-16.44-6.38-16.44-19.72 0-13.19 7.47-20.57 15.86-20.58 7.87 0 10.79 3.57 11.46 5.46h-.12l.85-4.72zM255.75 206.79h-4.08v11.3h-2.16v-11.3h-4.08v-1.74h10.32zm17 11.3h-2.15V207.2h-.07l-4.27 10.89h-1.36l-4.27-10.89h-.06v10.89h-2.15v-13h3.32l3.89 9.9 3.83-9.9h3.29z"
              fill="#fff"
            />
          </svg>

          {/* Botón de configuración */}
          <button className="text-gray-600 hover:text-black">
            ⚙️ Configurar opciones
          </button>
        </div>

        {/* Título y texto */}
        <h2 className="text-xl font-semibold mb-4">Bienvenido a Orange</h2>
        <p className="text-gray-700 text-sm mb-4">
          Utilizamos cookies propias y de terceros para analizar el uso del sitio 
          web y mostrarte publicidad relacionada con tus preferencias sobre la base 
          de un perfil elaborado a partir de tus hábitos de navegación (por ejemplo, 
          páginas visitadas, clicks en contenidos, etc.).
        </p>
        <p className="text-gray-700 text-sm mb-6">
          Para más información consulta nuestra{" "}
          <a href="#" className="text-orange-500 hover:underline">
            política de cookies
          </a>
          .
        </p>

        {/* Botones de acción */}
        <div className="flex justify-between">
          <button
            className="bg-white/70 border-2 border-black text-black font- px-4 py-2 hover:bg-white"
            onClick={() => setIsVisible(false)} // Cierra el modal
          >
            Rechazar todo
          </button>
          <button
            className="bg-orange text-black font- px-4 py-2 hover:border-2 hover:border-black"
            onClick={() => setIsVisible(false)} // Cierra el modal
          >
            Aceptar todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieModal;