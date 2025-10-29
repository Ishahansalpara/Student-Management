"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { studentService } from "../../services/api"

// --- Styled Components ---
const Container = styled.div`
  background: #fffdf7;
  border: 1px solid #dcd7c9;
  border-radius: 12px;
  padding: 35px;
  box-shadow: 0 4px 16px rgba(73, 89, 107, 0.15);
  max-width: 650px;
  margin: 40px auto;
  transition: all 0.3s ease;
  font-family: "Segoe UI", sans-serif;
`

const Title = styled.h2`
  color: #3e4f61;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 600;
  font-size: 24px;
`

const ProfileSection = styled.div`
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e4e0d7;

  &:last-child {
    border-bottom: none;
  }
`

const Label = styled.label`
  display: block;
  color: #6c7a89;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 5px;
  letter-spacing: 0.5px;
`

const Value = styled.p`
  color: #2c3e50;
  font-size: 16px;
  margin: 0;
  font-weight: 500;
  background-color: #faf9f4;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #e7e2d5;
`

const Message = styled.div`
  text-align: center;
  color: #555;
  margin-top: 60px;
  font-size: 16px;
`

// --- Component ---
function StudentProfile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await studentService.getProfile()
        setProfile(response.data)
      } catch (err) {
        console.error("Error fetching profile:", err)
        setError("Unable to fetch profile data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) return <Message>Loading your profile...</Message>
  if (error) return <Message>{error}</Message>
  if (!profile) return <Message>No profile data found.</Message>

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return isNaN(date) ? "Invalid Date" : date.toLocaleDateString()
  }

  return (
    <Container>
      <Title>My Profile</Title>

      <ProfileSection>
        <Label>First Name</Label>
        <Value>{profile.firstName || "N/A"}</Value>
      </ProfileSection>

      <ProfileSection>
        <Label>Last Name</Label>
        <Value>{profile.lastName || "N/A"}</Value>
      </ProfileSection>

      <ProfileSection>
        <Label>Email</Label>
        <Value>{profile.email || "N/A"}</Value>
      </ProfileSection>

      <ProfileSection>
        <Label>Registration Number</Label>
        <Value>{profile.registrationNumber || "N/A"}</Value>
      </ProfileSection>

      <ProfileSection>
        <Label>Class</Label>
        <Value>{profile.className || "Not assigned"}</Value>
      </ProfileSection>

      <ProfileSection>
        <Label>Enrollment Date</Label>
        <Value>{formatDate(profile.enrollmentDate)}</Value>
      </ProfileSection>
    </Container>
  )
}

export default StudentProfile
