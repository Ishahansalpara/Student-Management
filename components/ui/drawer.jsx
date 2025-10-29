import React from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'
import styled, { css, keyframes } from 'styled-components'

// ---------- Animations ----------
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`
const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`

// ---------- Styled Components ----------

const Overlay = styled(DrawerPrimitive.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.5);
  &[data-state='open'] {
    animation: ${fadeIn} 0.2s ease-out;
  }
  &[data-state='closed'] {
    animation: ${fadeOut} 0.2s ease-in;
  }
`

const Content = styled(DrawerPrimitive.Content)`
  position: fixed;
  z-index: 50;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  color: #000000;
  border-radius: 12px;
  border: 1px solid #e5e5e5;
  overflow: hidden;

  &[data-vaul-drawer-direction='top'] {
    top: 0;
    left: 0;
    right: 0;
    max-height: 80vh;
    border-bottom: 1px solid #e5e5e5;
    border-radius: 0 0 12px 12px;
  }

  &[data-vaul-drawer-direction='bottom'] {
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 80vh;
    border-top: 1px solid #e5e5e5;
    border-radius: 12px 12px 0 0;
  }

  &[data-vaul-drawer-direction='right'] {
    right: 0;
    top: 0;
    bottom: 0;
    width: 75%;
    max-width: 400px;
    border-left: 1px solid #e5e5e5;
    border-radius: 0;
  }

  &[data-vaul-drawer-direction='left'] {
    left: 0;
    top: 0;
    bottom: 0;
    width: 75%;
    max-width: 400px;
    border-right: 1px solid #e5e5e5;
    border-radius: 0;
  }
`

const GripBar = styled.div`
  background: #e5e5e5;
  margin: 1rem auto 0;
  height: 6px;
  width: 100px;
  border-radius: 9999px;
  display: none;
  &[data-vaul-drawer-direction='bottom'] & {
    display: block;
  }
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
    gap: 10px;
  }
`

const Footer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
`

const Title = styled(DrawerPrimitive.Title)`
  font-weight: 600;
  font-size: 1rem;
  color: #111;
`

const Description = styled(DrawerPrimitive.Description)`
  font-size: 0.875rem;
  color: #666;
`

// ---------- Component Wrappers ----------

export function Drawer(props) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

export function DrawerTrigger(props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

export function DrawerPortal(props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

export function DrawerClose(props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

export function DrawerOverlay(props) {
  return <Overlay data-slot="drawer-overlay" {...props} />
}

export function DrawerContent({ children, ...props }) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <Content data-slot="drawer-content" {...props}>
        <GripBar data-vaul-drawer-direction={props['data-vaul-drawer-direction']} />
        {children}
      </Content>
    </DrawerPortal>
  )
}

export function DrawerHeader(props) {
  return <Header data-slot="drawer-header" {...props} />
}

export function DrawerFooter(props) {
  return <Footer data-slot="drawer-footer" {...props} />
}

export function DrawerTitle(props) {
  return <Title data-slot="drawer-title" {...props} />
}

export function DrawerDescription(props) {
  return <Description data-slot="drawer-description" {...props} />
}
