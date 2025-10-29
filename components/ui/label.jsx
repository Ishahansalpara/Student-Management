import React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import styled, { css } from 'styled-components'

// ---------- Styled ----------

const LabelRoot = styled(LabelPrimitive.Root)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  line-height: 1;
  font-weight: 600;
  user-select: none;

  &.disabled,
  &[data-disabled='true'] {
    pointer-events: none;
    opacity: 0.5;
    cursor: not-allowed;
  }
`

// ---------- Component ----------

export function Label({ className, ...props }) {
  // we forward className, but provide default styles via styled component
  return <LabelRoot data-slot="label" className={className} {...props} />
}
