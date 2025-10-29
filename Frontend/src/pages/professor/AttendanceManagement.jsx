"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { professorService } from "../../services/api";

//
// 🎨 THEME (matches AdminSubjects)
//
const COLORS = {
  background: "#fffdf7",
  border: "#dcd7c9",
  surface: "#faf9f4",
  text: "#3e4f61",
  primaryGradient: "linear-gradient(135deg, #88b7d5, #4a6fa1)",
  danger: "#e66b5b",
};

//
// 💅 Styled components
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
  margin-bottom: 20px;
  font-weight: 600;
`;

const Row = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;
  flex-wrap: wrap;
  margin-bottom: 18px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 180px;
  flex: 1 1 180px;

  label {
    color: ${COLORS.text};
    margin-bottom: 6px;
    font-weight: 500;
    font-size: 0.95rem;
  }

  input,
  select {
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid ${COLORS.border};
    background: #fff;
    font-size: 0.95rem;
    color: ${COLORS.text};
    transition: border 0.2s ease;
  }

  input:focus,
  select:focus {
    outline: none;
    border-color: #88b7d5;
    box-shadow: 0 0 0 2px rgba(136, 183, 213, 0.18);
  }
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Button = styled.button`
  padding: 10px 18px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: ${COLORS.primaryGradient};
  color: #fff;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 14px rgba(74, 111, 161, 0.25);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SecondaryButton = styled.button`
  padding: 10px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: #e0ddd6;
  color: ${COLORS.text};

  &:hover {
    opacity: 0.95;
  }
`;

const DangerButton = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: ${COLORS.danger};
  color: #fff;

  &:hover {
    opacity: 0.9;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  background: ${COLORS.surface};
  border-radius: 8px;
  border: 1px solid ${COLORS.border};
  margin-top: 12px;
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
    padding: 12px 14px;
    border-bottom: 1px solid ${COLORS.border};
    color: ${COLORS.text};
    font-size: 0.92rem;
  }

  tr:hover {
    background-color: #f9f8f2;
  }

  .actions {
    display: flex;
    gap: 8px;
  }
`;

/* small-screen responsiveness */
const InlineForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: 12px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

//
// 🧩 Component logic
//
function AttendanceManagement() {
  const [classGroups, setClassGroups] = useState([]);
  const [selectedClassGroup, setSelectedClassGroup] = useState("");
  const [students, setStudents] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);

  // form state (for both add & edit)
  const [formData, setFormData] = useState({
    id: null, // attendance id when editing
    studentId: "",
    date: new Date().toISOString().split("T")[0],
    isPresent: true,
    remarks: "",
  });

  useEffect(() => {
    fetchClassGroups();
  }, []);

  const fetchClassGroups = async () => {
    try {
      const res = await professorService.getMyClassGroups();
      setClassGroups(res.data || []);
    } catch (error) {
      console.error("Error fetching class groups:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClassGroupData = async (classGroupId) => {
    if (!classGroupId) {
      setStudents([]);
      setAttendances([]);
      return;
    }

    try {
      const [studentsRes, attendanceRes] = await Promise.all([
        professorService.getClassGroupStudents(classGroupId),
        professorService.getAttendance(classGroupId),
      ]);

      setStudents(studentsRes.data || []);
      // Ensure attendances sorted by date desc
      const attendanceData = (attendanceRes.data || []).sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setAttendances(attendanceData);
    } catch (error) {
      console.error("Error fetching class group data:", error);
    }
  };

  const handleClassGroupChange = (e) => {
    const id = e.target.value;
    setSelectedClassGroup(id);
    setFormData({
      id: null,
      studentId: "",
      date: new Date().toISOString().split("T")[0],
      isPresent: true,
      remarks: "",
    });
    fetchClassGroupData(id);
  };

  // Add new attendance
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!selectedClassGroup) return alert("Please select a class group first.");
    if (!formData.studentId) return alert("Please select a student.");

    try {
      await professorService.recordAttendance({
        studentId: Number.parseInt(formData.studentId),
        classGroupId: Number.parseInt(selectedClassGroup),
        date: new Date(formData.date),
        isPresent: !!formData.isPresent,
        remarks: formData.remarks,
      });

      // refresh
      await fetchClassGroupData(selectedClassGroup);
      // reset form
      setFormData({
        id: null,
        studentId: "",
        date: new Date().toISOString().split("T")[0],
        isPresent: true,
        remarks: "",
      });
    } catch (error) {
      console.error("Error recording attendance:", error);
      alert("Failed to add attendance.");
    }
  };

  // Prepare inline form for editing a row
  const handleEditPrepare = (attendance) => {
    setFormData({
      id: attendance.id,
      studentId: String(attendance.studentId),
      date: new Date(attendance.date).toISOString().split("T")[0],
      isPresent: attendance.isPresent,
      remarks: attendance.remarks || "",
    });

    // ensure the correct class group is selected (in case)
    if (String(selectedClassGroup) !== String(attendance.classGroupId) && attendance.classGroupId) {
      setSelectedClassGroup(String(attendance.classGroupId));
      // fetch data for that class group
      fetchClassGroupData(attendance.classGroupId);
    }

    // scroll form into view (on small screens)
    const el = document.querySelector("form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // Update existing attendance
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.id) return alert("No attendance selected for update.");

    try {
      // assuming backend has updateAttendance(id, payload)
      if (professorService.updateAttendance) {
        await professorService.updateAttendance(formData.id, {
          studentId: Number.parseInt(formData.studentId),
          classGroupId: Number.parseInt(selectedClassGroup),
          date: new Date(formData.date),
          isPresent: !!formData.isPresent,
          remarks: formData.remarks,
        });
      } else {
        // fallback: some backends use recordAttendance to upsert
        await professorService.recordAttendance({
          id: formData.id,
          studentId: Number.parseInt(formData.studentId),
          classGroupId: Number.parseInt(selectedClassGroup),
          date: new Date(formData.date),
          isPresent: !!formData.isPresent,
          remarks: formData.remarks,
        });
      }

      // refresh & reset
      await fetchClassGroupData(selectedClassGroup);
      setFormData({
        id: null,
        studentId: "",
        date: new Date().toISOString().split("T")[0],
        isPresent: true,
        remarks: "",
      });
    } catch (error) {
      console.error("Error updating attendance:", error);
      alert("Failed to update attendance.");
    }
  };

  // Delete attendance
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this attendance record?")) return;
    try {
      if (professorService.deleteAttendance) {
        await professorService.deleteAttendance(id);
      } else {
        // if no delete api exists, try a generic call (update as inactive) - user may change this
        console.warn("professorService.deleteAttendance not found");
        // throw to go to catch
        throw new Error("deleteAttendance not implemented on professorService");
      }
      await fetchClassGroupData(selectedClassGroup);
    } catch (error) {
      console.error("Error deleting attendance:", error);
      alert("Failed to delete attendance (check API method name).");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <Title>Attendance Management</Title>

      {/* Class selector */}
      <Row>
        <Field style={{ flex: "0 1 320px" }}>
          <label>Select Class Group</label>
          <select value={selectedClassGroup} onChange={handleClassGroupChange}>
            <option value="">Choose a class group</option>
            {classGroups.map((cg) => (
              <option key={cg.id} value={cg.id}>
                {cg.name}
              </option>
            ))}
          </select>
        </Field>

        <ActionGroup>
          <SecondaryButton
            onClick={() => {
              // reset inline form
              setFormData({
                id: null,
                studentId: "",
                date: new Date().toISOString().split("T")[0],
                isPresent: true,
                remarks: "",
              });
            }}
          >
            Clear Form
          </SecondaryButton>
        </ActionGroup>
      </Row>

      {/* Inline form (add / edit) */}
      <InlineForm onSubmit={formData.id ? handleUpdate : handleAdd}>
        <Field>
          <label>Student</label>
          <select
            value={formData.studentId}
            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            required
            disabled={!selectedClassGroup}
          >
            <option value="">{selectedClassGroup ? "Select a student" : "Select a class group first"}</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.firstName} {s.lastName}
              </option>
            ))}
          </select>
        </Field>

        <Field>
          <label>Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
            disabled={!selectedClassGroup}
          />
        </Field>

        <Field>
          <label>Status</label>
          <select
            value={String(formData.isPresent)}
            onChange={(e) => setFormData({ ...formData, isPresent: e.target.value === "true" })}
            disabled={!selectedClassGroup}
          >
            <option value="true">Present</option>
            <option value="false">Absent</option>
          </select>
        </Field>

        <Field style={{ minWidth: 220 }}>
          <label>Remarks</label>
          <input
            type="text"
            placeholder="Optional remarks"
            value={formData.remarks}
            onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
            disabled={!selectedClassGroup}
          />
        </Field>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {formData.id ? (
            <>
              <Button type="submit">Update</Button>
              <SecondaryButton
                type="button"
                onClick={() =>
                  setFormData({
                    id: null,
                    studentId: "",
                    date: new Date().toISOString().split("T")[0],
                    isPresent: true,
                    remarks: "",
                  })
                }
              >
                Cancel
              </SecondaryButton>
            </>
          ) : (
            <Button type="submit" disabled={!selectedClassGroup}>
              + Record
            </Button>
          )}
        </div>
      </InlineForm>

      {/* Attendance table */}
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendances.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: 18 }}>
                  No attendance records yet.
                </td>
              </tr>
            ) : (
              attendances.map((a) => (
                <tr key={a.id}>
                  <td>{a.studentName}</td>
                  <td>{new Date(a.date).toLocaleDateString()}</td>
                  <td>{a.isPresent ? "Present" : "Absent"}</td>
                  <td>{a.remarks || "-"}</td>
                  <td className="actions">
                    <SecondaryButton type="button" onClick={() => handleEditPrepare(a)}>
                      Edit
                    </SecondaryButton>
                    <DangerButton type="button" onClick={() => handleDelete(a.id)}>
                      Delete
                    </DangerButton>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  );
}

export default AttendanceManagement;
