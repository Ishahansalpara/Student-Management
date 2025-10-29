import React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'
import styled, { keyframes, css } from 'styled-components'

// ---------- Animations ----------
const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`
const fadeOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.95); }
`

// ---------- Styled Components ----------

const Content = styled(DropdownMenuPrimitive.Content)`
  z-index: 50;
  min-width: 8rem;
  max-height: 400px;
  background: #ffffff;
  color: #000000;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  overflow-y: auto;
  &[data-state='open'] {
    animation: ${fadeIn} 0.15s ease-out;
  }
  &[data-state='closed'] {
    animation: ${fadeOut} 0.15s ease-in;
  }
`

const Item = styled(DropdownMenuPrimitive.Item)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  border-radius: 4px;
  padding: 6px 8px;
  cursor: pointer;
  color: #222;
  user-select: none;

  &[data-variant='destructive'] {
    color: #d32f2f;
  }

  &[data-variant='destructive']:focus {
    background: rgba(211, 47, 47, 0.1);
  }

  &[data-disabled] {
    opacity: 0.5;
    pointer-events: none;
  }

  &:focus {
    outline: none;
    background: #f0f0f0;
  }

  &[data-inset='true'] {
    padding-left: 32px;
  }

  svg {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    color: #666;
  }
`

const CheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  border-radius: 4px;
  padding: 6px 8px 6px 32px;
  cursor: pointer;
  color: #222;

  &:focus {
    background: #f0f0f0;
  }

  &[data-disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
`

const RadioItem = styled(DropdownMenuPrimitive.RadioItem)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  border-radius: 4px;
  padding: 6px 8px 6px 32px;
  cursor: pointer;
  color: #222;

  &:focus {
    background: #f0f0f0;
  }

  &[data-disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
`

const Label = styled(DropdownMenuPrimitive.Label)`
  font-size: 14px;
  font-weight: 500;
  padding: 6px 8px;
  color: #333;
  &[data-inset='true'] {
    padding-left: 32px;
  }
`

const Separator = styled(DropdownMenuPrimitive.Separator)`
  height: 1px;
  background: #e5e5e5;
  margin: 6px 0;
`

const Shortcut = styled.span`
  margin-left: auto;
  font-size: 12px;
  color: #888;
  letter-spacing: 1px;
`

const SubTrigger = styled(DropdownMenuPrimitive.SubTrigger)`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  padding: 6px 8px;
  border-radius: 4px;
  color: #222;
  cursor: pointer;

  &:focus,
  &[data-state='open'] {
    background: #f0f0f0;
  }

  &[data-inset='true'] {
    padding-left: 32px;
  }

  svg {
    width: 16px;
    height: 16px;
    color: #666;
  }
`

const SubContent = styled(DropdownMenuPrimitive.SubContent)`
  z-index: 50;
  min-width: 8rem;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  animation: ${fadeIn} 0.15s ease-out;
`

// ---------- Component Wrappers ----------

export function DropdownMenu(props) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

export function DropdownMenuPortal(props) {
  return <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

export function DropdownMenuTrigger(props) {
  return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

export function DropdownMenuContent({ children, ...props }) {
  return (
    <DropdownMenuPrimitive.Portal>
      <Content data-slot="dropdown-menu-content" sideOffset={4} {...props}>
        {children}
      </Content>
    </DropdownMenuPrimitive.Portal>
  )
}

export function DropdownMenuGroup(props) {
  return <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

export function DropdownMenuItem({ variant = 'default', inset, ...props }) {
  return (
    <Item data-slot="dropdown-menu-item" data-variant={variant} data-inset={inset} {...props} />
  )
}

export function DropdownMenuCheckboxItem({ children, checked, ...props }) {
  return (
    <CheckboxItem data-slot="dropdown-menu-checkbox-item" checked={checked} {...props}>
      <span
        style={{
          position: 'absolute',
          left: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '14px',
          height: '14px',
        }}
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon size={14} />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </CheckboxItem>
  )
}

export function DropdownMenuRadioGroup(props) {
  return <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
}

export function DropdownMenuRadioItem({ children, ...props }) {
  return (
    <RadioItem data-slot="dropdown-menu-radio-item" {...props}>
      <span
        style={{
          position: 'absolute',
          left: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '14px',
          height: '14px',
        }}
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon size={8} fill="currentColor" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </RadioItem>
  )
}

export function DropdownMenuLabel(props) {
  return <Label data-slot="dropdown-menu-label" {...props} />
}

export function DropdownMenuSeparator(props) {
  return <Separator data-slot="dropdown-menu-separator" {...props} />
}

export function DropdownMenuShortcut(props) {
  return <Shortcut data-slot="dropdown-menu-shortcut" {...props} />
}

export function DropdownMenuSub(props) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

export function DropdownMenuSubTrigger({ children, ...props }) {
  return (
    <SubTrigger data-slot="dropdown-menu-sub-trigger" {...props}>
      {children}
      <ChevronRightIcon size={16} style={{ marginLeft: 'auto' }} />
    </SubTrigger>
  )
}

export function DropdownMenuSubContent(props) {
  return <SubContent data-slot="dropdown-menu-sub-content" {...props} />
}
