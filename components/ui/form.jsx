import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
} from 'react-hook-form'
import styled from 'styled-components'
import { Label } from '@/components/ui/label'

// ---------- Context ----------
const FormFieldContext = React.createContext({})
const FormItemContext = React.createContext({})

export const Form = FormProvider

// ---------- Styled ----------
const FormItemContainer = styled.div`
  display: grid;
  gap: 0.5rem;
`

const FormLabelStyled = styled(Label)`
  color: ${({ error }) => (error ? '#dc2626' : '#111827')};
  font-size: 0.875rem;
  font-weight: 500;
`

const FormDescriptionStyled = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
`

const FormMessageStyled = styled.p`
  color: #dc2626;
  font-size: 0.875rem;
`

// ---------- Components ----------
export function FormField(props) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

export function useFormField() {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) throw new Error('useFormField must be used within FormField')

  return {
    id: itemContext.id,
    name: fieldContext.name,
    formItemId: `${itemContext.id}-form-item`,
    formDescriptionId: `${itemContext.id}-form-item-description`,
    formMessageId: `${itemContext.id}-form-item-message`,
    ...fieldState,
  }
}

export function FormItem(props) {
  const id = React.useId()
  return (
    <FormItemContext.Provider value={{ id }}>
      <FormItemContainer data-slot="form-item" {...props} />
    </FormItemContext.Provider>
  )
}

export function FormLabel(props) {
  const { error, formItemId } = useFormField()
  return (
    <FormLabelStyled
      data-slot="form-label"
      error={!!error}
      htmlFor={formItemId}
      {...props}
    />
  )
}

export function FormControl(props) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
  return (
    <Slot
      id={formItemId}
      aria-describedby={
        !error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      data-slot="form-control"
      {...props}
    />
  )
}

export function FormDescription(props) {
  const { formDescriptionId } = useFormField()
  return <FormDescriptionStyled id={formDescriptionId} {...props} />
}

export function FormMessage(props) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? '') : props.children
  if (!body) return null
  return <FormMessageStyled id={formMessageId} {...props}>{body}</FormMessageStyled>
}
