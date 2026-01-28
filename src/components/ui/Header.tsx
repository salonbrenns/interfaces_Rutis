// src/components/Header.tsx
"use client"
import Image from "next/image"
import Link from "next/link"
import { Search, User, ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"

export default function Header() {
  const [cantidadCarrito, setCantidadCarrito] = useState(0)

  // Función para leer el carrito y actualizar el contador
  const actualizarContadorCarrito = () => {
    const stored = localStorage.getItem("nail_store_cart")
    if (stored) {
      const carrito = JSON.parse(stored)
      const total = carrito.reduce((sum: number, item: any) => sum + item.cantidad, 0)
      setCantidadCarrito(total)
    } else {
      setCantidadCarrito(0)
    }
  }

  // Cargar al inicio
  useEffect(() => {
    actualizarContadorCarrito()

    // Escuchar cambios en localStorage desde otras pestañas o eventos
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "nail_store_cart") {
        actualizarContadorCarrito()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // También escuchar un evento personalizado (para cambios en la misma pestaña)
    window.addEventListener("carrito-actualizado", actualizarContadorCarrito)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("carrito-actualizado", actualizarContadorCarrito)
    }
  }, [])

  return (
    <header className="08bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 hover:opacity-90 transition">
            <div className="relative w-24 h-24">
              <Image
                src="/logo/logo.png"
                alt="Brenn's - Academia • Distribuidora • Salón"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Brenn's</h1>
              <p className="text-sm text-pink-600 font-medium">Academia • Distribuidora • Salón</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-10" aria-label="Navegación principal">
            <Link href="/" className="text-gray-700 hover:text-pink-600 font-medium transition">Inicio</Link>
            <Link href="/servicios" className="text-gray-700 hover:text-pink-600 font-medium transition">Servicios</Link>
            <Link href="/cursos" className="text-gray-700 hover:text-pink-600 font-medium transition">Cursos</Link>
            <Link href="/catalogo" className="text-gray-700 hover:text-pink-600 font-medium transition">Catálogo</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/agendar"
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105"
            >
              Agendar Cita
            </Link>

            <div className="flex items-center gap-5 ml-4">
              <button aria-label="Buscar" className="text-gray-600 hover:text-pink-600 transition p-2 rounded-full hover:bg-pink-50">
                <Search className="w-6 h-6" />
              </button>

              <Link href="/perfil" className="text-gray-600 hover:text-pink-600 transition p-2 rounded-full hover:bg-pink-50">
                <User className="w-6 h-6" />
              </Link>

              {/* ICONO DEL CARRITO CON CONTADOR */}
              <Link href="/carrito" className="relative">
                <button 
                  aria-label={`Carrito de compras - ${cantidadCarrito} artículos`}
                  className="text-gray-600 hover:text-pink-600 transition p-2 rounded-full hover:bg-pink-50"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {cantidadCarrito > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse">
                      {cantidadCarrito}
                    </span>
                  )}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}