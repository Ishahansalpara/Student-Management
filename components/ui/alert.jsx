import React from 'react'
import styled, { css } from 'styled-components'

// === Styled Components ===
const AlertWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 0.9rem;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: 0.75rem;
  border: 1px solid #ddd;
  background-color: #fff;
  color: #333;

  ${({ variant }) =>
    variant === 'destructive' &&
    css`
      border-color: #dc3545;
      background-color: #f8d7da;
      color: #721c24;
    `}
`

const AlertTitleStyled = styled.div`
  font-weight: 600;
  letter-spacing: 0.3px;
  grid-column: 2;
  margin-bottom: 4px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const AlertDescriptionStyled = styled.div`
  color: #555;
  grid-column: 2;
  font-size: 0.875rem;
  line-height: 1.4;
`

// === Components ===
export function Alert({ variant = 'default', children, ...props }) {
  return (
    <AlertWrapper role="alert" variant={variant} {...props}>
      {children}
    </AlertWrapper>
  )
}

export function AlertTitle({ children, ...props }) {
  return <AlertTitleStyled {...props}>{children}</AlertTitleStyled>
}

export function AlertDescription({ children, ...props }) {
  return <AlertDescriptionStyled {...props}>{children}</AlertDescriptionStyled>
}
