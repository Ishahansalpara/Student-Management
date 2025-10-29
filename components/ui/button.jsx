import React from "react";
import styled, { css } from "styled-components";

const variants = {
  default: css`
    background: var(--primary, #3b82f6);
    color: var(--on-primary, #fff);
    &:hover {
      background: #2563eb;
    }
  `,
  destructive: css`
    background: var(--destructive, #ef4444);
    color: #fff;
    &:hover {
      background: #dc2626;
    }
  `,
  outline: css`
    background: transparent;
    border: 1px solid var(--border, #d1d5db);
    color: var(--foreground, #111);
    &:hover {
      background: var(--accent, #f3f4f6);
    }
  `,
  secondary: css`
    background: var(--secondary, #e5e7eb);
    color: #111;
    &:hover {
      background: #d1d5db;
    }
  `,
  ghost: css`
    background: transparent;
    color: var(--foreground, #111);
    &:hover {
      background: var(--accent, #f3f4f6);
    }
  `,
  link: css`
    background: transparent;
    color: var(--primary, #3b82f6);
    text-decoration: underline;
  `,
};

const sizes = {
  default: css`
    height: 36px;
    padding: 0 16px;
  `,
  sm: css`
    height: 32px;
    padding: 0 12px;
    font-size: 0.875rem;
  `,
  lg: css`
    height: 42px;
    padding: 0 20px;
  `,
  icon: css`
    height: 36px;
    width: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  `,
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  ${(props) => variants[props.variant || "default"]}
  ${(props) => sizes[props.size || "default"]}
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export function Button({ children, variant, size, ...props }) {
  return (
    <StyledButton variant={variant} size={size} {...props}>
      {children}
    </StyledButton>
  );
}
