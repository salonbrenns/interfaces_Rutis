// src/app/page.tsx
import Image from "next/image"
import Link from "next/link"
import { Sparkles } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-white">

      {/* Banner de Oferta del Día */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-center">
          <Sparkles className="w-6 h-6 animate-pulse" />
          <p className="font-bold text-lg">
            Super Oferta del Día! — 20% de descuento en Material de Uñas
          </p>
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
      </div>

      {/* Hero Principal */}
      <section className="pt-16 pb-24 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Texto */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 leading-tight">
                Tu Belleza,<br />
                <span className="text-pink-600">Nuestra Pasión</span>
              </h1>

              <p className="text-gray-700 text-lg sm:text-xl mt-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Academia Brenn's tiene como objetivo principal, educar con excelencia a las Manicuristas y Pedicuristas de Huejutla y sus Alrededores. Además contamos con venta de material, a un costo accesible pero de excelente calidad. Somos tu mejor opción.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 mt-12 justify-center lg:justify-start">
                <Link
                  href="/agendar"
                  className="bg-pink-600 hover:bg-pink-700 text-white font-bold text-xl px-10 py-5 rounded-full shadow-2xl transition transform hover:scale-105 flex items-center justify-center gap-3"
                >
                  Reservar Ahora
                </Link>

                <Link
                  href="/servicios"
                  className="border-2 border-pink-600 text-pink-600 hover:bg-pink-50 font-bold text-xl px-10 py-5 rounded-full transition transform hover:scale-105 flex items-center justify-center gap-3"
                >
                  Ver Servicios
                </Link>
              </div>
            </div>

            {/* Imagen de la tienda */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="bg-gradient-to-br from-pink-200 to-purple-200 rounded-3xl p-8 shadow-2xl">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="/logo/portada.jpg"  
                      alt="Academia y Distribuidora Brenn's"
                      width={800}
                      height={800}
                      className="w-full h-auto object-cover rounded-2xl"
                      priority
                    />
                    
                    {/* Etiqueta Instagram */}
                    <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl">
                      <p className="text-2xl font-bold text-pink-600">
                        @Academia_Distribuidora_Brenns
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>      
    </main>
  )
}