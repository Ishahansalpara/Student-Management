'use client';

import React from 'react';
import styled from 'styled-components';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

const Root = styled(ScrollAreaPrimitive.Root)`
  position: relative;
`;

const Viewport = styled(ScrollAreaPrimitive.Viewport)`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  outline: none;
  transition: box-shadow 0.2s ease;
  &:focus-visible {
    box-shadow: 0 0 0 3px var(--ring);
  }
`;

const Scrollbar = styled(ScrollAreaPrimitive.ScrollAreaScrollbar)`
  display: flex;
  touch-action: none;
  padding: 1px;
  user-select: none;
  transition: background 0.2s ease;
  ${({ orientation }) =>
    orientation === 'vertical'
      ? `
    height: 100%;
    width: 0.625rem;
    border-left: 1px solid transparent;
  `
      : `
    height: 0.625rem;
    flex-direction: column;
    border-top: 1px solid transparent;
  `}
`;

const Thumb = styled(ScrollAreaPrimitive.ScrollAreaThumb)`
  flex: 1;
  background: var(--border);
  border-radius: 9999px;
`;

export function ScrollArea({ children, ...props }) {
  return (
    <Root {...props}>
      <Viewport>{children}</Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </Root>
  );
}

export function ScrollBar({ orientation = 'vertical', ...props }) {
  return (
    <Scrollbar orientation={orientation} {...props}>
      <Thumb />
    </Scrollbar>
  );
}
