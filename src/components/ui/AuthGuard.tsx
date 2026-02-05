"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
    if (!token) {
      // Preserve full path + query when redirecting
      const search = searchParams ? `?${searchParams.toString()}` : ""
      const full = `${pathname || "/"}${search}`
      const next = `?next=${encodeURIComponent(full)}`
      router.push(`/login${next}`)
      return
    }
    setChecked(true)
  }, [router, pathname, searchParams])

  if (!checked) return null
  return <>{children}</>
}
