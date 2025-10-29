import React from 'react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import styled, { keyframes } from 'styled-components'

// ---------- Animations ----------
const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`

const fadeOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.95); }
`

// ---------- Styled ----------
const StyledContent = styled(HoverCardPrimitive.Content)`
  background: #fff;
  color: #111827;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  width: 16rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 50;

  &[data-state='open'] {
    animation: ${fadeIn} 0.15s ease-out;
  }
  &[data-state='closed'] {
    animation: ${fadeOut} 0.1s ease-in;
  }
`

// ---------- Components ----------
export function HoverCard(props) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
}

export function HoverCardTrigger(props) {
  return <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
}

export function HoverCardContent({ align = 'center', sideOffset = 4, ...props }) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <StyledContent align={align} sideOffset={sideOffset} {...props} />
    </HoverCardPrimitive.Portal>
  )
}
