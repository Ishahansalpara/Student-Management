"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import styled, { createGlobalStyle } from "styled-components"
import { authService } from "../services/api"

// --- Global Style ---
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Open+Sans:wght@400;600&display=swap');

  body {
    font-family: 'Open Sans', sans-serif;
    background-color: #F2F0E9;
    margin: 0;
  }
`

// --- Styled Components ---
const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #F2F0E9;
`

const RegisterBox = styled.div`
  background: #fffdf7;
  border: 1px solid #d8d3c3;
  border-radius: 10px;
  padding: 40px 50px;
  width: 100%;
  max-width: 460px;
  box-shadow: 0 6px 20px rgba(73, 89, 107, 0.15);
  text-align: center;
`

const Title = styled.h1`
  font-family: 'Merriweather', serif;
  color: #49596B;
  margin-bottom: 8px;
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

const Select = styled.select`
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

const Message = styled.div`
  color: ${({ error }) => (error ? "#9b1c1c" : "#1b5e20")};
  background: ${({ error }) => (error ? "#faeaea" : "#e8f5e9")};
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid ${({ error }) => (error ? "#f5c2c2" : "#b2dfdb")};
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
function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "Student",
  })

  const [message, setMessage] = useState({ text: "", error: false })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ text: "", error: false })
    setLoading(true)

    try {
      const response = await authService.register(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.role
      )

      if (!response?.data) throw new Error("Unexpected server response")

      setMessage({
        text: "Registration successful! Redirecting to login...",
        error: false,
      })
      setTimeout(() => navigate("/login"), 1500)
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Registration failed. Please try again."
      setMessage({ text: msg, error: true })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <GlobalStyle />
      <RegisterContainer>
        <RegisterBox>
          <Title>Create Your Account</Title>
          <Subtitle>Join the Student Management System today</Subtitle>

          {message.text && (
            <Message error={message.error}>{message.text}</Message>
          )}

          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="role">Role</Label>
              <Select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="Student">Student</option>
                <option value="Professor">Professor</option>
                <option value="Admin">Admin</option>
              </Select>
            </FormGroup>

            <Button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>

          <LinkText>
            Already have an account? <Link to="/login">Login here</Link>
          </LinkText>
        </RegisterBox>
      </RegisterContainer>
    </>
  )
}

export default RegisterPage
