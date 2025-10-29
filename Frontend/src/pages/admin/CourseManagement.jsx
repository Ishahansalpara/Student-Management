"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { adminService } from "../../services/api";

const Container = styled.div`
  background: #fffdf7;
  border: 1px solid #dcd7c9;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(73, 89, 107, 0.1);
`;

const Title = styled.h2`
  color: #3e4f61;
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 22px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: linear-gradient(135deg, #88b7d5 0%, #4a6fa1 100%);
  color: #fdfcf9;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(73, 89, 107, 0.25);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th {
    background-color: #f5f3ed;
    padding: 12px;
    text-align: left;
    font-weight: 600;
    color: #3e4f61;
    border-bottom: 2px solid #e0ddd6;
  }

  td {
    padding: 12px;
    border-bottom: 1px solid #e5e3de;
    color: #333;
  }

  tr:hover {
    background-color: #f9f8f4;
  }
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  margin-right: 5px;
  background-color: ${(props) => (props.danger ? "#e66b5b" : "#6e9bc3")};
  color: #fffdf7;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const Modal = styled.div`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  position: fixed;
  inset: 0;
  background-color: rgba(73, 89, 107, 0.4);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #ffffff;
  padding: 32px;
  border-radius: 10px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 10px 40px rgba(73, 89, 107, 0.2);
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  color: #3e4f61;
  font-weight: 600;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #d8d3c3;
  border-radius: 6px;
  font-size: 14px;
  background-color: #faf9f4;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4a6fa1;
    box-shadow: 0 0 0 3px rgba(74, 111, 161, 0.15);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #d8d3c3;
  border-radius: 6px;
  font-size: 14px;
  background-color: #faf9f4;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #4a6fa1;
    box-shadow: 0 0 0 3px rgba(74, 111, 161, 0.15);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #d8d3c3;
  border-radius: 6px;
  font-size: 14px;
  background-color: #faf9f4;

  &:focus {
    outline: none;
    border-color: #4a6fa1;
    box-shadow: 0 0 0 3px rgba(74, 111, 161, 0.15);
  }
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  background-color: ${(props) => (props.primary ? "#4a6fa1" : "#e9e6dd")};
  color: ${(props) => (props.primary ? "#fffdf7" : "#3e4f61")};
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    credits: "",
    professorId: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
    fetchProfessors();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await adminService.getCourses();
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfessors = async () => {
    try {
      const response = await adminService.getProfessors();
      setProfessors(response.data);
    } catch (error) {
      console.error("Error fetching professors:", error);
    }
  };

  const handleAddCourse = () => {
    setFormData({
      code: "",
      name: "",
      description: "",
      credits: "",
      professorId: "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminService.createCourse({
        code: formData.code,
        name: formData.name,
        description: formData.description,
        credits: Number.parseInt(formData.credits),
        professorId: Number.parseInt(formData.professorId),
      });
      alert("Course added successfully!");
      setIsModalOpen(false);
      fetchCourses();
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Failed to add course.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await adminService.deleteCourse(id);
        fetchCourses();
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <Title>Course Management</Title>
      <ButtonGroup>
        <Button onClick={handleAddCourse}>Add Course</Button>
      </ButtonGroup>

      <Table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Credits</th>
            <th>Professor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.code}</td>
              <td>{course.name}</td>
              <td>{course.credits}</td>
              <td>{course.professorName}</td>
              <td>
                <ActionButton>Edit</ActionButton>
                <ActionButton danger onClick={() => handleDelete(course.id)}>
                  Delete
                </ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={isModalOpen}>
        <ModalContent>
          <h3>Add New Course</h3>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Course Code</Label>
              <Input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Course Name</Label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label>Credits</Label>
              <Input
                type="number"
                value={formData.credits}
                onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Professor</Label>
              <Select
                value={formData.professorId}
                onChange={(e) => setFormData({ ...formData, professorId: e.target.value })}
                required
              >
                <option value="">Select a professor</option>
                {professors.map((prof) => (
                  <option key={prof.id} value={prof.id}>
                    {prof.firstName} {prof.lastName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <ModalButtons>
              <ModalButton type="button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </ModalButton>
              <ModalButton primary type="submit">
                Add Course
              </ModalButton>
            </ModalButtons>
          </form>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default CourseManagement;
