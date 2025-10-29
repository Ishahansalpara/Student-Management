'use client';

import React from 'react';
import styled from 'styled-components';
import * as ProgressPrimitive from '@radix-ui/react-progress';

const Root = styled(ProgressPrimitive.Root)`
  position: relative;
  width: 100%;
  height: 0.5rem;
  border-radius: 1rem;
  background: rgba(var(--primary-rgb), 0.2);
  overflow: hidden;
`;

const Indicator = styled(ProgressPrimitive.Indicator)`
  height: 100%;
  background: var(--primary);
  transition: transform 0.3s ease;
  transform: ${({ value }) => `translateX(-${100 - (value || 0)}%)`};
`;

export function Progress({ value, ...props }) {
  return (
    <Root {...props}>
      <Indicator value={value} />
    </Root>
  );
}
