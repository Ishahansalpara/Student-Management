"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";

//
// 🎨 THEME COLORS
//
const COLORS = {
  background: "#fffdf7",
  border: "#dcd7c9",
  surface: "#faf9f4",
  text: "#3e4f61",
  primaryGradient: "linear-gradient(135deg, #88b7d5, #4a6fa1)",
};

//
// 💅 STYLED COMPONENTS
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

const FormGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 28px;
  flex-wrap: wrap;

  input,
  select {
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid ${COLORS.border};
    background: #fff;
    flex: 1;
    font-size: 0.95rem;
    color: ${COLORS.text};
    transition: border 0.25s ease;

    &:focus {
      outline: none;
      border-color: #88b7d5;
      box-shadow: 0 0 0 2px rgba(136, 183, 213, 0.25);
    }
  }

  button {
    background: ${COLORS.primaryGradient};
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    letter-spacing: 0.3px;
    transition: all 0.25s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(74, 111, 161, 0.35);
    }

    &:active {
      transform: translateY(0);
      box-shadow: none;
    }
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

//
// 🧩 COMPONENT LOGIC
//
function AdminSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    courseId: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/subject", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then(setSubjects)
      .catch(console.error);

    fetch("http://localhost:5000/api/course", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then(setCourses)
      .catch(console.error);
  }, []);

  const handleAdd = async () => {
    if (!formData.name || !formData.courseId)
      return alert("Please fill all fields");

    const response = await fetch("http://localhost:5000/api/subject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: formData.name,
        description: formData.description,
        courseId: parseInt(formData.courseId),
      }),
    });

    if (response.ok) {
      alert("Subject added successfully!");
      setFormData({ name: "", description: "", courseId: "" });
      const updated = await fetch("http://localhost:5000/api/subject", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }).then((res) => res.json());
      setSubjects(updated);
    } else {
      alert("Error adding subject.");
    }
  };

  return (
    <Container>
      <Title>Subject Management</Title>
      <FormGroup>
        <input
          placeholder="Subject Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
        <input
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <select
          value={formData.courseId}
          onChange={(e) =>
            setFormData({ ...formData, courseId: e.target.value })
          }
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button onClick={handleAdd}>+ Add</button>
      </FormGroup>

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>Subject Name</th>
              <th>Description</th>
              <th>Course</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.description || "-"}</td>
                <td>{s.courseName}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  );
}

export default AdminSubjects;
