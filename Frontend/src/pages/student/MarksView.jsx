"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { studentService } from "../../services/api"

// Styled Components
const Container = styled.div`
  background: #fffdf7;
  border: 1px solid #dcd7c9;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 16px rgba(73, 89, 107, 0.15);
  font-family: "Segoe UI", sans-serif;
`

const Title = styled.h2`
  color: #3e4f61;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
`

const InfoBox = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background-color: #faf9f4;
  border: 1px solid #dcd7c9;
  border-radius: 8px;
  text-align: center;
  font-size: 15px;
  color: #3e4f61;
  box-shadow: 0 2px 8px rgba(73, 89, 107, 0.08);
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  border: 1px solid #dcd7c9;

  th {
    background-color: #faf9f4;
    padding: 12px;
    text-align: left;
    font-weight: 600;
    color: #3e4f61;
    border-bottom: 2px solid #dcd7c9;
  }

  td {
    padding: 12px;
    border-bottom: 1px solid #e0ddd6;
    font-size: 14px;
    color: #555;
  }

  tr:hover {
    background-color: #f5f3ed;
  }
`

const GradeBadge = styled.span`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  background-color: ${(props) => {
    switch (props.grade) {
      case "A":
        return "#d4edda"
      case "B":
        return "#dceeff"
      case "C":
        return "#fff3cd"
      case "D":
        return "#f8d7da"
      default:
        return "#e2e3e5"
    }
  }};
  color: ${(props) => {
    switch (props.grade) {
      case "A":
        return "#155724"
      case "B":
        return "#084298"
      case "C":
        return "#664d03"
      case "D":
        return "#721c24"
      default:
        return "#383d41"
    }
  }};
`

const NoData = styled.div`
  text-align: center;
  color: #6b6b6b;
  font-size: 15px;
  margin-top: 30px;
`

// Main Component
function MarksView() {
  const [marks, setMarks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMarks()
  }, [])

  const fetchMarks = async () => {
    try {
      const response = await studentService.getMyMarks()
      setMarks(response.data || [])
    } catch (error) {
      console.error("Error fetching marks:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>

  const averageScore =
    marks.length > 0
      ? (marks.reduce((sum, m) => sum + (m.score || 0), 0) / marks.length).toFixed(2)
      : 0

  return (
    <Container>
      <Title>My Marks</Title>

      <InfoBox>
        <strong>Average Score:</strong> {averageScore}
      </InfoBox>

      {marks.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Score</th>
              <th>Grade</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((mark) => (
              <tr key={mark.id}>
                <td>{mark.subjectName || "Unknown"}</td>
                <td>{mark.score ?? "-"}</td>
                <td>
                  <GradeBadge grade={mark.grade}>{mark.grade || "N/A"}</GradeBadge>
                </td>
                <td>
                  {mark.createdAt
                    ? new Date(mark.createdAt).toLocaleDateString()
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <NoData>No marks available.</NoData>
      )}
    </Container>
  )
}

export default MarksView
