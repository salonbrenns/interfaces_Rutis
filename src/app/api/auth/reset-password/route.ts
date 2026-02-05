// src/app/api/auth/reset-password/route.ts
import { NextRequest, NextResponse } from "next/server"

// Validar formato de email
function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// Validar requisitos de contraseña
function validarContraseña(password: string): {
  valido: boolean
  errores: string[]
} {
  const errores: string[] = []

  if (password.length < 8) {
    errores.push("La contraseña debe tener mínimo 8 caracteres")
  }
  if (!/[A-Z]/.test(password)) {
    errores.push("Debe incluir al menos una mayúscula")
  }
  if (!/[a-z]/.test(password)) {
    errores.push("Debe incluir al menos una minúscula")
  }
  if (!/\d/.test(password)) {
    errores.push("Debe incluir al menos un número")
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};:'",.<>?/\\|`~]/.test(password)) {
    errores.push("Debe incluir al menos un símbolo especial")
  }

  return {
    valido: errores.length === 0,
    errores,
  }
}

export async function POST(request: NextRequest) {
  try {
    const { token, email, password } = await request.json()

    // Validar campos obligatorios
    if (!token || !email || !password) {
      return NextResponse.json(
        { error: "Por favor completa todos los campos" },
        { status: 400 }
      )
    }

    // Validar formato de email
    if (!validarEmail(email)) {
      return NextResponse.json(
        { error: "El correo electrónico no es válido" },
        { status: 400 }
      )
    }

    // Validar requisitos de contraseña
    const validacion = validarContraseña(password)
    if (!validacion.valido) {
      return NextResponse.json(
        {
          error: "La contraseña no cumple con los requisitos",
          detalles: validacion.errores,
        },
        { status: 400 }
      )
    }

    // TODO: Integrar con base de datos para:
    // 1. Verificar que el token sea válido y no esté expirado
    // 2. Verificar que el email coincida con el token
    // 3. Buscar usuario por email
    // 4. Hashear la nueva contraseña (usar bcrypt o similar)
    // 5. Actualizar contraseña en BD
    // 6. Invalidar el token usado

    // Para ahora, simular actualización exitosa
    console.log(`[DEMO] Reset de contraseña para ${email} con token ${token}`)

    return NextResponse.json(
      {
        success: true,
        message: "Tu contraseña ha sido actualizada exitosamente.",
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error en reset-password:", error)
    return NextResponse.json(
      { error: "Error al actualizar tu contraseña. Por favor intenta más tarde." },
      { status: 500 }
    )
  }
}
