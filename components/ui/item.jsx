import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import styled, { css } from 'styled-components'
import { Separator } from '@/components/ui/separator'

// ---------- Styled ----------

const ItemGroupRoot = styled.div`
  display: flex;
  flex-direction: column;
`

const SeparatorStyled = styled(Separator)`
  margin: 0;
`

const baseItemStyles = css`
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  font-size: 14px;
  border-radius: 8px;
  transition: background-color 0.1s ease, color 0.1s ease;
  flex-wrap: wrap;
  outline: none;

  &:focus-visible {
    border-color: #6366f1; /* ring color */
    box-shadow: 0 0 0 4px rgba(99,102,241,0.12);
  }

  a & {
    &:hover {
      background-color: rgba(99,102,241,0.06);
    }
  }
`

const ItemRoot = styled.div`
  ${baseItemStyles}
  ${(p) =>
    p['data-variant'] === 'outline' &&
    css`
      border-color: #e6e6e6;
      background: transparent;
    `}
  ${(p) =>
    p['data-variant'] === 'muted' &&
    css`
      background: #f3f4f6;
    `}
  ${(p) =>
    p['data-size'] === 'sm' &&
    css`
      padding: 10px 12px;
      gap: 10px;
    `}
  ${(p) =>
    p['data-size'] === 'default' &&
    css`
      padding: 16px;
      gap: 16px;
    `}
`

const ItemMediaRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-shrink: 0;

  ${(p) =>
    p['data-variant'] === 'icon' &&
    css`
      width: 32px;
      height: 32px;
      border-radius: 6px;
      background: #eef2ff;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        width: 16px;
        height: 16px;
      }
    `}

  ${(p) =>
    p['data-variant'] === 'image' &&
    css`
      width: 40px;
      height: 40px;
      border-radius: 6px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    `}
`

const ItemContentRoot = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
`

const ItemTitleRoot = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 14px;
`

const ItemDescriptionRoot = styled.p`
  color: #6b7280;
  font-size: 14px;
  line-height: 1.3;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  a {
    text-decoration: underline;
    text-underline-offset: 4px;
    color: #2563eb;
  }

  a:hover {
    color: #1d4ed8;
  }
`

const ItemActionsRoot = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const ItemHeaderFooterBase = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`

// ---------- Components ----------

export function ItemGroup({ className, ...props }) {
  return (
    <ItemGroupRoot role="list" data-slot="item-group" className={className} {...props} />
  )
}

export function ItemSeparator(props) {
  // keep the same orientation and minimal spacing as original
  return <SeparatorStyled data-slot="item-separator" orientation="horizontal" {...props} />
}

export function Item({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : 'div'
  return (
    <Comp
      as={Comp === Slot ? undefined : undefined}
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={className}
      {...props}
      // styled wrapper will be applied by rendering a styled div inside if asChild is false
    >
      {/*
        When using asChild with Slot, the consumer will pass their own element.
        We want to ensure consumers still get data attributes for styling.
      */}
      {Comp === Slot ? null : null}
    </Comp>
  )
}

// To keep style application consistent even when asChild is false, export a styled wrapper:
export function ItemStyled({ children, variant = 'default', size = 'default', ...props }) {
  return (
    <ItemRoot data-slot="item" data-variant={variant} data-size={size} {...props}>
      {children}
    </ItemRoot>
  )
}

export function ItemMedia({ className, variant = 'default', ...props }) {
  return (
    <ItemMediaRoot data-slot="item-media" data-variant={variant} className={className} {...props} />
  )
}

export function ItemContent({ className, ...props }) {
  return <ItemContentRoot data-slot="item-content" className={className} {...props} />
}

export function ItemTitle({ className, ...props }) {
  return <ItemTitleRoot data-slot="item-title" className={className} {...props} />
}

export function ItemDescription({ className, ...props }) {
  return <ItemDescriptionRoot data-slot="item-description" className={className} {...props} />
}

export function ItemActions({ className, ...props }) {
  return <ItemActionsRoot data-slot="item-actions" className={className} {...props} />
}

export function ItemHeader({ className, ...props }) {
  return <ItemHeaderFooterBase data-slot="item-header" className={className} {...props} />
}

export function ItemFooter({ className, ...props }) {
  return <ItemHeaderFooterBase data-slot="item-footer" className={className} {...props} />
}

// keep original exports names for compatibility
export { Item as RawItem }
