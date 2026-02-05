// src/components/Header.tsx
"use client"
import Image from "next/image"
import Link from "next/link"
import { Search, User, ShoppingCart, Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Header() {
  const [cantidadCarrito, setCantidadCarrito] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [autenticado, setAutenticado] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)
  const router = useRouter()

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

    // Función para verificar autenticación
    const verificarAutenticacion = () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
      const sessionActive = typeof window !== "undefined" ? sessionStorage.getItem("auth_active") : null
      const nuevoEstado = !!(token && sessionActive)
      setAutenticado(nuevoEstado)
    }

    // Verificar autenticación inicial
    verificarAutenticacion()
    setAuthChecked(true)

    // Escuchar cambios en localStorage desde otras pestañas o eventos
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "nail_store_cart") {
        actualizarContadorCarrito()
      }
      if (e.key === "auth_token" || e.key === "auth_active") {
        verificarAutenticacion()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // También escuchar un evento personalizado (para cambios en la misma pestaña)
    window.addEventListener("carrito-actualizado", actualizarContadorCarrito)
    window.addEventListener("auth-changed", verificarAutenticacion)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("carrito-actualizado", actualizarContadorCarrito)
      window.removeEventListener("auth-changed", verificarAutenticacion)
    }
  }, [])

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
      localStorage.removeItem("user_email")
      localStorage.removeItem("user_nombre")
      localStorage.removeItem("user_fecha")
      sessionStorage.removeItem("auth_active")
      // Disparar evento para actualizar componentes
      window.dispatchEvent(new Event("auth-changed"))
    }
    setAutenticado(false)
    router.push("/")
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition flex-shrink-0">
            <div className="relative w-16 h-16 md:w-20 md:h-20">
              <Image
                src="/logo/logo.png"
                alt="Brenn's - Academia • Distribuidora • Salón"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-2xl font-bold text-gray-900">Brenn's</h1>
              <p className="text-xs md:text-sm text-pink-600 font-medium">Academia • Distribuidora • Salón</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 flex-1 ml-10" aria-label="Navegación principal">
            <Link href="/" className="text-gray-700 hover:text-pink-600 font-medium transition text-sm">Inicio</Link>
            <Link href="/servicios" className="text-gray-700 hover:text-pink-600 font-medium transition text-sm">Servicios</Link>
            <Link href="/cursos" className="text-gray-700 hover:text-pink-600 font-medium transition text-sm">Cursos</Link>
            <Link href="/catalogo" className="text-gray-700 hover:text-pink-600 font-medium transition text-sm">Catálogo</Link>
           <Link href="/error400" className="text-gray-700 hover:text-pink-600 font-medium transition text-sm">Error 400</Link>
            <Link href="/error404" className="text-gray-700 hover:text-pink-600 font-medium transition text-sm">Error 404</Link>
            <Link href="/error500" className="text-gray-700 hover:text-pink-600 font-medium transition text-sm">Error 500</Link>
          </nav>
          {/* Right Icons and CTA */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Icons */}
           

            {authChecked && autenticado && (
              <>
                <Link href="/perfil" className="text-gray-600 hover:text-pink-600 transition p-2 rounded-full hover:bg-pink-50">
                  <User className="w-5 h-5 md:w-6 md:h-6" />
                </Link>
                <button onClick={handleLogout} className="hidden md:inline-block text-sm px-4 py-2 rounded-full border border-pink-200 hover:bg-pink-50 text-pink-600 font-semibold">
                  Cerrar sesión
                </button>
              </>
            )}

            {/* Carrito (solo visible si autenticado) */}
            {authChecked && autenticado && (
              <Link href="/carrito" className="relative">
                <button
                  aria-label={`Carrito de compras - ${cantidadCarrito} artículos`}
                  className="text-gray-600 hover:text-pink-600 transition p-2 rounded-full hover:bg-pink-50"
                >
                  <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
                  {cantidadCarrito > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs font-bold rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center shadow-lg animate-pulse">
                      {cantidadCarrito}
                    </span>
                  )}
                </button>
              </Link>
            )}

            {/* CTA Button - Hidden on small screens */}
            {!(authChecked && autenticado) && (
              <Link
                href="/login"
                className="hidden md:block bg-pink-600 hover:bg-pink-700 text-white font-bold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105 text-sm"
              >
                Iniciar Sesión
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-gray-600 hover:text-pink-600 transition p-2 rounded-full hover:bg-pink-50"
              aria-label="Abrir menú"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="lg:hidden mt-4 pb-4 space-y-3 border-t border-gray-200 pt-4">
            <Link href="/" className="block text-gray-700 hover:text-pink-600 font-medium transition py-2" onClick={() => setMenuOpen(false)}>Inicio</Link>
            <Link href="/servicios" className="block text-gray-700 hover:text-pink-600 font-medium transition py-2" onClick={() => setMenuOpen(false)}>Servicios</Link>
            <Link href="/cursos" className="block text-gray-700 hover:text-pink-600 font-medium transition py-2" onClick={() => setMenuOpen(false)}>Cursos</Link>
            <Link href="/catalogo" className="block text-gray-700 hover:text-pink-600 font-medium transition py-2" onClick={() => setMenuOpen(false)}>Catálogo</Link>
            <Link href="/error400" className="block text-gray-700 hover:text-pink-600 font-medium transition py-2" onClick={() => setMenuOpen(false)}>Error 400</Link>
            <Link href="/error404" className="block text-gray-700 hover:text-pink-600 font-medium transition py-2" onClick={() => setMenuOpen(false)}>Error 404</Link>
            <Link href="/error500" className="block text-gray-700 hover:text-pink-600 font-medium transition py-2" onClick={() => setMenuOpen(false)}>Error 500</Link>
            {authChecked && autenticado ? (
              <>
                <Link href="/carrito" className="block text-gray-700 hover:text-pink-600 font-medium transition py-2" onClick={() => setMenuOpen(false)}>
                  Carrito ({cantidadCarrito})
                </Link>
                <Link href="/perfil" className="block text-gray-700 hover:text-pink-600 font-medium transition py-2" onClick={() => setMenuOpen(false)}>
                  Perfil
                </Link>
                <button onClick={() => { setMenuOpen(false); handleLogout() }} className="block w-full bg-white border border-pink-200 text-pink-600 font-bold px-6 py-2 rounded-full shadow-sm hover:shadow-md transition text-center mt-4">
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block bg-pink-600 hover:bg-pink-700 text-white font-bold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition text-center mt-4"
                onClick={() => setMenuOpen(false)}
              >
                Iniciar Sesión
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
