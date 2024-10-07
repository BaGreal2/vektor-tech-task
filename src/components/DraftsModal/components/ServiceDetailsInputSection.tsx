import { useEffect } from 'react'
import { Stack } from '@mui/material'
import dayjs from 'dayjs'
import { Control, useController, useWatch } from 'react-hook-form'

import {
  FormInputDate,
  FormInputDropdown,
  FormInputText
} from '@/components/FormComponents'
import { LOG_TYPES } from '@/data'
import { LogFormData } from '@/types'

interface ServiceDetailsInputSectionProps {
  control: Control<LogFormData>
}

export const ServiceDetailsInputSection = ({
  control
}: ServiceDetailsInputSectionProps) => {
  const startDate = useWatch({ control, name: 'startDate' })
  const { field: endDateField } = useController({ control, name: 'endDate' })

  useEffect(() => {
    const startDayjs = dayjs(startDate)
    if (
      startDayjs.isValid() &&
      dayjs(endDateField.value).isBefore(startDayjs.add(1, 'day'))
    ) {
      endDateField.onChange(startDayjs.add(1, 'day').toString())
    }
  }, [startDate])

  return (
    <Stack spacing="0.5rem">
      <Stack direction="row">
        <FormInputDate name="startDate" label="Date In" control={control} />
        <FormInputDate
          name="endDate"
          label="Date Out"
          control={control}
          rules={{
            validate: (endDateValue) => {
              const end = dayjs(endDateValue)
              const start = dayjs(startDate)
              if (end.isBefore(start.add(1, 'day'))) {
                return 'End date must be at least one day after start date'
              }
              return true
            }
          }}
        />
        <FormInputDropdown
          name="type"
          label="Type"
          control={control}
          required
          options={LOG_TYPES.map((option) => ({
            value: option,
            label: option
          }))}
          sx={{
            flexGrow: 1,
            minWidth: '10rem',
            textTransform: 'capitalize'
          }}
        />
      </Stack>
      <FormInputText
        name="serviceDescription"
        label="Service Description"
        required
        control={control}
      />
    </Stack>
  )
}
