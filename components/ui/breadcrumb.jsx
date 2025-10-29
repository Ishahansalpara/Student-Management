import React from 'react'
import styled from 'styled-components'
import { ChevronRight, MoreHorizontal } from 'lucide-react'

const BreadcrumbNav = styled.nav`
  display: block;
`

const BreadcrumbList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
`

const BreadcrumbItem = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
`

const BreadcrumbLink = styled.a`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const BreadcrumbPage = styled.span`
  color: #333;
  font-weight: 500;
`

const BreadcrumbSeparator = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
`

const BreadcrumbEllipsis = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  color: #888;
`

export function Breadcrumb({ children, ...props }) {
  return <BreadcrumbNav {...props}>{children}</BreadcrumbNav>
}

export function BreadcrumbListComponent({ children, ...props }) {
  return <BreadcrumbList {...props}>{children}</BreadcrumbList>
}

export function BreadcrumbItemComponent({ children, ...props }) {
  return <BreadcrumbItem {...props}>{children}</BreadcrumbItem>
}

export function BreadcrumbLinkComponent({ children, ...props }) {
  return <BreadcrumbLink {...props}>{children}</BreadcrumbLink>
}

export function BreadcrumbPageComponent({ children, ...props }) {
  return <BreadcrumbPage {...props}>{children}</BreadcrumbPage>
}

export function BreadcrumbSeparatorComponent({ children }) {
  return <BreadcrumbSeparator>{children || <ChevronRight size={14} />}</BreadcrumbSeparator>
}

export function BreadcrumbEllipsisComponent() {
  return (
    <BreadcrumbEllipsis>
      <MoreHorizontal size={16} />
    </BreadcrumbEllipsis>
  )
}
