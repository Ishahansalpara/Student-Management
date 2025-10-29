'use client';

import React from 'react';
import styled from 'styled-components';
import * as SelectPrimitive from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

/* ==== Styled Components ==== */

const Trigger = styled(SelectPrimitive.Trigger)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid var(--input);
  background: transparent;
  font-size: 0.875rem;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus-visible {
    border-color: var(--ring);
    box-shadow: 0 0 0 3px rgba(var(--ring-rgb), 0.5);
  }

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Content = styled(SelectPrimitive.Content)`
  z-index: 50;
  border: 1px solid var(--border);
  border-radius: 0.375rem;
  background: var(--popover);
  color: var(--popover-foreground);
  overflow-y: auto;
  max-height: 16rem;
  box-shadow: var(--shadow);
`;

const Item = styled(SelectPrimitive.Item)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 0.25rem;
  cursor: pointer;
  outline: none;
  transition: background 0.2s ease;

  &:focus {
    background: var(--accent);
    color: var(--accent-foreground);
  }

  &[data-disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const Label = styled(SelectPrimitive.Label)`
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  color: var(--muted-foreground);
`;

const Separator = styled(SelectPrimitive.Separator)`
  height: 1px;
  margin: 0.25rem 0;
  background: var(--border);
`;

const ScrollButton = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.25rem 0;
`;

export function Select(props) {
  return <SelectPrimitive.Root {...props} />;
}

export function SelectTrigger({ children, ...props }) {
  return (
    <Trigger {...props}>
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon size={16} style={{ opacity: 0.5 }} />
      </SelectPrimitive.Icon>
    </Trigger>
  );
}

export function SelectContent({ children, ...props }) {
  return (
    <SelectPrimitive.Portal>
      <Content {...props}>
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </Content>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({ children, ...props }) {
  return (
    <Item {...props}>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator asChild>
        <CheckIcon size={14} />
      </SelectPrimitive.ItemIndicator>
    </Item>
  );
}

export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;
export const SelectLabel = Label;
export const SelectSeparator = Separator;

export function SelectScrollUpButton(props) {
  return (
    <SelectPrimitive.ScrollUpButton asChild>
      <ScrollButton>
        <ChevronUpIcon size={16} />
      </ScrollButton>
    </SelectPrimitive.ScrollUpButton>
  );
}

export function SelectScrollDownButton(props) {
  return (
    <SelectPrimitive.ScrollDownButton asChild>
      <ScrollButton>
        <ChevronDownIcon size={16} />
      </ScrollButton>
    </SelectPrimitive.ScrollDownButton>
  );
}
