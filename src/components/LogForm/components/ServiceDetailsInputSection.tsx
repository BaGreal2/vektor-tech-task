import { useEffect } from 'react'
import { alpha, Stack } from '@mui/material'
import dayjs from 'dayjs'
import { Control, useController, useWatch } from 'react-hook-form'

import {
  FormInputDate,
  FormInputDropdown,
  FormInputText
} from '@/components/ui/FormComponents'
import { filterToColor, LOG_TYPES } from '@/data'
import { LogFormData } from '@/types'

interface ServiceDetailsInputSectionProps {
  control: Control<LogFormData>
}

export const ServiceDetailsInputSection = ({
  control
}: ServiceDetailsInputSectionProps) => {
  const startDate = useWatch({ control, name: 'startDate' })
  const { field: endDateField } = useController({ control, name: 'endDate' })
  const type = useWatch({ control, name: 'type' })

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
          getStylesForOption={({ value }) => {
            const color = filterToColor[value] ?? 'black'

            return {
              background: alpha(color, 0.25)
            }
          }}
          sx={{
            flexGrow: 1,
            minWidth: '10rem',
            textTransform: 'capitalize',
            background: alpha(filterToColor[type] ?? 'black', 0.25)
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
