"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { studentService } from "../../services/api";

// Styled Components — matching admin theme
const Container = styled.div`
  background: #fffdf7;
  border: 1px solid #dcd7c9;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(73, 89, 107, 0.1);
  font-family: "Segoe UI", sans-serif;
`;

const Title = styled.h2`
  color: #3e4f61;
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 22px;
`;

const SummaryBox = styled.div`
  background-color: #f5f3ed;
  border-left: 5px solid #4a6fa1;
  border-radius: 8px;
  padding: 15px 20px;
  margin-bottom: 20px;
  font-size: 15px;
  color: #3e4f61;
  font-weight: 500;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;

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

const StatusBadge = styled.span`
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  background-color: ${(props) =>
    props.present ? "rgba(136, 183, 213, 0.25)" : "rgba(230, 107, 91, 0.15)"};
  color: ${(props) => (props.present ? "#1d3557" : "#a33d2f")};
  border: 1px solid
    ${(props) => (props.present ? "rgba(136,183,213,0.4)" : "rgba(230,107,91,0.3)")};
`;

const NoData = styled.div`
  text-align: center;
  color: #666;
  font-size: 14px;
  margin-top: 20px;
  font-style: italic;
`;

// Component
function AttendanceView() {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await studentService.getMyAttendance();
      setAttendances(response.data || []);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  const presentCount = attendances.filter((a) => a.isPresent).length;
  const totalCount = attendances.length;
  const attendancePercentage =
    totalCount > 0 ? ((presentCount / totalCount) * 100).toFixed(2) : 0;

  return (
    <Container>
      <Title>My Attendance</Title>

      <SummaryBox>
        <p>
          <strong>Attendance Rate:</strong> {attendancePercentage}% ({presentCount}/{totalCount})
        </p>
      </SummaryBox>

      {attendances.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {attendances.map((attendance) => (
              <tr key={attendance.id}>
                <td>{new Date(attendance.date).toLocaleDateString()}</td>
                <td>
                  <StatusBadge present={attendance.isPresent}>
                    {attendance.isPresent ? "Present" : "Absent"}
                  </StatusBadge>
                </td>
                <td>{attendance.remarks || "-"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <NoData>No attendance records available.</NoData>
      )}
    </Container>
  );
}

export default AttendanceView;
