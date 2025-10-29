import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Loader2Icon } from 'lucide-react';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const StyledLoader = styled(Loader2Icon)`
  width: 1rem;
  height: 1rem;
  animation: ${spin} 1s linear infinite;
`;

export function Spinner(props) {
  return <StyledLoader role="status" aria-label="Loading" {...props} />;
}
