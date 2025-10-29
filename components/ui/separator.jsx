'use client';

import React from 'react';
import styled from 'styled-components';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

const SeparatorStyled = styled(SeparatorPrimitive.Root)`
  background: var(--border);
  flex-shrink: 0;

  &[data-orientation='horizontal'] {
    height: 1px;
    width: 100%;
  }

  &[data-orientation='vertical'] {
    width: 1px;
    height: 100%;
  }
`;

export function Separator(props) {
  return <SeparatorStyled {...props} />;
}
