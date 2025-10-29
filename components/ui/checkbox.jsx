import React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import styled from "styled-components";

const StyledCheckbox = styled(CheckboxPrimitive.Root)`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: ${({ checked }) => (checked ? "#007bff" : "transparent")};
  color: ${({ checked }) => (checked ? "#fff" : "#000")};
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  transition: all 0.2s;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.4);
  }
`;

const Indicator = styled(CheckboxPrimitive.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function Checkbox({ className, ...props }) {
  return (
    <StyledCheckbox className={className} {...props}>
      <Indicator>
        <CheckIcon size={12} />
      </Indicator>
    </StyledCheckbox>
  );
}
