"use client";

import React from "react";
import styled, { css } from "styled-components";
import * as TogglePrimitive from "@radix-ui/react-toggle";

const variantStyles = {
  default: css`
    background: transparent;
  `,
  outline: css`
    border: 1px solid #ccc;
    background: transparent;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    &:hover {
      background: #f3f4f6;
      color: #111;
    }
  `,
};

const sizeStyles = {
  default: css`
    height: 36px;
    min-width: 36px;
    padding: 0 8px;
  `,
  sm: css`
    height: 32px;
    min-width: 32px;
    padding: 0 6px;
  `,
  lg: css`
    height: 40px;
    min-width: 40px;
    padding: 0 10px;
  `,
};

const StyledToggle = styled(TogglePrimitive.Root)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease;
  cursor: pointer;
  outline: none;

  svg {
    pointer-events: none;
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
  }

  &[data-state="on"] {
    background: #2563eb;
    color: #fff;
  }

  &:hover {
    background: #f3f4f6;
  }

  &:disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  ${({ variant }) => variantStyles[variant || "default"]}
  ${({ size }) => sizeStyles[size || "default"]}
`;

export function Toggle({ variant = "default", size = "default", ...props }) {
  return <StyledToggle variant={variant} size={size} {...props} />;
}
