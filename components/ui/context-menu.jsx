'use client'

import * as React from 'react'
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import styled from 'styled-components'
import { Check, ChevronRight, Circle } from 'lucide-react'

// ────────────────────────────────
// Base Styled Components
// ────────────────────────────────
const StyledContent = styled(ContextMenuPrimitive.Content)`
  min-width: 8rem;
  background: var(--popover, #fff);
  color: var(--popover-foreground, #111);
  border: 1px solid var(--border, #e5e7eb);
  border-radius: 0.375rem;
  padding: 0.25rem;
  z-index: 50;
  animation: fadeIn 0.15s ease-out;
`

const StyledItem = styled(ContextMenuPrimitive.Item)`
  display: flex;
  align-items: center;
  padding: 0.375rem 0.625rem;
  border-radius: 0.25rem;
  position: relative;
  user-select: none;
  font-size: 0.875rem;
  color: var(--foreground, #111);
  cursor: default;
  outline: none;

  &[data-disabled='true'] {
    opacity: 0.5;
    pointer-events: none;
  }

  &[data-highlighted='true'] {
    background: var(--accent, #e5e7eb);
    color: var(--accent-foreground, #111);
  }
`

const StyledCheckboxItem = styled(ContextMenuPrimitive.CheckboxItem)`
  display: flex;
  align-items: center;
  padding: 0.375rem 0.625rem;
  border-radius: 0.25rem;
  position: relative;
  user-select: none;
  font-size: 0.875rem;
  color: var(--foreground, #111);
  cursor: default;
  outline: none;

  &[data-disabled='true'] {
    opacity: 0.5;
    pointer-events: none;
  }

  &[data-highlighted='true'] {
    background: var(--accent, #e5e7eb);
    color: var(--accent-foreground, #111);
  }
`

const StyledRadioItem = styled(ContextMenuPrimitive.RadioItem)`
  display: flex;
  align-items: center;
  padding: 0.375rem 0.625rem;
  border-radius: 0.25rem;
  position: relative;
  user-select: none;
  font-size: 0.875rem;
  color: var(--foreground, #111);
  cursor: default;
  outline: none;

  &[data-disabled='true'] {
    opacity: 0.5;
    pointer-events: none;
  }

  &[data-highlighted='true'] {
    background: var(--accent, #e5e7eb);
    color: var(--accent-foreground, #111);
  }
`

const StyledLabel = styled(ContextMenuPrimitive.Label)`
  padding: 0.5rem 0.625rem;
  font-size: 0.75rem;
  color: var(--muted-foreground, #6b7280);
`

const StyledSeparator = styled(ContextMenuPrimitive.Separator)`
  height: 1px;
  background: var(--border, #e5e7eb);
  margin: 0.25rem 0;
`

const StyledSubContent = styled(ContextMenuPrimitive.SubContent)`
  min-width: 8rem;
  background: var(--popover, #fff);
  color: var(--popover-foreground, #111);
  border: 1px solid var(--border, #e5e7eb);
  border-radius: 0.375rem;
  padding: 0.25rem;
  z-index: 50;
`

const ItemIndicator = styled.span`
  position: absolute;
  left: 0.25rem;
  width: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const RightSlot = styled.span`
  margin-left: auto;
  padding-left: 1rem;
  font-size: 0.75rem;
  opacity: 0.6;
`

// ────────────────────────────────
// Components
// ────────────────────────────────
function ContextMenu({ children, ...props }) {
  return <ContextMenuPrimitive.Root {...props}>{children}</ContextMenuPrimitive.Root>
}

function ContextMenuTrigger({ children, ...props }) {
  return (
    <ContextMenuPrimitive.Trigger asChild {...props}>
      {children}
    </ContextMenuPrimitive.Trigger>
  )
}

function ContextMenuContent({ children, ...props }) {
  return (
    <StyledContent data-slot="context-menu-content" {...props}>
      {children}
    </StyledContent>
  )
}

function ContextMenuItem({ inset, children, ...props }) {
  return (
    <StyledItem data-slot="context-menu-item" style={{ paddingLeft: inset ? '2rem' : undefined }} {...props}>
      {children}
    </StyledItem>
  )
}

function ContextMenuCheckboxItem({ checked, children, ...props }) {
  return (
    <StyledCheckboxItem {...props} checked={checked}>
      <ItemIndicator>
        <Check size={14} />
      </ItemIndicator>
      {children}
    </StyledCheckboxItem>
  )
}

function ContextMenuRadioItem({ children, ...props }) {
  return (
    <StyledRadioItem {...props}>
      <ItemIndicator>
        <Circle size={10} />
      </ItemIndicator>
      {children}
    </StyledRadioItem>
  )
}

function ContextMenuLabel(props) {
  return <StyledLabel data-slot="context-menu-label" {...props} />
}

function ContextMenuSeparator(props) {
  return <StyledSeparator data-slot="context-menu-separator" {...props} />
}

function ContextMenuShortcut({ children }) {
  return <RightSlot>{children}</RightSlot>
}

function ContextMenuSub({ children, ...props }) {
  return <ContextMenuPrimitive.Sub {...props}>{children}</ContextMenuPrimitive.Sub>
}

function ContextMenuSubTrigger({ children, ...props }) {
  return (
    <StyledItem {...props}>
      {children}
      <RightSlot>
        <ChevronRight size={14} />
      </RightSlot>
    </StyledItem>
  )
}

function ContextMenuSubContent({ children, ...props }) {
  return (
    <StyledSubContent data-slot="context-menu-subcontent" {...props}>
      {children}
    </StyledSubContent>
  )
}

// ────────────────────────────────
// Exports
// ────────────────────────────────
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
}
