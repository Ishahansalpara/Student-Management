'use client'

import React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDownIcon } from 'lucide-react'
import styled from 'styled-components'

// === Styled Components ===
const StyledItem = styled(AccordionPrimitive.Item)`
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`

const StyledHeader = styled(AccordionPrimitive.Header)`
  display: flex;
`

const StyledTrigger = styled(AccordionPrimitive.Trigger)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  padding: 1rem 0;
  text-align: left;
  font-size: 0.9rem;
  font-weight: 500;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &[data-state='open'] svg {
    transform: rotate(180deg);
  }
`

const ChevronIcon = styled(ChevronDownIcon)`
  width: 1rem;
  height: 1rem;
  transition: transform 0.2s ease-in-out;
  color: #666;
`

const StyledContent = styled(AccordionPrimitive.Content)`
  overflow: hidden;
  font-size: 0.9rem;
  padding: 0 0 1rem 0;
  transition: all 0.2s ease-in-out;
`

// === Components ===
export function Accordion(props) {
  return <AccordionPrimitive.Root {...props} />
}

export function AccordionItem({ children, ...props }) {
  return <StyledItem {...props}>{children}</StyledItem>
}

export function AccordionTrigger({ children, ...props }) {
  return (
    <StyledHeader>
      <StyledTrigger {...props}>
        {children}
        <ChevronIcon />
      </StyledTrigger>
    </StyledHeader>
  )
}

export function AccordionContent({ children, ...props }) {
  return <StyledContent {...props}>{children}</StyledContent>
}
