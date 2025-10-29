'use client'

import React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import styled from 'styled-components'

// === Styled Components ===
const Overlay = styled(AlertDialogPrimitive.Overlay)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 50;
`

const Content = styled(AlertDialogPrimitive.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 60;
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  display: grid;
  gap: 1rem;
  transition: all 0.3s ease-in-out;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;
`

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 0.5rem;
`

const Title = styled(AlertDialogPrimitive.Title)`
  font-size: 1.25rem;
  font-weight: 600;
`

const Description = styled(AlertDialogPrimitive.Description)`
  font-size: 0.95rem;
  color: #666;
`

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;

  &.primary {
    background: #007bff;
    color: white;
  }

  &.outline {
    background: white;
    border: 1px solid #ccc;
    color: #333;
  }

  &:hover {
    opacity: 0.9;
  }
`

// === Components ===
export function AlertDialog(props) {
  return <AlertDialogPrimitive.Root {...props} />
}

export function AlertDialogTrigger(props) {
  return <AlertDialogPrimitive.Trigger {...props} />
}

export function AlertDialogContent({ children, ...props }) {
  return (
    <AlertDialogPrimitive.Portal>
      <Overlay />
      <Content {...props}>{children}</Content>
    </AlertDialogPrimitive.Portal>
  )
}

export function AlertDialogHeader({ children }) {
  return <Header>{children}</Header>
}

export function AlertDialogFooter({ children }) {
  return <Footer>{children}</Footer>
}

export function AlertDialogTitle({ children }) {
  return <Title>{children}</Title>
}

export function AlertDialogDescription({ children }) {
  return <Description>{children}</Description>
}

export function AlertDialogAction({ children, ...props }) {
  return (
    <AlertDialogPrimitive.Action asChild>
      <Button className="primary" {...props}>
        {children}
      </Button>
    </AlertDialogPrimitive.Action>
  )
}

export function AlertDialogCancel({ children, ...props }) {
  return (
    <AlertDialogPrimitive.Cancel asChild>
      <Button className="outline" {...props}>
        {children}
      </Button>
    </AlertDialogPrimitive.Cancel>
  )
}
