'use client';

import React from 'react';
import styled from 'styled-components';
import * as PopoverPrimitive from '@radix-ui/react-popover';

const Content = styled(PopoverPrimitive.Content)`
  z-index: 50;
  width: 18rem;
  border: 1px solid var(--border);
  border-radius: 0.375rem;
  background: var(--popover);
  color: var(--popover-foreground);
  padding: 1rem;
  box-shadow: var(--shadow);
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export function Popover({ children, ...props }) {
  return <PopoverPrimitive.Root {...props}>{children}</PopoverPrimitive.Root>;
}

export function PopoverTrigger({ ...props }) {
  return <PopoverPrimitive.Trigger {...props} />;
}

export function PopoverContent({ align = 'center', sideOffset = 4, ...props }) {
  return (
    <PopoverPrimitive.Portal>
      <Content align={align} sideOffset={sideOffset} {...props} />
    </PopoverPrimitive.Portal>
  );
}

export function PopoverAnchor({ ...props }) {
  return <PopoverPrimitive.Anchor {...props} />;
}
