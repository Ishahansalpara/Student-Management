import React, { useMemo } from 'react'
import styled, { css } from 'styled-components'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

// ---------- Styled Components ----------

const FieldSetContainer = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FieldLegendContainer = styled.legend`
  margin-bottom: 0.75rem;
  font-weight: 500;
  ${({ variant }) =>
    variant === 'legend'
      ? css`
          font-size: 1rem;
        `
      : css`
          font-size: 0.875rem;
        `}
`

const FieldGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.75rem;
`

const FieldContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 0.75rem;
  ${({ orientation }) =>
    orientation === 'horizontal'
      ? css`
          flex-direction: row;
          align-items: center;
        `
      : orientation === 'responsive'
      ? css`
          flex-direction: column;
          @media (min-width: 768px) {
            flex-direction: row;
            align-items: center;
          }
        `
      : css`
          flex-direction: column;
        `}
`

const FieldContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
`

const FieldLabelContainer = styled(Label)`
  display: flex;
  width: fit-content;
  gap: 0.5rem;
  line-height: 1.4;
  font-weight: 500;
  color: #111827;
`

const FieldTitleContainer = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
`

const FieldDescriptionContainer = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.6;

  a {
    text-decoration: underline;
    text-underline-offset: 4px;
    color: #2563eb;
  }
  a:hover {
    color: #1d4ed8;
  }
`

const FieldErrorContainer = styled.div`
  font-size: 0.875rem;
  color: #dc2626;
  font-weight: 400;
`

const FieldSeparatorContainer = styled.div`
  position: relative;
  margin: -0.5rem 0;
  height: 1.25rem;
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
`

// ---------- Components ----------

export function FieldSet(props) {
  return <FieldSetContainer data-slot="field-set" {...props} />
}

export function FieldLegend({ variant = 'legend', ...props }) {
  return <FieldLegendContainer data-slot="field-legend" variant={variant} {...props} />
}

export function FieldGroup(props) {
  return <FieldGroupContainer data-slot="field-group" {...props} />
}

export function Field({ orientation = 'vertical', ...props }) {
  return (
    <FieldContainer role="group" data-slot="field" orientation={orientation} {...props} />
  )
}

export function FieldContent(props) {
  return <FieldContentContainer data-slot="field-content" {...props} />
}

export function FieldLabel(props) {
  return <FieldLabelContainer data-slot="field-label" {...props} />
}

export function FieldTitle(props) {
  return <FieldTitleContainer data-slot="field-title" {...props} />
}

export function FieldDescription(props) {
  return <FieldDescriptionContainer data-slot="field-description" {...props} />
}

export function FieldSeparator({ children, ...props }) {
  return (
    <FieldSeparatorContainer data-slot="field-separator" {...props}>
      <Separator />
      {children && <span>{children}</span>}
    </FieldSeparatorContainer>
  )
}

export function FieldError({ children, errors, ...props }) {
  const content = useMemo(() => {
    if (children) return children
    if (!errors) return null
    if (errors.length === 1 && errors[0]?.message) return errors[0].message
    return (
      <ul style={{ marginLeft: '1rem', listStyleType: 'disc' }}>
        {errors.map(
          (err, i) => err?.message && <li key={i}>{err.message}</li>
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) return null

  return (
    <FieldErrorContainer role="alert" data-slot="field-error" {...props}>
      {content}
    </FieldErrorContainer>
  )
}
