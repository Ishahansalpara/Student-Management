"use client"

import { useEffect } from "react"

export default function SyntheticV0PageForDeployment() {
  useEffect(() => {
    // Redirect to frontend
    window.location.href = "http://localhost:5173"
  }, [])

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <p>Redirecting to Student Management System...</p>
    </div>
  )
}
