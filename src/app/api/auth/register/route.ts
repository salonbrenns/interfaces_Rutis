import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password } = body

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 })
    }

    // Demo: en una app real crearías el usuario en la DB
    const token = `demo-token-${email}`
    return NextResponse.json({ token, user: { email, name } })
  } catch (err) {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 })
  }
}
