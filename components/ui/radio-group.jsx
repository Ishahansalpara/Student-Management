'use client';

import React from 'react';
import styled from 'styled-components';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { CircleIcon } from 'lucide-react';

const RadioRoot = styled(RadioGroupPrimitive.Root)`
  display: grid;
  gap: 0.75rem;
`;

const RadioItem = styled(RadioGroupPrimitive.Item)`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 1px solid var(--input);
  background: rgba(var(--input-rgb), 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: var(--shadow-xs);
  transition: all 0.2s ease;
  outline: none;

  &:focus-visible {
    border-color: var(--ring);
    box-shadow: 0 0 0 3px rgba(var(--ring-rgb), 0.5);
  }

  &[aria-invalid='true'] {
    border-color: var(--destructive);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Indicator = styled(RadioGroupPrimitive.Indicator)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function RadioGroup(props) {
  return <RadioRoot {...props} />;
}

export function RadioGroupItem(props) {
  return (
    <RadioItem {...props}>
      <Indicator>
        <CircleIcon
          size={8}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fill: 'var(--primary)',
          }}
        />
      </Indicator>
    </RadioItem>
  );
}
