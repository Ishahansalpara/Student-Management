"use client";

import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import StudentProfile from "./StudentProfile";
import AttendanceView from "./AttendanceView";
import MarksView from "./MarksView";
import CoursesView from "./CoursesView";

const COLORS = {
  background: "#fffdf7",
  border: "#dcd7c9",
  surface: "#faf9f4",
  text: "#3e4f61",
  sidebarGradient: "linear-gradient(135deg, #6d9ac2, #395a85)",
  hover: "rgba(255, 255, 255, 0.25)",
};

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${COLORS.background};
  font-family: "Segoe UI", sans-serif;
`;

const Sidebar = styled.div`
  width: 250px;
  background: ${COLORS.sidebarGradient};
  color: #ffffff;
  padding: 25px 20px;
  box-shadow: 3px 0 10px rgba(73, 89, 107, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid ${COLORS.border};
`;

const SidebarTop = styled.div``;

const SidebarTitle = styled.h2`
  margin-bottom: 35px;
  font-size: 22px;
  text-align: center;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
`;

const NavLink = styled(Link)`
  display: block;
  padding: 12px 16px;
  color: ${({ $active }) => ($active ? "#fff" : "rgba(255, 255, 255, 0.9)")};
  background-color: ${({ $active }) =>
    $active ? "rgba(255, 255, 255, 0.15)" : "transparent"};
  text-decoration: none;
  margin-bottom: 10px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${COLORS.hover};
    transform: translateX(3px);
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.3px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const MainContent = styled.div`
  flex: 1;
  background: ${COLORS.surface};
  padding: 40px;
  overflow-y: auto;
  border-left: 1px solid ${COLORS.border};
  box-shadow: inset 0 0 10px rgba(73, 89, 107, 0.05);
  color: ${COLORS.text};
`;

function StudentDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <DashboardContainer>
      <Sidebar>
        <SidebarTop>
          <SidebarTitle>Student Portal</SidebarTitle>
          <NavLink to="/student/profile" $active={location.pathname === "/student/profile"}>
            Profile
          </NavLink>
          <NavLink to="/student/courses" $active={location.pathname === "/student/courses"}>
            My Courses
          </NavLink>
          <NavLink to="/student/attendance" $active={location.pathname === "/student/attendance"}>
            Attendance
          </NavLink>
          <NavLink to="/student/marks" $active={location.pathname === "/student/marks"}>
            Marks
          </NavLink>
        </SidebarTop>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Sidebar>

      <MainContent>
        <Routes>
          <Route path="/profile" element={<StudentProfile />} />
          <Route path="/courses" element={<CoursesView />} />
          <Route path="/attendance" element={<AttendanceView />} />
          <Route path="/marks" element={<MarksView />} />
          <Route path="/" element={<StudentProfile />} />
        </Routes>
      </MainContent>
    </DashboardContainer>
  );
}

export default StudentDashboard;
