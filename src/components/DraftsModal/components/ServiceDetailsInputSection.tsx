import { Stack } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { Control } from 'react-hook-form'

import { FormInputDropdown, FormInputText } from '@/components/FormComponents'
import { LOG_TYPES } from '@/data'
import { LogData } from '@/types'

interface ServiceDetailsInputSectionProps {
  control: Control<LogData>
}

export const ServiceDetailsInputSection = ({
  control
}: ServiceDetailsInputSectionProps) => {
  return (
    <Stack spacing="0.5rem">
      <Stack direction="row">
        <DatePicker label="Date In" />
        <DatePicker label="Date Out" />
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
