"use client";

import React from "react";
import styled, { css, keyframes } from "styled-components";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { X } from "lucide-react";

const slideIn = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const slideOut = keyframes`
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(100%); opacity: 0; }
`;

export const ToastProvider = ToastPrimitives.Provider;

export const ToastViewport = styled(ToastPrimitives.Viewport)`
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  z-index: 100;
  max-width: 420px;
`;

const variantStyles = {
  default: css`
    background: #fff;
    color: #111;
    border: 1px solid #ddd;
  `,
  destructive: css`
    background: #dc2626;
    color: #fff;
    border: 1px solid #b91c1c;
  `,
};

const StyledToast = styled(ToastPrimitives.Root)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem 1rem 1rem;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.25s ease;
  ${({ variant }) => variantStyles[variant || "default"]};
  animation: ${slideIn} 0.25s ease forwards;

  &[data-state="closed"] {
    animation: ${slideOut} 0.25s ease forwards;
  }
`;

export const Toast = React.forwardRef(({ variant, ...props }, ref) => (
  <StyledToast ref={ref} variant={variant} {...props} />
));

export const ToastTitle = styled(ToastPrimitives.Title)`
  font-weight: 600;
  font-size: 0.95rem;
`;

export const ToastDescription = styled(ToastPrimitives.Description)`
  font-size: 0.9rem;
  opacity: 0.85;
`;

export const ToastAction = styled(ToastPrimitives.Action)`
  background: transparent;
  border: 1px solid #ccc;
  padding: 0.4rem 0.75rem;
  border-radius: 5px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: #f3f3f3;
  }
`;

const CloseButton = styled(ToastPrimitives.Close)`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: #000;
  }
`;

export const ToastClose = React.forwardRef((props, ref) => (
  <CloseButton ref={ref} {...props}>
    <X size={16} />
  </CloseButton>
));
