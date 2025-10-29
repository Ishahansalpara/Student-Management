import React from 'react'
import styled, { css } from 'styled-components'

// ---------- Styled ----------

const KbdRoot = styled.kbd`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 20px;
  min-width: 20px;
  padding: 0 6px;
  background: #f3f4f6;
  color: #6b7280;
  border-radius: 4px;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  font-size: 12px;
  font-weight: 600;
  user-select: none;
  pointer-events: none;
  box-sizing: border-box;

  svg {
    width: 12px;
    height: 12px;
  }
`

const KbdGroupRoot = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`

// ---------- Components ----------

export function Kbd({ className, ...props }) {
  return <KbdRoot data-slot="kbd" className={className} {...props} />
}

export function KbdGroup({ className, ...props }) {
  return <KbdGroupRoot data-slot="kbd-group" className={className} {...props} />
}
