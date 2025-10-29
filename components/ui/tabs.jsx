'use client';
import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import styled from 'styled-components';

const TabsRoot = styled(TabsPrimitive.Root)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TabsList = styled(TabsPrimitive.List)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f5;
  color: #6b7280;
  border-radius: 0.5rem;
  padding: 3px;
  height: 2.25rem;
`;

const TabsTrigger = styled(TabsPrimitive.Trigger)`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  color: #111827;

  &[data-state='active'] {
    background-color: #fff;
    border-color: #d1d5db;
    color: #111827;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 3px solid rgba(59, 130, 246, 0.4);
  }
`;

const TabsContent = styled(TabsPrimitive.Content)`
  flex: 1;
  outline: none;
`;

export function Tabs(props) {
  return <TabsRoot {...props} />;
}

export { TabsList, TabsTrigger, TabsContent };
