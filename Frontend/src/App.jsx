"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import styled from "styled-components"

// Import pages
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

// Import dashboards
import AdminDashboard from "./pages/admin/AdminDashboard"
import ProfessorDashboard from "./pages/professor/ProfessorDashboard"
import StudentDashboard from "./pages/student/StudentDashboard"

// Import private route wrapper
import PrivateRoute from "./components/PrivateRoute"

// App layout styling
const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  font-family: "Poppins", sans-serif;
`

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load user and token from localStorage on app start
  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  // While checking localStorage, show a simple loading screen
  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "20%" }}>Loading...</div>
  }

  return (
    <AppContainer>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Admin Route */}
          <Route
            path="/admin/*"
            element={
              <PrivateRoute user={user} requiredRole="Admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          {/* Professor Route */}
          <Route
            path="/professor/*"
            element={
              <PrivateRoute user={user} requiredRole="Professor">
                <ProfessorDashboard />
              </PrivateRoute>
            }
          />

          {/* Student Route */}
          <Route
            path="/student/*"
            element={
              <PrivateRoute user={user} requiredRole="Student">
                <StudentDashboard />
              </PrivateRoute>
            }
          />

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AppContainer>
  )
}

export default App
