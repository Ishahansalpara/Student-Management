import React from 'react'
import styled, { css } from 'styled-components'

const StyledBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  border: 1px solid transparent;
  transition: all 0.2s ease;

  ${({ variant }) => {
    switch (variant) {
      case 'secondary':
        return css`
          background-color: #f1f3f5;
          color: #333;
        `
      case 'destructive':
        return css`
          background-color: #dc3545;
          color: #fff;
        `
      case 'outline':
        return css`
          border-color: #ccc;
          color: #333;
          background-color: transparent;
        `
      default:
        return css`
          background-color: #007bff;
          color: #fff;
        `
    }
  }}
`

export function Badge({ variant = 'default', children, ...props }) {
  return (
    <StyledBadge variant={variant} {...props}>
      {children}
    </StyledBadge>
  )
}
