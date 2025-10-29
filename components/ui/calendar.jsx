'use client'

import React, { useRef, useEffect } from 'react'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react'
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker'
import styled, { css } from 'styled-components'
import { Button } from '@/components/ui/button'

// ---------------- STYLED COMPONENTS ----------------

const CalendarWrapper = styled.div`
  background: var(--background);
  padding: 12px;
  display: inline-block;
`

const CalendarNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  position: absolute;
  inset: 0;
  top: 0;
`

const MonthCaption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--cell-size, 2.5rem);
  width: 100%;
  font-weight: 500;
`

const WeekRow = styled.div`
  display: flex;
  width: 100%;
  margin-top: 8px;
`

const Weekday = styled.div`
  flex: 1;
  font-size: 0.8rem;
  color: var(--muted-foreground);
  text-align: center;
  user-select: none;
`

const DayWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const WeekNumber = styled.div`
  display: flex;
  height: var(--cell-size, 2.5rem);
  width: var(--cell-size, 2.5rem);
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  color: var(--muted-foreground);
`

// Button style modifiers for calendar days
const dayButtonStyles = css`
  flex: 1;
  aspect-ratio: 1 / 1;
  border-radius: 6px;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
  align-items: center;
  background: transparent;
  transition: all 0.15s ease;

  &[data-selected-single='true'],
  &[data-range-start='true'],
  &[data-range-end='true'] {
    background: var(--primary);
    color: var(--primary-foreground);
  }

  &[data-range-middle='true'] {
    background: var(--accent);
    color: var(--accent-foreground);
  }

  &:hover {
    background: var(--accent);
    color: var(--accent-foreground);
  }

  &[disabled],
  &[aria-disabled='true'] {
    opacity: 0.5;
    pointer-events: none;
  }

  &[data-today='true'] {
    border: 1px solid var(--ring);
  }
`

const StyledDayButton = styled(Button)`
  ${dayButtonStyles}
`

// ---------------- COMPONENTS ----------------

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: 'w-fit',
        months: 'flex flex-col md:flex-row gap-4 relative',
        month: 'flex flex-col gap-4',
        nav: 'flex items-center justify-between gap-1 w-full absolute top-0 inset-x-0',
        month_caption: 'flex items-center justify-center',
        weekdays: 'flex',
        weekday: 'flex-1 text-center text-sm font-normal text-muted-foreground',
        week: 'flex w-full mt-2',
        day: 'aspect-square',
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...rest }) => (
          <CalendarWrapper ref={rootRef} className={className} {...rest} />
        ),
        Chevron: ({ orientation, ...rest }) => {
          if (orientation === 'left')
            return <ChevronLeftIcon size={16} {...rest} />
          if (orientation === 'right')
            return <ChevronRightIcon size={16} {...rest} />
          return <ChevronDownIcon size={16} {...rest} />
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...rest }) => (
          <td {...rest}>
            <WeekNumber>{children}</WeekNumber>
          </td>
        ),
        ...components,
      }}
      {...props}
    />
  )
}

// Custom Day Button
function CalendarDayButton({ className, day, modifiers, ...props }) {
  const ref = useRef(null)
  useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <StyledDayButton
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      data-today={modifiers.today}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
