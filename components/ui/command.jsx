'use client'

import * as React from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { SearchIcon } from 'lucide-react'
import styled, { keyframes } from 'styled-components'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './dialog'

// ────────────────────────────────
// Animations
// ────────────────────────────────
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

// ────────────────────────────────
// Styled Components
// ────────────────────────────────
const StyledCommand = styled(CommandPrimitive)`
  background: var(--popover, #fff);
  color: var(--popover-foreground, #111);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 0.5rem;
`

const CommandInputWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 2.75rem;
  gap: 0.5rem;
  border-bottom: 1px solid var(--border, #e5e7eb);
  padding: 0 0.75rem;
`

const CommandInput = styled(CommandPrimitive.Input)`
  flex: 1;
  height: 2.5rem;
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.875rem;
  color: var(--foreground, #111);
  &::placeholder {
    color: var(--muted-foreground, #6b7280);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const CommandList = styled(CommandPrimitive.List)`
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-padding: 0.25rem;
`

const CommandEmpty = styled(CommandPrimitive.Empty)`
  padding: 1.5rem 0;
  text-align: center;
  font-size: 0.875rem;
  color: var(--muted-foreground, #6b7280);
`

const CommandGroup = styled(CommandPrimitive.Group)`
  padding: 0.25rem;
  color: var(--foreground, #111);

  [cmdk-group-heading] {
    color: var(--muted-foreground, #6b7280);
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.4rem 0.5rem;
  }
`

const CommandSeparator = styled(CommandPrimitive.Separator)`
  height: 1px;
  background: var(--border, #e5e7eb);
  margin: 0.25rem 0;
`

const CommandItem = styled(CommandPrimitive.Item)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  border-radius: 0.25rem;
  padding: 0.375rem 0.5rem;
  cursor: default;
  user-select: none;
  color: var(--foreground, #111);

  svg {
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
    color: var(--muted-foreground, #6b7280);
  }

  &[data-disabled='true'] {
    opacity: 0.5;
    pointer-events: none;
  }

  &[data-selected='true'] {
    background: var(--accent, #e5e7eb);
    color: var(--accent-foreground, #111);
  }
`

const CommandShortcut = styled.span`
  margin-left: auto;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: var(--muted-foreground, #6b7280);
`

// ────────────────────────────────
// Dialog Command Wrapper
// ────────────────────────────────
const StyledDialogContent = styled(DialogContent)`
  padding: 0;
  overflow: hidden;
  animation: ${fadeIn} 0.2s ease-in-out;
`

// ────────────────────────────────
// Components
// ────────────────────────────────
function Command({ className, ...props }) {
  return <StyledCommand data-slot="command" className={className} {...props} />
}

function CommandDialog({
  title = 'Command Palette',
  description = 'Search for a command to run...',
  children,
  className,
  showCloseButton = true,
  ...props
}) {
  return (
    <Dialog {...props}>
      <DialogHeader style={{ display: 'none' }}>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <StyledDialogContent
        data-slot="command-dialog-content"
        showCloseButton={showCloseButton}
        className={className}
      >
        <Command>{children}</Command>
      </StyledDialogContent>
    </Dialog>
  )
}

function CommandInputSection(props) {
  return (
    <CommandInputWrapper data-slot="command-input-wrapper">
      <SearchIcon size={16} style={{ opacity: 0.5 }} />
      <CommandInput data-slot="command-input" {...props} />
    </CommandInputWrapper>
  )
}

// ────────────────────────────────
// Exports
// ────────────────────────────────
export {
  Command,
  CommandDialog,
  CommandInputSection as CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
