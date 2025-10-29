"use client";

import React from "react";
import styled, { keyframes } from "styled-components";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.95); }
`;

const StyledContent = styled(TooltipPrimitive.Content)`
  background: #111;
  color: #fff;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 0.75rem;
  z-index: 50;
  max-width: 240px;
  animation: ${fadeIn} 0.15s ease forwards;

  &[data-state="closed"] {
    animation: ${fadeOut} 0.15s ease forwards;
  }
`;

const StyledArrow = styled(TooltipPrimitive.Arrow)`
  fill: #111;
`;

export function TooltipProvider({ delayDuration = 0, ...props }) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />
  );
}

export function Tooltip({ ...props }) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root {...props} />
    </TooltipProvider>
  );
}

export function TooltipTrigger({ ...props }) {
  return <TooltipPrimitive.Trigger {...props} />;
}

export function TooltipContent({ children, sideOffset = 4, ...props }) {
  return (
    <TooltipPrimitive.Portal>
      <StyledContent sideOffset={sideOffset} {...props}>
        {children}
        <StyledArrow />
      </StyledContent>
    </TooltipPrimitive.Portal>
  );
}
