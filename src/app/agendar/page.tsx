// src/app/agendar/page.tsx
"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Clock, Calendar, User } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import Link from "next/link"

const servicioSeleccionado = {
  nombre: "Manicure Clásica + Semipermanente",
  precio: 380,
  duracion: "60 min",
  profesional: "Primer disponible"
}

export default function AgendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const today = new Date(2025, 10, 21) // 21 nov 2025
  const [currentMonth] = useState(today)

  const daysInMonth = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(2025, 10, i + 1)
    return date
  })

  const horariosManana = ["10:00 am", "10:30 am", "11:00 am", "11:30 am"]
  const horariosTarde = ["1:00 pm", "1:30 pm", "2:00 pm", "2:30 pm", "3:00 pm", "4:00 pm", "5:00 pm"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Calendario */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="text-xl font-bold text-pink-600 mb-8">
                Selecciona fecha y hora de tu servicio
              </div>

              <div className="flex gap-4 mb-10">
                <div className="px-8 py-4 rounded-full bg-pink-600 text-white font-bold">Fecha y Hora</div>
                <div className="px-8 py-4 rounded-full bg-gray-200 text-gray-600 font-bold">Datos del Contacto</div>
              </div>

              <div className="bg-white rounded-3xl shadow-inner p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-pink-600">
                    {format(currentMonth, "MMMM yyyy", { locale: es })}
                  </h2>
                  <div className="flex gap-3">
                    {/* BOTONES CORREGIDOS */}
                    <button
                      aria-label="Mes anterior"
                      className="p-3 bg-pink-100 rounded-full hover:bg-pink-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 transition"
                    >
                      <ChevronLeft className="w-6 h-6 text-pink-600" />
                    </button>
                    <button
                      aria-label="Mes siguiente"
                      className="p-3 bg-pink-100 rounded-full hover:bg-pink-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 transition"
                    >
                      <ChevronRight className="w-6 h-6 text-pink-600" />
                    </button>
                  </div>
                </div>

                {/* Días de la semana */}
                <div className="grid grid-cols-7 gap-3 text-center mb-6">
                  {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map(d => (
                    <div key={d} className="text-gray-500 font-medium">{d}</div>
                  ))}
                </div>

                {/* Días del mes */}
                <div className="grid grid-cols-7 gap-3 text-center">
                  {daysInMonth.map((date, i) => {
                    const isPast = date < today
                    const isSelected = selectedDate?.toDateString() === date.toDateString()

                    return (
                      <button
                        key={i}
                        onClick={() => !isPast && setSelectedDate(date)}
                        disabled={isPast}
                        aria-label={format(date, "d 'de' MMMM 'de' yyyy", { locale: es })}
                        className={`p-4 rounded-full text-lg font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${
                          isSelected
                            ? "bg-pink-600 text-white"
                            : isPast
                            ? "text-gray-400 cursor-not-allowed"
                            : "hover:bg-pink-100"
                        }`}
                      >
                        {date.getDate()}
                      </button>
                    )
                  })}
                </div>

                {/* Horarios */}
                {selectedDate && (
                  <div className="mt-10">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-bold text-lg mb-4 text-pink-600">Mañana</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {horariosManana.map(hora => (
                            <button
                              key={hora}
                              onClick={() => setSelectedTime(hora)}
                              aria-label={`Seleccionar horario ${hora}`}
                              className={`py-3 px-5 rounded-full border-2 font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${
                                selectedTime === hora
                                  ? "bg-pink-600 text-white border-pink-600"
                                  : "border-pink-200 hover:border-pink-400"
                              }`}
                            >
                              {hora}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-4 text-pink-600">Tarde</h3>
                        <div className="grid grid-cols-3 gap-3">
                          {horariosTarde.map(hora => (
                            <button
                              key={hora}
                              onClick={() => setSelectedTime(hora)}
                              aria-label={`Seleccionar horario ${hora}`}
                              className={`py-3 px-5 rounded-full border-2 font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${
                                selectedTime === hora
                                  ? "bg-pink-600 text-white border-pink-600"
                                  : "border-pink-200 hover:border-pink-400"
                              }`}
                            >
                              {hora}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Botón Continuar al pago */}
              {selectedDate && selectedTime && (
                <div className="text-center mt-10">
                  <Link
                    href={{
                      pathname: "/pago",
                      query: {
                        servicio: servicioSeleccionado.nombre,
                        precio: servicioSeleccionado.precio,
                        fecha: selectedDate.toISOString(),
                        hora: selectedTime,
                        duracion: servicioSeleccionado.duracion,
                      },
                    }}
                  >
                    <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold text-2xl px-16 py-7 rounded-full shadow-2xl transition transform hover:scale-105 inline-flex items-center gap-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-300">
                      Continuar al pago seguro
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Panel lateral - Resumen */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-3xl shadow-2xl p-8 sticky top-24">
              <h3 className="text-2xl font-bold text-pink-600 mb-8">Información del servicio</h3>
              <div className="bg-white/70 rounded-2xl p-6 space-y-5">
                <h4 className="text-xl font-bold text-gray-800">{servicioSeleccionado.nombre}</h4>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-bold text-pink-600">
                      ${servicioSeleccionado.precio} MXN
                    </span>
                  </div>
                  {selectedDate && (
                    <div className="flex items-center gap-4">
                      <Calendar className="w-6 h-6 text-pink-600" />
                      <span>{format(selectedDate, "d 'de' MMMM 'de' yyyy", { locale: es })}</span>
                    </div>
                  )}
                  {selectedTime && (
                    <div className="flex items-center gap-4">
                      <Clock className="w-6 h-6 text-pink-600" />
                      <span>Hora: {selectedTime}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    <User className="w-6 h-6 text-pink-600" />
                    <span>{servicioSeleccionado.profesional}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}