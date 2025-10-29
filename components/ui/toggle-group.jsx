"use client";

import React, { createContext, useContext } from "react";
import styled, { css } from "styled-components";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";

const ToggleGroupContext = createContext({
  variant: "default",
  size: "default",
});

const StyledGroup = styled(ToggleGroupPrimitive.Root)`
  display: flex;
  align-items: center;
  border-radius: 6px;
  overflow: hidden;
  gap: 0;
`;

const baseButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 0.4rem 0.75rem;
  font-size: 0.875rem;
  border: 1px solid #ccc;
  background: #f9f9f9;
  color: #111;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: #eee;
  }

  &[data-state="on"] {
    background: #3b82f6;
    color: #fff;
    border-color: #2563eb;
  }

  &:first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  &:last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;

const StyledItem = styled(ToggleGroupPrimitive.Item)`
  ${baseButton}
`;

export function ToggleGroup({ children, variant, size, ...props }) {
  return (
    <StyledGroup {...props}>
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </StyledGroup>
  );
}

export function ToggleGroupItem({ children, ...props }) {
  const context = useContext(ToggleGroupContext);
  return <StyledItem data-variant={context.variant} {...props}>{children}</StyledItem>;
}
