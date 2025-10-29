"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { adminService } from "../../services/api";

// 🎨 Same soft blue + off-white palette used in StudentManagement
const Container = styled.div`
  background: #fffdf7;
  border: 1px solid #d8d3c3;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: linear-gradient(135deg, #7aa2ba 0%, #0d3e50 100%);
  color: #fffdf7;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(13, 62, 80, 0.3);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th {
    background-color: #f8f5ee;
    padding: 12px;
    text-align: left;
    font-weight: 600;
    color: #333;
    border-bottom: 2px solid #d8d5ce;
  }

  td {
    padding: 12px;
    border-bottom: 1px solid #d8d5ce;
  }

  tr:hover {
    background-color: #f4f2f0;
  }
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  margin-right: 5px;
  background-color: ${(props) => (props.danger ? "#e74c3c" : "#468faf")};
  color: #fffdf7;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    opacity: 0.85;
  }
`;

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
`;

const ModalContent = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #444;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #7aa2ba;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #7aa2ba;
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
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  background-color: ${(props) => (props.primary ? "#0d3e50" : "#ddd")};
  color: ${(props) => (props.primary ? "white" : "#333")};

  &:hover {
    opacity: 0.85;
  }
`;

function ClassGroupManagement() {
  const [classGroups, setClassGroups] = useState([]);
  const [courses, setCourses] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    courseId: "",
    professorId: "",
    schedule: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClassGroups();
    fetchCourses();
    fetchProfessors();
  }, []);

  const fetchClassGroups = async () => {
    try {
      const response = await adminService.getClassGroups();
      setClassGroups(response.data);
    } catch (error) {
      console.error("Error fetching class groups:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await adminService.getCourses();
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
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

  const handleAddClassGroup = () => {
    setFormData({
      name: "",
      courseId: "",
      professorId: "",
      schedule: "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminService.createClassGroup({
        name: formData.name,
        courseId: Number.parseInt(formData.courseId),
        professorId: Number.parseInt(formData.professorId),
        schedule: formData.schedule,
      });
      setIsModalOpen(false);
      fetchClassGroups();
    } catch (error) {
      console.error("Error creating class group:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this class group?")) {
      try {
        await adminService.deleteClassGroup(id);
        fetchClassGroups();
      } catch (error) {
        console.error("Error deleting class group:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <Title>Class Group Management</Title>
      <ButtonGroup>
        <Button onClick={handleAddClassGroup}>Add Class Group</Button>
      </ButtonGroup>

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Course</th>
            <th>Professor</th>
            <th>Schedule</th>
            <th>Students</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classGroups.map((cg) => (
            <tr key={cg.id}>
              <td>{cg.name}</td>
              <td>{cg.courseName}</td>
              <td>{cg.professorName}</td>
              <td>{cg.schedule}</td>
              <td>{cg.studentCount}</td>
              <td>
                <ActionButton onClick={() => console.log("Edit", cg.id)}>
                  Edit
                </ActionButton>
                <ActionButton danger onClick={() => handleDelete(cg.id)}>
                  Delete
                </ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={isModalOpen}>
        <ModalContent>
          <h3>Add New Class Group</h3>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Class Name</Label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Course</Label>
              <Select
                value={formData.courseId}
                onChange={(e) =>
                  setFormData({ ...formData, courseId: e.target.value })
                }
                required
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>Professor</Label>
              <Select
                value={formData.professorId}
                onChange={(e) =>
                  setFormData({ ...formData, professorId: e.target.value })
                }
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
            <FormGroup>
              <Label>Schedule</Label>
              <Input
                type="text"
                placeholder="e.g., Mon, Wed, Fri 10:00 AM"
                value={formData.schedule}
                onChange={(e) =>
                  setFormData({ ...formData, schedule: e.target.value })
                }
                required
              />
            </FormGroup>
            <ModalButtons>
              <ModalButton onClick={() => setIsModalOpen(false)}>
                Cancel
              </ModalButton>
              <ModalButton primary type="submit">
                Add Class Group
              </ModalButton>
            </ModalButtons>
          </form>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default ClassGroupManagement;
