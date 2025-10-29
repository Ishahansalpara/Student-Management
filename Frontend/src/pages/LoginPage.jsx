"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import styled, { createGlobalStyle } from "styled-components"
import { authService } from "../services/api"

// --- Global Style for Font ---
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Open+Sans:wght@400;600&display=swap');

  body {
    font-family: 'Open Sans', sans-serif;
    background-color: #F2F0E9;
    margin: 0;
  }
`

// --- Styled Components ---
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #F2F0E9;
`

const LoginBox = styled.div`
  background: #fffdf7;
  border: 1px solid #d8d3c3;
  border-radius: 10px;
  padding: 40px 50px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 6px 20px rgba(73, 89, 107, 0.15);
  text-align: center;
`

const Title = styled.h1`
  font-family: 'Merriweather', serif;
  color: #49596B;
  margin-bottom: 10px;
  font-size: 28px;
  letter-spacing: 0.5px;
`

const Subtitle = styled.p`
  font-size: 15px;
  color: #666;
  margin-bottom: 30px;
`

const FormGroup = styled.div`
  margin-bottom: 20px;
  text-align: left;
`

const Label = styled.label`
  display: block;
  font-size: 14px;
  color: #49596B;
  margin-bottom: 6px;
  font-weight: 600;
`

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #cfc9b7;
  border-radius: 6px;
  background-color: #faf9f4;
  font-size: 14px;
  color: #333;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #49596B;
    box-shadow: 0 0 0 3px rgba(73, 89, 107, 0.15);
  }
`

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #49596B;
  color: #F2F0E9;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  letter-spacing: 0.5px;

  &:hover {
    background-color: #3e4f61;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(73, 89, 107, 0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

const ErrorMessage = styled.div`
  color: #9b1c1c;
  background: #faeaea;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #f5c2c2;
  text-align: center;
  font-size: 14px;
`

const LinkText = styled.p`
  margin-top: 20px;
  color: #555;

  a {
    color: #49596B;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`

// --- Component ---
function LoginPage({ setUser }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await authService.login(email, password)

      if (!response?.data) throw new Error("Invalid server response")

      const { token, ...userData } = response.data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(userData))
      setUser?.(userData)

      switch (userData.role) {
        case "Admin":
          navigate("/admin")
          break
        case "Professor":
          navigate("/professor")
          break
        case "Student":
          navigate("/student")
          break
        default:
          navigate("/")
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Login failed. Please check your credentials."
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <GlobalStyle />
      <LoginContainer>
        <LoginBox>
          <Title>Student Management System</Title>
          <Subtitle>Sign in to continue your academic journey</Subtitle>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>

            <Button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <LinkText>
            Don’t have an account? <Link to="/register">Register here</Link>
          </LinkText>
        </LoginBox>
      </LoginContainer>
    </>
  )
}

export default LoginPage
