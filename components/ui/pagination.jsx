import React from 'react';
import styled from 'styled-components';
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';

/* ==== Styled Components ==== */

const PaginationNav = styled.nav`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
`;

const PaginationList = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
  list-style: none;
  padding: 0;
`;

const PaginationItem = styled.li``;

const PaginationLinkStyled = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  border: 1px solid transparent;
  text-decoration: none;
  transition: all 0.2s ease;
  color: inherit;

  ${({ $isActive }) =>
    $isActive
      ? `
    border-color: var(--border);
    background: var(--background);
  `
      : `
    &:hover {
      background: var(--accent);
      color: var(--accent-foreground);
    }
  `}
`;

const Ellipsis = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
`;

export function Pagination({ children, ...props }) {
  return <PaginationNav {...props}>{children}</PaginationNav>;
}

export function PaginationContent({ children, ...props }) {
  return <PaginationList {...props}>{children}</PaginationList>;
}

export { PaginationItem };

export function PaginationLink({ isActive, children, ...props }) {
  return (
    <PaginationLinkStyled $isActive={isActive} {...props}>
      {children}
    </PaginationLinkStyled>
  );
}

export function PaginationPrevious({ ...props }) {
  return (
    <PaginationLink {...props}>
      <ChevronLeftIcon size={16} />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  );
}

export function PaginationNext({ ...props }) {
  return (
    <PaginationLink {...props}>
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon size={16} />
    </PaginationLink>
  );
}

export function PaginationEllipsis() {
  return (
    <Ellipsis>
      <MoreHorizontalIcon size={16} />
      <span className="sr-only">More pages</span>
    </Ellipsis>
  );
}
