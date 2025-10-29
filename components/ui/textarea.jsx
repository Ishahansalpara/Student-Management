import React from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
  min-height: 4rem;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: transparent;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  color: inherit;
  resize: vertical;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s, border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #999;
  }
`;

export function Textarea(props) {
  return <StyledTextarea {...props} />;
}
