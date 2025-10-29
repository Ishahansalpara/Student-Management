import React from "react";
import styled, { css } from "styled-components";

// ================== Styled Input ==================

const StyledInput = styled.input`
  width: 100%;
  min-width: 0;
  height: 36px;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: transparent;
  color: #000;
  font-size: 14px;
  outline: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: border-color 0.2s, box-shadow 0.2s, color 0.2s;
  appearance: none;

  &::placeholder {
    color: #888;
  }

  &:focus-visible {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3);
  }

  &[aria-invalid="true"] {
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &::file-selector-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 28px;
    border: none;
    background: transparent;
    color: #000;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
  }

  &::selection {
    background: #4f46e5;
    color: #fff;
  }

  @media (min-width: 768px) {
    font-size: 13px;
  }

  ${(props) =>
    props.as === "textarea" &&
    css`
      resize: none;
      height: auto;
      padding: 10px 12px;
    `}
`;

// ================== Input Component ==================

export function Input({ className, type = "text", ...props }) {
  return <StyledInput type={type} data-slot="input" className={className} {...props} />;
}
