import React from 'react'
import styled, { css } from 'styled-components'

// ---------- Styled Components ----------

const EmptyContainer = styled.div`
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  word-break: break-word;
  @media (min-width: 768px) {
    padding: 3rem;
  }
`

const EmptyHeaderContainer = styled.div`
  display: flex;
  max-width: 24rem;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
`

const EmptyMediaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;

  svg {
    pointer-events: none;
    flex-shrink: 0;
  }

  ${(props) =>
    props.variant === 'icon' &&
    css`
      background: #f3f4f6;
      color: #111827;
      display: flex;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 8px;

      svg:not([class*='size-']) {
        width: 1.5rem;
        height: 1.5rem;
      }
    `}
`

const EmptyTitleContainer = styled.div`
  font-size: 1.125rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: #111827;
`

const EmptyDescriptionContainer = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.6;
  text-align: center;

  a {
    text-decoration: underline;
    text-underline-offset: 4px;
    color: #2563eb;
  }

  a:hover {
    color: #1d4ed8;
  }
`

const EmptyContentContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 24rem;
  min-width: 0;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
  text-align: center;
  word-break: break-word;
`

// ---------- Components ----------

export function Empty({ className, ...props }) {
  return <EmptyContainer data-slot="empty" className={className} {...props} />
}

export function EmptyHeader({ className, ...props }) {
  return (
    <EmptyHeaderContainer data-slot="empty-header" className={className} {...props} />
  )
}

export function EmptyMedia({ variant = 'default', className, ...props }) {
  return (
    <EmptyMediaContainer
      data-slot="empty-icon"
      data-variant={variant}
      variant={variant}
      className={className}
      {...props}
    />
  )
}

export function EmptyTitle({ className, ...props }) {
  return (
    <EmptyTitleContainer data-slot="empty-title" className={className} {...props} />
  )
}

export function EmptyDescription({ className, ...props }) {
  return (
    <EmptyDescriptionContainer
      data-slot="empty-description"
      className={className}
      {...props}
    />
  )
}

export function EmptyContent({ className, ...props }) {
  return (
    <EmptyContentContainer data-slot="empty-content" className={className} {...props} />
  )
}
