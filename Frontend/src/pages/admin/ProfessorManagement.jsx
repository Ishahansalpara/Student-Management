"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { adminService } from "../../services/api";

//
// 🎨 THEME COLORS
//
const COLORS = {
  background: "#fffdf7",
  border: "#dcd7c9",
  surface: "#faf9f4",
  text: "#3e4f61",
  primaryGradient: "linear-gradient(135deg, #88b7d5, #4a6fa1)",
  accent: "#e66b5b",
};

//
// 📦 STYLED COMPONENTS
//
const Container = styled.div`
  background: ${COLORS.background};
  border: 1px solid ${COLORS.border};
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 4px 16px rgba(73, 89, 107, 0.15);
  max-width: 100%;
`;

const Title = styled.h2`
  color: ${COLORS.text};
  font-size: 1.6rem;
  margin-bottom: 24px;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: ${COLORS.primaryGradient};
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  letter-spacing: 0.3px;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(74, 111, 161, 0.35);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  background: ${COLORS.surface};
  border-radius: 8px;
  border: 1px solid ${COLORS.border};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    background-color: #f5f3ed;
    color: ${COLORS.text};
    padding: 14px;
    text-align: left;
    font-weight: 600;
    font-size: 0.95rem;
    border-bottom: 2px solid ${COLORS.border};
  }

  td {
    padding: 14px;
    border-bottom: 1px solid ${COLORS.border};
    font-size: 0.92rem;
    color: ${COLORS.text};
  }

  tr:hover {
    background-color: #f9f8f2;
    transition: background 0.2s ease;
  }
`;

const ModalOverlay = styled.div`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  position: fixed;
  inset: 0;
  background-color: rgba(62, 79, 97, 0.3);
  backdrop-filter: blur(2px);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${COLORS.background};
  border: 1px solid ${COLORS.border};
  padding: 32px;
  border-radius: 16px;
  width: 100%;
  max-width: 520px;
  box-shadow: 0 10px 40px rgba(73, 89, 107, 0.25);
`;

const ModalTitle = styled.h3`
  color: ${COLORS.text};
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  color: ${COLORS.text};
  font-weight: 500;
  font-size: 0.95rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${COLORS.border};
  border-radius: 8px;
  background: #fff;
  font-size: 0.95rem;
  color: ${COLORS.text};
  transition: all 0.25s ease;

  &:focus {
    outline: none;
    border-color: #88b7d5;
    box-shadow: 0 0 0 2px rgba(136, 183, 213, 0.25);
  }
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const ModalButton = styled.button`
  flex: 1;
  padding: 10px 0;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;

  background: ${(props) => (props.primary ? COLORS.primaryGradient : "#e0ddd6")};
  color: ${(props) => (props.primary ? "#fff" : COLORS.text)};

  &:hover {
    opacity: 0.9;
  }
`;

//
// 🧩 COMPONENT LOGIC
//
function ProfessorManagement() {
  const [professors, setProfessors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    employeeId: "",
    department: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfessors();
  }, []);

  const fetchProfessors = async () => {
    try {
      const response = await adminService.getProfessors();
      setProfessors(response.data);
    } catch (error) {
      console.error("Error fetching professors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProfessor = () => {
    setFormData({
      email: "",
      firstName: "",
      lastName: "",
      employeeId: "",
      department: "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminService.createProfessor(formData);
      setIsModalOpen(false);
      fetchProfessors();
    } catch (error) {
      console.error("Error creating professor:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <Title>Professor Management</Title>
      <ButtonGroup>
        <Button onClick={handleAddProfessor}>+ Add Professor</Button>
      </ButtonGroup>

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Employee ID</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {professors.map((prof) => (
              <tr key={prof.id}>
                <td>
                  {prof.firstName} {prof.lastName}
                </td>
                <td>{prof.email}</td>
                <td>{prof.employeeId}</td>
                <td>{prof.department}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      <ModalOverlay isOpen={isModalOpen}>
        <ModalContent>
          <ModalTitle>Add New Professor</ModalTitle>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>First Name</Label>
              <Input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Last Name</Label>
              <Input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Employee ID</Label>
              <Input
                type="text"
                value={formData.employeeId}
                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Department</Label>
              <Input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                required
              />
            </FormGroup>

            <ModalButtons>
              <ModalButton type="button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </ModalButton>
              <ModalButton primary type="submit">
                Add Professor
              </ModalButton>
            </ModalButtons>
          </form>
        </ModalContent>
      </ModalOverlay>
    </Container>
  );
}

export default ProfessorManagement;
