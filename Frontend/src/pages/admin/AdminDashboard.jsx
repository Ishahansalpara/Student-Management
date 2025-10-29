"use client";

import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import StudentManagement from "./StudentManagement";
import CourseManagement from "./CourseManagement";
import ClassGroupManagement from "./ClassGroupManagement";
import ProfessorManagement from "./ProfessorManagement";
import AdminSubjects from "./Subject";

const COLORS = {
  background: "#fffdf7",
  border: "#dcd7c9",
  surface: "#faf9f4",
  text: "#3e4f61",
  sidebarGradient: "linear-gradient(135deg, #6d9ac2, #395a85)",
  buttonHover: "rgba(255, 255, 255, 0.25)",
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
  padding: 24px 20px;
  box-shadow: 3px 0 10px rgba(73, 89, 107, 0.15);
  border-right: 1px solid ${COLORS.border};
`;

const SidebarTitle = styled.h2`
  margin-bottom: 40px;
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
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background-color: ${COLORS.buttonHover};
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
  margin-top: 40px;
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
  padding: 40px 50px;
  overflow-y: auto;
  border-left: 1px solid ${COLORS.border};
  box-shadow: inset 0 0 10px rgba(73, 89, 107, 0.05);
`;

function AdminDashboard() {
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
        <SidebarTitle>Admin Panel</SidebarTitle>
        <NavLink to="/admin/students" $active={location.pathname === "/admin/students"}>
          Students
        </NavLink>
        <NavLink to="/admin/professors" $active={location.pathname === "/admin/professors"}>
          Professors
        </NavLink>
        <NavLink to="/admin/courses" $active={location.pathname === "/admin/courses"}>
          Courses
        </NavLink>
        <NavLink to="/admin/subjects" $active={location.pathname === "/admin/subjects"}>
          Subjects
        </NavLink>
        <NavLink to="/admin/classgroups" $active={location.pathname === "/admin/classgroups"}>
          Class Groups
        </NavLink>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Sidebar>

      <MainContent>
        <Routes>
          <Route path="students" element={<StudentManagement />} />
          <Route path="professors" element={<ProfessorManagement />} />
          <Route path="courses" element={<CourseManagement />} />
          <Route path="subjects" element={<AdminSubjects />} />
          <Route path="classgroups" element={<ClassGroupManagement />} />
          <Route index element={<StudentManagement />} />
        </Routes>
      </MainContent>
    </DashboardContainer>
  );
}

export default AdminDashboard;
