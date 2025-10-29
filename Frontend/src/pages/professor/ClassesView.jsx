"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { professorService } from "../../services/api";

const COLORS = {
  background: "#fffdf7",
  border: "#dcd7c9",
  surface: "#faf9f4",
  text: "#3e4f61",
  primaryGradient: "linear-gradient(135deg, #88b7d5, #4a6fa1)",
};

const Container = styled.div`
  background: ${COLORS.background};
  border: 1px solid ${COLORS.border};
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 4px 16px rgba(73, 89, 107, 0.15);
`;

const Title = styled.h2`
  color: ${COLORS.text};
  font-weight: 600;
  font-size: 1.6rem;
  margin-bottom: 28px;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
`;

const Card = styled.div`
  background: ${COLORS.surface};
  border-radius: 12px;
  border: 1px solid ${COLORS.border};
  padding: 20px;
  box-shadow: 0 2px 10px rgba(73, 89, 107, 0.08);
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(73, 89, 107, 0.18);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 600;
  color: ${COLORS.text};
  margin-bottom: 12px;
`;

const CardInfo = styled.p`
  font-size: 0.95rem;
  color: ${COLORS.text};
  margin-bottom: 6px;
`;

const Badge = styled.span`
  display: inline-block;
  background: ${COLORS.primaryGradient};
  color: #fff;
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-top: 10px;
`;

function ClassesView() {
  const [classGroups, setClassGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClassGroups();
  }, []);

  const fetchClassGroups = async () => {
    try {
      const response = await professorService.getMyClassGroups();
      setClassGroups(response.data);
    } catch (error) {
      console.error("Error fetching class groups:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <Title>My Classes</Title>
      <Grid>
        {classGroups.map((classGroup) => (
          <Card key={classGroup.id}>
            <CardTitle>{classGroup.name}</CardTitle>
            <CardInfo>
              <strong>Course:</strong> {classGroup.courseName}
            </CardInfo>
            <CardInfo>
              <strong>Schedule:</strong> {classGroup.schedule}
            </CardInfo>
            <CardInfo>
              <strong>Students:</strong> {classGroup.studentCount}
            </CardInfo>
            <Badge>Class ID: {classGroup.id}</Badge>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}

export default ClassesView;
