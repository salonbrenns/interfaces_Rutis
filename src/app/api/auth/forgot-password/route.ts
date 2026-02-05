// src/app/api/auth/forgot-password/route.ts
import { NextRequest, NextResponse } from "next/server"

// Validar formato de email
function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// Generar token de reset (en producción usar JWT o token seguro)
function generarToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validar campo vacío
    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: "Por favor ingresa tu correo electrónico" },
        { status: 400 }
      )
    }

    // Validar formato de email
    if (!validarEmail(email)) {
      return NextResponse.json(
        { error: "Por favor ingresa un correo electrónico válido" },
        { status: 400 }
      )
    }

    // TODO: Integrar con base de datos para:
    // 1. Buscar usuario por email
    // 2. Generar token de reset con expiración
    // 3. Guardar token en BD
    // 4. Enviar email con enlace de reset

    // Para ahora, simular envío exitoso
    const token = generarToken()
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-contraseña?token=${token}&email=${encodeURIComponent(email)}`

    // TODO: Reemplazar con servicio real de email (SendGrid, Resend, Nodemailer, etc.)
    console.log(`[DEMO] Enlace de reset para ${email}: ${resetLink}`)

    // Simular envío de email
    // await enviarEmailRecuperacion(email, resetLink)

    return NextResponse.json(
      {
        success: true,
        message: "Se ha enviado un enlace de recuperación a tu correo electrónico. Por favor revisa tu bandeja de entrada.",
        // En desarrollo, devolver el token para testing (REMOVER en producción)
        ...(process.env.NODE_ENV === "development" && { token, resetLink }),
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error en forgot-password:", error)
    return NextResponse.json(
      { error: "Error al procesar tu solicitud. Por favor intenta más tarde." },
      { status: 500 }
    )
  }
}
