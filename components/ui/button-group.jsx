import React from 'react'
import styled, { css } from 'styled-components'

const StyledButtonGroup = styled.div`
  display: flex;
  align-items: stretch;
  width: fit-content;

  ${({ orientation }) =>
    orientation === 'vertical'
      ? css`
          flex-direction: column;
          & > *:not(:first-child) {
            border-top: none;
            border-radius: 0 0 6px 6px;
          }
        `
      : css`
          flex-direction: row;
          & > *:not(:first-child) {
            border-left: none;
            border-radius: 0 6px 6px 0;
          }
        `}
`

const GroupText = styled.div`
  background-color: #f1f3f5;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const GroupSeparator = styled.div`
  background-color: #ddd;
  align-self: stretch;
  width: 1px;
  margin: 0 4px;

  ${({ orientation }) =>
    orientation === 'horizontal' &&
    css`
      width: auto;
      height: 1px;
      margin: 4px 0;
    `}
`

export function ButtonGroup({ orientation = 'horizontal', children, ...props }) {
  return (
    <StyledButtonGroup orientation={orientation} role="group" {...props}>
      {children}
    </StyledButtonGroup>
  )
}

export function ButtonGroupText({ children, ...props }) {
  return <GroupText {...props}>{children}</GroupText>
}

export function ButtonGroupSeparator({ orientation = 'vertical', ...props }) {
  return <GroupSeparator orientation={orientation} {...props} />
}
