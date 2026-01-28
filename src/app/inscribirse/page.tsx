// src/app/inscribirse/page.tsx
"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { CreditCard, Lock, CheckCircle, ArrowLeft, User, Calendar, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function InscribirsePage() {
  const searchParams = useSearchParams()

  // Datos del curso desde el enlace (cuando hagas clic en "Inscribirme Ahora")
  const curso = {
    id: searchParams.get("id") || "1",
    titulo: searchParams.get("titulo") || "Curso seleccionado",
    instructora: searchParams.get("instructora") || "Brenn's",
    precio: Number(searchParams.get("precio")) || 2500,
    cupos: Number(searchParams.get("cupos")) || 3,
  }

  const [formData, setFormData] = useState({
    nombre: "", apellido: "", correo: "", telefono: "",
    nombreTarjeta: "", numeroTarjeta: "", expiracion: "", cvv: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="sr-only">Inscripción y pago del curso - Brenn's</h1>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Formulario de pago */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl p-8">

              {/* Progreso */}
              <div className="flex gap-4 mb-10 justify-center">
                <div className="px-8 py-4 rounded-full bg-pink-600 text-white font-bold">Datos y Pago</div>
              </div>

              <form className="space-y-8" aria-label="Formulario de inscripción y pago">

                {/* Nombre y Apellido */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nombre" className="block text-lg font-bold mb-2">Nombre</label>
                    <input id="nombre" name="nombre" onChange={handleChange} required
                      className="w-full px-6 py-4 rounded-full border-2 border-pink-200 focus:border-pink-500 focus:outline-none"
                      placeholder="Ruth" />
                  </div>
                  <div>
                    <label htmlFor="apellido" className="block text-lg font-bold mb-2">Apellido</label>
                    <input id="apellido" name="apellido" onChange={handleChange} required
                      className="w-full px-6 py-4 rounded-full border-2 border-pink-200 focus:border-pink-500 focus:outline-none"
                      placeholder="Barrientos Angeles" />
                  </div>
                </div>

                {/* Correo y Teléfono */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="correo" className="block text-lg font-bold mb-2">Correo electrónico</label>
                    <input id="correo" type="email" name="correo" onChange={handleChange} required
                      className="w-full px-6 py-4 rounded-full border-2 border-pink-200 focus:border-pink-500 focus:outline-none"
                      placeholder="ruth.barrientos@uthh.edu.mx" />
                  </div>
                  <div>
                    <label htmlFor="telefono" className="block text-lg font-bold mb-2">Teléfono</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-5 rounded-l-full bg-gray-100 border-2 border-pink-200 border-r-0 text-gray-600">MX +52</span>
                      <input id="telefono" name="telefono" onChange={handleChange} required
                        className="w-full px-6 py-4 rounded-r-full border-2 border-pink-200 focus:border-pink-500 focus:outline-none"
                        placeholder="961 123 4567" />
                    </div>
                  </div>
                </div>

                {/* Datos de tarjeta */}
                <div className="space-y-6">
                  <div className="relative">
                    <label htmlFor="nombreTarjeta" className="block text-lg font-bold mb-2">Nombre en la tarjeta</label>
                    <input id="nombreTarjeta" name="nombreTarjeta" onChange={handleChange} required
                      className="w-full px-6 py-4 rounded-full border-2 border-pink-200 focus:border-pink-500 focus:outline-none"
                      placeholder="Ruth Barrientos Angeles" />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 relative">
                      <label htmlFor="numeroTarjeta" className="block text-lg font-bold mb-2">Número de tarjeta</label>
                      <input id="numeroTarjeta" name="numeroTarjeta" onChange={handleChange} maxLength={19} required
                        className="w-full px-6 py-4 pl-16 rounded-full border-2 border-pink-200 focus:border-pink-500 focus:outline-none"
                        placeholder="1234 5678 9012 3456" />
                      <CreditCard className="absolute left-5 top-12 w-8 h-8 text-pink-600 pointer-events-none" />
                    </div>
                    <div>
                      <label htmlFor="expiracion" className="block text-lg font-bold mb-2">MM/AA</label>
                      <input id="expiracion" name="expiracion" onChange={handleChange} required
                        className="w-full px-6 py-4 rounded-full border-2 border-pink-200 focus:border-pink-500 focus:outline-none"
                        placeholder="12/28" />
                    </div>
                    <div className="md:col-span-3">
                      <label htmlFor="cvv" className="block text-lg font-bold mb-2">CVV</label>
                      <input id="cvv" name="cvv" onChange={handleChange} maxLength={4} required
                        className="w-full px-6 py-4 rounded-full border-2 border-pink-200 focus:border-pink-500 focus:outline-none"
                        placeholder="123" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <Lock className="w-6 h-6 text-pink-600" />
                  <p>Pago 100% seguro con encriptación SSL • Tus datos nunca se guardan</p>
                </div>

                {/* BOTÓN DE PAGO */}
                <div className="text-center pt-8">
                  <button
                    type="button"
                    onClick={() => {
                      alert(`¡FELICIDADES RUTH! Te inscribiste con éxito al curso:\n"${curso.titulo}"\nTe enviaremos todos los detalles por correo y WhatsApp`)
                      setTimeout(() => window.location.href = "/cursos", 2000)
                    }}
                    className="bg-pink-600 hover:bg-pink-700 text-white font-bold text-2xl px-16 py-6 rounded-full shadow-2xl transition transform hover:scale-105 inline-flex items-center gap-4"
                  >
                    <CheckCircle className="w-8 h-8" />
                    Pagar ${curso.precio.toLocaleString()} MXN e inscribirme
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* RESUMEN DEL CURSO */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-3xl shadow-2xl p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">Tu inscripción</h2>

              <div className="bg-white/90 rounded-2xl p-6 space-y-6">
                <h3 className="text-xl font-bold text-gray-800 text-center">{curso.titulo}</h3>

                <div className="text-center space-y-3">
                  <p className="flex items-center justify-center gap-3 text-gray-700">
                    <User className="w-6 h-6 text-pink-600" />
                    <span className="font-medium">{curso.instructora}</span>
                  </p>

                  <div className="py-4">
                    <p className="text-5xl font-bold text-pink-600">${curso.precio.toLocaleString()} MXN</p>
                    <p className="text-gray-600 mt-2">Pago único • Incluye material</p>
                  </div>

                  {curso.cupos <= 5 && (
                    <div className="bg-red-100 text-red-700 font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 animate-pulse">
                      <AlertCircle className="w-6 h-6" />
                      ¡Solo quedan {curso.cupos} cupos!
                    </div>
                  )}

                  <div className="border-t-2 border-pink-200 pt-6">
                    <p className="text-2xl font-bold text-pink-600 text-center">
                      Total: ${curso.precio.toLocaleString()} MXN
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Volver */}
        <div className="text-center mt-12">
          <Link href="/cursos" className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-bold text-lg">
            <ArrowLeft className="w-6 h-6" />
            Volver al catálogo de cursos
          </Link>
        </div>
      </div>
    </div>
  )
}