'use client';
import React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import styled from 'styled-components';

const StyledRoot = styled(SwitchPrimitive.Root)`
  display: inline-flex;
  align-items: center;
  width: 2rem;
  height: 1.15rem;
  border-radius: 9999px;
  border: 1px solid transparent;
  transition: all 0.2s ease;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);

  &[data-state='checked'] {
    background-color: #3b82f6; /* primary */
  }
  &[data-state='unchecked'] {
    background-color: #e5e7eb; /* input gray */
  }
  &:focus-visible {
    outline: 3px solid rgba(59, 130, 246, 0.4);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledThumb = styled(SwitchPrimitive.Thumb)`
  display: block;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: white;
  transform: translateX(0);
  transition: transform 0.2s ease, background-color 0.2s ease;

  &[data-state='checked'] {
    transform: translateX(calc(100% - 2px));
    background-color: #fff;
  }
`;

export function Switch(props) {
  return (
    <StyledRoot {...props}>
      <StyledThumb />
    </StyledRoot>
  );
}
