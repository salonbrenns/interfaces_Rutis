// src/app/pago/page.tsx
"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { CreditCard, Lock, CheckCircle, ArrowLeft, Calendar, Clock, User } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export default function PagoPage() {
  const searchParams = useSearchParams()

  const cita = {
    servicio: searchParams.get("servicio") || "Servicio seleccionado",
    precio: Number(searchParams.get("precio")) || 0,
    fecha: searchParams.get("fecha") ? new Date(searchParams.get("fecha")!) : new Date(),
    hora: searchParams.get("hora") || "No seleccionada",
    duracion: searchParams.get("duracion") || "60 min",
    profesional: "Primer disponible"
  }

  const [formData, setFormData] = useState({
    nombre: "", apellido: "", correo: "", nombreTarjeta: "", telefono: "", numeroTarjeta: "", expiracion: "", cvv: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* Título principal de la página (invisible pero accesible) */}
        <h1 className="sr-only">Pago seguro - Brenn's Nails</h1>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Formulario de pago */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <div className="flex gap-4 mb-10">
                <div className="px-8 py-4 rounded-full bg-gray-200 text-gray-600 font-bold">Fecha y Hora</div>
                <div className="px-8 py-4 rounded-full bg-pink-600 text-white font-bold">Datos del Contacto</div>
              </div>

              <form className="space-y-8" aria-label="Formulario de pago">
                {/* Nombre y Apellido */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nombre" className="block text-lg font-bold mb-2">Nombre</label>
                    <input id="nombre" name="nombre" onChange={handleChange} className="w-full px-6 py-4 rounded-full border-2 border-pink-200 focus:border-pink-500 focus:outline-none" placeholder="Ruth" required />
                  </div>
                  <div>
                    <label htmlFor="apellido" className="block text-lg font-bold mb-2">Apellido</label>
                    <input id="apellido" name="apellido" onChange={handleChange} className="w-full px-6 py-4 rounded-full border-2 border-pink-200 focus:border-pink-500 focus:outline-none" placeholder="Barrientos" required />
                  </div>
                </div>

                {/* Correo */}
                <div>
                  <label htmlFor="correo" className="block text-lg font-bold mb-2">Correo electrónico</label>
                  <input id="correo" type="email" name="correo" onChange={handleChange} className="w-full px-6 py-4 rounded-full border-2 border-pink-200 focus:border-pink-500 focus:outline-none" placeholder="ruth@uthh.edu.mx" required />
                </div>

                {/* Nombre en tarjeta + Teléfono */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nombreTarjeta" className="block text-lg font-bold mb-2">Nombre en la Tarjeta</label>
                    <input id="nombreTarjeta" name="nombreTarjeta" onChange={handleChange} className="w-full px-6 py-4 rounded-full border-2 border-pink-200 focus:border-pink-500 focus:outline-none" required />
                  </div>
                  <div>
                    <label htmlFor="telefono" className="block text-lg font-bold mb-2">Teléfono</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-5 rounded-l-full bg-gray-100 border-2 border-pink-200 border-r-0 text-gray-600">MX +52</span>
                      <input id="telefono" name="telefono" onChange={handleChange} className="w-full px-6 py-4 rounded-r-full border-2 border-pink-200 focus:border-pink-500 focus:outline-none" placeholder="961 123 4567" required />
                    </div>
                  </div>
                </div>

                {/* Datos de la tarjeta */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 relative">
                    <label htmlFor="numeroTarjeta" className="block text-lg font-bold mb-2">Número de la Tarjeta</label>
                    <input id="numeroTarjeta" name="numeroTarjeta" onChange={handleChange} maxLength={19} className="w-full px-6 py-4 pl-16 rounded-full border-2 border-pink-200 focus:border-pink-500 focus:outline-none" placeholder="1234 5678 9012 3456" required />
                    <CreditCard className="absolute left-5 top-12 w-8 h-8 text-pink-600 pointer-events-none" />
                  </div>
                  <div>
                    <label htmlFor="expiracion" className="block text-lg font-bold mb-2">MM / AA</label>
                    <input id="expiracion" name="expiracion" onChange={handleChange} className="w-full px-6 py-4 rounded-full border-2 border-pink-200 focus:border-pink-500 focus:outline-none" placeholder="12 / 28" required />
                  </div>
                  <div className="md:col-span-3">
                    <label htmlFor="cvv" className="block text-lg font-bold mb-2">CVV</label>
                    <input id="cvv" name="cvv" onChange={handleChange} maxLength={4} className="w-full px-6 py-4 rounded-full border-2 border-pink-200 focus:border-pink-500 focus:outline-none" placeholder="123" required />
                  </div>
                </div>

                {/* Seguridad */}
                <div className="flex items-center gap-3 text-gray-600">
                  <Lock className="w-6 h-6 text-pink-600 flex-shrink-0" />
                  <p>Tus datos están protegidos con encriptación SSL de 256 bits</p>
                </div>

                {/* Botón de pago */}
                <div className="text-center pt-8">
                  <button
                    type="button"
                    onClick={() => {
                      alert("¡Cita agendada con éxito, Ruth! Te esperamos en Brenn's")
                      setTimeout(() => {
                        window.location.href = "/servicios"
                      }, 3000)
                    }}
                    className="bg-pink-600 hover:bg-pink-700 text-white font-bold text-2xl px-16 py-6 rounded-full shadow-2xl transition transform hover:scale-105 inline-flex items-center gap-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-300"
                  >
                    <CheckCircle className="w-8 h-8" />
                    Pagar ahora
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Resumen lateral - ahora con h2 correcto */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-3xl shadow-2xl p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-pink-600 mb-8">Información del servicio</h2>
              <div className="bg-white/80 rounded-2xl p-6 space-y-5">
                <h3 className="text-xl font-bold text-gray-800">{cita.servicio}</h3>
                <div className="space-y-4 text-gray-700">
                  <div><span className="text-4xl font-bold text-pink-600">${cita.precio} MXN</span></div>
                  <div className="flex items-center gap-4"><Calendar className="w-6 h-6 text-pink-600" /><span>{format(cita.fecha, "d 'de' MMMM 'de' yyyy", { locale: es })}</span></div>
                  <div className="flex items-center gap-4"><Clock className="w-6 h-6 text-pink-600" /><span>{cita.hora} • {cita.duracion}</span></div>
                  <div className="flex items-center gap-4"><User className="w-6 h-6 text-pink-600" /><span>{cita.profesional}</span></div>
                </div>
                <div className="border-t-2 border-pink-200 pt-5 mt-5">
                  <p className="text-2xl font-bold text-pink-600 text-center">Total: ${cita.precio} MXN</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Volver */}
        <div className="text-center mt-10">
          <Link href="/agendar" className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-bold text-lg">
            <ArrowLeft className="w-6 h-6" /> Cambiar fecha u hora
          </Link>
        </div>
      </div>
    </div>
  )
}