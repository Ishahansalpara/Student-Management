"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { professorService, subjectService } from "../../services/api"

const Container = styled.div`
  background: #fffdf7;
  border: 1px solid #dcd7c9;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(73, 89, 107, 0.1);
`

const Title = styled.h2`
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
`

const FormGroup = styled.div`
  margin-bottom: 24px;
  display: flex;
  gap: 12px;
  align-items: flex-end;
  flex-wrap: wrap;
`

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  color: #3e4f61;
  font-weight: 500;
`

const Select = styled.select`
  padding: 10px;
  border: 1px solid #dcd7c9;
  border-radius: 8px;
  background: #faf9f4;
  font-size: 14px;
  color: #3e4f61;
  &:focus {
    outline: none;
    border-color: #88b7d5;
    box-shadow: 0 0 4px rgba(136, 183, 213, 0.4);
  }
`

const Button = styled.button`
  padding: 10px 20px;
  background: linear-gradient(135deg, #88b7d5 0%, #4a6fa1 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(73, 89, 107, 0.15);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: white;
  border: 1px solid #e6dfd2;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(73, 89, 107, 0.08);

  th {
    background-color: #f9f8f3;
    padding: 12px;
    text-align: left;
    font-weight: 600;
    color: #2c3e50;
    border-bottom: 2px solid #e6dfd2;
  }

  td {
    padding: 12px;
    color: #3e4f61;
    border-bottom: 1px solid #e6dfd2;
  }

  tr:hover {
    background-color: #faf9f4;
  }
`

const Modal = styled.div`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.45);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background: #fffdf7;
  padding: 28px;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  border: 1px solid #dcd7c9;
  box-shadow: 0 6px 20px rgba(73, 89, 107, 0.15);
`

const ModalFormGroup = styled.div`
  margin-bottom: 15px;
`

const ModalLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #3e4f61;
  font-weight: 500;
`

const ModalInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #dcd7c9;
  border-radius: 8px;
  background: #faf9f4;
  font-size: 14px;
  color: #3e4f61;
  &:focus {
    outline: none;
    border-color: #88b7d5;
    box-shadow: 0 0 4px rgba(136, 183, 213, 0.4);
  }
`

const ModalSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #dcd7c9;
  border-radius: 8px;
  background: #faf9f4;
  font-size: 14px;
  color: #3e4f61;
  &:focus {
    outline: none;
    border-color: #88b7d5;
    box-shadow: 0 0 4px rgba(136, 183, 213, 0.4);
  }
`

const ModalButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`

const ModalButton = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  background-color: ${(props) =>
    props.primary ? "#4a6fa1" : "#e6dfd2"};
  color: ${(props) => (props.primary ? "white" : "#3e4f61")};

  &:hover {
    opacity: 0.9;
  }
`

function MarksManagement() {
  const [courses, setCourses] = useState([])
  const [subjects, setSubjects] = useState([])
  const [students, setStudents] = useState([])
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [marks, setMarks] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ studentId: "", score: "" })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await professorService.getMyCourses()
      setCourses(response.data)
    } catch (error) {
      console.error("Error fetching courses:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCourseChange = async (e) => {
    const courseId = e.target.value
    setSelectedCourse(courseId)
    setSelectedSubject("")
    setMarks([])
    setStudents([])

    if (courseId) {
      try {
        const subjectsRes = await subjectService.getSubjectsByCourse(courseId)
        setSubjects(subjectsRes.data)
      } catch (error) {
        console.error("Error fetching subjects:", error)
      }
    }
  }

  const handleSubjectChange = async (e) => {
    const subjectId = e.target.value
    setSelectedSubject(subjectId)
    setMarks([])
    setStudents([])

    if (subjectId) {
      try {
        const marksRes = await professorService.getMarks(subjectId)
        setMarks(marksRes.data)

        const classGroups = await professorService.getMyClassGroups()
        if (classGroups.data.length > 0) {
          const classGroupId = classGroups.data[0].id
          const studentsRes = await professorService.getClassGroupStudents(classGroupId)
          setStudents(studentsRes.data)
        }
      } catch (error) {
        console.error("Error fetching marks/students:", error)
      }
    }
  }

  const handleAddMark = () => {
    setFormData({ studentId: "", score: "" })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await professorService.recordMark({
        studentId: parseInt(formData.studentId),
        subjectId: parseInt(selectedSubject),
        score: parseFloat(formData.score),
      })
      setIsModalOpen(false)
      handleSubjectChange({ target: { value: selectedSubject } })
    } catch (error) {
      console.error("Error recording mark:", error)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <Container>
      <Title>Marks Management</Title>

      <FormGroup>
        <div>
          <Label>Select Course</Label>
          <Select value={selectedCourse} onChange={handleCourseChange}>
            <option value="">Choose a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label>Select Subject</Label>
          <Select
            value={selectedSubject}
            onChange={handleSubjectChange}
            disabled={!selectedCourse}
          >
            <option value="">Choose a subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </Select>
        </div>

        <Button onClick={handleAddMark} disabled={!selectedSubject}>
          Add Mark
        </Button>
      </FormGroup>

      {selectedSubject && (
        <Table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Score</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((mark) => (
              <tr key={mark.id}>
                <td>{mark.studentName}</td>
                <td>{mark.score}</td>
                <td>{mark.grade}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal isOpen={isModalOpen}>
        <ModalContent>
          <h3 style={{ color: "#2c3e50", textAlign: "center", marginBottom: "16px" }}>
            Add Mark
          </h3>
          <form onSubmit={handleSubmit}>
            <ModalFormGroup>
              <ModalLabel>Student</ModalLabel>
              <ModalSelect
                value={formData.studentId}
                onChange={(e) =>
                  setFormData({ ...formData, studentId: e.target.value })
                }
                required
              >
                <option value="">Select a student</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.firstName} {student.lastName}
                  </option>
                ))}
              </ModalSelect>
            </ModalFormGroup>

            <ModalFormGroup>
              <ModalLabel>Score (0–100)</ModalLabel>
              <ModalInput
                type="number"
                min="0"
                max="100"
                step="0.5"
                value={formData.score}
                onChange={(e) =>
                  setFormData({ ...formData, score: e.target.value })
                }
                required
              />
            </ModalFormGroup>

            <ModalButtons>
              <ModalButton type="button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </ModalButton>
              <ModalButton primary type="submit">
                Add Mark
              </ModalButton>
            </ModalButtons>
          </form>
        </ModalContent>
      </Modal>
    </Container>
  )
}

export default MarksManagement
