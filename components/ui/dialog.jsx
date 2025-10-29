'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'
import styled, { css, keyframes } from 'styled-components'

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`

const zoomIn = keyframes`
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`

const zoomOut = keyframes`
  from { transform: scale(1); opacity: 1; }
  to { transform: scale(0.95); opacity: 0; }
`

// Styled Components
const Overlay = styled(DialogPrimitive.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 0.2s ease-out;

  &[data-state='closed'] {
    animation: ${fadeOut} 0.2s ease-in;
  }
`

const Content = styled(DialogPrimitive.Content)`
  background: var(--background, #fff);
  border-radius: 0.5rem;
  border: 1px solid var(--border, #e5e7eb);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-width: calc(100% - 2rem);
  width: 100%;
  padding: 1.5rem;
  display: grid;
  gap: 1rem;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 50;
  transform: translate(-50%, -50%);
  animation: ${zoomIn} 0.2s ease-out;

  &[data-state='closed'] {
    animation: ${zoomOut} 0.2s ease-in;
  }

  @media (min-width: 640px) {
    max-width: 32rem;
  }
`

const CloseButton = styled(DialogPrimitive.Close)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  border: none;
  background: transparent;
  border-radius: 4px;
  opacity: 0.7;
  cursor: pointer;
  transition: opacity 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: 2px solid var(--ring, #3b82f6);
    outline-offset: 2px;
  }

  svg {
    width: 1rem;
    height: 1rem;
    pointer-events: none;
  }
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;

  @media (max-width: 640px) {
    text-align: center;
  }
`

const Footer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 0.5rem;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: flex-end;
  }
`

const Title = styled(DialogPrimitive.Title)`
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.25rem;
`

const Description = styled(DialogPrimitive.Description)`
  font-size: 0.875rem;
  color: var(--muted-foreground, #6b7280);
`

// Components
function Dialog(props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger(props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal(props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogOverlay(props) {
  return <Overlay data-slot="dialog-overlay" {...props} />
}

function DialogContent({ children, showCloseButton = true, ...props }) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <Content data-slot="dialog-content" {...props}>
        {children}
        {showCloseButton && (
          <CloseButton data-slot="dialog-close">
            <XIcon />
            <span className="sr-only">Close</span>
          </CloseButton>
        )}
      </Content>
    </DialogPortal>
  )
}

function DialogHeader(props) {
  return <Header data-slot="dialog-header" {...props} />
}

function DialogFooter(props) {
  return <Footer data-slot="dialog-footer" {...props} />
}

function DialogTitle(props) {
  return <Title data-slot="dialog-title" {...props} />
}

function DialogDescription(props) {
  return <Description data-slot="dialog-description" {...props} />
}

// Exports
export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
