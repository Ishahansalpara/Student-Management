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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
`

const Card = styled.div`
  background: #faf9f4;
  border: 1px solid #dcd7c9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 3px 10px rgba(73, 89, 107, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 5px 16px rgba(73, 89, 107, 0.18);
  }
`

const CardTitle = styled.h3`
  color: #3e4f61;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 600;
`

const CardInfo = styled.p`
  color: #555;
  margin-bottom: 6px;
  font-size: 14px;
  line-height: 1.4;
`

const Badge = styled.span`
  display: inline-block;
  background: linear-gradient(135deg, #88b7d5, #4a6fa1);
  color: #fffdf7;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  margin-top: 12px;
  font-weight: 500;
`

const NoData = styled.div`
  text-align: center;
  color: #6b6b6b;
  font-size: 15px;
  margin-top: 30px;
`

// Main Component
function CoursesView() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await studentService.getMyCourses()
      setCourses(response.data || [])
    } catch (error) {
      console.error("Error fetching courses:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <Container>
      <Title>My Courses</Title>

      {courses.length > 0 ? (
        <Grid>
          {courses.map((course) => (
            <Card key={course.id}>
              <CardTitle>{course.name}</CardTitle>
              <CardInfo>
                <strong>Code:</strong> {course.code}
              </CardInfo>
              <CardInfo>
                <strong>Credits:</strong> {course.credits}
              </CardInfo>
              <CardInfo>
                <strong>Professor:</strong> {course.professorName || "N/A"}
              </CardInfo>
              <CardInfo>{course.description || "No description available."}</CardInfo>
              <Badge>Course ID: {course.id}</Badge>
            </Card>
          ))}
        </Grid>
      ) : (
        <NoData>No courses found.</NoData>
      )}
    </Container>
  )
}

export default CoursesView
