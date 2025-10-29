import React from 'react'
import * as MenubarPrimitive from '@radix-ui/react-menubar'
import styled, { keyframes, css } from 'styled-components'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'

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

const MenubarRoot = styled(MenubarPrimitive.Root)`
  display: flex;
  align-items: center;
  height: 36px;
  gap: 6px;
  padding: 4px;
  border-radius: 8px;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
`

const MenubarTriggerStyled = styled(MenubarPrimitive.Trigger)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  background: transparent;
  border: none;
  user-select: none;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(99,102,241,0.12);
  }

  &[data-state="open"] {
    background: rgba(99,102,241,0.06);
    color: #374151;
  }
`

const MenubarContentStyled = styled(MenubarPrimitive.Content)`
  min-width: 12rem;
  background: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  padding: 6px;
  box-shadow: 0 8px 24px rgba(2,6,23,0.08);
  z-index: 60;
  animation: ${fadeIn} 0.15s ease-out;

  &[data-state='closed'] {
    animation: ${fadeOut} 0.12s ease-in;
  }
`

const MenubarItemBase = styled(MenubarPrimitive.Item)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 14px;
  cursor: default;

  &:focus {
    outline: none;
    background: #f3f4f6;
  }

  &[data-variant='destructive'] {
    color: #dc2626;
  }

  &[data-disabled='true'] {
    opacity: 0.5;
    pointer-events: none;
  }
`

const MenubarLabelStyled = styled(MenubarPrimitive.Label)`
  padding: 6px 8px;
  font-size: 14px;
  font-weight: 600;
`

const MenubarSeparatorStyled = styled(MenubarPrimitive.Separator)`
  height: 1px;
  background: #e6e6e6;
  margin: 6px 0;
`

const ShortcutSpan = styled.span`
  margin-left: auto;
  font-size: 12px;
  color: #6b7280;
  letter-spacing: 1px;
`

const SubTriggerStyled = styled(MenubarPrimitive.SubTrigger)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 6px;
  cursor: default;

  &:focus {
    outline: none;
    background: #f3f4f6;
  }
`

const SubContentStyled = styled(MenubarPrimitive.SubContent)`
  min-width: 8rem;
  background: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  padding: 6px;
  box-shadow: 0 8px 20px rgba(2,6,23,0.06);
`

// ---------- Components ----------

export function Menubar({ className, ...props }) {
  return <MenubarRoot data-slot="menubar" className={className} {...props} />
}

export function MenubarMenu(props) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />
}

export function MenubarGroup(props) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />
}

export function MenubarPortal(props) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
}

export function MenubarRadioGroup(props) {
  return <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
}

export function MenubarTrigger({ className, ...props }) {
  return (
    <MenubarTriggerStyled data-slot="menubar-trigger" className={className} {...props} />
  )
}

export function MenubarContent({
  className,
  align = 'start',
  alignOffset = -4,
  sideOffset = 8,
  ...props
}) {
  return (
    <MenubarPortal>
      <MenubarContentStyled
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={className}
        {...props}
      />
    </MenubarPortal>
  )
}

export function MenubarItem({ className, inset, variant = 'default', ...props }) {
  return (
    <MenubarItemBase
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={className}
      {...props}
    />
  )
}

export function MenubarCheckboxItem({ className, children, checked, ...props }) {
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      className={className}
      checked={checked}
      {...props}
    >
      <span style={{ position: 'absolute', left: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon size={16} />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
}

export function MenubarRadioItem({ className, children, ...props }) {
  return (
    <MenubarPrimitive.RadioItem data-slot="menubar-radio-item" className={className} {...props}>
      <span style={{ position: 'absolute', left: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon size={10} />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
}

export function MenubarLabel({ className, inset, ...props }) {
  return <MenubarLabelStyled data-slot="menubar-label" data-inset={inset} className={className} {...props} />
}

export function MenubarSeparator({ className, ...props }) {
  return <MenubarSeparatorStyled data-slot="menubar-separator" className={className} {...props} />
}

export function MenubarShortcut({ className, ...props }) {
  return <ShortcutSpan data-slot="menubar-shortcut" className={className} {...props} />
}

export function MenubarSub(props) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

export function MenubarSubTrigger({ children, className, inset, ...props }) {
  return (
    <SubTriggerStyled data-slot="menubar-sub-trigger" data-inset={inset} className={className} {...props}>
      {children}
      <ChevronRightIcon style={{ marginLeft: 'auto', width: 16, height: 16 }} />
    </SubTriggerStyled>
  )
}

export function MenubarSubContent({ className, ...props }) {
  return <SubContentStyled data-slot="menubar-sub-content" className={className} {...props} />
}
