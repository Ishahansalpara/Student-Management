"use client"

import { Routes, Route, Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import AttendanceManagement from "./AttendanceManagement"
import MarksManagement from "./MarksManagement"
import ClassesView from "./ClassesView"

// Layout styles
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #fffdf7;
  font-family: "Segoe UI", sans-serif;
`

const Sidebar = styled.div`
  width: 250px;
background: linear-gradient(135deg, #6d9ac2, #395a85);
  color: white;
  padding: 20px;
  box-shadow: 4px 0 12px rgba(73, 89, 107, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const SidebarTop = styled.div``

const SidebarTitle = styled.h2`
  margin-bottom: 30px;
  font-size: 22px;
  text-align: center;
  font-weight: 600;
`

const NavLink = styled(Link)`
  display: block;
  padding: 12px 16px;
  color: white;
  text-decoration: none;
  margin-bottom: 10px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.25);
    font-weight: 600;
  }
`

const LogoutButton = styled.button`
  width: 100%;
  padding: 12px;
  background: white;
  color: #1f4fa3;
  border: 1px solid #dcd7c9;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background-color: #eef1ff;
  }
`

const MainContent = styled.div`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  background: #fffdf7;
`

function ProfessorDashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <DashboardContainer>
      {/* Sidebar Navigation */}
      <Sidebar>
        <SidebarTop>
          <SidebarTitle>Professor Panel</SidebarTitle>
          <NavLink to="/professor/classes">My Classes</NavLink>
          <NavLink to="/professor/attendance">Attendance</NavLink>
          <NavLink to="/professor/marks">Marks</NavLink>
        </SidebarTop>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Sidebar>

      {/* Main Content Area */}
      <MainContent>
        <Routes>
          <Route path="/" element={<ClassesView />} />
          <Route path="/classes" element={<ClassesView />} />
          <Route path="/attendance" element={<AttendanceManagement />} />
          <Route path="/marks" element={<MarksManagement />} />
        </Routes>
      </MainContent>
    </DashboardContainer>
  )
}

export default ProfessorDashboard
