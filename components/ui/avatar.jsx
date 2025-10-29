'use client'

import React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import styled from 'styled-components'

// === Styled Components ===
const StyledAvatar = styled(AvatarPrimitive.Root)`
  position: relative;
  display: flex;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 50%;
`

const StyledAvatarImage = styled(AvatarPrimitive.Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const StyledAvatarFallback = styled(AvatarPrimitive.Fallback)`
  background-color: #e0e0e0;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.9rem;
  color: #555;
`

// === Components ===
export function Avatar(props) {
  return <StyledAvatar {...props} />
}

export function AvatarImage(props) {
  return <StyledAvatarImage {...props} />
}

export function AvatarFallback(props) {
  return <StyledAvatarFallback {...props} />
}
