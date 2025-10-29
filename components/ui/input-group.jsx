import React from "react";
import styled, { css } from "styled-components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// ================== Styled Components ==================

const GroupWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  outline: none;
  transition: box-shadow 0.2s, border-color 0.2s;

  ${(props) =>
    props["data-invalid"] &&
    css`
      border-color: #dc2626;
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
    `}

  &:focus-within {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3);
  }

  ${(props) =>
    props.align === "block-start" &&
    css`
      flex-direction: column;
      align-items: flex-start;
    `}

  ${(props) =>
    props.align === "block-end" &&
    css`
      flex-direction: column;
      align-items: flex-end;
    `}
`;

const AddonBase = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 14px;
  color: #666;
  padding: 4px 8px;
  cursor: text;
  user-select: none;

  ${(props) =>
    props.align === "inline-start" &&
    css`
      order: -1;
      padding-left: 10px;
    `}

  ${(props) =>
    props.align === "inline-end" &&
    css`
      order: 1;
      padding-right: 10px;
    `}

  ${(props) =>
    props.align === "block-start" &&
    css`
      order: -1;
      width: 100%;
      justify-content: flex-start;
      padding: 8px 10px 0;
    `}

  ${(props) =>
    props.align === "block-end" &&
    css`
      order: 1;
      width: 100%;
      justify-content: flex-start;
      padding: 0 10px 8px;
    `}
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 4px;
  border: none;
  box-shadow: none;
  font-size: 13px;

  ${(props) =>
    props["data-size"] === "xs" &&
    css`
      height: 24px;
      padding: 0 8px;
      border-radius: 4px;
    `}

  ${(props) =>
    props["data-size"] === "sm" &&
    css`
      height: 32px;
      padding: 0 10px;
      border-radius: 6px;
    `}

  ${(props) =>
    props["data-size"]?.startsWith("icon") &&
    css`
      width: ${props["data-size"] === "icon-xs" ? "24px" : "32px"};
      height: ${props["data-size"] === "icon-xs" ? "24px" : "32px"};
      padding: 0;
      justify-content: center;
    `}
`;

const Text = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #666;

  svg {
    pointer-events: none;
    width: 16px;
    height: 16px;
  }
`;

const StyledInput = styled(Input)`
  flex: 1;
  border: none;
  background: transparent;
  box-shadow: none;
  padding: 6px 10px;
  font-size: 14px;
  outline: none;

  &:focus-visible {
    outline: none;
    box-shadow: none;
  }
`;

const StyledTextarea = styled(Textarea)`
  flex: 1;
  resize: none;
  border: none;
  background: transparent;
  box-shadow: none;
  padding: 10px;
  font-size: 14px;
  outline: none;

  &:focus-visible {
    outline: none;
    box-shadow: none;
  }
`;

// ================== Components ==================

export function InputGroup({ className, align, ...props }) {
  return <GroupWrapper className={className} align={align} {...props} />;
}

export function InputGroupAddon({
  align = "inline-start",
  className,
  ...props
}) {
  const handleClick = (e) => {
    if (e.target.closest("button")) return;
    e.currentTarget.parentElement?.querySelector("input")?.focus();
  };

  return (
    <AddonBase
      role="group"
      data-slot="input-group-addon"
      align={align}
      className={className}
      onClick={handleClick}
      {...props}
    />
  );
}

export function InputGroupButton({
  type = "button",
  size = "xs",
  variant = "ghost",
  className,
  ...props
}) {
  return (
    <StyledButton
      type={type}
      data-size={size}
      variant={variant}
      className={className}
      {...props}
    />
  );
}

export function InputGroupText({ className, ...props }) {
  return <Text className={className} {...props} />;
}

export function InputGroupInput({ className, ...props }) {
  return <StyledInput data-slot="input-group-control" className={className} {...props} />;
}

export function InputGroupTextarea({ className, ...props }) {
  return <StyledTextarea data-slot="input-group-control" className={className} {...props} />;
}
