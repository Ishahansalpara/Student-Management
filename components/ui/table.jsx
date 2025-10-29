'use client';
import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  position: relative;
  width: 100%;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  font-size: 0.875rem;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  & tr {
    border-bottom: 1px solid #e5e7eb;
  }
`;

const Tbody = styled.tbody`
  & tr:last-child {
    border-bottom: none;
  }
`;

const Tfoot = styled.tfoot`
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
  font-weight: 500;
`;

const Tr = styled.tr`
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(249, 250, 251, 0.5);
  }

  &[data-state='selected'] {
    background-color: #f3f4f6;
  }
`;

const Th = styled.th`
  text-align: left;
  padding: 0.5rem;
  font-weight: 500;
  white-space: nowrap;
  color: #111827;
`;

const Td = styled.td`
  padding: 0.5rem;
  white-space: nowrap;
`;

const Caption = styled.caption`
  color: #6b7280;
  margin-top: 1rem;
  font-size: 0.875rem;
`;

export function Table(props) {
  return (
    <TableContainer>
      <StyledTable {...props} />
    </TableContainer>
  );
}

export const TableHeader = Thead;
export const TableBody = Tbody;
export const TableFooter = Tfoot;
export const TableRow = Tr;
export const TableHead = Th;
export const TableCell = Td;
export const TableCaption = Caption;
