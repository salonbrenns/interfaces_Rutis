// src/app/producto/[id]/page.tsx
"use client"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft, Star, Plus, Minus, ShoppingBag, CheckCircle } from "lucide-react"

// Base de datos de productos (actualizada con QR)
const productos = {
  "1": {
    id: 1,
    nombre: "Esmalte Rojo",
    precio: 15000,
    categoria: "Nail Art",
    marca: "Renova Matte",
    img: "/catalogo/Rojo.jpg",
    qr: "/catalogo/zBTCIY.png",
    rating: 4.5,
    reviews: 128,
    descripcion: "Un hermoso esmalte de color rojo que aporta un toque de elegancia a tus uñas. Su fórmula de larga duración asegura un acabado brillante y duradero.",
  },
  "2": {
    id: 2,
    nombre: "Removedor Sin Acetona",
    precio: 16000,
    categoria: "Foot Care",
    marca: "Brenn's Care",
    img: "/catalogo/renovador.jpg",
    qr: "/catalogo/zBTCIY.png",
    rating: 4.8,
    reviews: 89,
    descripcion: "Removedor suave sin acetona, ideal para uñas sensibles. No reseca ni debilita la uña natural.",
  },
  "3": {
    id: 3,
    nombre: "Kit Manicura Profesional",
    precio: 45000,
    categoria: "Salon Pro",
    marca: "Brenn's",
    img: "/catalogo/kit.jpg",
    qr: "/catalogo/zBTCIY.png",
    rating: 5.0,
    reviews: 203,
    descripcion: "Kit completo con todo lo necesario para manicura profesional en casa o salón.",
  }
}

export default async function ProductoDetalle({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const producto = productos[id as keyof typeof productos]

  if (!producto) {
    notFound()
  }

  const agregarAlCarrito = () => {
    const stored = localStorage.getItem("nail_store_cart") || "[]"
    const carrito = JSON.parse(stored)

    const existe = carrito.find((item: any) => item.id === producto.id)
    const cantidad = 1

    let nuevoCarrito
    if (existe) {
      nuevoCarrito = carrito.map((item: any) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      )
    } else {
      nuevoCarrito = [...carrito, {
        id: producto.id,
        nombre: producto.nombre,
        categoria: producto.categoria,
        precio: producto.precio,
        cantidad,
        img: producto.img,
      }]
    }

    localStorage.setItem("nail_store_cart", JSON.stringify(nuevoCarrito))

    const toast = document.createElement("div")
    toast.textContent = `¡${cantidad} ${producto.nombre} agregado al carrito!`
    toast.style.cssText = `
      position:fixed;bottom:30px;left:50%;transform:translateX(-50%);
      background:#ec4899;color:white;padding:16px 40px;border-radius:50px;
      font-weight:bold;z-index:9999;box-shadow:0 10px 30px rgba(0,0,0,0.3);
      transition:opacity 0.4s;
    `
    document.body.appendChild(toast)
    setTimeout(() => toast.style.opacity = "0", 2200)
    setTimeout(() => toast.remove(), 2600)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 py-12">
      <div className="max-w-6xl mx-auto px-6">

        {/* Volver */}
        <Link href="/catalogo" className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-semibold mb-8">
          <ChevronLeft className="w-5 h-5" />
          Volver al Catálogo
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Imagen del producto - Más pequeña */}
          <div className="flex flex-col gap-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={producto.img}
                alt={producto.nombre}
                width={600}
                height={600}
                className="object-cover w-full h-auto"
                priority
              />
            </div>

           
          </div>

          {/* Detalles */}
          <div className="space-y-8">

            <div>
              <span className="inline-block bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-bold mb-4">
                {producto.categoria}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                {producto.nombre}
              </h1>
              <p className="text-lg text-pink-600 font-medium">{producto.marca}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(producto.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="text-gray-600 text-sm">({producto.rating}) • {producto.reviews} reseñas</span>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              {producto.descripcion}
            </p>

            {/* Precio */}
            <div className="bg-gradient-to-r from-pink-100 to-pink-50 rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-pink-600">
                ${(producto.precio / 100).toFixed(2)}
                <span className="text-xl font-normal text-gray-600"> MXN</span>
              </p>
            </div>

            {/* Botón carrito */}
            <button
              onClick={agregarAlCarrito}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold text-lg py-4 rounded-full shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              Agregar al Carrito
            </button>

             {/* QR Code - Más pequeño y al lado de la imagen principal en móvil */}
            <div className="bg-white rounded-2xl p-6 shadow-xl text-center">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Escanea el QR</h3>
              <p className="text-sm text-gray-600 mb-4">Comparte este producto con tus amigos</p>
              <div className="flex justify-center">
                <div className="relative rounded-xl overflow-hidden max-w-[200px]">
                  <Image
                    src={producto.qr}
                    alt={`QR Code de ${producto.nombre}`}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}