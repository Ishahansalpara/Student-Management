import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  border: 1px solid var(--border, #e5e7eb);
  border-radius: 12px;
  background: var(--card-bg, #ffffff);
  color: var(--card-fg, #111827);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid var(--border, #f3f4f6);
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
`;

const CardDescription = styled.p`
  font-size: 0.875rem;
  color: var(--muted-fg, #6b7280);
  margin: 0;
`;

const CardContent = styled.div`
  padding: 16px 20px;
  flex: 1;
`;

const CardFooter = styled.div`
  padding: 12px 20px;
  border-top: 1px solid var(--border, #f3f4f6);
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export function Card({ children, ...props }) {
  return <CardContainer {...props}>{children}</CardContainer>;
}

export function CardHeaderSection({ children, ...props }) {
  return <CardHeader {...props}>{children}</CardHeader>;
}

export function CardTitleText({ children, ...props }) {
  return <CardTitle {...props}>{children}</CardTitle>;
}

export function CardDescriptionText({ children, ...props }) {
  return <CardDescription {...props}>{children}</CardDescription>;
}

export function CardBody({ children, ...props }) {
  return <CardContent {...props}>{children}</CardContent>;
}

export function CardFooterSection({ children, ...props }) {
  return <CardFooter {...props}>{children}</CardFooter>;
}
