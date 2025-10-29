'use client'

import React from 'react'
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio'
import styled from 'styled-components'

const StyledAspectRatio = styled(AspectRatioPrimitive.Root)`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  background-color: #f9f9f9;
`

export function AspectRatio(props) {
  return <StyledAspectRatio {...props} />
}
